import HomeHero from '../components/HomeHero.jsx';
import ServicesDetail from '../components/ServicesDetail.jsx';
import WhyUs from '../components/WhyUs.jsx';

// Three parts and no more: the header, the services and the references. The
// projects keep their own pages — they no longer trail the homepage.
export default function Landing() {
  return (
    <>
      {/* Header: full-screen darkened photograph */}
      <HomeHero />

      {/* The services, in detail: text left, photograph right */}
      <ServicesDetail />

      {/* Why people stay with us: three references, then the tally. */}
      <WhyUs />
    </>
  );
}
