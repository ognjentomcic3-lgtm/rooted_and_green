import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-mark" aria-hidden="true">
            🌿
          </span>
          <div>
            <p className="footer-name">Rooted &amp; Green</p>
            <p className="footer-tag">Gardens that grow with you.</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <p className="footer-note">
          Garden design &amp; maintenance · Serving keen gardeners everywhere
        </p>
      </div>
      <div className="footer-bar">
        <div className="container">
          © {new Date().getFullYear()} Rooted &amp; Green. Grown with care.
        </div>
      </div>
    </footer>
  );
}
