import { useId, useRef, useState } from 'react';
import * as imageStore from '../images/imageStore.js';
import { useImageLibrary, useImageUrl } from '../hooks/useImageLibrary.js';
import { useI18n } from '../i18n/context.js';
import './ImagePicker.css';

// The one control that puts a picture into a field. The props are frozen —
// several tasks are written against this exact shape:
//
//   <ImagePicker value={string|null} onChange={(id) => {}} label={string} />
//
// `value` is a library id or a legacy URL, `onChange` receives a library id,
// and `label` arrives already translated, so it is rendered as it comes and
// never goes back through t().
//
// Two things about the shape of the caller are deliberately not assumed. The
// first is that `value` follows a pick: one caller uses this as a repeated
// "add a picture" button with `value` pinned at null, appending every choice
// to a list of its own, so the empty frame has to stay usable pick after pick.
// The second is that the caller clears a `value` whose picture was deleted —
// it does not, and neither do we on its behalf. A deleted picture shows the
// missing-picture frame and says so, because quietly rewriting somebody's
// stored field is worse than telling them the truth about it.

// The four codes imageStore rejects with, mapped onto the four sentences the
// catalogue has for them. Written as a table rather than a switch so a fifth
// code appearing upstream is a missing row here, not a silently wrong message.
// Not one of imageStore's codes: a delete that fails is reported through the
// same failure list as an upload, and "the picture was not saved" is the
// wrong verb for it. This local code carries the right sentence.
const DELETE_FAILED = 'delete-failed';

const ERROR_KEYS = {
  [imageStore.IMAGE_ERROR_CODES.QUOTA]: 'picker.error.quota',
  [imageStore.IMAGE_ERROR_CODES.UNAVAILABLE]: 'picker.error.read',
  [imageStore.IMAGE_ERROR_CODES.NOT_IMAGE]: 'picker.error.type',
  [imageStore.IMAGE_ERROR_CODES.FAILED]: 'picker.error.write',
  [DELETE_FAILED]: 'picker.error.delete',
};

function errorKey(code) {
  return ERROR_KEYS[code] || ERROR_KEYS[imageStore.IMAGE_ERROR_CODES.FAILED];
}

// Intl formatters are expensive to build and this one is asked for once per
// thumbnail per render, so they are cached by locale exactly the way
// i18n/core.js caches its plural and date formatters.
const numberFormatCache = new Map();

function numberFormat(locale, digits) {
  const cacheKey = `${locale}:${digits}`;
  let formatter = numberFormatCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    numberFormatCache.set(cacheKey, formatter);
  }
  return formatter;
}

// Bytes as a person reads them. The number is formatted in the active locale —
// Serbian writes 1,4 MB where English writes 1.4 MB — but the unit symbol is
// concatenated here rather than living in the catalogue: 'KB' and 'MB' are the
// same two symbols in both languages, and a translated copy of them is only a
// translated copy to get wrong.
//
// The cut is at 1000 KB rather than 1024 so nobody is ever shown "1024 KB",
// and KB below it is whole numbers, because the third digit of a thumbnail's
// weight is noise.
function formatBytes(bytes, locale) {
  const kilobytes = Math.max(0, Number(bytes) || 0) / 1024;
  if (kilobytes < 1000) {
    return `${numberFormat(locale, 0).format(kilobytes)} KB`;
  }
  return `${numberFormat(locale, 1).format(kilobytes / 1024)} MB`;
}

// addMany() reports every file that failed separately. Ten unreadable files
// should still produce one sentence, so the failures are grouped by code and
// the file names are listed after it. The names are the visitor's own words
// and need no translation — and they are the part that says the rest of the
// batch did go in, which a bare error sentence would leave them guessing at.
function groupFailures(failed) {
  const groups = [];
  for (const failure of failed) {
    const existing = groups.find((group) => group.code === failure.code);
    if (existing) existing.names.push(failure.name);
    else groups.push({ code: failure.code, names: [failure.name] });
  }
  return groups;
}

