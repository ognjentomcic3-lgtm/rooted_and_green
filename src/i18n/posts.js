// Post shape helpers. A post carries language-neutral fields (slug, coverImage,
// category key, author, date) plus per-language copy under `i18n`:
//   { id, slug, coverImage, category, author, date,
//     i18n: { sr: { title, excerpt, content }, en: { … } } }
import { DEFAULT_LANG, LANG_CODES } from './core.js';

const COPY_FIELDS = ['title', 'excerpt', 'content'];

export function emptyBundle() {
  return { title: '', excerpt: '', content: '' };
}

export function emptyBundles() {
  return Object.fromEntries(LANG_CODES.map((code) => [code, emptyBundle()]));
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

// -------------------- Legacy migration --------------------

// Categories used to be English display strings; they are stable keys now.
const LEGACY_CATEGORIES = {
  design: 'design',
  planting: 'planting',
  maintenance: 'maintenance',
  sustainability: 'sustainability',
  seasonal: 'seasonal',
  dizajn: 'design',
  sadnja: 'planting',
  održavanje: 'maintenance',
  održivost: 'sustainability',
  sezonski: 'seasonal',
};

export function normalizeCategory(category) {
  if (!category) return '';
  const key = LEGACY_CATEGORIES[String(category).toLowerCase()];
  return key || category;
}

function hasBundles(post) {
  return (
    post.i18n &&
    typeof post.i18n === 'object' &&
    LANG_CODES.some((code) => post.i18n[code])
  );
}

// Returns the same object reference when nothing needed changing, so callers
// can cheaply tell whether the store must be rewritten.
export function migratePost(post) {
  if (!post || typeof post !== 'object') return post;

  const category = normalizeCategory(post.category);
  const alreadyMigrated = hasBundles(post);

  if (alreadyMigrated && category === post.category) return post;

  if (alreadyMigrated) return { ...post, category };

  // Pre-i18n post: its copy is English (the site shipped English-only), so that
  // is where it lands. Serbian readers see it through the fallback chain until
  // an admin adds a translation — nobody loses a post.
  const { title, excerpt, content, ...rest } = post;
  return {
    ...rest,
    category,
    i18n: {
      en: {
        title: title || '',
        excerpt: excerpt || '',
        content: content || '',
      },
    },
  };
}

export function migratePosts(posts) {
  return posts.map(migratePost);
}

export function postsChanged(before, after) {
  return after.some((post, i) => post !== before[i]);
}
