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

    // Browsers from before the i18n release hold posts in the flat shape
    // (title/excerpt/content at the top level, category as a display string).
    // Upgrade them in place so nobody loses a post or lands on a blank site.
    // The same pass fills in `featured` for anything stored before the admin's
    // checkbox existed — an older store gets the field, not a wipe.
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
    const newPost = {
      ...data,
      id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      slug: data.slug ? slugify(data.slug) : slugify(slugSourceTitle(data)),
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
            slug: data.slug ? slugify(data.slug) : p.slug,
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
