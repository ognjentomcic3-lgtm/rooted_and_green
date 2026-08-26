import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts.js';
import { useI18n } from '../i18n/context.js';
import PostCard from '../components/PostCard.jsx';
import './Landing.css';

// Icons carry no language; the copy for each card lives in the message files.
const services = [
  { key: 'design', icon: '🌱' },
  { key: 'planting', icon: '✂️' },
  { key: 'wildlife', icon: '🌻' },
  { key: 'containers', icon: '🪴' },
];

export default function Landing() {
  const { getAll } = usePosts();
  const { t } = useI18n();
  const latest = getAll().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{t('landing.eyebrow')}</p>
            <h1>
              {t('landing.hero.titleLead')}{' '}
              <span className="hero-accent">{t('landing.hero.titleAccent')}</span>
            </h1>
            <p className="lead">{t('landing.hero.lead')}</p>
            <div className="hero-actions">
              <Link to="/blog" className="btn btn-primary">
                {t('landing.hero.ctaPrimary')}
              </Link>
              <a href="#services" className="btn btn-outline">
                {t('landing.hero.ctaSecondary')}
              </a>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="https://picsum.photos/seed/rooted-green-hero/900/1100"
              alt={t('landing.hero.imageAlt')}
              width="900"
              height="1100"
              fetchPriority="high"
            />
            <div className="hero-badge card">
              <span aria-hidden="true">🌿</span>
              <div>
                <strong>Rooted &amp; Green</strong>
                <span>{t('landing.hero.badgeText')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t('landing.services.eyebrow')}</p>
            <h2>{t('landing.services.title')}</h2>
            <p className="lead mx-auto text-center">
              {t('landing.services.lead')}
            </p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card card" key={s.key}>
                <span className="service-icon" aria-hidden="true">
                  {s.icon}
                </span>
                <h3>{t(`landing.service.${s.key}.title`)}</h3>
                <p>{t(`landing.service.${s.key}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="section blog-teaser">
        <div className="container">
          <div className="section-head-row">
            <div>
              <p className="eyebrow">{t('landing.blog.eyebrow')}</p>
              <h2>{t('landing.blog.title')}</h2>
            </div>
            <Link to="/blog" className="btn btn-ghost">
              {t('landing.blog.viewAll')}
            </Link>
          </div>
          {latest.length > 0 ? (
            <div className="posts-grid">
              {latest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="lead">{t('landing.blog.empty')}</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <div className="cta-copy">
              <h2>{t('landing.cta.title')}</h2>
              <p className="lead">{t('landing.cta.lead')}</p>
            </div>
            <Link to="/blog" className="btn btn-primary">
              {t('landing.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
