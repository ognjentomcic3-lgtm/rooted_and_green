import { useMemo, useState } from 'react';
import { usePosts } from '../hooks/usePosts.js';
import { useI18n } from '../i18n/context.js';
import { foldDiacritics } from '../i18n/core.js';
import { localizePost } from '../i18n/posts.js';
import PostCard from '../components/PostCard.jsx';
import './ProjectList.css';

export default function ProjectList() {
  const { getAll } = usePosts();
  const { lang, locale, t } = useI18n();
  const all = getAll();
  const [query, setQuery] = useState('');

  // Categories are gone, so the search box is the only filter and it looks at
  // the two fields a visitor can actually see on a card.
  const filtered = useMemo(() => {
    const q = foldDiacritics(query.trim(), locale);
    if (!q) return all;
    return all.filter((p) => {
      const copy = localizePost(p, lang);
      return (
        foldDiacritics(copy.title, locale).includes(q) ||
        foldDiacritics(copy.excerpt, locale).includes(q)
      );
    });
  }, [all, query, lang, locale]);

  // Complete sentences, not glued fragments — each variant is one message so
  // every language controls its own word order.
  const resultKey = query ? 'projects.resultsMatching' : 'projects.results';

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
          </div>

          <p className="result-count">
            {t(resultKey, {
              count: filtered.length,
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
              <button className="btn btn-ghost" onClick={() => setQuery('')}>
                {t('projects.empty.clear')}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
