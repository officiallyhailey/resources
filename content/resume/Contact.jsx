import GlassCard from './GlassCard';

const items = [
  {
    icon: '✉',
    label: 'Email',
    value: 'haileydgrace@gmail.com',
    href: 'mailto:haileydgrace@gmail.com',
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://linkedin.com',
  },
  {
    icon: '✦',
    label: 'Portfolio',
    value: 'Resources Page',
    href: 'https://anavahdesigns.com/resources',
  },
];

export default function Contact() {
  return (
    <div className="section-wrap" id="contact">
      <div className="reveal">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Let's work together</h2>
      </div>

      <div className="contact-links">
        {items.map(({ icon, label, value, href }, i) => (
          <GlassCard key={label} className={`contact-item reveal reveal-delay-${i + 1}`}>
            <a
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '18px', width: '100%' }}
            >
              <span className="contact-icon">{icon}</span>
              <div>
                <p className="contact-label">{label}</p>
                <p className="contact-value">{value}</p>
              </div>
            </a>
          </GlassCard>
        ))}
      </div>

      <footer className="footer" style={{ marginTop: '80px' }}>
        © {new Date().getFullYear()} Hailey Grace &nbsp;·&nbsp; Built with React
      </footer>
    </div>
  );
}