// One picture in the grid. It is its own component because useImageUrl() is a
// hook and a hook cannot be called once per item of a list — and because the
// object URL it mints is then owned by a component that unmounts when the
// picture leaves the grid, which is what revokes it.
function LibraryPicture({ image, chosen, locale, t, onSelect, onDelete }) {
  const url = useImageUrl(image.id);

  return (
    <li className="picker-item">
      <button
        type="button"
        className={`picker-pick ${chosen ? 'is-chosen' : ''}`}
        aria-pressed={chosen}
        onClick={() => onSelect(image.id)}
      >
        <span className="picker-pick-frame">
          {url ? (
            // alt is empty on purpose: the name and the dimensions are right
            // underneath in real text, and the button reads them out already.
            <img src={url} alt="" loading="lazy" />
          ) : (
            <span className="picker-pick-blank" aria-hidden="true" />
          )}
          {chosen && <span className="picker-flag">{t('picker.selected')}</span>}
        </span>
        <span className="picker-name">{image.name}</span>
        <span className="picker-meta">
          {t('picker.meta', {
            width: image.width,
            height: image.height,
            size: formatBytes(image.size, locale),
          })}
        </span>
        <span className="sr-only">{t('picker.select')}</span>
      </button>

      <button
        type="button"
        className="btn btn-danger btn-sm picker-delete"
        onClick={(event) => {
          // The delete button is a sibling of the choose button rather than a
          // child of it — nested buttons are not legal markup — so a click
          // here cannot reach the choose button today. The call keeps that
          // true if the two are ever laid out on top of one another.
          event.stopPropagation();
          onDelete(image);
        }}
      >
        {t('picker.delete')}
      </button>
    </li>
  );
}

