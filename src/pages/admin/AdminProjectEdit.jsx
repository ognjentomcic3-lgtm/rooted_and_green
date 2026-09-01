import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts.js';
import { useI18n } from '../../i18n/context.js';
import PostForm from '../../components/PostForm.jsx';
import './AdminProjectEdit.css';

const LIST_PATH = '/admin/projects';

// Serves both /admin/projects/new and /admin/projects/:id/edit. The route sits
// outside the admin split shell on purpose — the client asked for no master
// pane beside the editor — so this page carries the only chrome it has: the
// back link, the heading and the lead. PostForm does the rest exactly as it
// already does it; nothing about it is forked or reimplemented here.
export default function AdminProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { posts, create, update } = usePosts();

  // /admin/projects/new has no :id, so an absent one means "create", not
  // "missing". Only the edit route can be pointed at a project that is gone.
  const isNew = !id;

  // usePosts exposes getBySlug, not getById, and the route hands us an id — so
  // the lookup goes through the posts array. It is not a race: usePosts reads
  // localStorage synchronously inside its useState initialiser, so `posts` is
  // already the store on the very first render and the not-found branch below
  // can never flash before the store has been read.
  const post = isNew ? null : posts.find((p) => p.id === id) || null;

  const backToList = () => navigate(LIST_PATH);

  const handleSubmit = (data) => {
    if (post) {
      // `featured` is deliberately not passed or cleared here: update() keeps
      // the stored flag and ignores whatever the form round-tripped, which is
      // what stops this screen from walking past the max-3 cap. Putting a
      // project on the landing page is the list's job.
      update(post.id, data);
    } else {
      create(data);
    }
    navigate(LIST_PATH);
  };

  const backLink = (
    <Link className="admedit-back" to={LIST_PATH}>
      <span aria-hidden="true">&larr;</span> {t('admin.projects.back')}
    </Link>
  );

  if (!isNew && !post) {
    return (
      <main className="admedit">
        <div className="admedit-inner">
          {backLink}
          <div className="admedit-panel admedit-missing card">
            <h1 className="admedit-title">{t('admin.projects.notFound.title')}</h1>
            <p className="admedit-lead">{t('admin.projects.notFound.text')}</p>
            <Link className="btn btn-primary" to={LIST_PATH}>
              {t('admin.projects.notFound.back')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admedit">
      <div className="admedit-inner">
        {backLink}
        <header className="admedit-head">
          {/* No navbar out here, so the eyebrow carries the wordmark — the same
              thing the login screen does for the same reason. */}
          <p className="eyebrow">Malina Garden · {t('admin.nav.title')}</p>
          <h1 className="admedit-title">
            {isNew
              ? t('admin.projects.newTitle')
              : t('admin.projects.editTitle')}
          </h1>
          <p className="admedit-lead">{t('admin.projects.formLead')}</p>
        </header>

        <div className="admedit-panel card">
          <PostForm
            initial={post}
            onSubmit={handleSubmit}
            onCancel={backToList}
          />
        </div>
      </div>
    </main>
  );
}
