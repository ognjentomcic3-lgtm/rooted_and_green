// Post shape helpers. A post carries language-neutral fields (slug,
// coverImageId, date, featured), its per-language copy under `i18n`, and its
// body as an ordered list of `blocks`:
//   { id, slug, coverImageId, date, featured,
//     i18n: { sr: { title, excerpt }, en: { … } },
//     blocks: [ { id, type: 'text', i18n: { sr: { text }, en: { text } } },
//               { id, type: 'images', imageIds: ['img-…', 'img-…'] } ] }
//
// The block list is language-neutral on purpose: both languages get the same
// structure in the same order, and a gallery is stored once instead of being
// duplicated per language. Only the words inside a text block are translated,
// which is why a text block carries its own little `i18n` bundle and an images
// block carries none.
import { DEFAULT_LANG, LANG_CODES } from './core.js';

// Copy that lives per language on the post itself. The body used to be here as
// `content`; it lives in the block list now.
const COPY_FIELDS = ['title', 'excerpt'];

export function emptyBundle() {
  return { title: '', excerpt: '' };
}

export function emptyBundles() {
  return Object.fromEntries(LANG_CODES.map((code) => [code, emptyBundle()]));
}

// The bundle a text block carries — the same idea as emptyBundle(), one level
// down, holding the one field a block's copy actually has.
function emptyTextBlockBundles() {
  return Object.fromEntries(LANG_CODES.map((code) => [code, { text: '' }]));
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim() !== '';
}

// requested language → the default language → any other language → legacy flat
// fields. Resolved per field, so a half-translated post still renders.
function fallbackChain(lang) {
  return [...new Set([lang, DEFAULT_LANG, ...LANG_CODES])];
}

export function localizePost(post, lang) {
  if (!post) return null;

  const bundles = post.i18n || {};
  const chain = fallbackChain(lang);
  const resolved = {};
  let resolvedLang = lang;

  for (const field of COPY_FIELDS) {
    let value = '';
    for (const code of chain) {
      const candidate = bundles[code] && bundles[code][field];
      if (nonEmpty(candidate)) {
        value = candidate;
        if (field === 'title') resolvedLang = code;
        break;
      }
    }
    // Last resort: a post still in the pre-i18n flat shape.
    resolved[field] = nonEmpty(value) ? value : post[field] || '';
  }

  return { ...post, ...resolved, resolvedLang };
}

// The words of one text block, resolved the same way the post's own copy is —
// requested language first, then the default, then any other translation.
export function localizeBlock(block, lang) {
  if (!block || block.type !== 'text') return '';
  const bundles = block.i18n || {};
  for (const code of fallbackChain(lang)) {
    const candidate = bundles[code] && bundles[code].text;
    if (nonEmpty(candidate)) return candidate;
  }
  return '';
}

// Title a derived slug is built from — the default language wins, then any
// other translation, then a legacy flat title.
export function slugSourceTitle(post) {
  const bundles = post.i18n || {};
  for (const code of fallbackChain(DEFAULT_LANG)) {
    const title = bundles[code] && bundles[code].title;
    if (nonEmpty(title)) return title;
  }
  return post.title || '';
}

// -------------------- Picture references --------------------

// `coverImageId` and an images block's `imageIds` both name a picture in the
// library. The seeds cannot: a fresh browser has no library yet, so they point
// at plain picsum.photos URLs instead. Rather than carry two fields that mean
// almost the same thing, the one field holds either. Without this note the
// mixed field reads like a bug later.
//
// The test that tells the two apart is isLibraryId(), in
// src/images/imageStore.js. It lives beside the ids it recognises, and every
// caller that needs it is already importing useImageUrl() from that layer, so
// there is no second copy of the rule here to drift out of step.

// -------------------- Blocks --------------------

