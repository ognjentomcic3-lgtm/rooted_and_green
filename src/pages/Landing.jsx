import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts.js';
import PostCard from '../components/PostCard.jsx';
import './Landing.css';

const services = [
  {
    icon: '🌱',
    title: 'Garden Design',
    text: 'Bespoke planting plans and layouts that suit your space, soil, and the way you like to live outdoors.',
  },
  {
    icon: '✂️',
    title: 'Planting & Maintenance',
    text: 'Seasonal care, pruning, feeding, and tidy-ups that keep your borders looking their best all year.',
  },
  {
    icon: '🌻',
    title: 'Wildlife & Meadows',
    text: 'Pollinator borders, wildflower meadows, and habitats that make your garden hum with life.',
  },
  {
    icon: '🪴',
    title: 'Containers & Courtyards',
    text: 'Lush pot displays and small-space schemes that turn balconies and patios into green retreats.',
  },
];

export default function Landing() {
  const { getAll } = usePosts();
  const latest = getAll().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Garden design &amp; maintenance</p>
            <h1>
              Gardens that <span className="hero-accent">grow with you.</span>
            </h1>
            <p className="lead">
              Rooted &amp; Green designs, plants, and cares for beautiful,
              wildlife-friendly gardens. Practical advice, honest craft, and a
              love of growing things.
            </p>
            <div className="hero-actions">
              <Link to="/blog" className="btn btn-primary">
                Explore the blog
              </Link>
              <a href="#services" className="btn btn-outline">
                Our services
              </a>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="https://picsum.photos/seed/rooted-green-hero/900/1100"
              alt="A lush, thriving garden border in full growth"
              width="900"
              height="1100"
              fetchPriority="high"
            />
            <div className="hero-badge card">
              <span aria-hidden="true">🌿</span>
              <div>
                <strong>Rooted &amp; Green</strong>
                <span>Growing gardens since day one</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we do</p>
            <h2>Care for every corner of your garden</h2>
            <p className="lead mx-auto text-center">
              From first sketch to seasonal upkeep, we help your outdoor space
              flourish.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card card" key={s.title}>
                <span className="service-icon" aria-hidden="true">
                  {s.icon}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="section blog-teaser">
        <div className="container">
          <div className="section-head-row">
            <div>
              <p className="eyebrow">From the potting shed</p>
              <h2>Latest from the blog</h2>
            </div>
            <Link to="/blog" className="btn btn-ghost">
              View all posts
            </Link>
          </div>
          {latest.length > 0 ? (
            <div className="posts-grid">
              {latest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="lead">No posts yet — check back soon.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <div className="cta-copy">
              <h2>Ready to grow something wonderful?</h2>
              <p className="lead">
                Whether you dream of a wildflower meadow or simply want tidy,
                healthy borders, we would love to help your garden thrive.
              </p>
            </div>
            <Link to="/blog" className="btn btn-primary">
              Start reading
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
