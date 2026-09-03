import { createContext, useContext } from 'react';
import { DEFAULT_LANG, formatDate, localeOf, translate } from './core.js';

// One place builds the context value, so the fallback used outside a provider
// behaves exactly like the real thing (just without a working setLang).
export function buildI18n(lang, setLang) {
  const locale = localeOf(lang);
  return {
    lang,
    locale,
    setLang,
    t: (key, values) => translate(lang, key, values),
    formatDate: (iso, style) => formatDate(iso, locale, style),
  };
}

export const I18nContext = createContext(buildI18n(DEFAULT_LANG, () => {}));

export function useI18n() {
  return useContext(I18nContext);
}
