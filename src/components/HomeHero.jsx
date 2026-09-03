import { useI18n } from '../i18n/context.js';
import { site } from '../data/siteConfig.js';
import heroPhoto1920 from '../assets/home-hero-1920.webp';
import heroPhoto1280 from '../assets/home-hero-1280.webp';
import heroPhoto960 from '../assets/home-hero-960.webp';
import heroPhoto640 from '../assets/home-hero-640.webp';
import './HomeHero.css';

// The photograph lives in the repository rather than on a stock-photo CDN:
// one fewer origin to open a connection to, a fingerprinted filename the
// browser may cache indefinitely, and a picture that cannot be re-cropped or
// withdrawn from under the site.
//
// It ships in four widths because it is the largest thing on the page and
// every visitor was being sent the 1920 cut — 520KB of it to phones that had
// room for a quarter of that. The browser now takes the one it needs.
const HERO_WIDTHS = [
  [heroPhoto640, 640],
  [heroPhoto960, 960],
  [heroPhoto1280, 1280],
  [heroPhoto1920, 1920],
];
const HERO_SRCSET = HERO_WIDTHS.map(([src, w]) => `${src} ${w}w`).join(', ');

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
        {/* Full-bleed, so the picture is always as wide as the screen. */}
        <img
          src={heroPhoto1920}
          srcSet={HERO_SRCSET}
          sizes="100vw"
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

      {/* Points at whatever comes next, which is now the services segment. */}
      <a className="home-hero-cue" href="#services-detail">
        <span className="sr-only">{t('home.hero.scrollCue')}</span>
        <span className="home-hero-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}
