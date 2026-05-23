import logoImg from '../resources/assets/gallery/logo.png';
import headerBg from '../resources/assets/gallery/header.png';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-banner-strip" style={{ backgroundImage: `url(${headerBg})` }} />
      <div className="hero-body">
        <div className="hero-content">
          <span className="hero-tag"></span>
          <h1 className="hero-name">Hailey<br />Grace</h1>
          <p className="hero-sub">
            Building aesthetic interfaces, scalable systems, automated workflows,
            with organized operational data for clear business insights and strategic decision-making. It's like...my favorite thing to do!
          </p>
        </div>
        <div className="hero-logo-section" aria-hidden="true">
          <div className="hero-logo-glow" />
          <div className="hero-logo-ring" />
          <div className="hero-logo-ring hero-logo-ring-alt" />
          <img src={logoImg} className="hero-logo-img" alt="" />
        </div>
      </div>
    </section>
  );
}
