import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.js';
import { useI18n } from '../../i18n/context.js';
import './AdminLayout.css';

// The master-detail split the client asked for: a fixed-width master pane on
// the left with the two sections, and whatever route matched on the right.
//
// The admin sits outside `Layout`, so there is no Navbar and no Footer on these
// screens (the client's decision). That makes this shell the only chrome the
// admin has: it carries the wordmark, the two sections, the way back to the
// public site and the way out of the session. Take the link back to the site
// away and a signed-in admin has no path home short of editing the URL.
export default function AdminLayout() {
  const { t } = useI18n();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // `Layout` scrolls the window back up between pages and we are not inside it,
  // so the same effect is reproduced here — without the hash branch, because no
  // admin URL carries one. Without this, switching from the bottom of a long
  // project list to References drops you halfway down a screen that starts at
  // the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const navClass = ({ isActive }) =>
    `adm-nav-link ${isActive ? 'is-active' : ''}`;

  return (
    <div className="adm-shell">
      <aside className="adm-master">
        {/* No navbar out here, so the wordmark lives in the master pane. */}
        <div className="adm-brand">
          <span className="adm-brand-name">Malina Garden</span>
          <span className="adm-brand-tag">{t('admin.nav.title')}</span>
        </div>

        <nav className="adm-nav" aria-label={t('admin.nav.label')}>
          <NavLink to="/admin/projects" className={navClass}>
            {t('admin.nav.projects')}
          </NavLink>
          <NavLink to="/admin/references" className={navClass}>
            {t('admin.nav.references')}
          </NavLink>
        </nav>

        <div className="adm-master-foot">
          <Link to="/" className="adm-site-link">
            ← {t('admin.nav.site')}
          </Link>
          <button
            type="button"
            className="btn btn-outline btn-sm adm-logout"
            onClick={handleLogout}
          >
            {t('admin.nav.logout')}
          </button>
        </div>
      </aside>

      {/* Deliberately an empty container: no padding, no max-width, no grid.
          The references pane puts a second split of its own in here and has to
          be able to fill it edge to edge, so every pane brings its own
          padding. */}
      <main className="adm-detail">
        <Outlet />
      </main>
    </div>
  );
}
