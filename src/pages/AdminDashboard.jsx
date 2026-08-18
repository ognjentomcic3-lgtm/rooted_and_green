import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts.js';
import PostForm from '../components/PostForm.jsx';
import './AdminDashboard.css';

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// view: 'list' | 'create' | 'edit'
export default function AdminDashboard() {
  const { getAll, create, update, remove } = usePosts();
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
    if (
      window.confirm(
        `Delete “${post.title}”? This cannot be undone.`,
      )
    ) {
      remove(post.id);
    }
  };

  return (
    <section className="section admin">
      <div className="container">
        <div className="admin-head">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>
              {view === 'list'
                ? 'Manage posts'
                : view === 'edit'
                  ? 'Edit post'
                  : 'New post'}
            </h1>
            <p className="lead">
              {view === 'list'
                ? 'Create, edit, and delete blog posts. Changes save to your browser and appear instantly on the public site.'
                : 'Fill in the details below. All fields marked required must be completed.'}
            </p>
          </div>
          {view === 'list' && (
            <button className="btn btn-primary" onClick={startCreate}>
              + New post
            </button>
          )}
        </div>

        {view === 'list' ? (
          <>
            <div className="admin-stats">
              <div className="stat card">
                <span className="stat-num">{posts.length}</span>
                <span className="stat-label">Total posts</span>
              </div>
              <div className="stat card">
                <span className="stat-num">
                  {new Set(posts.map((p) => p.category)).size}
                </span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat card">
                <span className="stat-num">
                  {new Set(posts.map((p) => p.author)).size}
                </span>
                <span className="stat-label">Authors</span>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="admin-empty card">
                <span aria-hidden="true">🌱</span>
                <h3>No posts yet</h3>
                <p>Create your first post to get growing.</p>
                <button className="btn btn-primary" onClick={startCreate}>
                  + New post
                </button>
              </div>
            ) : (
              <div className="table-wrap card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Post</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Date</th>
                      <th className="col-actions">Actions</th>
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
                                to={`/blog/${post.slug}`}
                                className="cell-title"
                              >
                                {post.title}
                              </Link>
                              <span className="cell-slug">/{post.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge">{post.category}</span>
                        </td>
                        <td className="cell-muted">{post.author}</td>
                        <td className="cell-muted">{formatDate(post.date)}</td>
                        <td className="col-actions">
                          <div className="row-actions">
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => startEdit(post)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(post)}
                            >
                              Delete
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
              ← Back to posts
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
