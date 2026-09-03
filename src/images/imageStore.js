import { downscale, imageError } from './downscale.js';

// The picture library. Projects and references only ever held a URL to
// somebody else's server before this, so there was nowhere to put a photograph
// the gardener actually took. Pictures are too big for localStorage — one
// phone photo is larger than the whole quota — so they live in IndexedDB, in
// one database with one object store keyed by `id`.
//
// Read this module as a namespace, because `list` and `get` are far too plain
// to import loose:
//
//   import * as imageStore from '../images/imageStore.js';
//
// Every function here returns a promise, including the ones that could have
// been synchronous, so no caller has to remember which is which.
const DB_NAME = 'rooted-and-green:images';
const DB_VERSION = 1;
const STORE_NAME = 'images';

// Sorting newest-first is the only ordering the picker wants, and `createdAt`
// is an ISO timestamp, whose lexicographic order is its chronological order.
// So the index can do the sorting and list() never has to hold every record in
// memory to sort it.
const CREATED_INDEX = 'createdAt';

// A stored record is:
//   { id, name, mime, width, height, size, createdAt, blob }
// list() hands back every field except `blob`, because a Blob read out of
// IndexedDB keeps its backing data alive for as long as anything references
// it, and a gallery of forty thumbnails does not need forty of those. get(id)
// is where the blob comes from, one picture at a time.

// The same pairing usePosts uses, for the same reason: an in-tab event so
// every mounted useImageLibrary() sees a write immediately. The other half of
// that pairing cannot be a `storage` listener here — that event is
// localStorage's alone and IndexedDB writes never fire it — so a
// BroadcastChannel carries the news to other tabs instead. Where
// BroadcastChannel is missing the library still works; the other tab just
// needs a reload to notice, which is exactly what the fallback should cost.
const SYNC_EVENT = 'rooted-and-green:images-changed';
const CHANNEL_NAME = 'rooted-and-green:images';

// Errors reject with a real Error carrying a stable `code`, so T4 can branch
// on `err.code` and look the message up in the string catalogue rather than
// matching on English. The codes are:
//
//   'not-image'   — the file is not an image, or the browser could not decode
//                   it. The person picked the wrong file; nothing was stored.
//   'unavailable' — IndexedDB is missing or refused to open. Private browsing
//                   and blocked site data both land here. Nothing will store
//                   until the visitor changes that.
//   'quota'       — storage is full. The visitor has to remove pictures.
//   'failed'      — anything else went wrong. A generic "could not save".
//
// Nothing outside this module should invent a fifth code.
export const IMAGE_ERROR_CODES = Object.freeze({
  NOT_IMAGE: 'not-image',
  UNAVAILABLE: 'unavailable',
  QUOTA: 'quota',
  FAILED: 'failed',
});

// T4 and T7 both store *either* a library id or a legacy picsum.photos URL in
// the same field, and both need to tell them apart. The rule lives here once
// so neither re-derives it: a non-empty string containing neither '/' nor ':'
// is a library id.
//
// It looks like a bug and it is not. Ids are minted below as
// `img-<timestamp>-<five base36 characters>`, which can never contain either
// character. Every way of writing a URL contains at least one: an absolute one
// has the ':' of its scheme, a root-relative or relative one has a '/', and a
// data: URL has both. So the test is exhaustive over the two things this field
// is ever allowed to hold.
export function isLibraryId(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    !value.includes('/') &&
    !value.includes(':')
  );
}

// Anything IndexedDB throws arrives as a DOMException, and its `name` is the
// only part worth reading. Map the handful that mean something specific to the
// visitor and call the rest 'failed'.
function toImageError(cause) {
  // Something already coded — a rejection from downscale.js, say — passes
  // through unchanged so the specific reason survives the trip.
  if (cause && typeof cause.code === 'string') return cause;

  const name = cause && typeof cause.name === 'string' ? cause.name : '';

  if (name === 'QuotaExceededError') {
    return imageError('quota', 'There is no room left to store this picture.');
  }
  if (name === 'InvalidStateError' || name === 'SecurityError' || name === 'NotAllowedError') {
    return imageError('unavailable', 'This browser will not let the site store pictures.');
  }
  return imageError('failed', (cause && cause.message) || 'The picture store failed.');
}

