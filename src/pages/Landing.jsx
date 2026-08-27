import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context.js';
import { projects } from '../data/projectsData.js';
import HomeHero from '../components/HomeHero.jsx';
import ServicesDetail from '../components/ServicesDetail.jsx';
import ProjectShowcase from '../components/ProjectShowcase.jsx';
import './Landing.css';

// Three parts and no more: the header, the services and the projects. The blog
// keeps its own pages — it just no longer trails the homepage.
export default function Landing() {
  const { t } = useI18n();

  return (
    <>
      {/* Header: full-screen darkened photograph */}
      <HomeHero />

      {/* The services, in detail: text left, photograph right */}
      <ServicesDetail />

      {/* Then three projects, text and pictures swapping sides row by row */}
      <section className="pshow" id="projects" aria-labelledby="pshow-title">
        <div className="container">
          <div className="pshow-head">
            <p className="eyebrow">{t('projects.eyebrow')}</p>
            <h2 id="pshow-title">{t('projects.title')}</h2>
            <p className="pshow-lead">{t('projects.lead')}</p>
          </div>
          <ProjectShowcase items={projects.slice(0, 3)} />
          <div className="pshow-more">
            <Link to="/projects" className="btn btn-outline">
              {t('projects.viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
