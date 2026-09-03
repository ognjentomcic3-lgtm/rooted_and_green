import { useCallback, useEffect, useState } from 'react';
import { seedPosts } from '../data/seedData.js';
import { DEFAULT_LANG, foldDiacritics, localeOf } from '../i18n/core.js';
import { migratePosts, postsChanged, slugSourceTitle } from '../i18n/posts.js';

const DEFAULT_LOCALE = localeOf(DEFAULT_LANG);

// The key predates both the rename to Malina Garden and the one that turned
// the blog into Projects, and it stays as it is on purpose: it is where a
// visitor's browser already keeps their entries, so renaming it would silently
// orphan every one of them. The sync event below pairs with it.
const STORAGE_KEY = 'rooted-and-green:posts';

// A simple event so every mounted usePosts() stays in sync within the tab,
// and a `storage` listener keeps other tabs in sync too.
const SYNC_EVENT = 'rooted-and-green:posts-changed';

// How many projects may sit on the landing page at once. Exported so a list can
// show the "n / 3" counter without hardcoding the same number twice.
export const MAX_FEATURED = 3;

// A project stored before the admin's checkbox existed carries no `featured`
// field. Read it as "not on the landing page" rather than leaving it undefined,
// so counting the featured ones is a plain filter. Returns the very same object
// when there was nothing to change — the contract migratePost() already keeps,
// and what lets postsChanged() below stay a reference comparison.
function withFeatured(post) {
  if (!post || typeof post !== 'object') return post;
  if (typeof post.featured === 'boolean') return post;
  return { ...post, featured: Boolean(post.featured) };
}

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
      return seedPosts;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedPosts;

    // Older browsers hold posts in older shapes: the pre-i18n flat one
    // (title/excerpt/content at the top level) and the v1 one (category,
    // author, a `content` string per language). migratePost() upgrades both in
    // place — the body text lands in a text block, so nobody loses a word.
    // The same pass fills in `featured` for anything stored before the admin's
    // checkbox existed — an older store gets the field, not a wipe. Both
    // helpers hand back the very same object when there was nothing to change,
    // which is what makes the write below happen once rather than every read.
    const migrated = migratePosts(parsed).map(withFeatured);
    if (postsChanged(parsed, migrated)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    return seedPosts;
  }
}

function writeStore(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event(SYNC_EVENT));
}

function sortByDateDesc(posts) {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Diacritics are folded first so Serbian titles still produce readable,
// ASCII-safe URLs ("Vodič kroz rezidbu" → "vodic-kroz-rezidbu").
export function slugify(text) {
  return foldDiacritics(text, DEFAULT_LOCALE)
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// The URL is derived from the default-language title and from nothing else —
// there is no custom-slug field any more, so this is the single source. Two
// projects may legitimately be called the same thing, and the second one must
// not quietly take over the first one's URL, so a slug that is already spoken
// for picks up a `-2`, `-3`, and so on. `selfId` is the project being saved, so
// re-saving one does not find itself in the way. An untitled project falls back
// to its own id, which is unique and already URL-safe.
function uniqueSlug(posts, post, selfId) {
  const base = slugify(slugSourceTitle(post)) || selfId;
  const taken = new Set(
    posts.filter((p) => p.id !== selfId).map((p) => p.slug),
  );
  if (!taken.has(base)) return base;

  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export function usePosts() {
  const [posts, setPosts] = useState(() => readStore());

  // Keep this instance in sync with writes from anywhere else.
  useEffect(() => {
    const refresh = () => setPosts(readStore());
    window.addEventListener(SYNC_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(SYNC_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const getAll = useCallback(() => sortByDateDesc(posts), [posts]);

  const getBySlug = useCallback(
    (slug) => posts.find((p) => p.slug === slug) || null,
    [posts],
  );

  const create = useCallback((data) => {
    const current = readStore();
    const id = `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newPost = {
      ...data,
      id,
      // After the spread on purpose: whatever `data` carries as a slug is
      // ignored, because the title is the only source of a URL.
      slug: uniqueSlug(current, data, id),
      date: data.date || new Date().toISOString().slice(0, 10),
      // A new project starts off the landing page. Putting it on goes through
      // setFeatured(), which is the only place the cap is checked.
      featured: false,
    };
    const next = [newPost, ...current];
    writeStore(next);
    setPosts(next);
    return newPost;
  }, []);

  const update = useCallback((id, data) => {
    const current = readStore();
    const next = current.map((p) =>
      p.id === id
        ? {
            ...p,
            ...data,
            // Re-derived from the title every save, through the same helper
            // create() uses, so renaming a project moves its URL and a title
            // borrowed from another project still gets its own.
            slug: uniqueSlug(current, { ...p, ...data }, id),
            // Editing a project is not how it gets onto the landing page;
            // setFeatured() is. Keeping the stored flag here means a form that
            // round-trips the whole post cannot walk past the cap.
            featured: Boolean(p.featured),
          }
        : p,
    );
    writeStore(next);
    setPosts(next);
  }, []);

  const remove = useCallback((id) => {
    const current = readStore();
    const next = current.filter((p) => p.id !== id);
    writeStore(next);
    setPosts(next);
  }, []);

  // Turning one off always works. Turning a fourth one on does not: it returns
  // false and writes nothing. A checkbox that disables itself is a courtesy to
  // whoever is looking at it, not a rule — the rule has to live here.
  const setFeatured = useCallback((id, next) => {
    const current = readStore();
    const target = current.find((p) => p.id === id);
    if (!target) return false;

    const wanted = Boolean(next);
    if (wanted && !target.featured) {
      const count = current.filter((p) => p.featured).length;
      if (count >= MAX_FEATURED) return false;
    }

    const updated = current.map((p) =>
      p.id === id ? { ...p, featured: wanted } : p,
    );
    writeStore(updated);
    setPosts(updated);
    return true;
  }, []);

  return {
    posts: sortByDateDesc(posts),
    getAll,
    getBySlug,
    create,
    update,
    remove,
    setFeatured,
  };
}