export default function ImagePicker({ value, onChange, label }) {
  const { t, locale } = useI18n();
  const { images, loading, error, addMany, remove } = useImageLibrary();
  const chosenUrl = useImageUrl(value);

  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  // Failures from the last write, grouped by code. Separate from the hook's
  // `error`, which is the library as a whole failing to open.
  const [failures, setFailures] = useState([]);

  const toggleRef = useRef(null);
  const fileRef = useRef(null);

  const baseId = useId();
  const labelId = `${baseId}-label`;
  const toggleId = `${baseId}-toggle`;
  const panelId = `${baseId}-panel`;
  const titleId = `${baseId}-title`;

  // A stored id whose picture is gone reads exactly like one still loading —
  // useImageUrl() returns null for both. The list is what tells them apart, so
  // the verdict waits for the list to arrive, and stands aside when the
  // library could not be opened at all: "no longer there" would be a lie about
  // a browser that simply refuses to hand its pictures over.
  const missing =
    imageStore.isLibraryId(value) &&
    !loading &&
    !error &&
    !images.some((image) => image.id === value);

  const totalBytes = images.reduce(
    (sum, image) => sum + (Number(image.size) || 0),
    0,
  );

  const close = () => {
    setOpen(false);
    setFailures([]);
    // Focus goes back where it came from. Nothing else in the panel survives
    // the close, so leaving it on a button that has just been unmounted would
    // drop a keyboard visitor at the top of the document.
    if (toggleRef.current) toggleRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape' || !open) return;
    // Stopped here so a picker inside something else that closes on Escape
    // shuts one layer per keystroke rather than two.
    event.stopPropagation();
    close();
  };

  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);
    // The input is emptied the moment the files are copied out of it, so
    // choosing the same file twice in a row still fires a change the second
    // time — an input holding the file it already gave you fires nothing.
    event.target.value = '';
    if (files.length === 0) return;

    setUploading(true);
    setFailures([]);
    // addMany() never rejects: it adds one file at a time and reports what
    // survived. Nine of ten going in must not read as a total failure, so the
    // ones that did not are named and the rest simply appear in the grid.
    addMany(files).then((outcome) => {
      setUploading(false);
      setFailures(groupFailures(outcome.failed));
    });
  };

  const handleDelete = (image) => {
    if (!window.confirm(t('picker.deleteConfirm', { name: image.name }))) return;
    remove(image.id).then(undefined, (failure) => {
      // A library that cannot be reached at all keeps its own sentence — that
      // is a different problem from this one delete going wrong, and it tells
      // the person something more useful. Everything else is a failed delete.
      const code =
        failure && failure.code === imageStore.IMAGE_ERROR_CODES.UNAVAILABLE
          ? imageStore.IMAGE_ERROR_CODES.UNAVAILABLE
          : DELETE_FAILED;
      setFailures([{ code, names: [image.name] }]);
    });
    // Nothing is done about `value` pointing at the picture just deleted. That
    // field belongs to the caller; the frame above says the picture is gone.
  };

  const handleSelect = (id) => {
    onChange(id);
    close();
  };

  return (
    <div className="picker" onKeyDown={handleKeyDown}>
      {label && (
        <span className="picker-label" id={labelId}>
          {label}
        </span>
      )}

      <div className="picker-frame">
        {chosenUrl && (
          <img
            className="picker-frame-image"
            src={chosenUrl}
            alt={t('picker.chosenAlt')}
          />
        )}
        {!chosenUrl && missing && (
          <span
            className="picker-frame-mark is-missing"
            role="img"
            aria-label={t('picker.missingAlt')}
          >
            ⚠️
          </span>
        )}
        {!chosenUrl && !missing && (
          <span className="picker-frame-mark" aria-hidden="true">
            🌿
          </span>
        )}
      </div>

      {missing && (
        <p className="picker-missing" role="status">
          {t('picker.missing')}
        </p>
      )}

      <button
        type="button"
        id={toggleId}
        ref={toggleRef}
        className="btn btn-ghost btn-sm picker-toggle"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        // The button says "choose a picture"; the label says which picture.
        // Both are read, in that order, rather than a <label> pointed at a
        // button, which is not a thing a label may point at.
        aria-labelledby={label ? `${labelId} ${toggleId}` : undefined}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {value ? t('picker.change') : t('picker.choose')}
      </button>

      {open && (
        <div
          className="picker-panel card"
          id={panelId}
          role="group"
          aria-labelledby={titleId}
        >
          {/* A paragraph rather than a heading: this component is dropped into
              a form, a list row and a block editor, and only its host knows
              what heading level would not be a jump. */}
          <div className="picker-panel-head">
            <p className="picker-panel-title" id={titleId}>
              {t('picker.title')}
            </p>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={close}
            >
              {t('picker.close')}
            </button>
          </div>

          <div className="picker-upload">
            {/* Held off-screen rather than hidden: a file input styled out of
                existence cannot be clicked in every browser, and taking it out
                of the tab order leaves the button beside it as the one way in
                for everybody. */}
            <input
              ref={fileRef}
              className="picker-file"
              type="file"
              accept="image/*"
              multiple
              tabIndex={-1}
              aria-hidden="true"
              onChange={handleFiles}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={uploading}
              onClick={() => fileRef.current && fileRef.current.click()}
            >
              {uploading ? t('picker.uploading') : t('picker.upload')}
            </button>
            <p className="hint picker-hint">{t('picker.uploadHint')}</p>
          </div>

          {failures.length > 0 && (
            <ul className="picker-failures" role="alert">
              {failures.map((group) => (
                <li key={group.code}>
                  {t(errorKey(group.code))}{' '}
                  <span className="picker-failed-names">
                    {group.names.join(', ')}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* The scroll lives on this box alone. The panel is part of the page
              rather than a sheet over it, so the page keeps scrolling normally
              everywhere else, and a grid scrolled to its end hands the rest of
              the gesture back to the page. */}
          <div className="picker-body">
            {loading && <p className="picker-state">{t('picker.loading')}</p>}

            {!loading && error && (
              <p className="picker-state is-error" role="alert">
                {t(errorKey(error.code))}
              </p>
            )}

            {!loading && !error && images.length === 0 && (
              <div className="picker-empty">
                <span aria-hidden="true">🌱</span>
                <p className="picker-empty-title">{t('picker.empty.title')}</p>
                <p className="picker-empty-text">{t('picker.empty.text')}</p>
              </div>
            )}

            {!loading && !error && images.length > 0 && (
              <ul className="picker-grid">
                {images.map((image) => (
                  <LibraryPicture
                    key={image.id}
                    image={image}
                    chosen={image.id === value}
                    locale={locale}
                    t={t}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                  />
                ))}
              </ul>
            )}
          </div>

          {!loading && !error && images.length > 0 && (
            <p className="picker-usage">
              {t('picker.count', { count: images.length })} ·{' '}
              {t('picker.usage', { size: formatBytes(totalBytes, locale) })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