// Ids for blocks created at runtime follow the same pattern create() uses for
// posts, in src/hooks/usePosts.js.
function runtimeBlockId() {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// A fresh, empty block of each kind. Exported so the block editor does not have
// to re-derive the shape — there is one place that knows what a block is.
export function newTextBlock() {
  return { id: runtimeBlockId(), type: 'text', i18n: emptyTextBlockBundles() };
}

export function newImagesBlock() {
  return { id: runtimeBlockId(), type: 'images', imageIds: [] };
}

// -------------------- Pure list operations --------------------
//
// The block editor is the only caller today, but these live here rather than
// in the component because this file is already the one place that knows what
// a block is — newTextBlock() and localizeBlock() are its neighbours. Keeping
// them out of the component also means they can be exercised on their own,
// without a browser, which is how the same-reference guarantees below were
// actually checked.
//
// Every operation below takes the current list and returns a brand-new one,
// with brand-new objects along the path that changed and the untouched blocks
// left at their original references. The form holds `blocks` in state and
// compares by reference, so mutating the incoming array would leave the form
// showing stale content — React would see the same array and skip the render.

// One block replaced, every other block kept by reference.
function replaceAt(list, index, next) {
  return list.map((item, i) => (i === index ? next : item));
}

// Move one item to another index. Written without splice so nothing is ever
// mutated, not even a local copy — the rule is easier to keep when there is no
// mutating call anywhere in the file to copy by accident. A move that would
// fall off either end is a no-op and hands the same list straight back.
function moveWithin(list, from, to) {
  if (to < 0 || to >= list.length || from === to) return list;
  const moved = list[from];
  const rest = list.filter((_, i) => i !== from);
  return [...rest.slice(0, to), moved, ...rest.slice(to)];
}

export function addBlock(blocks, block) {
  return [...blocks, block];
}

export function removeBlock(blocks, index) {
  return blocks.filter((_, i) => i !== index);
}

export function moveBlock(blocks, from, to) {
  return moveWithin(blocks, from, to);
}

// Writes the active language and nothing else. The other languages come across
// by reference inside the spread of `block.i18n`, so writing Serbian cannot
// disturb a word of the English translation — which is the whole point of a
// per-block bundle, and the easiest thing here to get subtly wrong.
export function setBlockText(blocks, index, lang, text) {
  const block = blocks[index];
  if (!block || block.type !== 'text') return blocks;
  return replaceAt(blocks, index, {
    ...block,
    i18n: {
      ...block.i18n,
      [lang]: { ...(block.i18n && block.i18n[lang]), text },
    },
  });
}

// A picture already in this block is refused rather than added twice. Two
// copies of one photograph in one gallery is a slip of the hand every time,
// and letting it through would also put two identical keys in the thumbnail
// list, which is how a reorder starts redrawing the wrong picture.
export function addPicture(blocks, index, idOrUrl) {
  const block = blocks[index];
  if (!block || block.type !== 'images' || !idOrUrl) return blocks;
  const imageIds = block.imageIds || [];
  if (imageIds.includes(idOrUrl)) return blocks;
  return replaceAt(blocks, index, {
    ...block,
    imageIds: [...imageIds, idOrUrl],
  });
}

export function removePicture(blocks, index, pictureIndex) {
  const block = blocks[index];
  if (!block || block.type !== 'images') return blocks;
  const imageIds = block.imageIds || [];
  if (pictureIndex < 0 || pictureIndex >= imageIds.length) return blocks;
  return replaceAt(blocks, index, {
    ...block,
    imageIds: imageIds.filter((_, i) => i !== pictureIndex),
  });
}

export function movePicture(blocks, index, from, to) {
  const block = blocks[index];
  if (!block || block.type !== 'images') return blocks;
  const imageIds = block.imageIds || [];
  const moved = moveWithin(imageIds, from, to);
  // moveWithin hands the same array back when the move would fall off an end.
  // Passing that on unchanged keeps the whole list at its original reference,
  // so a disabled button that somehow fires costs the form nothing.
  if (moved === imageIds) return blocks;
  return replaceAt(blocks, index, { ...block, imageIds: moved });
}

// Migrated blocks must NOT use runtimeBlockId(). migratePost() runs on every
// read of the store, and an id minted from Date.now() and Math.random() would
// make it hand back a different object every time — which would break the
// same-reference contract postsChanged() below depends on and rewrite
// localStorage forever. Deriving the id from the post makes the migration a
// pure function of its input. Seed blocks are hardcoded for the same reason.
function migratedBlockId(post, position) {
  return `${post.id || 'post'}-block-${position}`;
}

// -------------------- Legacy migration --------------------

function hasBundles(post) {
  return (
    post.i18n &&
    typeof post.i18n === 'object' &&
    LANG_CODES.some((code) => post.i18n[code])
  );
}

// Is this post already in the v2 shape, exactly as migratePost() leaves it?
// The check has to be exhaustive in both directions: miss a condition and a
// stale post is handed back unmigrated, over-check and every read decides a
// perfectly good post needs rewriting. So it names every field the migration
// adds and every field it removes — including `content` inside the bundles,
// which is the one that is easy to forget because it is not on the post itself.
function isMigrated(post) {
  if (!Array.isArray(post.blocks)) return false;
  if (!hasBundles(post)) return false;
  if (!('coverImageId' in post)) return false;
  // Fields v2 drops. `title`/`excerpt`/`content` at the top level are the
  // pre-i18n flat shape; `coverImage`, `category` and `author` are v1.
  if ('coverImage' in post) return false;
  if ('category' in post) return false;
  if ('author' in post) return false;
  if ('title' in post) return false;
  if ('excerpt' in post) return false;
  if ('content' in post) return false;
  return LANG_CODES.every((code) => {
    const bundle = post.i18n[code];
    return !bundle || !('content' in bundle);
  });
}

// Returns the same object reference when nothing needed changing, so callers
// can cheaply tell whether the store must be rewritten.
export function migratePost(post) {
  if (!post || typeof post !== 'object') return post;
  if (isMigrated(post)) return post;

  const {
    title,
    excerpt,
    content,
    coverImage,
    // Named only so the rest spread leaves them behind: v2 has no category and
    // no author, and a stored post must not keep carrying them.
    category: _category,
    author: _author,
    i18n,
    blocks,
    ...rest
  } = post;

  const bundles = i18n && typeof i18n === 'object' ? i18n : {};
  const nextBundles = {};
  const bodyBundles = {};

  // Every language's body copy moves into one text block, and the bundles keep
  // whatever else they held. Nothing a visitor wrote is dropped: five written
  // projects come back with five bodies, one block each.
  for (const code of Object.keys(bundles)) {
    const bundle = bundles[code];
    if (!bundle || typeof bundle !== 'object') continue;
    const { content: body, ...copy } = bundle;
    nextBundles[code] = copy;
    if (nonEmpty(body)) bodyBundles[code] = { text: body };
  }

  // Pre-i18n post: its copy sat flat on the object and was English (the site
  // shipped English-only), so that is where it lands. Serbian readers see it
  // through the fallback chain until an admin adds a translation — nobody
  // loses a post. A post that already has bundles keeps them; the flat fields
  // are only ever a fallback for what the bundles do not already say.
  if (!nextBundles.en && (nonEmpty(title) || nonEmpty(excerpt))) {
    nextBundles.en = { title: title || '', excerpt: excerpt || '' };
  }
  if (!bodyBundles.en && nonEmpty(content)) {
    bodyBundles.en = { text: content };
  }

  // An existing block list is kept as it is and the recovered body is appended,
  // so a half-migrated post cannot lose either half.
  const existingBlocks = Array.isArray(blocks) ? blocks : [];
  const nextBlocks =
    Object.keys(bodyBundles).length > 0
      ? [
          ...existingBlocks,
          {
            id: migratedBlockId(post, existingBlocks.length + 1),
            type: 'text',
            i18n: bodyBundles,
          },
        ]
      : existingBlocks;

  return {
    ...rest,
    // Either a library id or a plain URL — see the note above.
    coverImageId: 'coverImageId' in post ? post.coverImageId : coverImage || '',
    i18n: nextBundles,
    blocks: nextBlocks,
  };
}

export function migratePosts(posts) {
  return posts.map(migratePost);
}

export function postsChanged(before, after) {
  return after.some((post, i) => post !== before[i]);
}
