// Dependency-free i18n core: message lookup with a fallback chain, {named}
// interpolation, and CLDR plural selection via Intl.PluralRules.
import sr from './messages/sr.js';
import en from './messages/en.js';

// Endonyms are never translated — a language is always named in its own words.
export const LANGUAGES = [
  { code: 'sr', locale: 'sr-Latn-RS', name: 'Srpski', short: 'SR' },
  { code: 'en', locale: 'en-GB', name: 'English', short: 'EN' },
];

export const DEFAULT_LANG = 'sr';
export const LANG_CODES = LANGUAGES.map((l) => l.code);
export const LANG_STORAGE_KEY = 'rooted-and-green:lang';

const MESSAGES = { sr, en };

export function localeOf(lang) {
  const entry = LANGUAGES.find((l) => l.code === lang);
  return entry ? entry.locale : LANGUAGES[0].locale;
}

export function isLang(value) {
  return LANG_CODES.includes(value);
}

// Serbian is the unconditional default; only an explicit stored choice overrides
// it. We deliberately do not sniff navigator.language.
export function readStoredLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return isLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function storeLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Private mode or a full quota — the in-memory choice still applies.
  }
}

// -------------------- Plurals --------------------

const pluralRulesCache = new Map();

function pluralCategory(locale, count) {
  let rules = pluralRulesCache.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRulesCache.set(locale, rules);
  }
  return rules.select(count);
}

// -------------------- Lookup & formatting --------------------

// requested language → the other language → the key itself.
function lookup(lang, key) {
  const chain = [lang, ...LANG_CODES.filter((c) => c !== lang)];
  for (const code of chain) {
    const message = MESSAGES[code] && MESSAGES[code][key];
    if (message !== undefined) return message;
  }
  return undefined;
}

export function hasMessage(lang, key) {
  return lookup(lang, key) !== undefined;
}

function interpolate(template, values) {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in values ? String(values[name]) : match,
  );
}

export function translate(lang, key, values) {
  const message = lookup(lang, key);

  if (message === undefined) {
    if (import.meta.env?.DEV) {
      console.warn(`[i18n] Missing message for key "${key}" (${lang}).`);
    }
    return key;
  }

  // Plural message: pick the CLDR category for `count`, with `other` as the
  // guaranteed fallback (Serbian one/few/other, English one/other).
  if (typeof message === 'object') {
    const count = values && values.count;
    if (typeof count !== 'number') {
      if (import.meta.env?.DEV) {
        console.warn(`[i18n] Key "${key}" is plural but got no numeric count.`);
      }
      return interpolate(message.other || key, values);
    }
    const category = pluralCategory(localeOf(lang), count);
    const form = message[category] ?? message.other;
    return interpolate(form, values);
  }

  return interpolate(message, values);
}

// -------------------- Dates --------------------

const dateFormatCache = new Map();

// `style` mirrors the two shapes the site already used: 'short' on cards and
// admin rows, 'long' on the article page.
export function formatDate(iso, locale, style = 'short') {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const cacheKey = `${locale}:${style}`;
  let formatter = dateFormatCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: style === 'long' ? 'long' : 'short',
      year: 'numeric',
    });
    dateFormatCache.set(cacheKey, formatter);
  }
  return formatter.format(date);
}

// -------------------- Diacritic folding --------------------

// Lowercases and strips diacritics, for search ("odrzavanje" should find
// "održavanje") and for ASCII-safe slugs. đ/Đ has no canonical decomposition
// under NFD, so it is mapped explicitly.
export function foldDiacritics(text, locale) {
  return String(text)
    .toLocaleLowerCase(locale)
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// -------------------- Dev-time catalogue check --------------------

if (import.meta.env?.DEV) {
  const [a, b] = LANG_CODES;
  const keysA = Object.keys(MESSAGES[a]);
  const keysB = Object.keys(MESSAGES[b]);
  const missingInB = keysA.filter((k) => !(k in MESSAGES[b]));
  const missingInA = keysB.filter((k) => !(k in MESSAGES[a]));
  const shapeMismatch = keysA.filter(
    (k) =>
      k in MESSAGES[b] &&
      typeof MESSAGES[a][k] !== typeof MESSAGES[b][k],
  );

  if (missingInA.length || missingInB.length || shapeMismatch.length) {
    console.warn('[i18n] Translation catalogues are out of sync:', {
      [`missing in ${b}`]: missingInB,
      [`missing in ${a}`]: missingInA,
      'plural/string mismatch': shapeMismatch,
    });
  }
}
