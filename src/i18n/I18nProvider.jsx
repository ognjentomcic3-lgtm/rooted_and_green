import { useCallback, useEffect, useMemo, useState } from 'react';
import { isLang, localeOf, readStoredLang, storeLang, translate } from './core.js';
import { buildI18n, I18nContext } from './context.js';

export default function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => readStoredLang());

  const setLang = useCallback((next) => {
    if (!isLang(next)) return;
    storeLang(next);
    setLangState(next);
  }, []);

  // Keep the document shell in step with the active language.
  useEffect(() => {
    document.documentElement.lang = localeOf(lang);
    document.title = translate(lang, 'meta.title');
  }, [lang]);

  const value = useMemo(() => buildI18n(lang, setLang), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
