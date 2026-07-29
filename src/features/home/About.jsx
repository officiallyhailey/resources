import { ABOUT } from '@/content/about';

// The lead is split into words here rather than in CSS so each can carry its
// own transition delay - the reveal reads as a sentence assembling, not a block
// fading. `white-space: pre` on .word preserves the trailing space.
const REVEAL_MS = 700;

export default function About() {
  const words = ABOUT.lead.trim().split(/\s+/);
  // A flat per-word delay makes a long lead crawl: 50 words at 26ms runs for
  // 1.3s. Capping the total keeps any length landing in about the same time.
  const step = Math.min(26, REVEAL_MS / words.length);

  return (
    <section id="about">
      <div className="wrap">
        <div className="about">
          <div>
            <p className="idx rv">03 - About</p>
            <h2 className="sectitle rv" style={{ marginBottom: '2rem' }}>
              The full <span className="o">picture</span>
            </h2>
            <p className="bigtext" data-words>
              {words.map((w, i) => (
                <span className="word" key={`${w}-${i}`} style={{ transitionDelay: `${Math.round(i * step)}ms` }}>
                  {`${w} `}
                </span>
              ))}
            </p>
            {ABOUT.body.map((t) => (
              <p className="bodytext rv" key={t.slice(0, 32)}>
                {t}
              </p>
            ))}
            <div className="facts rv">
              {ABOUT.facts.map((f) => (
                <div className="fact" key={f.label}>
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noopener noreferrer">
                      {f.label}
                    </a>
                  ) : (
                    <span>{f.label}</span>
                  )}
                  <b>{f.year ?? ''}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="sticky rv">
            <div className="pcard-me">
              <div className="pc-art">
                <span className="pc-rarity">
                  <i className="pulse" />
                  {ABOUT.card.rarity}
                </span>
                <span className="pc-no">{ABOUT.card.no}</span>
                <img src={ABOUT.card.src} alt={ABOUT.card.alt} loading="lazy" />
                <div className="pc-name">
                  <b>{ABOUT.card.name}</b>
                  <span>{ABOUT.card.title}</span>
                </div>
              </div>
              <div className="pc-stats">
                {ABOUT.card.stats.map((s2) => (
                  <div className="pc-stat" key={s2.k}>
                    <b>{s2.v}</b>
                    <span>{s2.k}</span>
                  </div>
                ))}
              </div>
              <div className="pc-foot">
                {ABOUT.card.foot.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
