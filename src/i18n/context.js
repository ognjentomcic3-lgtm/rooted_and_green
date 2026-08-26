import { createContext, useContext } from 'react';
import {
  DEFAULT_LANG,
  formatDate,
  hasMessage,
  localeOf,
  translate,
} from './core.js';

// One place builds the context value, so the fallback used outside a provider
// behaves exactly like the real thing (just without a working setLang).
export function buildI18n(lang, setLang) {
  const locale = localeOf(lang);
  return {
    lang,
    locale,
    setLang,
    t: (key, values) => translate(lang, key, values),
    // Categories are stored as stable keys; unknown keys (hand-authored posts)
    // fall back to the raw key rather than showing "category.foo".
    categoryLabel: (key) =>
      hasMessage(lang, `category.${key}`)
        ? translate(lang, `category.${key}`)
        : String(key ?? ''),
    formatDate: (iso, style) => formatDate(iso, locale, style),
  };
}

export const I18nContext = createContext(buildI18n(DEFAULT_LANG, () => {}));

export function useI18n() {
  return useContext(I18nContext);
}
