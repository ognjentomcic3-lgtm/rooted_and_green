import { Picture } from './Gallery.jsx';
import { useI18n } from '../i18n/context.js';
import './HomeHero.css';
import './ProjectDetailHero.css';

// The project header: the project's own cover photograph, darkened, with the
// project's name written over it.
//
// The look is the homepage header's, so the styling is borrowed wholesale from
// HomeHero.css and ProjectDetailHero.css holds only the handful of rules
// that differ. The picture goes through <Picture> like every
// other picture on the public site, which is what keeps a cover still on its
// way out of the reader's face as a broken image.
export default function ProjectDetailHero({ idOrUrl, title, lang }) {
  const { t } = useI18n();

  return (
    <section className="home-hero project-hero" aria-labelledby="project-hero-title">
      <div className="home-hero-media">
        {/* No `caption`: the title is already written across this photograph,
            and a sentence explaining the absence underneath it would be noise.
            A cover that never arrives leaves the header quietly dark. */}
        <Picture
          idOrUrl={idOrUrl}
          alt={t('project.coverAlt', { title })}
          width={1920}
          height={1280}
          loading="eager"
          fetchPriority="high"
        />
        <div className="home-hero-scrim" aria-hidden="true" />
      </div>

      <div className="container home-hero-inner">
        {/* The page's only <h1> whenever this header is on screen; the plain
            heading inside the article stands in when it is not. */}
        <h1 id="project-hero-title" className="home-hero-name" lang={lang}>
          {title}
        </h1>
      </div>

      {/* Points at the project itself, which starts directly below. */}
      <a className="home-hero-cue" href="#project-body">
        <span className="sr-only">{t('project.scrollCue')}</span>
        <span className="home-hero-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}
