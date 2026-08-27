import { useI18n } from '../i18n/context.js';
import { serviceGroups, serviceCopy } from '../data/servicesData.js';
import './ServicesDetail.css';

// The segment under the header: title and text on the left going through the
// services in detail, one photograph on the right.
export default function ServicesDetail() {
  const { t, lang } = useI18n();

  return (
    <section className="svc" id="services-detail" aria-labelledby="svc-title">
      <div className="container svc-inner">
        <div className="svc-copy">
          <p className="eyebrow">{t('servicesDetail.eyebrow')}</p>
          <h2 id="svc-title">{t('servicesDetail.title')}</h2>
          <p className="lead">{t('servicesDetail.lead')}</p>
          <p className="svc-body">{t('servicesDetail.body')}</p>

          <div className="svc-groups">
            {serviceGroups.map((group) => {
              const copy = serviceCopy(group, lang);
              return (
                <div className="svc-group" key={group.id}>
                  <h3>{copy.title}</h3>
                  <ul>
                    {copy.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <figure className="svc-media">
          <img
            src="https://picsum.photos/seed/rooted-green-services/900/1200"
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
