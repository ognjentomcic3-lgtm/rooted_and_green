import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import './Navbar.css';

export default function Navbar() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  // The homepage header is a full-screen photograph, so the bar rides over it
  // in white until the page scrolls. Everywhere else it stays the cream bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // An open mobile menu needs its own solid background to stay readable.
  const overHero = pathname === '/' && !scrolled && !open;

  return (
    <header className={`nav ${overHero ? 'is-over-hero' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            🌿
          </span>
          <span className="brand-text">
            <span className="brand-name">Malina Garden</span>
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
          <NavLink to="/projects" onClick={close}>
            {t('nav.projects')}
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
