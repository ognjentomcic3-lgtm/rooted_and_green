import { Link } from 'react-router-dom';
import { Picture } from './Gallery.jsx';
import { useI18n } from '../i18n/context.js';
import { localizePost } from '../i18n/posts.js';
import './PostCard.css';

export default function PostCard({ post }) {
  const { lang, t, formatDate } = useI18n();
  const copy = localizePost(post, lang);

  return (
    <article className="post-card card">
      <Link to={`/projects/${post.slug}`} className="post-card-media" aria-hidden="true" tabIndex={-1}>
        {/* Either a library id or a plain URL — Picture knows the difference
            and draws a quiet box rather than a broken-image icon for a cover
            that is not there. Decorative: the whole link is aria-hidden, the
            title beneath it is the real link. */}
        <Picture idOrUrl={post.coverImageId} alt="" width={600} height={338} />
      </Link>
      <div className="post-card-body">
        {/* The date is the whole meta line now — the category badge and the
            author both went with this feature. */}
        <div className="post-card-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="post-card-title">
          <Link to={`/projects/${post.slug}`}>{copy.title}</Link>
        </h3>
        <p className="post-card-excerpt">{copy.excerpt}</p>
        <Link to={`/projects/${post.slug}`} className="post-card-link">
          {t('projectCard.read')} →
        </Link>
      </div>
    </article>
  );
}
