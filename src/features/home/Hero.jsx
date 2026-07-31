import { useEffect, useState } from 'react';
import { PROFILE, SOCIALS } from '@/content/profile';
import profileImg from '@/assets/profile-pic.png';

// Circuit traces drawn behind the hero. Paths are static art rather than data,
// so they live here instead of in content.
const TRACES = [
  { len: 1200, d: 'M 0 240 L 190 240 L 250 300 L 470 300 L 530 360 L 900 360' },
  { len: 1100, d: 'M 120 640 L 300 640 L 360 580 L 620 580 L 690 650 L 1040 650' },
  { len: 900, d: 'M 640 90 L 640 200 L 720 280 L 720 470' },
  { len: 800, d: 'M 980 820 L 980 700 L 1080 600 L 1320 600' },
];
const NODES = [
  [190, 240], [530, 360], [360, 580], [690, 650], [720, 280], [1080, 600],
];

export default function Hero() {
  // The headline slides in line by line on mount. Driven by state rather than
  // a CSS delay chain so reduced-motion can skip straight to the end.
  const [entered, setEntered] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (entered) return undefined;
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, [entered]);

  return (
    <section className="site-hero" id="top">
      <div className="circuit">
        <img src="/img/bg-user.jpg" alt="" />
      </div>

      <svg className="traces" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        {TRACES.map((t) => (
          <path key={t.d} style={{ '--len': t.len }} d={t.d} />
        ))}
        {NODES.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
        ))}
      </svg>
      <span className="datapulse" />
      <span className="grain" />

      <div className="shell">
        <div className="hbody">
          <div className="copy">
            <p className={`eyebrow hrv${entered ? ' on' : ''}`}>{PROFILE.eyebrow}</p>

            <h1 className="hl">
              {PROFILE.headline.map((line, i) => (
                <span
                  key={line.text}
                  className={`ln${entered ? ' on' : ''}`}
                  style={{ transitionDelay: `${120 + i * 90}ms` }}
                >
                  <span className={line.style === 'accent' ? 'o' : undefined}>
                    {line.style === 'amp' && <span className="amp">&amp;</span>}
                    {line.style === 'amp' ? ` ${line.text}` : line.text}
                  </span>
                </span>
              ))}
            </h1>

            <div className={`actions hrv${entered ? ' on' : ''}`} style={{ transitionDelay: '620ms' }}>
              <a className="cta" href="#work">
                <span>See the work</span>
                <em>↓</em>
              </a>
              <div className="socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    className="soc"
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path fill="currentColor" d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="side">
            <div className={`statcard${entered ? ' on' : ''}`}>
              <div className="who">
                <img className="avatar" src={profileImg} alt={PROFILE.name} />
                <div>
                  <b>{PROFILE.name}</b>
                  <span>{PROFILE.role}</span>
                </div>
              </div>
              <hr />
              <span className="mono">By the numbers</span>
              <div className="nums">
                {PROFILE.metrics.map((m) => (
                  <div className="num" key={m.label}>
                    <b>{m.value}</b>
                    <span>{m.label}</span>
                  </div>
                ))}
                <p className="statusrow">
                  <i className="pulse" /> {PROFILE.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hfoot">
          <span className="mono">{PROFILE.strapline}</span>
        </div>
      </div>
    </section>
  );
}
