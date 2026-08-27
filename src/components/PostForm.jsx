import { useEffect, useState } from 'react';
import { slugify } from '../hooks/usePosts.js';
import { CATEGORIES } from '../data/seedData.js';
import { DEFAULT_LANG, LANGUAGES } from '../i18n/core.js';
import { useI18n } from '../i18n/context.js';
import {
  emptyBundle,
  emptyBundles,
  migratePost,
  slugSourceTitle,
} from '../i18n/posts.js';
import './PostForm.css';

const EMPTY = {
  slug: '',
  coverImage: '',
  category: CATEGORIES[0],
  author: '',
  date: new Date().toISOString().slice(0, 10),
  i18n: emptyBundles(),
};

// Accepts a post in either shape — migratePost normalises anything legacy.
function toFormState(post) {
  if (!post) return { ...EMPTY, i18n: emptyBundles() };
  const migrated = migratePost(post);
  return {
    ...EMPTY,
    ...migrated,
    i18n: { ...emptyBundles(), ...(migrated.i18n || {}) },
  };
}

export default function PostForm({ initial, onSubmit, onCancel }) {
  const { t } = useI18n();
  const isEditing = Boolean(initial);
  const [form, setForm] = useState(() => toFormState(initial));
  const [activeLang, setActiveLang] = useState(DEFAULT_LANG);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(toFormState(initial));
    setSlugTouched(Boolean(initial));
    setActiveLang(DEFAULT_LANG);
    setErrors({});
  }, [initial]);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const setCopy = (lang, key, value) =>
    setForm((f) => ({
      ...f,
      i18n: {
        ...f.i18n,
        [lang]: { ...(f.i18n[lang] || emptyBundle()), [key]: value },
      },
    }));

  // The slug is language-neutral, so it follows the default language's title.
  const handleTitle = (lang, value) => {
    setForm((f) => ({
      ...f,
      i18n: {
        ...f.i18n,
        [lang]: { ...(f.i18n[lang] || emptyBundle()), title: value },
      },
      slug: !slugTouched && lang === DEFAULT_LANG ? slugify(value) : f.slug,
    }));
  };

  const bundle = (lang) => form.i18n[lang] || emptyBundle();

  const isIncomplete = (lang) =>
    !bundle(lang).title.trim() || !bundle(lang).content.trim();

  const validate = () => {
    const next = {};
    const base = bundle(DEFAULT_LANG);
    if (!base.title.trim()) next[`title:${DEFAULT_LANG}`] = t('form.error.title');
    if (!base.content.trim())
      next[`content:${DEFAULT_LANG}`] = t('form.error.content');
    if (!form.author.trim()) next.author = t('form.error.author');
    if (!form.coverImage.trim()) next.coverImage = t('form.error.cover');
    setErrors(next);

    // Send the admin to the tab that is actually missing something.
    if (next[`title:${DEFAULT_LANG}`] || next[`content:${DEFAULT_LANG}`]) {
      setActiveLang(DEFAULT_LANG);
    }
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      slug: form.slug ? slugify(form.slug) : slugify(slugSourceTitle(form)),
    });
  };

  const active = bundle(activeLang);
  const titleError = errors[`title:${activeLang}`];
  const contentError = errors[`content:${activeLang}`];

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-main">
          <div className="form-langs" role="group" aria-label={t('form.langLabel')}>
            {LANGUAGES.map((option) => {
              const invalid = Boolean(
                errors[`title:${option.code}`] || errors[`content:${option.code}`],
              );
              const incomplete = isIncomplete(option.code);
              return (
                <button
                  key={option.code}
                  type="button"
                  className={`form-lang ${activeLang === option.code ? 'is-active' : ''} ${
                    invalid ? 'is-invalid' : ''
                  }`}
                  aria-pressed={activeLang === option.code}
                  onClick={() => setActiveLang(option.code)}
                >
                  <span lang={option.locale}>{option.name}</span>
                  {option.code === DEFAULT_LANG && (
                    <>
                      <span className="form-lang-req" aria-hidden="true">
                        *
                      </span>
                      <span className="sr-only">{t('form.required')}</span>
                    </>
                  )}
                  {incomplete && (
                    <>
                      <span className="form-lang-dot" aria-hidden="true" />
                      <span className="sr-only">{t('form.incomplete')}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div className="field">
            <label htmlFor={`pf-title-${activeLang}`}>{t('form.title')}</label>
            <input
              id={`pf-title-${activeLang}`}
              className="input"
              value={active.title}
              onChange={(e) => handleTitle(activeLang, e.target.value)}
              placeholder={t('form.titlePlaceholder')}
              aria-invalid={Boolean(titleError)}
            />
            {titleError && <p className="field-error">{titleError}</p>}
          </div>

          <div className="field">
            <label htmlFor={`pf-excerpt-${activeLang}`}>
              {t('form.excerpt')}{' '}
              <span className="hint">{t('form.excerptHint')}</span>
            </label>
            <textarea
              id={`pf-excerpt-${activeLang}`}
              className="textarea excerpt-area"
              value={active.excerpt}
              onChange={(e) => setCopy(activeLang, 'excerpt', e.target.value)}
              placeholder={t('form.excerptPlaceholder')}
            />
          </div>

          <div className="field">
            <label htmlFor={`pf-content-${activeLang}`}>
              {t('form.content')}{' '}
              <span className="hint">{t('form.contentHint')}</span>
            </label>
            <textarea
              id={`pf-content-${activeLang}`}
              className="textarea"
              value={active.content}
              onChange={(e) => setCopy(activeLang, 'content', e.target.value)}
              placeholder={t('form.contentPlaceholder')}
              aria-invalid={Boolean(contentError)}
            />
            {contentError && <p className="field-error">{contentError}</p>}
          </div>
        </div>

        <aside className="form-side">
          <div className="field">
            <label htmlFor="pf-slug">
              {t('form.slug')} <span className="hint">{t('form.slugHint')}</span>
            </label>
            <input
              id="pf-slug"
              className="input"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setField('slug', e.target.value);
              }}
              placeholder={t('form.slugPlaceholder')}
            />
            <p className="hint">
              /blog/{slugify(form.slug || slugSourceTitle(form)) || '…'}
            </p>
          </div>

          <div className="field">
            <label htmlFor="pf-cover">{t('form.cover')}</label>
            <input
              id="pf-cover"
              className="input"
              value={form.coverImage}
              onChange={(e) => setField('coverImage', e.target.value)}
              placeholder={t('form.coverPlaceholder')}
              aria-invalid={Boolean(errors.coverImage)}
            />
            {errors.coverImage && (
              <p className="field-error">{errors.coverImage}</p>
            )}
            {form.coverImage && (
              <div className="cover-preview">
                <img src={form.coverImage} alt={t('form.coverAlt')} />
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="pf-category">{t('form.category')}</label>
            <select
              id="pf-category"
              className="select"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {t(`category.${c}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="pf-author">{t('form.author')}</label>
            <input
              id="pf-author"
              className="input"
              value={form.author}
              onChange={(e) => setField('author', e.target.value)}
              placeholder={t('form.authorPlaceholder')}
              aria-invalid={Boolean(errors.author)}
            />
            {errors.author && <p className="field-error">{errors.author}</p>}
          </div>

          <div className="field">
            <label htmlFor="pf-date">{t('form.date')}</label>
            <input
              id="pf-date"
              type="date"
              className="input"
              value={form.date}
              onChange={(e) => setField('date', e.target.value)}
            />
          </div>
        </aside>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? t('form.save') : t('form.publish')}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          {t('form.cancel')}
        </button>
      </div>
    </form>
  );
}
