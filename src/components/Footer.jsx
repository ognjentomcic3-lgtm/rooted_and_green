import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context.js';
import logoMark from '../assets/logo-mark-light.png';
import {
  site,
  socialLinks,
  contactHref,
  phoneHref,
} from '../data/siteConfig.js';
import './Footer.css';

// Two rows on black, rendered by Layout so it sits under every page:
//   1. the ideology sentence and the one button that matters — get in touch;
//   2. everything a footer is otherwise for (brand, navigation, contact,
//      social, copyright).
export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      {/* Row 1 — the ask */}
      <div className="footer-lead">
        <div className="container footer-lead-inner">
          <p className="footer-ideology">{t('footer.ideology')}</p>
          <a href={contactHref} className="btn footer-contact-btn">
            {t('footer.contactCta')}
          </a>
        </div>
      </div>

      {/* Row 2 — the particulars */}
      <div className="footer-general">
        <div className="container footer-general-inner">
          <div className="footer-col footer-col-brand">
            <p className="footer-name">
              {/* The light cut — this row sits on black. */}
              <img className="footer-mark" src={logoMark} alt="" />
              {site.name}
            </p>
            <p className="footer-tag">{t('footer.tagline')}</p>
          </div>

          <nav className="footer-col" aria-label={t('footer.navLabel')}>
            <p className="footer-col-title">{t('footer.exploreLabel')}</p>
            <ul className="footer-list">
              <li>
                <Link to="/">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/projects">{t('nav.projects')}</Link>
              </li>
              <li>
                <Link to="/admin">{t('nav.admin')}</Link>
              </li>
            </ul>
          </nav>

          <div className="footer-col">
            <p className="footer-col-title">{t('footer.contactLabel')}</p>
            <ul className="footer-list">
              <li>
                <a href={contactHref}>{site.email}</a>
              </li>
              <li>
                <a href={phoneHref}>{site.phone}</a>
              </li>
              <li className="footer-plain">{site.address}</li>
              <li className="footer-plain">{site.hours}</li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">{t('footer.followLabel')}</p>
            <ul className="footer-list">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container footer-legal">
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <span>{t('footer.note')}</span>
        </div>
      </div>
    </footer>
  );
}
