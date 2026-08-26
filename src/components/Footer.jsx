import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context.js';
import './Footer.css';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-mark" aria-hidden="true">
            🌿
          </span>
          <div>
            <p className="footer-name">Rooted &amp; Green</p>
            <p className="footer-tag">{t('footer.tagline')}</p>
          </div>
        </div>

        <nav className="footer-links" aria-label={t('footer.navLabel')}>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/blog">{t('nav.blog')}</Link>
          <Link to="/admin">{t('nav.admin')}</Link>
        </nav>

        <p className="footer-note">{t('footer.note')}</p>
      </div>
      <div className="footer-bar">
        <div className="container">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
