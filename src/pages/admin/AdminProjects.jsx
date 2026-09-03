import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Picture } from '../../components/Gallery.jsx';
import { MAX_FEATURED, usePosts } from '../../hooks/usePosts.js';
import { useI18n } from '../../i18n/context.js';
import { localizePost } from '../../i18n/posts.js';
import './AdminProjects.css';

// The detail pane for /admin/projects: the whole list, the checkboxes that put
// a project on the landing page, and the two row actions. Editing is not done
// here — Edit leaves the split shell for /admin/projects/:id/edit, which is
// what the client asked for.
export default function AdminProjects() {
  const { posts, remove, setFeatured } = usePosts();
  const { lang, t, formatDate } = useI18n();

  // setFeatured() refuses a fourth and returns false. The boxes are disabled
  // before it can come to that, but a disabled box is a courtesy, not the rule,
  // and the refusal has to be visible when it happens anyway.
  const [refused, setRefused] = useState(false);

  const featuredCount = posts.filter((p) => p.featured).length;
  const limitReached = featuredCount >= MAX_FEATURED;

  const toggleFeatured = (post) => {
    setRefused(!setFeatured(post.id, !post.featured));
  };

  const handleDelete = (post, title) => {
    if (window.confirm(t('admin.projects.deleteConfirm', { title }))) {
      remove(post.id);
    }
  };

  return (
    <div className="admp-pane">
      <div className="admp-head">
        <div className="admp-head-text">
          <h1>{t('admin.projects.title')}</h1>
          <p className="lead">{t('admin.projects.lead')}</p>
          {/* The counter sits with the heading so the cap is known before
              anyone reaches for a box that will not tick. */}
          <p className={`admp-count ${limitReached ? 'is-full' : ''}`}>
            {t('admin.featured.count', { count: featuredCount })}
          </p>
        </div>
        <Link to="/admin/projects/new" className="btn btn-primary">
          {t('admin.projects.new')}
        </Link>
      </div>

      {refused && (
        <p className="admp-notice" role="status">
          {t('admin.featured.limitReached')}
        </p>
      )}

      {posts.length > 0 ? (
        <div className="admp-table-wrap card">
          <table className="admp-table">
            <thead>
              <tr>
                <th scope="col" className="admp-col-check">
                  {t('admin.projects.col.featured')}
                </th>
                <th scope="col">{t('admin.projects.col.project')}</th>
                <th scope="col">{t('admin.projects.col.date')}</th>
                <th scope="col" className="admp-col-actions">
                  {t('admin.projects.col.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const copy = localizePost(post, lang);
                const blocked = limitReached && !post.featured;
                const reason = blocked
                  ? t('admin.featured.limitReached')
                  : undefined;

                return (
                  <tr key={post.id}>
                    <td className="admp-col-check">
                      <label className="admp-check" title={reason}>
                        <input
                          type="checkbox"
                          checked={Boolean(post.featured)}
                          disabled={blocked}
                          title={reason}
                          onChange={() => toggleFeatured(post)}
                        />
                        {/* Hidden beside the column header on desktop, spelled
                            out once the table stacks and the header is gone. */}
                        <span className="admp-check-text">
                          {t('admin.featured.label')}
                        </span>
                      </label>
                    </td>

                    <td>
                      <div className="admp-cell-project">
                        {/* Through the same resolution the public site uses:
                            `coverImage` went with the v2 post shape, and
                            `coverImageId` holds either a library id or a plain
                            URL. */}
                        <Picture
                          idOrUrl={post.coverImageId}
                          alt=""
                          className="admp-thumb"
                          width={58}
                          height={44}
                        />
                        <span>
                          <span className="admp-title">{copy.title}</span>
                          <span className="admp-slug">/{post.slug}</span>
                        </span>
                      </div>
                    </td>

                    <td className="admp-muted">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </td>

                    <td className="admp-col-actions">
                      <div className="admp-row-actions">
                        <Link
                          to={`/admin/projects/${post.id}/edit`}
                          className="btn btn-ghost btn-sm"
                        >
                          {t('admin.projects.edit')}
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(post, copy.title)}
                        >
                          {t('admin.projects.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admp-empty card">
          <span aria-hidden="true">🌱</span>
          <h2>{t('admin.projects.empty.title')}</h2>
          <p>{t('admin.projects.empty.text')}</p>
          <Link to="/admin/projects/new" className="btn btn-primary">
            {t('admin.projects.new')}
          </Link>
        </div>
      )}
    </div>
  );
}
