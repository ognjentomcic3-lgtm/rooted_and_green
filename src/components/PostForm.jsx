import { useEffect, useState } from 'react';
import { slugify } from '../hooks/usePosts.js';
import { DEFAULT_LANG, LANGUAGES } from '../i18n/core.js';
import { useI18n } from '../i18n/context.js';
import {
  emptyBundle,
  emptyBundles,
  migratePost,
  slugSourceTitle,
} from '../i18n/posts.js';
import BlockEditor from './BlockEditor.jsx';
import ImagePicker from './ImagePicker.jsx';
import './PostForm.css';

// The language-neutral half of a project. There is no slug here any more —
// usePosts derives it from the title on every save — and no category or author,
// which left the shape with v2. What is left is the cover picture, the date and
// the block list that carries the body.
const EMPTY = {
  coverImageId: '',
  date: new Date().toISOString().slice(0, 10),
  i18n: emptyBundles(),
  blocks: [],
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

// The words one text block holds in one language, read straight out of its
// bundle. Deliberately not localizeBlock(): that walks the fallback chain and
// would answer with the Serbian text when the English is missing, which is
// exactly the gap the incomplete dot below exists to show.
function blockText(block, lang) {
  const bundles = block.i18n || {};
  return String((bundles[lang] || {}).text || '');
}

export default function PostForm({ initial, onSubmit, onCancel }) {
  const { t } = useI18n();
  const isEditing = Boolean(initial);
  const [form, setForm] = useState(() => toFormState(initial));
  const [activeLang, setActiveLang] = useState(DEFAULT_LANG);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(toFormState(initial));
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

  const bundle = (lang) => form.i18n[lang] || emptyBundle();

  const textBlocks = form.blocks.filter((b) => b.type === 'text');

  // A language is incomplete when it has no title, or when the project has text
  // blocks and this language has no words in any of them. The second half is a
  // judgement call worth spelling out: blocks are language-neutral in structure
  // and translated only in their words, so a project made of nothing but
  // picture blocks has nothing to translate — marking it "incomplete" in
  // English would be flagging work that does not exist.
  const isIncomplete = (lang) =>
    !bundle(lang).title.trim() ||
    (textBlocks.length > 0 &&
      !textBlocks.some((block) => blockText(block, lang).trim()));

  const validate = () => {
    const next = {};
    const base = bundle(DEFAULT_LANG);
    if (!base.title.trim()) next[`title:${DEFAULT_LANG}`] = t('form.error.title');
    if (!String(form.coverImageId || '').trim()) {
      next.coverImageId = t('form.error.cover');
    }
    if (form.blocks.length === 0) next.blocks = t('form.error.blocks');
    setErrors(next);

    // Only the title belongs to a language, so it is the only error that can
    // send the admin to a tab. The cover picture and the block list are
    // language-neutral: there is no tab that would fix either of them, and
    // switching away would just move the admin off what they were doing.
    if (next[`title:${DEFAULT_LANG}`]) setActiveLang(DEFAULT_LANG);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Named fields rather than a spread of the whole form: the state still
    // carries `id`, `slug` and `featured` when an existing project was loaded
    // into it, and none of the three is the form's to set. usePosts.update()
    // keeps the stored id and featured flag and re-derives the slug itself.
    onSubmit({
      coverImageId: form.coverImageId,
      date: form.date,
      i18n: form.i18n,
      blocks: form.blocks,
    });
  };

  // A preview of the address, not the address itself: usePosts derives the real
  // one from this same title on every save. It cannot show a `-2` suffix,
  // because uniqueness is settled against the whole store at save time and this
  // form does not hold the store — a second project called "Vrt na Vračaru"
  // reads as /projects/vrt-na-vracaru here and is stored one number along.
  const urlPreview = `/projects/${slugify(slugSourceTitle(form)) || '…'}`;

  const active = bundle(activeLang);
  const titleError = errors[`title:${activeLang}`];

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-main">
          <div className="form-langs" role="group" aria-label={t('form.langLabel')}>
            {LANGUAGES.map((option) => {
              const invalid = Boolean(errors[`title:${option.code}`]);
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
              onChange={(e) => setCopy(activeLang, 'title', e.target.value)}
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

          {/* The body. The active tab goes through so a text block edits the
              language the admin is reading, and the whole next array comes
              back — the editor owns the order, the form owns the state. */}
          <div className="field form-blocks">
            <BlockEditor
              blocks={form.blocks}
              lang={activeLang}
              onChange={(blocks) => setField('blocks', blocks)}
            />
            {errors.blocks && <p className="field-error">{errors.blocks}</p>}
          </div>
        </div>

        <aside className="form-side">
          {/* The picker renders the label itself, so it is handed the
              translated string rather than wrapped in a <label> here. */}
          <div className="field">
            <ImagePicker
              value={form.coverImageId || null}
              onChange={(id) => setField('coverImageId', id)}
              label={t('form.cover')}
            />
            <p className="hint form-cover-hint">{t('form.coverHint')}</p>
            {errors.coverImageId && (
              <p className="field-error">{errors.coverImageId}</p>
            )}
          </div>

          {/* Read-only rather than absent: the admin cannot change the address,
              but watching it follow the title is how the rename behaviour stops
              being a surprise. An input keeps it selectable so it can be
              copied — readOnly, not disabled, so it stays reachable. */}
          <div className="field">
            <label htmlFor="pf-url">
              {t('form.url')} <span className="hint">{t('form.urlHint')}</span>
            </label>
            <input
              id="pf-url"
              className="input input-readonly"
              value={urlPreview}
              readOnly
            />
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
