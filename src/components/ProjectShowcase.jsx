import { useI18n } from '../i18n/context.js';
import { projectCopy } from '../data/projectsData.js';
import './ProjectShowcase.css';

// A list of projects as alternating rows: title text on one side, two
// photographs on the other, sides swapping row by row.
//
// Renders rows only — the section heading and the "all projects" button belong
// to whichever page is using it, so the homepage can show three and the
// projects page can show the lot.
export default function ProjectShowcase({ items }) {
  const { t, lang } = useI18n();

  return (
    <ol className="pshow-list">
      {items.map((project, i) => {
        const copy = projectCopy(project, lang);
        // Two photographs per project, as specified; the data may carry more.
        const shots = project.images.slice(0, 2);

        return (
          <li className="pshow-row" key={project.id}>
            <div className="pshow-copy">
              <p className="pshow-meta">
                <span className="pshow-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {project.place} · {project.year}
              </p>
              <h3 className="pshow-title">{copy.title}</h3>
              <p className="pshow-summary">{copy.summary}</p>
              <ul className="pshow-scope">
                {copy.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pshow-media">
              {shots.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={t('projects.imageAlt', {
                    title: copy.title,
                    place: project.place,
                    index: index + 1,
                  })}
                  loading="lazy"
                  width="900"
                  height="1200"
                />
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
