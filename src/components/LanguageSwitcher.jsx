import { LANGUAGES } from '../i18n/core.js';
import { useI18n } from '../i18n/context.js';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((option) => (
        <button
          key={option.code}
          type="button"
          className={`lang-option ${lang === option.code ? 'is-active' : ''}`}
          aria-pressed={lang === option.code}
          // Language names are never translated — always the endonym.
          lang={option.locale}
          title={option.name}
          onClick={() => setLang(option.code)}
        >
          <span aria-hidden="true">{option.short}</span>
          <span className="sr-only">{option.name}</span>
        </button>
      ))}
    </div>
  );
}
