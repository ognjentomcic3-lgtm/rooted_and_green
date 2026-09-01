import { useI18n } from '../i18n/context.js';
import './ServicesDetail.css';

// The segment under the header: title and text on the left going through the
// services in detail, one photograph on the right.
export default function ServicesDetail() {
  const { t } = useI18n();

  return (
    <section className="svc" id="services-detail" aria-labelledby="svc-title">
      <div className="container svc-inner">
        <div className="svc-copy">
          <p className="eyebrow">{t('servicesDetail.eyebrow')}</p>
          <h2 id="svc-title">{t('servicesDetail.title')}</h2>
          <p className="lead">{t('servicesDetail.lead')}</p>
          <p className="svc-body">{t('servicesDetail.body')}</p>
        </div>

        <figure className="svc-media">
          <img
            src="https://images.unsplash.com/photo-1524247108137-732e0f642303?w=900&h=1200&fit=crop&q=80&auto=format"
            alt={t('servicesDetail.imageAlt')}
            width="900"
            height="1200"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
