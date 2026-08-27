import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context.js';
import { projects, projectCopy } from '../data/projectsData.js';
import './ProjectIndex.css';

// Projects as an index, not a grid of cards: a numbered list of oversized rows.
//
// Two ways in, deliberately layered so neither is required:
//   • pointing at a row (mouse only) floats a preview photo beside the cursor;
//   • activating a row (click, Enter, tap) expands it in place with the photos,
//     the summary and what the job involved.
// The hover layer is pure decoration — everything it shows is also in the panel,
// so touch and keyboard lose nothing.

// Rows are buttons, so focus already moves through them; this only gates the
// cursor-follower, which needs a real pointer to make any sense.
function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return fine;
}

export default function ProjectIndex() {
  const { t, lang } = useI18n();
  const finePointer = useFinePointer();

  const [openId, setOpenId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const followRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  // The follower is moved by writing to the node directly. Routing every
  // mousemove through state would re-render six rows per frame for no reason.
  const handleMove = useCallback(
    (event) => {
      if (!finePointer) return;
      pointer.current = { x: event.clientX, y: event.clientY };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const node = followRef.current;
        if (!node) return;
        const { x, y } = pointer.current;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    },
    [finePointer],
  );

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  // An expanded row already shows its photos, so the follower stands down.
  const preview =
    finePointer && hoverId && hoverId !== openId
      ? projects.find((p) => p.id === hoverId)
      : null;
  const previewCopy = preview ? projectCopy(preview, lang) : null;

  return (
    <section
      className="pindex"
      id="projects"
      aria-labelledby="pindex-title"
      onMouseMove={handleMove}
      onMouseLeave={() => setHoverId(null)}
    >
      <div className="container pindex-head">
        <p className="eyebrow pindex-eyebrow">{t('projects.eyebrow')}</p>
        <h2 id="pindex-title">{t('projects.title')}</h2>
        <p className="pindex-lead">{t('projects.lead')}</p>
        <p className="pindex-hint">{t('projects.hint')}</p>
      </div>

      <ol className="pindex-list">
        {projects.map((project, i) => {
          const copy = projectCopy(project, lang);
          const isOpen = openId === project.id;
          const panelId = `pindex-panel-${project.id}`;

          return (
            <li
              key={project.id}
              className={`pindex-row ${isOpen ? 'is-open' : ''} ${
                hoverId === project.id ? 'is-hovered' : ''
              }`}
            >
              <button
                type="button"
                className="pindex-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : project.id)}
                onMouseEnter={() => setHoverId(project.id)}
                onFocus={() => setHoverId(null)}
              >
                <span className="container pindex-trigger-inner">
                  <span className="pindex-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pindex-place">{project.place}</span>
                  <span className="pindex-title">{copy.title}</span>
                  <span className="pindex-year">{project.year}</span>
                  <span className="pindex-sign" aria-hidden="true" />
                </span>
              </button>

              <div className="pindex-panel" id={panelId} hidden={!isOpen}>
                <div className="container pindex-panel-inner">
                  <div className="pindex-panel-copy">
                    <p className="pindex-summary">{copy.summary}</p>
                    <p className="pindex-scope-label">{t('projects.scope')}</p>
                    <ul className="pindex-scope">
                      {copy.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pindex-shots">
                    {project.images.map((src, index) => (
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
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {finePointer && (
        <div className="pindex-follow" ref={followRef} aria-hidden="true">
          <div
            className={`pindex-follow-card ${preview ? 'is-visible' : ''}`}
          >
            {preview && (
              <>
                <img src={preview.images[0]} alt="" />
                <span className="pindex-follow-title">{previewCopy.title}</span>
                <span className="pindex-follow-meta">
                  {preview.place} · {preview.year}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
