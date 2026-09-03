import ImagePicker from './ImagePicker.jsx';
import { useImageUrl } from '../hooks/useImageLibrary.js';
import { useI18n } from '../i18n/context.js';
import {
  addBlock,
  addPicture,
  moveBlock,
  movePicture,
  newImagesBlock,
  newTextBlock,
  removeBlock,
  removePicture,
  setBlockText,
} from '../i18n/posts.js';
import './BlockEditor.css';

// The body editor for a project. The props are frozen — the project form is
// written against this exact shape:
//
//   <BlockEditor blocks={array} lang={string} onChange={(blocks) => {}} />
//
// `blocks` is the v2 list, `onChange` receives the whole next list, and `lang`
// is the language tab the form is currently showing.
//
// The block list is language-neutral and the language tab only changes the
// words inside a text block. That is why the move and remove controls are not
// affected by `lang` at all, and why switching tabs must never be able to
// reorder anything: a project reads in the same order in both languages, and a
// gallery is stored once rather than once per language.

// -------------------- Thumbnails --------------------

// One picture in a picture block. It is its own component because useImageUrl
// is a hook and a hook cannot be called in a loop — a list of thumbnails needs
// a component per thumbnail, not a loop over a hook.
function PictureThumb({
  idOrUrl,
  index,
  total,
  onMoveLeft,
  onMoveRight,
  onRemove,
}) {
  const { t } = useI18n();
  const url = useImageUrl(idOrUrl);
  const position = t('editor.picturePosition', { index: index + 1, total });

  return (
    <li className="blocked-thumb">
      <span className="sr-only">{position}</span>
      {/* useImageUrl returns null both while a library picture is still being
          read and when it has gone missing, and there is no way here to tell
          those apart. So the placeholder says nothing rather than accusing a
          picture that is merely loading of not existing. */}
      {url ? (
        <img src={url} alt={t('picker.chosenAlt')} />
      ) : (
        <span className="blocked-thumb-empty" aria-hidden="true" />
      )}
      <div className="blocked-thumb-bar">
        <span className="blocked-thumb-index" aria-hidden="true">
          {index + 1}
        </span>
        <button
          type="button"
          className="blocked-thumb-btn"
          onClick={onMoveLeft}
          disabled={index === 0}
          title={t('editor.pictureLeft')}
          aria-label={t('editor.pictureLeft')}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="blocked-thumb-btn"
          onClick={onMoveRight}
          disabled={index === total - 1}
          title={t('editor.pictureRight')}
          aria-label={t('editor.pictureRight')}
        >
          <span aria-hidden="true">›</span>
        </button>
        <button
          type="button"
          className="blocked-thumb-btn is-danger"
          onClick={onRemove}
          title={t('editor.removePicture')}
          aria-label={t('editor.removePicture')}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </li>
  );
}

// -------------------- Block bodies --------------------

// The words of one text block, for the language tab the form is showing. The
// raw bundle is read here rather than localizeBlock(), on purpose: the fallback
// chain is what a *reader* should see, and starting an empty English box off
// with the Serbian text would mean the first keystroke silently turns a missing
// translation into a copy of the original.
function TextBlockBody({ block, lang, onChangeText }) {
  const { t } = useI18n();
  const textId = `be-text-${block.id}-${lang}`;
  const hintId = `be-hint-${block.id}`;
  const value = (block.i18n && block.i18n[lang] && block.i18n[lang].text) || '';

  return (
    <div className="blocked-body">
      <label className="sr-only" htmlFor={textId}>
        {t('editor.blockText')}
      </label>
      <textarea
        id={textId}
        className="textarea blocked-textarea"
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={t('editor.textPlaceholder')}
        aria-describedby={hintId}
      />
      <p className="hint blocked-hint" id={hintId}>
        {t('editor.textHint')}
      </p>
    </div>
  );
}

