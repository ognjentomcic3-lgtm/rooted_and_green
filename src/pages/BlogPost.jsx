import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { usePosts } from '../hooks/usePosts.js';
import './BlogPost.css';

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const { getBySlug } = usePosts();
  const post = getBySlug(slug);

  if (!post) {
    return (
      <section className="section">
        <div className="container post-missing">
          <span aria-hidden="true">🍂</span>
          <h1>Post not found</h1>
          <p className="lead">
            That article may have been moved or removed.
          </p>
          <Link to="/blog" className="btn btn-primary">
            Back to the blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="post">
      <div className="container post-container">
        <Link to="/blog" className="post-back">
          ← Back to all posts
        </Link>

        <header className="post-head">
          <span className="badge">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-byline">
            <span className="post-author">By {post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>

        <figure className="post-cover">
          <img
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            width="1200"
            height="675"
          />
        </figure>

        <div className="post-content">
          <ReactMarkdown
            components={{
              img: ({ node: _node, ...props }) => (
                <img loading="lazy" {...props} alt={props.alt || ''} />
              ),
              a: ({ node: _node, ...props }) => (
                <a target="_blank" rel="noreferrer noopener" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="post-footer">
          <Link to="/blog" className="btn btn-outline">
            ← Read more articles
          </Link>
        </footer>
      </div>
    </article>
  );
}
