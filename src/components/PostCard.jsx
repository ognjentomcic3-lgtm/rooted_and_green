import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context.js';
import { localizePost } from '../i18n/posts.js';
import './PostCard.css';

export default function PostCard({ post }) {
  const { lang, t, categoryLabel, formatDate } = useI18n();
  const copy = localizePost(post, lang);

  return (
    <article className="post-card card">
      <Link to={`/blog/${post.slug}`} className="post-card-media" aria-hidden="true" tabIndex={-1}>
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          width="600"
          height="338"
        />
        <span className="post-card-badge badge">
          {categoryLabel(post.category)}
        </span>
      </Link>
      <div className="post-card-body">
        <div className="post-card-meta">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="post-card-title">
          <Link to={`/blog/${post.slug}`}>{copy.title}</Link>
        </h3>
        <p className="post-card-excerpt">{copy.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="post-card-link">
          {t('postCard.read')} →
        </Link>
      </div>
    </article>
  );
}
