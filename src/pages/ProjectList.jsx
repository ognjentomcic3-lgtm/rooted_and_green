import { useMemo, useState } from 'react';
import { usePosts } from '../hooks/usePosts.js';
import { useI18n } from '../i18n/context.js';
import { foldDiacritics } from '../i18n/core.js';
import { localizePost } from '../i18n/posts.js';
import PostCard from '../components/PostCard.jsx';
import './ProjectList.css';

const ALL = 'all';

export default function ProjectList() {
  const { getAll } = usePosts();
  const { lang, locale, t, categoryLabel } = useI18n();
  const all = getAll();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);

  // Filter on the stable category key, sort the chips by their translated label.
  const categories = useMemo(() => {
    const keys = Array.from(
      new Set(all.map((p) => p.category).filter(Boolean)),
    );
    keys.sort((a, b) => categoryLabel(a).localeCompare(categoryLabel(b), locale));
    return [ALL, ...keys];
  }, [all, categoryLabel, locale]);

  const filtered = useMemo(() => {
    const q = foldDiacritics(query.trim(), locale);
    return all.filter((p) => {
      const matchesCategory = category === ALL || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const copy = localizePost(p, lang);
      return (
        foldDiacritics(copy.title, locale).includes(q) ||
        foldDiacritics(copy.excerpt, locale).includes(q) ||
        foldDiacritics(p.author || '', locale).includes(q)
      );
    });
  }, [all, query, category, lang, locale]);

  // Complete sentences, not glued fragments — each variant is one message so
  // every language controls its own word order.
  const resultKey =
    category !== ALL && query
      ? 'projects.resultsInCategoryMatching'
      : category !== ALL
        ? 'projects.resultsInCategory'
        : query
          ? 'projects.resultsMatching'
          : 'projects.results';

  return (
    <>
      <section className="projects-header">
        <div className="container">
          <p className="eyebrow">{t('projects.eyebrow')}</p>
          <h1>{t('projects.title')}</h1>
          <p className="lead">{t('projects.lead')}</p>
        </div>
      </section>

      <section className="section projects-body">
        <div className="container">
          <div className="projects-controls">
            <div className="search-wrap">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                type="search"
                className="input search-input"
                placeholder={t('projects.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t('projects.searchLabel')}
              />
            </div>
            <div
              className="chip-row"
              role="group"
              aria-label={t('projects.filterLabel')}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`chip ${category === cat ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat === ALL ? t('projects.all') : categoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>

          <p className="result-count">
            {t(resultKey, {
              count: filtered.length,
              category: categoryLabel(category),
              query: query.trim(),
            })}
          </p>

          {filtered.length > 0 ? (
            <div className="posts-grid">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state card">
              <span aria-hidden="true">🌱</span>
              <h3>{t('projects.empty.title')}</h3>
              <p>{t('projects.empty.text')}</p>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setQuery('');
                  setCategory(ALL);
                }}
              >
                {t('projects.empty.clear')}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