// The picture side of a block, plus the promise of what the public page will
// do with it. The client described that behaviour — one picture on its own,
// two or more as a slider — and the editor cannot show it, so it says it.
function ImagesBlockBody({ block, onAddPicture, onMovePicture, onRemovePicture }) {
  const { t } = useI18n();
  const imageIds = block.imageIds || [];
  const total = imageIds.length;

  let promise = t('editor.picturesEmpty');
  if (total === 1) promise = t('editor.previewSingle');
  else if (total > 1) promise = t('editor.previewGallery', { count: total });

  return (
    <div className="blocked-body">
      {total > 0 && (
        <ul className="blocked-thumbs">
          {imageIds.map((idOrUrl, i) => (
            <PictureThumb
              key={idOrUrl}
              idOrUrl={idOrUrl}
              index={i}
              total={total}
              onMoveLeft={() => onMovePicture(i, i - 1)}
              onMoveRight={() => onMovePicture(i, i + 1)}
              onRemove={() => onRemovePicture(i)}
            />
          ))}
        </ul>
      )}

      <p className="blocked-promise">{promise}</p>

      {/* The picker is used as a repeated "add one more" control rather than as
          a field: `value` stays null for ever and nothing comes back into it,
          because the block owns the list and the picker only ever names the
          next picture to append. */}
      <div className="blocked-picker">
        <ImagePicker
          value={null}
          onChange={onAddPicture}
          label={t('editor.addPicture')}
        />
      </div>
    </div>
  );
}

// -------------------- The editor --------------------

export default function BlockEditor({ blocks, lang, onChange }) {
  const { t } = useI18n();
  // A post that has never had a body has no `blocks` at all, and the form may
  // hand one over before migratePost() has been anywhere near it.
  const list = Array.isArray(blocks) ? blocks : [];
  const total = list.length;

  const handleAdd = (block) => onChange(addBlock(list, block));

  const handleMove = (index, to) => {
    const next = moveBlock(list, index, to);
    if (next !== list) onChange(next);
  };

  // window.confirm, the same as the two admin lists already use for a delete.
  // A block can hold a paragraph nobody has a second copy of, so removing one
  // asks first — and so does removing a single picture out of a block.
  const handleRemove = (index) => {
    if (!window.confirm(t('editor.removeConfirm'))) return;
    onChange(removeBlock(list, index));
  };

  const handleRemovePicture = (index, pictureIndex) => {
    if (!window.confirm(t('editor.removePictureConfirm'))) return;
    onChange(removePicture(list, index, pictureIndex));
  };

  return (
    <section className="blocked">
      <div className="blocked-head">
        <h3 className="blocked-title">{t('editor.title')}</h3>
        <p className="hint">{t('editor.hint')}</p>
      </div>

      {total === 0 ? (
        <div className="blocked-empty">
          <p className="blocked-empty-title">{t('editor.empty.title')}</p>
          <p className="hint">{t('editor.empty.text')}</p>
        </div>
      ) : (
        <div className="blocked-list">
          {list.map((block, index) => (
            <div
              key={block.id}
              className="blocked-block"
              role="group"
              aria-label={t('editor.blockPosition', {
                index: index + 1,
                total,
              })}
            >
              <div className="blocked-bar">
                <span className="blocked-kind">
                  <span className="blocked-index" aria-hidden="true">
                    {index + 1}
                  </span>
                  {block.type === 'images'
                    ? t('editor.blockImages')
                    : t('editor.blockText')}
                </span>

                {/* Honest at the ends: the first block's "move up" and the
                    last block's "move down" are disabled rather than hidden,
                    so the row keeps its width and nothing jumps sideways as
                    blocks are moved past each other. */}
                <div className="blocked-controls">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleMove(index, index - 1)}
                    disabled={index === 0}
                  >
                    {t('editor.moveUp')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleMove(index, index + 1)}
                    disabled={index === total - 1}
                  >
                    {t('editor.moveDown')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(index)}
                  >
                    {t('editor.remove')}
                  </button>
                </div>
              </div>

              {block.type === 'images' ? (
                <ImagesBlockBody
                  block={block}
                  onAddPicture={(id) => onChange(addPicture(list, index, id))}
                  onMovePicture={(from, to) =>
                    onChange(movePicture(list, index, from, to))
                  }
                  onRemovePicture={(pictureIndex) =>
                    handleRemovePicture(index, pictureIndex)
                  }
                />
              ) : (
                <TextBlockBody
                  block={block}
                  lang={lang}
                  onChangeText={(text) =>
                    onChange(setBlockText(list, index, lang, text))
                  }
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="blocked-add">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => handleAdd(newTextBlock())}
        >
          {t('editor.addText')}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => handleAdd(newImagesBlock())}
        >
          {t('editor.addImages')}
        </button>
      </div>
    </section>
  );
}
