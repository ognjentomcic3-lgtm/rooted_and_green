import { useEffect, useRef, useState } from 'react';
import { useImageUrl } from '../hooks/useImageLibrary.js';
import { isLibraryId } from '../images/imageStore.js';
import { useI18n } from '../i18n/context.js';
import './Gallery.css';

// How long a library picture is allowed to still be on its way before the
// placeholder is permitted to say it is gone. useImageUrl() hands back null
// both while a read of IndexedDB is in flight and when the record has
// vanished, and those two want different things on screen; a read that has not
// answered inside this window has, in practice, nothing to answer with. A
// plain URL waits on nothing, so it never spends this time at all.
const MISSING_AFTER_MS = 1200;

// One picture, named either by a library id or by a plain URL, with a
// placeholder standing in for the browser's broken-image icon when the picture
// is not there.
//
// This is the only place in the public site that turns a picture reference into
// pixels, and it is a component rather than a helper because useImageUrl() is a
// hook and a hook cannot be called once per item in a loop. The cover, the list
// thumbnails, the admin row thumbnails and every slide below all come through
// here, so the placeholder exists once instead of four times.
//
// `caption` is the sentence to show over a picture that is really missing —
// worth it inside the article, noise on a 58px thumbnail, so the caller says.
export function Picture({
  idOrUrl,
  alt = '',
  className,
  width,
  height,
  loading = 'lazy',
  // A cover standing as a page header is the largest thing on screen and the
  // one the browser should fetch first. It cannot be preload-scanned — the URL
  // only exists once React has rendered — so the priority hint is the whole of
  // what can be said about it. Everything else keeps the browser's own guess.
  fetchPriority,
  caption,
}) {
  const { t } = useI18n();
  const url = useImageUrl(idOrUrl);
  // A plain URL, or an empty field, has already settled before the first paint.
  const [settled, setSettled] = useState(() => !isLibraryId(idOrUrl));

  useEffect(() => {
    if (url || !isLibraryId(idOrUrl)) {
      setSettled(true);
      return undefined;
    }
    setSettled(false);
    const timer = setTimeout(() => setSettled(true), MISSING_AFTER_MS);
    return () => clearTimeout(timer);
  }, [idOrUrl, url]);

  if (url) {
    return (
      <img
        className={className}
        src={url}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
      />
    );
  }

  // A field nobody has filled in yet is not a missing picture, it is a project
  // without one — the box stays quiet rather than claiming something was lost.
  const missing = settled && Boolean(idOrUrl);
  const classes = className ? `picture-empty ${className}` : 'picture-empty';
  // Keeps the placeholder the shape the picture would have been, so nothing
  // jumps when a slow read finally lands.
  const style = width && height ? { aspectRatio: `${width} / ${height}` } : undefined;

  if (missing && caption) {
    return (
      <div className={classes} style={style}>
        <span className="picture-empty-mark" aria-hidden="true">
          🌿
        </span>
        <p className="picture-empty-text">{caption}</p>
      </div>
    );
  }

  // A decorative picture stays silent whatever becomes of it. A meaningful one
  // that is gone says so; one that may still arrive says nothing yet, because
  // announcing a loss that has not happened is worse than announcing nothing.
  const announce = missing && alt !== '';
  return (
    <div
      className={classes}
      style={style}
      role={announce ? 'img' : undefined}
      aria-label={announce ? t('picker.missingAlt') : undefined}
      aria-hidden={announce ? undefined : true}
    />
  );
}

// A picture block holding two or more pictures: one in front, a button on each
// side to move through them, and the position spelled out between them.
//
// The ends stop rather than wrap. With "3 / 5" on screen the whole point of the
// counter is that it says where you are, and jumping from the last picture back
// to the first reads as a glitch rather than a loop. So both buttons go
// `disabled` at their end and the arrow keys stop at the same place: whatever
// the buttons look like is exactly what the keyboard does.
export default function Gallery({ imageIds }) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const rootRef = useRef(null);

  const total = imageIds.length;
  const atStart = index === 0;
  const atEnd = index >= total - 1;

  const goTo = (next) => {
    setIndex(Math.min(Math.max(next, 0), total - 1));
  };

  // Bound to the gallery rather than to the window on purpose: a project with
  // two picture blocks would otherwise have both of them step on one press.
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const handleStep = (delta) => {
    const next = index + delta;
    goTo(next);
    // The button you just pressed goes disabled the moment you reach an end,
    // and a disabled button drops focus onto the document. Catching it on the
    // gallery keeps the arrow keys working from wherever the reader got to
    // instead of stranding them at the last picture.
    if (next <= 0 || next >= total - 1) {
      if (rootRef.current) rootRef.current.focus();
    }
  };

  return (
    <div
      className="gallery"
      ref={rootRef}
      role="group"
      aria-label={t('gallery.label')}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="gallery-viewport">
        <ul
          className="gallery-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {imageIds.map((idOrUrl, i) => {
            // Every slide is in the document so the track can slide, which
            // means the four nobody is looking at have to be taken out of the
            // accessibility tree by hand. Without this a screen reader reads
            // all five captions in a row as if they were one paragraph.
            const hidden = i !== index;
            return (
              <li
                className="gallery-slide"
                key={`${idOrUrl}-${i}`}
                aria-hidden={hidden ? true : undefined}
                inert={hidden ? true : undefined}
              >
                <Picture
                  idOrUrl={idOrUrl}
                  alt={t('gallery.imageAlt', { index: i + 1, total })}
                  caption={t('gallery.missing')}
                  width={800}
                  height={450}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="gallery-controls">
        <button
          type="button"
          className="btn btn-ghost gallery-step"
          onClick={() => handleStep(-1)}
          disabled={atStart}
          aria-label={t('gallery.previous')}
        >
          <span aria-hidden="true">←</span>
        </button>

        {/* Live, so moving the slider says "3 / 5" out loud. The pictures
            themselves cannot do that job — they are hidden the instant they
            stop being the one in front. */}
        <p className="gallery-position" role="status">
          {t('gallery.position', { index: index + 1, total })}
        </p>

        <button
          type="button"
          className="btn btn-ghost gallery-step"
          onClick={() => handleStep(1)}
          disabled={atEnd}
          aria-label={t('gallery.next')}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
