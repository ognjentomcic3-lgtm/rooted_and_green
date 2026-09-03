import { useCallback, useEffect, useRef, useState } from 'react';
import * as imageStore from '../images/imageStore.js';

// The React face of the picture library. usePosts and useTestimonials both
// hand back a list plus the verbs that change it, and this keeps to that shape
// so the codebase has one idiom rather than three. The two differences are
// forced by IndexedDB rather than chosen: reading is asynchronous, so there is
// a `loading` flag, and opening the database can fail outright, so there is an
// `error`.
export function useImageLibrary() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // A read that resolves after the component has gone would otherwise set
  // state on nothing. The picker is a dialog people open and close quickly,
  // so this is a normal path, not a rare one.
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Never rejects. A browser with IndexedDB blocked has to leave this hook in
  // a state a component can render — an empty list, `loading` false, and an
  // error carrying a code the UI can turn into a sentence — rather than a
  // spinner that spins forever or a throw during render.
  const refresh = useCallback(
    () =>
      imageStore.list().then(
        (items) => {
          if (mounted.current) {
            setImages(items);
            setError(null);
            setLoading(false);
          }
          return items;
        },
        (failure) => {
          if (mounted.current) {
            setImages([]);
            setError(failure);
            setLoading(false);
          }
          return [];
        },
      ),
    [],
  );

  // The first read, and then every write from anywhere — this tab or another
  // one. subscribe() returns its own unsubscribe, which is exactly what a
  // cleanup wants.
  useEffect(() => {
    refresh();
    return imageStore.subscribe(refresh);
  }, [refresh]);

  // These three deliberately pass their rejection on to the caller instead of
  // parking it in `error`. A failed add is about the file the person just
  // picked and belongs next to the control they picked it with, whereas
  // `error` is about the library as a whole. The refresh after a successful
  // write is not needed here: the store announces it, synchronously, and the
  // subscription above has already run by the time these resolve.
  const add = useCallback((file) => imageStore.add(file), []);
  const addMany = useCallback((files) => imageStore.addMany(files), []);
  const remove = useCallback((id) => imageStore.remove(id), []);

  return {
    images,
    loading,
    error,
    add,
    addMany,
    remove,
    refresh,
  };
}

// One picture, ready to put in a `src`. Returns null until there is something
// to show, so a caller renders a placeholder rather than an <img> pointed at
// nothing.
//
// It takes either a library id or a plain URL, because the fields that hold a
// picture — a project's cover, a reference's portrait — hold whichever the
// person chose, and a stored picsum.photos URL from before the library existed
// has to keep working. A URL comes straight back out unchanged: there is no
// object URL involved and nothing to revoke. Telling the two apart is
// isLibraryId()'s single job, and this hook is the only place a component
// should need to think about the difference.
//
// The reason this exists at all is the revoke. An object URL pins the blob
// behind it in memory until someone calls revokeObjectURL, and a gallery that
// mints one per render and never revokes leaks every picture it has ever
// drawn until the tab is closed. Owning that lifecycle here means no caller
// can forget it.
export function useImageUrl(idOrUrl) {
  const [url, setUrl] = useState(() =>
    imageStore.isLibraryId(idOrUrl) ? null : idOrUrl || null,
  );

  useEffect(() => {
    if (!imageStore.isLibraryId(idOrUrl)) {
      setUrl(idOrUrl || null);
      return undefined;
    }

    // Clear first. Without this, changing from one library picture to the
    // next would leave the old URL in the `src` for a frame after the cleanup
    // below revoked it, which draws as a broken image.
    setUrl(null);

    let objectUrl = null;
    let cancelled = false;

    imageStore.get(idOrUrl).then(
      (record) => {
        if (cancelled || !record || !record.blob) return;
        objectUrl = URL.createObjectURL(record.blob);
        setUrl(objectUrl);
      },
      () => {
        // A picture that cannot be read stays null and the caller keeps
        // showing its placeholder. The library-wide failure — no IndexedDB at
        // all — is useImageLibrary()'s to report; repeating it once per
        // thumbnail would not help anybody.
      },
    );

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [idOrUrl]);

  return url;
}
