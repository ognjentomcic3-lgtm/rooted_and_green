import { useState } from 'react';
import { useI18n } from '../../i18n/context.js';
import { MAX_FEATURED, useTestimonials } from '../../hooks/useTestimonials.js';
import ReferenceForm from '../../components/ReferenceForm.jsx';
import './AdminReferences.css';

// The references pane: a second master-detail split, nested inside the detail
// pane of the admin shell. Unlike the projects pane, editing here does not
// navigate anywhere — the client asked for the edit mechanism to sit beside the
// list, so which reference is open is component state and never a URL.
//
// This renders into AdminLayout's <Outlet />, which is deliberately unpadded
// and unbounded, so the pane is self-contained: it fills its container and
// carries its own padding.
export default function AdminReferences() {
  const { t } = useI18n();
  const { testimonials, create, update, remove, setFeatured } =
    useTestimonials();

  const [selectedId, setSelectedId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  // Set when setFeatured() refuses. The disabled boxes already say why on
  // hover, but a mouse is not the only way to reach a checkbox.
  const [limitHit, setLimitHit] = useState(false);

  // Derived rather than stored: a reference deleted in this tab — or in another
  // one — must not leave a stale id selecting a row that is gone.
  const selected = testimonials.find((item) => item.id === selectedId) ?? null;

  const featuredCount = testimonials.filter((item) => item.featured).length;
  const capReached = featuredCount >= MAX_FEATURED;

  const startNew = () => {
    setIsCreating(true);
    setSelectedId(null);
  };

  const startEdit = (id) => {
    setIsCreating(false);
    setSelectedId(id);
  };

  const closeForm = () => {
    setIsCreating(false);
    setSelectedId(null);
  };

  const handleSubmit = (data) => {
    if (isCreating) {
      const created = create(data);
      setIsCreating(false);
      // Stay on what was just written instead of dropping back to nothing —
      // the new reference is almost always the next thing to be tweaked.
      setSelectedId(created.id);
      return;
    }
    if (selected) update(selected.id, data);
  };

  const handleDelete = (item) => {
    const message = t('admin.references.deleteConfirm', { name: item.name });
    if (!window.confirm(message)) return;
    remove(item.id);
    if (selectedId === item.id) closeForm();
  };

  // The cap lives in the hook, so this asks rather than assumes: a refusal
  // means the checkbox stays exactly where it was and the reason goes up.
  const toggleFeatured = (item) => {
    const accepted = setFeatured(item.id, !item.featured);
    setLimitHit(!accepted);
  };

  const showForm = isCreating || Boolean(selected);

  return (
    <section className="admref">
      <header className="admref-head">
        <div className="admref-headtext">
          <h1 className="admref-title">{t('admin.references.title')}</h1>
          <p className="admref-lead">{t('admin.references.lead')}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary admref-new"
          onClick={startNew}
        >
          {t('admin.references.new')}
        </button>
      </header>

      <div className="admref-split">
        <div className="admref-listpane">
          <div className="admref-listhead">
            {/* Three of three is the seeded state, so the counter is on screen
                before anybody clicks a box that will not move. */}
            <p className="admref-count">
              {t('admin.featured.count', { count: featuredCount })}
            </p>
            <p className="admref-limit" role="status">
              {limitHit ? t('admin.featured.limitReached') : ''}
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="admref-empty">
              <h2 className="admref-empty-title">
                {t('admin.references.empty.title')}
              </h2>
              <p className="admref-empty-text">
                {t('admin.references.empty.text')}
              </p>
            </div>
          ) : (
            <>
              <div className="admref-legend" aria-hidden="true">
                <span>{t('admin.references.col.featured')}</span>
                <span>{t('admin.references.col.name')}</span>
                <span>{t('admin.references.col.place')}</span>
                <span className="admref-legend-actions">
                  {t('admin.references.col.actions')}
                </span>
              </div>

              <ul className="admref-list">
                {testimonials.map((item) => {
                  const blocked = !item.featured && capReached;
                  const isSelected = selected?.id === item.id;
                  return (
                    <li
                      key={item.id}
                      className={`admref-row ${isSelected ? 'is-selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className="admref-checkbox"
                        checked={Boolean(item.featured)}
                        disabled={blocked}
                        onChange={() => toggleFeatured(item)}
                        aria-label={t('admin.featured.label')}
                        title={
                          blocked
                            ? t('admin.featured.limitReached')
                            : t('admin.featured.label')
                        }
                      />

                      <div className="admref-person">
                        <img
                          className="admref-avatar"
                          src={item.avatar}
                          alt=""
                        />
                        <button
                          type="button"
                          className="admref-name"
                          onClick={() => startEdit(item.id)}
                          aria-current={isSelected ? 'true' : undefined}
                        >
                          {item.name}
                        </button>
                      </div>

                      <span className="admref-place">{item.place}</span>

                      <span className="admref-rowactions">
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => startEdit(item.id)}
                        >
                          {t('admin.references.edit')}
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item)}
                        >
                          {t('admin.references.delete')}
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="admref-formpane">
          {showForm ? (
            <ReferenceForm
              initial={selected}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          ) : (
            /* Never a blank half-screen: with nothing picked the right side
               says so and points back at the list. */
            <div className="admref-none">
              <h2 className="admref-none-title">
                {t('admin.references.noSelection.title')}
              </h2>
              <p className="admref-none-text">
                {t('admin.references.noSelection.text')}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
