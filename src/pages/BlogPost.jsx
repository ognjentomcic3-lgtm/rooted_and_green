import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { usePosts } from '../hooks/usePosts.js';
import { useI18n } from '../i18n/context.js';
import { localeOf } from '../i18n/core.js';
import { localizePost } from '../i18n/posts.js';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const { getBySlug } = usePosts();
  const { lang, t, categoryLabel, formatDate } = useI18n();
  const post = getBySlug(slug);

  if (!post) {
    return (
      <section className="section">
        <div className="container post-missing">
          <span aria-hidden="true">🍂</span>
          <h1>{t('post.notFound.title')}</h1>
          <p className="lead">{t('post.notFound.text')}</p>
          <Link to="/blog" className="btn btn-primary">
            {t('post.notFound.back')}
          </Link>
        </div>
      </section>
    );
  }

  const copy = localizePost(post, lang);
  // An untranslated post falls back to the other language — say so in the
  // markup so screen readers and browser translation get it right.
  const contentLocale = localeOf(copy.resolvedLang);

  return (
    <article className="post">
      <div className="container post-container">
        <Link to="/blog" className="post-back">
          ← {t('post.back')}
        </Link>

        <header className="post-head">
          <span className="badge">{categoryLabel(post.category)}</span>
          <h1 lang={contentLocale}>{copy.title}</h1>
          <div className="post-byline">
            <span className="post-author">
              {t('post.by', { author: post.author })}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
          </div>
        </header>

        <figure className="post-cover">
          <img
            src={post.coverImage}
            alt={t('post.coverAlt', { title: copy.title })}
            width="1200"
            height="675"
          />
        </figure>

        <div className="post-content" lang={contentLocale}>
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
            {copy.content}
          </ReactMarkdown>
        </div>

        <footer className="post-footer">
          <Link to="/blog" className="btn btn-outline">
            ← {t('post.readMore')}
          </Link>
        </footer>
      </div>
    </article>
  );
}
