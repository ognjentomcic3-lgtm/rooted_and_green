import { useEffect, useState } from 'react';
import { slugify } from '../hooks/usePosts.js';
import { CATEGORIES } from '../data/seedData.js';
import './PostForm.css';

const EMPTY = {
  title: '',
  slug: '',
  excerpt: '',
  coverImage: '',
  category: CATEGORIES[0],
  author: '',
  date: new Date().toISOString().slice(0, 10),
  content: '',
};

export default function PostForm({ initial, onSubmit, onCancel }) {
  const isEditing = Boolean(initial);
  const [form, setForm] = useState(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({ ...EMPTY, ...initial });
      setSlugTouched(true);
    } else {
      setForm(EMPTY);
      setSlugTouched(false);
    }
    setErrors({});
  }, [initial]);

  const setField = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitle = (value) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'A title is required.';
    if (!form.author.trim()) next.author = 'An author is required.';
    if (!form.content.trim()) next.content = 'Post content cannot be empty.';
    if (!form.coverImage.trim())
      next.coverImage = 'A cover image URL is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
    });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-main">
          <div className="field">
            <label htmlFor="pf-title">Title</label>
            <input
              id="pf-title"
              className="input"
              value={form.title}
              onChange={(e) => handleTitle(e.target.value)}
              placeholder="e.g. Building Raised Beds That Last"
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          <div className="field">
            <label htmlFor="pf-slug">
              Slug <span className="hint">(URL — auto-filled from title)</span>
            </label>
            <input
              id="pf-slug"
              className="input"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setField('slug', e.target.value);
              }}
              placeholder="building-raised-beds"
            />
            <p className="hint">/blog/{slugify(form.slug || form.title) || '…'}</p>
          </div>

          <div className="field">
            <label htmlFor="pf-excerpt">
              Excerpt <span className="hint">(shown on cards)</span>
            </label>
            <textarea
              id="pf-excerpt"
              className="textarea excerpt-area"
              value={form.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              placeholder="A short, enticing summary of the post…"
            />
          </div>

          <div className="field">
            <label htmlFor="pf-content">
              Content{' '}
              <span className="hint">
                (Markdown — supports headings, lists, **bold**, and inline
                images)
              </span>
            </label>
            <textarea
              id="pf-content"
              className="textarea"
              value={form.content}
              onChange={(e) => setField('content', e.target.value)}
              placeholder={
                '## A heading\n\nSome text with **bold**.\n\n![Alt text](https://picsum.photos/seed/example/800/450)\n\n- a list item'
              }
            />
            {errors.content && (
              <p className="field-error">{errors.content}</p>
            )}
          </div>
        </div>

        <aside className="form-side">
          <div className="field">
            <label htmlFor="pf-cover">Cover image URL</label>
            <input
              id="pf-cover"
              className="input"
              value={form.coverImage}
              onChange={(e) => setField('coverImage', e.target.value)}
              placeholder="https://picsum.photos/seed/xyz/1200/675"
            />
            {errors.coverImage && (
              <p className="field-error">{errors.coverImage}</p>
            )}
            {form.coverImage && (
              <div className="cover-preview">
                <img src={form.coverImage} alt="Cover preview" />
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="pf-category">Category</label>
            <select
              id="pf-category"
              className="select"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="pf-author">Author</label>
            <input
              id="pf-author"
              className="input"
              value={form.author}
              onChange={(e) => setField('author', e.target.value)}
              placeholder="e.g. Maya Fernsby"
            />
            {errors.author && <p className="field-error">{errors.author}</p>}
          </div>

          <div className="field">
            <label htmlFor="pf-date">Date</label>
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
          {isEditing ? 'Save changes' : 'Publish post'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
