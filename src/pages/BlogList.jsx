import { useMemo, useState } from 'react';
import { usePosts } from '../hooks/usePosts.js';
import PostCard from '../components/PostCard.jsx';
import './BlogList.css';

export default function BlogList() {
  const { getAll } = usePosts();
  const all = getAll();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(all.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.author || '').toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [all, query, category]);

  return (
    <>
      <section className="blog-header">
        <div className="container">
          <p className="eyebrow">The Rooted &amp; Green blog</p>
          <h1>Notes from the garden</h1>
          <p className="lead">
            Practical guides, seasonal know-how, and inspiration for growing a
            garden you love.
          </p>
        </div>
      </section>

      <section className="section blog-body">
        <div className="container">
          <div className="blog-controls">
            <div className="search-wrap">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                type="search"
                className="input search-input"
                placeholder="Search posts…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search posts"
              />
            </div>
            <div className="chip-row" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`chip ${category === cat ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="result-count">
            {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            {category !== 'All' && ` in ${category}`}
            {query && ` matching “${query}”`}
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
              <h3>No posts found</h3>
              <p>Try a different search term or category.</p>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
