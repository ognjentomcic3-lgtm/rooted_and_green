import { useI18n } from '../i18n/context.js';
import {
  achievementCopy,
  achievements,
  testimonialCopy,
  testimonials,
} from '../data/testimonialsData.js';
import './WhyUs.css';

// The last part of the homepage, after the services, in two rows: what three
// customers say about the work, then what the years since 2017 add up to.
//
// The second row carries its own eyebrow and heading because without one the
// numbers would read as a fourth reference card rather than a separate claim.
export default function WhyUs() {
  const { t, lang } = useI18n();

  return (
    <section className="wy" id="why-us" aria-labelledby="wy-title">
      <div className="container">
        <div className="wy-head">
          <p className="eyebrow">{t('whyUs.eyebrow')}</p>
          <h2 id="wy-title">{t('whyUs.title')}</h2>
          <p className="lead">{t('whyUs.lead')}</p>
        </div>

        {/* Row one: the references. */}
        <ul className="wy-refs">
          {testimonials.map((person) => {
            const copy = testimonialCopy(person, lang);

            return (
              <li key={person.id}>
                <figure className="card wy-ref">
                  {/* A figcaption is allowed to lead as well as trail, and
                      leading is what puts the face and the name above the
                      words — the order the card is meant to be read in —
                      without asking CSS to shuffle the DOM behind a screen
                      reader's back. */}
                  <figcaption className="wy-ref-who">
                    {/* The avatar is decorative on purpose. The only thing it
                        conveys is whose words follow, and that name is set in
                        text directly beneath it; given alt text it would be
                        announced twice over. */}
                    <img
                      className="wy-avatar"
                      src={person.avatar}
                      alt=""
                      width="160"
                      height="160"
                      loading="lazy"
                    />
                    <span className="wy-ref-name">{person.name}</span>
                    <span className="wy-ref-place">{person.place}</span>
                  </figcaption>

                  <blockquote className="wy-ref-quote">
                    <p>{copy.quote}</p>
                  </blockquote>
                </figure>
              </li>
            );
          })}
        </ul>

        {/* Row two: the tally. */}
        <div className="wy-tally-head">
          <p className="eyebrow">{t('whyUs.tally.eyebrow')}</p>
          <h3 id="wy-tally-title">{t('whyUs.tally.title')}</h3>
        </div>

        <ul className="wy-tally" aria-labelledby="wy-tally-title">
          {achievements.map((achievement) => {
            const copy = achievementCopy(achievement, lang);

            return (
              <li className="wy-stat" key={achievement.id}>
                <p className="wy-stat-value">{achievement.value}</p>
                <p className="wy-stat-label">{copy.label}</p>
                <p className="wy-stat-note">{copy.note}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
