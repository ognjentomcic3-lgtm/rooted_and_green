import { useCallback, useEffect, useState } from 'react';
import { seedPosts } from '../data/seedData.js';

const STORAGE_KEY = 'rooted-and-green:posts';

// A simple event so every mounted usePosts() stays in sync within the tab,
// and a `storage` listener keeps other tabs in sync too.
const SYNC_EVENT = 'rooted-and-green:posts-changed';

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
      return seedPosts;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedPosts;
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

export function slugify(text) {
  return String(text)
    .toLowerCase()
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
      slug: data.slug ? slugify(data.slug) : slugify(data.title),
      date: data.date || new Date().toISOString().slice(0, 10),
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

  return { posts: sortByDateDesc(posts), getAll, getBySlug, create, update, remove };
}
