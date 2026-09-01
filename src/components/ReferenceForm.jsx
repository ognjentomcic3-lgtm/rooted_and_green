import { useEffect, useState } from 'react';
import { DEFAULT_LANG, LANGUAGES } from '../i18n/core.js';
import { useI18n } from '../i18n/context.js';
import './ReferenceForm.css';

// The edit mechanism for one reference. It is a sibling of PostForm rather than
// a variant of it: a reference has three plain fields and a single translated
// one, where a project has six and three. Sharing a component between the two
// would mean a component full of "if this is a reference" — so the patterns are
// copied (the language tabs, the incomplete dot, the live image preview) and
// the markup is its own. Nothing here reaches into PostForm.css; every class it
// uses is either global (.field, .input, .btn) or prefixed `refform-`.

const EMPTY = { name: '', place: '', avatar: '' };

function emptyQuotes() {
  const quotes = {};
  for (const option of LANGUAGES) quotes[option.code] = { quote: '' };
  return quotes;
}

// A stored reference only carries the languages it was actually written in —
// that is the whole point of the fallback chain in testimonialCopy(). The form
// still needs a box per language, so the gaps are filled here and stripped
// again on the way out.
function toFormState(reference) {
  const quotes = emptyQuotes();
  if (!reference) return { ...EMPTY, i18n: quotes };

  for (const option of LANGUAGES) {
    const stored = reference.i18n && reference.i18n[option.code];
    quotes[option.code] = { quote: String((stored && stored.quote) ?? '') };
  }
  return {
    name: reference.name ?? '',
    place: reference.place ?? '',
    avatar: reference.avatar ?? '',
    i18n: quotes,
  };
}

// Drop a language whose quote was left blank instead of storing an empty string
// for it. testimonialCopy() falls back to Serbian when a language is *missing*,
// but an empty string is present — storing one would put a blank card on the
// landing page for anyone reading in English.
function compactQuotes(quotes) {
  const out = {};
  for (const option of LANGUAGES) {
    const quote = ((quotes[option.code] || {}).quote ?? '').trim();
    if (quote) out[option.code] = { quote };
  }
  return out;
}

export default function ReferenceForm({ initial, onSubmit, onCancel }) {
  const { t } = useI18n();
  const isEditing = Boolean(initial);
  const [form, setForm] = useState(() => toFormState(initial));
  const [activeLang, setActiveLang] = useState(DEFAULT_LANG);
  const [errors, setErrors] = useState({});

  // Selecting another row in the list swaps `initial` underneath a form that
  // stays mounted, so the state has to follow it. Same effect PostForm runs.
  useEffect(() => {
    setForm(toFormState(initial));
    setActiveLang(DEFAULT_LANG);
    setErrors({});
  }, [initial]);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const setQuote = (lang, value) =>
    setForm((f) => ({ ...f, i18n: { ...f.i18n, [lang]: { quote: value } } }));

  const quoteOf = (lang) => (form.i18n[lang] || {}).quote ?? '';

  // Serbian is required and English is not, so "incomplete" is the quiet dot
  // that marks a language nobody has written yet — not an error.
  const isIncomplete = (lang) => !quoteOf(lang).trim();

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('referenceForm.error.name');
    if (!form.avatar.trim()) next.avatar = t('referenceForm.error.avatar');
    if (!quoteOf(DEFAULT_LANG).trim()) {
      next[`quote:${DEFAULT_LANG}`] = t('referenceForm.error.quote');
    }
    setErrors(next);

    // Send the admin to the tab that is actually missing something.
    if (next[`quote:${DEFAULT_LANG}`]) setActiveLang(DEFAULT_LANG);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // `featured` is deliberately absent: the checkbox in the list owns it, and
    // useTestimonials.update() ignores it here anyway.
    onSubmit({
      name: form.name.trim(),
      place: form.place.trim(),
      avatar: form.avatar.trim(),
      i18n: compactQuotes(form.i18n),
    });
  };

  const quoteError = errors[`quote:${activeLang}`];

  return (
    <form className="refform" onSubmit={handleSubmit} noValidate>
      <h2 className="refform-title">
        {isEditing ? t('referenceForm.editTitle') : t('referenceForm.newTitle')}
      </h2>

      <div className="field">
        <label htmlFor="rf-name">{t('referenceForm.name')}</label>
        <input
          id="rf-name"
          className="input"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder={t('referenceForm.namePlaceholder')}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="refform-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="rf-place">{t('referenceForm.place')}</label>
        <input
          id="rf-place"
          className="input"
          value={form.place}
          onChange={(e) => setField('place', e.target.value)}
          placeholder={t('referenceForm.placePlaceholder')}
        />
      </div>

      <div className="field">
        <label htmlFor="rf-avatar">{t('referenceForm.avatar')}</label>
        <input
          id="rf-avatar"
          className="input"
          value={form.avatar}
          onChange={(e) => setField('avatar', e.target.value)}
          placeholder={t('referenceForm.avatarPlaceholder')}
          aria-invalid={Boolean(errors.avatar)}
        />
        {errors.avatar && <p className="refform-error">{errors.avatar}</p>}
        {form.avatar.trim() && (
          <div className="refform-preview">
            <img src={form.avatar} alt={t('referenceForm.avatarAlt')} />
          </div>
        )}
      </div>

      <div
        className="refform-langs"
        role="group"
        aria-label={t('referenceForm.langLabel')}
      >
        {LANGUAGES.map((option) => {
          const invalid = Boolean(errors[`quote:${option.code}`]);
          const incomplete = isIncomplete(option.code);
          return (
            <button
              key={option.code}
              type="button"
              className={`refform-lang ${
                activeLang === option.code ? 'is-active' : ''
              } ${invalid ? 'is-invalid' : ''}`}
              aria-pressed={activeLang === option.code}
              onClick={() => setActiveLang(option.code)}
            >
              <span lang={option.locale}>{option.name}</span>
              {option.code === DEFAULT_LANG && (
                <>
                  <span className="refform-lang-req" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">{t('referenceForm.required')}</span>
                </>
              )}
              {incomplete && (
                <>
                  <span className="refform-lang-dot" aria-hidden="true" />
                  <span className="sr-only">
                    {t('referenceForm.incomplete')}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      <div className="field">
        <label htmlFor={`rf-quote-${activeLang}`}>
          {t('referenceForm.quote')}
        </label>
        <textarea
          id={`rf-quote-${activeLang}`}
          className="textarea refform-quote"
          value={quoteOf(activeLang)}
          onChange={(e) => setQuote(activeLang, e.target.value)}
          placeholder={t('referenceForm.quotePlaceholder')}
          aria-invalid={Boolean(quoteError)}
        />
        {quoteError && <p className="refform-error">{quoteError}</p>}
      </div>

      <div className="refform-actions">
        <button type="submit" className="btn btn-primary refform-submit">
          {isEditing ? t('referenceForm.save') : t('referenceForm.create')}
        </button>
        <button
          type="button"
          className="btn btn-ghost refform-cancel"
          onClick={onCancel}
        >
          {t('referenceForm.cancel')}
        </button>
      </div>
    </form>
  );
}
