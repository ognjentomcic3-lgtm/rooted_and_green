import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import { useI18n } from '../i18n/context.js';
import './AdminLogin.css';

// The only admin screen that is not behind the guard. There is no site navbar
// or footer here — the client asked for the admin to keep none of the site
// chrome — so the card is the whole page.
export default function AdminLogin() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!login(username, password)) {
      setError(t('login.error'));
      return;
    }

    // The guard parks the page that was asked for in location state, so a
    // deep link like /admin/projects/abc/edit survives the detour through the
    // login. A plain visit to /admin/login has no such state and goes to the
    // projects pane.
    const from = location.state?.from;
    const target = from
      ? `${from.pathname}${from.search || ''}${from.hash || ''}`
      : '/admin/projects';
    navigate(target, { replace: true });
  };

  return (
    <main className="admin-login">
      <div className="admin-login-card card">
        {/* No navbar out here, so the eyebrow carries the wordmark: it is the
            only thing on the page that says which site this is. */}
        <p className="eyebrow">Malina Garden · {t('login.eyebrow')}</p>
        <h1 className="admin-login-title">{t('login.title')}</h1>
        <p className="admin-login-lead">{t('login.lead')}</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="admin-username">{t('login.username')}</label>
            <input
              id="admin-username"
              className="input"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={Boolean(error)}
            />
          </div>

          <div className="field">
            <label htmlFor="admin-password">{t('login.password')}</label>
            <input
              id="admin-password"
              className="input"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(error)}
            />
          </div>

          {error && (
            <p className="admin-login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary admin-login-submit">
            {t('login.submit')}
          </button>
        </form>
      </div>
    </main>
  );
}
