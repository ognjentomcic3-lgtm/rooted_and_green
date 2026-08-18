import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center" style={{ paddingBlock: '4rem' }}>
        <p style={{ fontSize: '3rem', margin: 0 }} aria-hidden="true">
          🌾
        </p>
        <h1>Page not found</h1>
        <p className="lead mx-auto" style={{ marginBottom: '2rem' }}>
          We could not find the page you were looking for. Let’s get you back to
          the garden.
        </p>
        <Link to="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    </section>
  );
}
