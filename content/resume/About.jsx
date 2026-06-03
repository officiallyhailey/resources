import GlassCard from './GlassCard';

export default function About() {
  return (
    <div className="section-wrap" id="about">
      <div className="reveal">
        <p className="section-label">About</p>
        <h2 className="section-title">The full picture</h2>
      </div>

      <div className="about-grid">
        <GlassCard className="about-card reveal reveal-delay-1">
          <p>
            Operations-focused leader with 4+ years of experience in team management,
            procurement, and business development. Proven at building scalable systems,
            optimizing and automating workflows, and translating operational data into
            clear, actionable insights. Covered everything from supply chain logistics to customer experience for 2025's Top 100 Coffee Shops in the world!
          </p>
          <p>
            Known for creating structure, improving efficiency, and supporting leadership
            through data-informed decision-making — with a design eye that makes the
            output actually useful to look at.
          </p>
          <a
            href="https://silkcitycoffee.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-link"
          >
            Top 100 Coffee Shop's Website →
          </a>
        </GlassCard>

        <div className="about-sidebar">
          <GlassCard className="about-mini reveal reveal-delay-2">
            <p className="mini-label">Education</p>
            <div className="edu-item">
              <span className="edu-year">2023</span>
              <span>Programming Certification</span>
            </div>
              <div className="edu-item">
              <span className="edu-year">2023</span>
              <span>HR Certification</span>
            </div>
            <div className="edu-item">
              <span className="edu-year">2026</span>
              <span>Back End Certification - In Progress</span>
            </div>
          </GlassCard>

          <GlassCard className="about-mini reveal reveal-delay-3">
            <p className="mini-label">Find me</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://github.com/officiallyhailey"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link"
                style={{ fontSize: '0.88rem' }}
              >
                GitHub →
              </a>
              <a
                href="https://anavahdesigns.com/resources"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link"
                style={{ fontSize: '0.88rem' }}
              >
                Portfolio →
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
