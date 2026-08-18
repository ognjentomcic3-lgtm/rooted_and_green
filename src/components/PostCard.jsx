import { Link } from 'react-router-dom';
import './PostCard.css';

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function PostCard({ post }) {
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
        <span className="post-card-badge badge">{post.category}</span>
      </Link>
      <div className="post-card-body">
        <div className="post-card-meta">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="post-card-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="post-card-link">
          Read article →
        </Link>
      </div>
    </article>
  );
}
