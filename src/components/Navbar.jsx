import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useI18n } from '../i18n/context.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import './Navbar.css';

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            🌿
          </span>
          <span className="brand-text">
            <span className="brand-name">Rooted &amp; Green</span>
            <span className="brand-tag">{t('nav.tagline')}</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label={t('nav.toggle')}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={close}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/blog" onClick={close}>
            {t('nav.blog')}
          </NavLink>
          <NavLink to="/admin" onClick={close}>
            {t('nav.admin')}
          </NavLink>
          <LanguageSwitcher />
          <Link to="/blog" className="btn btn-primary btn-sm nav-cta" onClick={close}>
            {t('nav.cta')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
