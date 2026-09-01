import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts.js';
import { useI18n } from '../i18n/context.js';
import { localizePost } from '../i18n/posts.js';
import PostForm from '../components/PostForm.jsx';
import './AdminDashboard.css';

// view: 'list' | 'create' | 'edit'
export default function AdminDashboard() {
  const { getAll, create, update, remove } = usePosts();
  const { lang, t, categoryLabel, formatDate } = useI18n();
  const posts = getAll();
  const [view, setView] = useState('list');
  const [editing, setEditing] = useState(null);

  const startCreate = () => {
    setEditing(null);
    setView('create');
  };
  const startEdit = (post) => {
    setEditing(post);
    setView('edit');
  };
  const backToList = () => {
    setEditing(null);
    setView('list');
  };

  const handleSubmit = (data) => {
    if (view === 'edit' && editing) {
      update(editing.id, data);
    } else {
      create(data);
    }
    backToList();
  };

  const handleDelete = (post) => {
    const title = localizePost(post, lang).title;
    if (window.confirm(t('admin.deleteConfirm', { title }))) {
      remove(post.id);
    }
  };

  return (
    <section className="section admin">
      <div className="container">
        <div className="admin-head">
          <div>
            <p className="eyebrow">{t('admin.eyebrow')}</p>
            <h1>
              {view === 'list'
                ? t('admin.list.title')
                : view === 'edit'
                  ? t('admin.edit.title')
                  : t('admin.new.title')}
            </h1>
            <p className="lead">
              {view === 'list' ? t('admin.list.lead') : t('admin.form.lead')}
            </p>
          </div>
          {view === 'list' && (
            <button className="btn btn-primary" onClick={startCreate}>
              + {t('admin.newProject')}
            </button>
          )}
        </div>

        {view === 'list' ? (
          <>
            <div className="admin-stats">
              <div className="stat card">
                <span className="stat-num">{posts.length}</span>
                <span className="stat-label">{t('admin.stats.projects')}</span>
              </div>
              <div className="stat card">
                <span className="stat-num">
                  {new Set(posts.map((p) => p.category)).size}
                </span>
                <span className="stat-label">{t('admin.stats.categories')}</span>
              </div>
              <div className="stat card">
                <span className="stat-num">
                  {new Set(posts.map((p) => p.author)).size}
                </span>
                <span className="stat-label">{t('admin.stats.authors')}</span>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="admin-empty card">
                <span aria-hidden="true">🌱</span>
                <h3>{t('admin.empty.title')}</h3>
                <p>{t('admin.empty.text')}</p>
                <button className="btn btn-primary" onClick={startCreate}>
                  + {t('admin.newProject')}
                </button>
              </div>
            ) : (
              <div className="table-wrap card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>{t('admin.table.project')}</th>
                      <th>{t('admin.table.category')}</th>
                      <th>{t('admin.table.author')}</th>
                      <th>{t('admin.table.date')}</th>
                      <th className="col-actions">{t('admin.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td>
                          <div className="cell-post">
                            <img
                              src={post.coverImage}
                              alt=""
                              className="cell-thumb"
                              loading="lazy"
                            />
                            <div>
                              <Link
                                to={`/projects/${post.slug}`}
                                className="cell-title"
                              >
                                {localizePost(post, lang).title}
                              </Link>
                              <span className="cell-slug">/{post.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge">
                            {categoryLabel(post.category)}
                          </span>
                        </td>
                        <td className="cell-muted">{post.author}</td>
                        <td className="cell-muted">{formatDate(post.date)}</td>
                        <td className="col-actions">
                          <div className="row-actions">
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => startEdit(post)}
                            >
                              {t('admin.action.edit')}
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(post)}
                            >
                              {t('admin.action.delete')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className="admin-form-panel card">
            <button className="post-back" onClick={backToList}>
              ← {t('admin.back')}
            </button>
            <PostForm
              initial={editing}
              onSubmit={handleSubmit}
              onCancel={backToList}
            />
          </div>
        )}
      </div>
    </section>
  );
}
