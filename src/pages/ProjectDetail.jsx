import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { usePosts } from '../hooks/usePosts.js';
import { useI18n } from '../i18n/context.js';
import { localeOf } from '../i18n/core.js';
import { localizePost } from '../i18n/posts.js';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { getBySlug } = usePosts();
  const { lang, t, formatDate } = useI18n();
  const post = getBySlug(slug);

  if (!post) {
    return (
      <section className="section">
        <div className="container post-missing">
          <span aria-hidden="true">🍂</span>
          <h1>{t('project.notFound.title')}</h1>
          <p className="lead">{t('project.notFound.text')}</p>
          <Link to="/projects" className="btn btn-primary">
            {t('project.notFound.back')}
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
        <Link to="/projects" className="post-back">
          ← {t('project.back')}
        </Link>

        <header className="post-head">
          <h1 lang={contentLocale}>{copy.title}</h1>
          {/* The byline is down to the date: the category badge above it and
              the author beside it both went with this feature. */}
          <div className="post-byline">
            <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
          </div>
        </header>

        <figure className="post-cover">
          <img
            src={post.coverImage}
            alt={t('project.coverAlt', { title: copy.title })}
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
          <Link to="/projects" className="btn btn-outline">
            ← {t('project.readMore')}
          </Link>
        </footer>
      </div>
    </article>
  );
}
