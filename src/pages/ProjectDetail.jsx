import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Gallery, { Picture } from '../components/Gallery.jsx';
import { usePosts } from '../hooks/usePosts.js';
import { useI18n } from '../i18n/context.js';
import { LANG_CODES, localeOf } from '../i18n/core.js';
import { localizeBlock, localizePost } from '../i18n/posts.js';
import './ProjectDetail.css';

// The two overrides the body has always carried: a picture written into the
// copy loads lazily, and a link written into the copy opens in its own tab
// without handing the new page a reference back to this one. They sit at module
// scope now because the body is a list of blocks rather than one string — a
// fresh object per block would give ReactMarkdown new components every render.
const MARKDOWN_COMPONENTS = {
  img: ({ node: _node, ...props }) => (
    <img loading="lazy" {...props} alt={props.alt || ''} />
  ),
  a: ({ node: _node, ...props }) => (
    <a target="_blank" rel="noreferrer noopener" {...props} />
  ),
};

// Which language a text block's words actually came out in. localizeBlock()
// owns the fallback chain; this only asks which bundle it settled on, so that
// the `lang` attribute on the block tells the truth about the words underneath
// it. The requested language is tried first, so a block translated identically
// in both is marked as the one being read rather than the alphabetically lucky
// one.
function blockLang(block, lang, text) {
  const bundles = block.i18n || {};
  if (bundles[lang] && bundles[lang].text === text) return lang;
  const found = LANG_CODES.find(
    (code) => bundles[code] && bundles[code].text === text,
  );
  return found || lang;
}

// One block of the body. Either kind can come out empty — a text block somebody
// is still writing, a picture block with nothing chosen yet — and an empty one
// renders nothing at all rather than an unexplained gap in the middle of a
// project that is halfway through being edited.
function Block({ block, lang }) {
  const { t } = useI18n();

  if (block.type === 'text') {
    const text = localizeBlock(block, lang);
    if (!text) return null;
    return (
      <div
        className="post-content"
        lang={localeOf(blockLang(block, lang, text))}
      >
        <ReactMarkdown components={MARKDOWN_COMPONENTS}>{text}</ReactMarkdown>
      </div>
    );
  }

  if (block.type === 'images') {
    // A reference that is an empty string names nothing, so it cannot even be a
    // missing picture — drop it before counting, or a block holding one blank
    // and one photograph would be dressed up as a two-picture slider.
    const ids = (block.imageIds || []).filter(Boolean);
    if (ids.length === 0) return null;

    if (ids.length > 1) return <Gallery imageIds={ids} />;

    return (
      <figure className="post-figure">
        <Picture
          idOrUrl={ids[0]}
          alt={t('gallery.singleAlt')}
          caption={t('gallery.missing')}
          width={800}
          height={450}
        />
      </figure>
    );
  }

  return null;
}

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
  // An untranslated title falls back to the other language — say so in the
  // markup so screen readers and browser translation get it right. This used to
  // cover the body as well; it no longer can, because every text block resolves
  // its own language now and each one says so for itself.
  const titleLocale = localeOf(copy.resolvedLang);
  const blocks = Array.isArray(post.blocks) ? post.blocks : [];

  return (
    <article className="post">
      <div className="container post-container">
        <Link to="/projects" className="post-back">
          ← {t('project.back')}
        </Link>

        <header className="post-head">
          <h1 lang={titleLocale}>{copy.title}</h1>
          {/* The byline is down to the date: the category badge above it and
              the author beside it both went with this feature. */}
          <div className="post-byline">
            <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
          </div>
        </header>

        {/* A project without a cover is a project without a cover — no frame,
            no tinted box, just the words starting where the picture would have
            been. */}
        {post.coverImageId ? (
          <figure className="post-cover">
            <Picture
              idOrUrl={post.coverImageId}
              alt={t('project.coverAlt', { title: copy.title })}
              caption={t('gallery.missing')}
              width={1200}
              height={675}
              loading="eager"
            />
          </figure>
        ) : null}

        <div className="post-body">
          {blocks.map((block) => (
            <Block key={block.id} block={block} lang={lang} />
          ))}
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
