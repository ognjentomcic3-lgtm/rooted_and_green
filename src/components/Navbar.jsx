import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
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
            <span className="brand-tag">Gardens that live with you</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={close}>
            Home
          </NavLink>
          <NavLink to="/blog" onClick={close}>
            Blog
          </NavLink>
          <NavLink to="/admin" onClick={close}>
            Admin
          </NavLink>
          <Link to="/blog" className="btn btn-primary btn-sm nav-cta" onClick={close}>
            Read the blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
