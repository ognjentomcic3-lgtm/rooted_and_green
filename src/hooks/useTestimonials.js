import { useCallback, useEffect, useState } from 'react';
import { testimonials as seedTestimonials } from '../data/testimonialsData.js';

// References used to live only as a static array compiled into the bundle, so
// nothing could edit them. They sit in localStorage now, beside the projects,
// under a key of their own. This one is new — no browser has an older shape of
// it stored — so unlike usePosts there is no legacy migration to run here.
const STORAGE_KEY = 'rooted-and-green:testimonials';

// The same pairing usePosts uses: an in-tab event so every mounted
// useTestimonials() sees a write immediately, and a `storage` listener below
// so a second open tab does too.
const SYNC_EVENT = 'rooted-and-green:testimonials-changed';

// How many references may sit on the landing page at once. Exported so a list
// can show the "n / 3" counter without hardcoding the same number twice.
export const MAX_FEATURED = 3;

// A reference stored before the flag existed carries no `featured` field. Read
// it as "not on the landing page" rather than leaving it undefined, so counting
// the featured ones is a plain filter. Returns the very same object when there
// was nothing to change, which is what lets the rewrite check below be a cheap
// reference comparison — the contract migratePost() keeps for posts.
function withFeatured(testimonial) {
  if (!testimonial || typeof testimonial !== 'object') return testimonial;
  if (typeof testimonial.featured === 'boolean') return testimonial;
  return { ...testimonial, featured: Boolean(testimonial.featured) };
}

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTestimonials));
      return seedTestimonials;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedTestimonials;

    const normalized = parsed.map(withFeatured);
    if (normalized.some((item, i) => item !== parsed[i])) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return seedTestimonials;
  }
}

function writeStore(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function useTestimonials() {
  const [items, setItems] = useState(() => readStore());

  // Keep this instance in sync with writes from anywhere else.
  useEffect(() => {
    const refresh = () => setItems(readStore());
    window.addEventListener(SYNC_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(SYNC_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // A reference has no date to sort on, so stored order is the order — which
  // starts out as the order the seed array is written in, and is therefore the
  // order the landing page has always shown them in.
  const getAll = useCallback(() => [...items], [items]);

  const getById = useCallback(
    (id) => items.find((item) => item.id === id) || null,
    [items],
  );

  const create = useCallback((data) => {
    const current = readStore();
    const newTestimonial = {
      ...data,
      id: `testimonial-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      // A new reference starts off the landing page. Putting it on goes
      // through setFeatured(), which is the only place the cap is checked.
      featured: false,
    };
    const next = [newTestimonial, ...current];
    writeStore(next);
    setItems(next);
    return newTestimonial;
  }, []);

  const update = useCallback((id, data) => {
    const current = readStore();
    const next = current.map((item) =>
      item.id === id
        ? {
            ...item,
            ...data,
            // Editing the quote is not how a reference gets onto the landing
            // page; setFeatured() is. Keeping the stored flag here means a
            // form that round-trips the whole object cannot walk past the cap.
            featured: Boolean(item.featured),
          }
        : item,
    );
    writeStore(next);
    setItems(next);
  }, []);

  const remove = useCallback((id) => {
    const current = readStore();
    const next = current.filter((item) => item.id !== id);
    writeStore(next);
    setItems(next);
  }, []);

  // Turning one off always works. Turning a fourth one on does not: it returns
  // false and writes nothing. A checkbox that disables itself is a courtesy to
  // whoever is looking at it, not a rule — the rule has to live here.
  const setFeatured = useCallback((id, next) => {
    const current = readStore();
    const target = current.find((item) => item.id === id);
    if (!target) return false;

    const wanted = Boolean(next);
    if (wanted && !target.featured) {
      const count = current.filter((item) => item.featured).length;
      if (count >= MAX_FEATURED) return false;
    }

    const updated = current.map((item) =>
      item.id === id ? { ...item, featured: wanted } : item,
    );
    writeStore(updated);
    setItems(updated);
    return true;
  }, []);

  return {
    testimonials: items,
    getAll,
    getById,
    create,
    update,
    remove,
    setFeatured,
  };
}
