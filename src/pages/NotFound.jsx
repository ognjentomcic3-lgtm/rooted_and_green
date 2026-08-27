import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context.js';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <section className="section">
      <div className="container text-center" style={{ paddingBlock: '4rem' }}>
        <p style={{ fontSize: '3rem', margin: 0 }} aria-hidden="true">
          🌾
        </p>
        <h1>{t('notFound.title')}</h1>
        <p className="lead mx-auto" style={{ marginBottom: '2rem' }}>
          {t('notFound.text')}
        </p>
        <Link to="/" className="btn btn-primary">
          {t('notFound.home')}
        </Link>
      </div>
    </section>
  );
}