let dbPromise = null;

function openDatabase() {
  if (dbPromise) return dbPromise;

  const opening = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined' || !indexedDB) {
      reject(imageError('unavailable', 'This browser has no IndexedDB.'));
      return;
    }

    let request;
    try {
      request = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (error) {
      // Firefox in private browsing throws here rather than firing onerror.
      reject(toImageError(error));
      return;
    }

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex(CREATED_INDEX, CREATED_INDEX, { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(toImageError(request.error));
    // A version change another tab is holding open. Nothing to wait for that
    // the visitor can act on, so treat it as unavailable rather than hanging.
    request.onblocked = () =>
      reject(imageError('unavailable', 'Another tab is holding the picture store open.'));
  });

  // A failure is deliberately not cached. A browser that blocked the database
  // on this call may allow it on the next one — the visitor leaves private
  // browsing, or grants storage — and a remembered rejection would keep the
  // library dead for the life of the tab.
  dbPromise = opening.catch((error) => {
    dbPromise = null;
    throw error;
  });
  return dbPromise;
}

// Every read and write goes through here so the failure handling is written
// once. `work` gets the object store and a `done` callback; whatever it hands
// to `done` is what the promise resolves with — but only once the transaction
// has actually committed. Resolving on a request's own success instead would
// report a write that a later abort quietly undid.
function runTransaction(mode, work) {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        let tx;
        try {
          tx = db.transaction(STORE_NAME, mode);
        } catch (error) {
          reject(toImageError(error));
          return;
        }

        let result;
        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(toImageError(tx.error));
        // A quota failure arrives here, not on the request: the write is
        // attempted, the store refuses it, and the whole transaction aborts.
        tx.onabort = () => reject(toImageError(tx.error));

        try {
          work(tx.objectStore(STORE_NAME), (value) => {
            result = value;
          });
        } catch (error) {
          tx.abort();
          reject(toImageError(error));
        }
      }),
  );
}

let channel;
let channelChecked = false;

function syncChannel() {
  if (channelChecked) return channel;
  channelChecked = true;
  try {
    channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel(CHANNEL_NAME) : null;
  } catch {
    // Some privacy modes expose the constructor and then refuse to build one.
    channel = null;
  }
  return channel;
}

function announce() {
  // The in-tab event first, and synchronously, so a hook that just added a
  // picture has already refreshed by the time add() resolves. A
  // BroadcastChannel never delivers to the context that posted, which is why
  // both halves are needed rather than either alone.
  window.dispatchEvent(new Event(SYNC_EVENT));

  const bus = syncChannel();
  if (!bus) return;
  try {
    bus.postMessage(SYNC_EVENT);
  } catch {
    // A channel belonging to a page being torn down throws. Losing a ping on
    // the way out is not worth failing an otherwise good write over.
    channel = null;
  }
}

// Subscribe to "something in the library changed", from this tab or another
// one. Returns the unsubscribe function, shaped for a useEffect cleanup. Not
// part of the CRUD surface — useImageLibrary() is the intended caller.
export function subscribe(listener) {
  const notify = () => listener();
  window.addEventListener(SYNC_EVENT, notify);

  const bus = syncChannel();
  if (bus) bus.addEventListener('message', notify);

  return () => {
    window.removeEventListener(SYNC_EVENT, notify);
    if (bus) bus.removeEventListener('message', notify);
    // The channel itself is left open: it is shared by every subscriber in
    // the tab, and closing it here would silence the others.
  };
}

// Everything but the blob. Built field by field rather than by destructuring
// the rest, so what the picker receives is written down in one visible place.
function toMeta(record) {
  return {
    id: record.id,
    name: record.name,
    mime: record.mime,
    width: record.width,
    height: record.height,
    size: record.size,
    createdAt: record.createdAt,
  };
}

