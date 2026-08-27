import { useI18n } from '../i18n/context.js';
import { projects } from '../data/projectsData.js';
import ProjectShowcase from '../components/ProjectShowcase.jsx';

// The full list behind the homepage's "all projects" button — same alternating
// rows, every project rather than the first three.
export default function Projects() {
  const { t } = useI18n();

  return (
    <section className="pshow" aria-labelledby="projects-page-title">
      <div className="container">
        <div className="pshow-head">
          <p className="eyebrow">{t('projects.eyebrow')}</p>
          <h2 id="projects-page-title">{t('projectsPage.title')}</h2>
          <p className="pshow-lead">{t('projectsPage.lead')}</p>
        </div>
        <ProjectShowcase items={projects} />
      </div>
    </section>
  );
}
