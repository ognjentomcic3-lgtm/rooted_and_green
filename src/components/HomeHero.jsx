import { useI18n } from '../i18n/context.js';
import { site } from '../data/siteConfig.js';
import './HomeHero.css';

// The homepage header: one photograph at full viewport height, darkened, with
// the company name, the ideology sentence and the service written over it.
//
// The photo is a real <img> rather than a CSS background so it can be
// priority-loaded and carry alt text; the darkening lives in a sibling layer.
export default function HomeHero() {
  const { t } = useI18n();

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-media">
        <img
          src="https://picsum.photos/seed/rooted-green-hero/1920/1280"
          alt={t('home.hero.imageAlt')}
          width="1920"
          height="1280"
          fetchPriority="high"
        />
        <div className="home-hero-scrim" aria-hidden="true" />
      </div>

      <div className="container home-hero-inner">
        <h1 id="home-hero-title" className="home-hero-name">
          {site.name}
        </h1>
        <p className="home-hero-ideology">{t('home.hero.ideology')}</p>
        <p className="home-hero-service">
          <span className="home-hero-rule" aria-hidden="true" />
          {t('home.hero.service')}
        </p>
      </div>

      <a className="home-hero-cue" href="#projects">
        <span className="sr-only">{t('home.hero.scrollCue')}</span>
        <span className="home-hero-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}