// The same id shape create() uses in usePosts, so an id stays recognisable as
// one of ours wherever it turns up.
function newId() {
  return `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// Newest first, blobs left in the database. Rejects rather than returning an
// empty list when the store cannot be opened, so the caller can tell "no
// pictures yet" from "this browser will not store pictures".
export function list() {
  return runTransaction('readonly', (store, done) => {
    const items = [];
    const request = store.index(CREATED_INDEX).openCursor(null, 'prev');
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        done(items);
        return;
      }
      items.push(toMeta(cursor.value));
      cursor.continue();
    };
  });
}

// The full record including the blob, or null when there is no such picture.
// A value that is not a library id — a legacy URL that reached this by
// mistake — resolves to null rather than going to the database for it.
export function get(id) {
  if (!isLibraryId(id)) return Promise.resolve(null);
  return runTransaction('readonly', (store, done) => {
    const request = store.get(id);
    request.onsuccess = () => done(request.result || null);
  });
}

// Downscale, then store. Resolves with the metadata record — no blob, same
// shape list() returns — so the picker can show the new picture's dimensions
// and size straight away.
//
// A failure rejects, always, with one of the codes documented above. This is
// the one place where swallowing an error would be genuinely harmful: a
// picture that silently did not save looks exactly like one that did until
// the visitor reloads and finds it gone.
export function add(file) {
  return downscale(file).then((image) => {
    const record = {
      id: newId(),
      name: typeof file.name === 'string' && file.name ? file.name : 'picture',
      mime: image.mime,
      width: image.width,
      height: image.height,
      // The size of what was actually stored, not of what the visitor picked.
      // The picker shows this, and showing the original size would be a lie
      // about how much room the library is using.
      size: image.blob.size,
      createdAt: new Date().toISOString(),
      blob: image.blob,
    };

    return runTransaction('readwrite', (store, done) => {
      store.add(record);
      done(toMeta(record));
    }).then((meta) => {
      announce();
      return meta;
    });
  });
}

// The picker's upload control takes several files at once, so it gets its own
// entrance rather than add() growing a second shape. Two things worth knowing:
//
//   - It adds them one at a time, not in parallel. Ten photographs racing each
//     other into a full store produce ten quota errors and an unpredictable
//     number of survivors; one at a time, the failure is where the room ran
//     out and everything before it is safely stored.
//   - It does not reject. It resolves with { added, failed }, where `added`
//     holds metadata records and `failed` holds { name, code, error } — one
//     unreadable file out of ten must not cost the visitor the other nine.
//     Callers that add a single file should use add(), which does reject.
export function addMany(files) {
  const chosen = Array.from(files || []);

  return chosen.reduce(
    (chain, file) =>
      chain.then((outcome) =>
        add(file).then(
          (meta) => {
            outcome.added.push(meta);
            return outcome;
          },
          (error) => {
            outcome.failed.push({
              name: (file && file.name) || 'picture',
              code: (error && error.code) || IMAGE_ERROR_CODES.FAILED,
              error,
            });
            return outcome;
          },
        ),
      ),
    Promise.resolve({ added: [], failed: [] }),
  );
}

// Deleting a key that is not there is not an error in IndexedDB and is not
// one here either: removing a picture twice resolves both times.
export function remove(id) {
  return runTransaction('readwrite', (store, done) => {
    store.delete(id);
    done(undefined);
  }).then(() => {
    announce();
  });
}

// What the library is costing the visitor: { count, bytes, quota }. `bytes` is
// the sum of the stored sizes, and `quota` is the browser's own estimate of
// how much this origin may use, or null where the browser will not say — so
// the UI has to be written to survive not knowing.
export function usage() {
  return runTransaction('readonly', (store, done) => {
    let count = 0;
    let bytes = 0;
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        done({ count, bytes });
        return;
      }
      count += 1;
      bytes += Number(cursor.value && cursor.value.size) || 0;
      cursor.continue();
    };
  }).then((totals) => estimateQuota().then((quota) => ({ ...totals, quota })));
}

function estimateQuota() {
  if (
    typeof navigator === 'undefined' ||
    !navigator.storage ||
    typeof navigator.storage.estimate !== 'function'
  ) {
    return Promise.resolve(null);
  }
  return navigator.storage.estimate().then(
    (estimate) => (estimate && typeof estimate.quota === 'number' ? estimate.quota : null),
    () => null,
  );
}
