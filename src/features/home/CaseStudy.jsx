import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/hooks/useReveal';

// Counts a metric up once, when it first appears. Numbers that simply exist
// read as decoration; numbers that arrive read as facts.
// the width the embedded site is rendered at before being scaled to fit
const EMBED_W = 1280;
const NAVH = 92;

function Metric({ to, prefix = '', suffix = '', label, run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run || to === 0) return undefined;
    let raf;
    const start = performance.now();
    const dur = 900;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);

  return (
    <div className="m">
      <b>
        {prefix}
        {n}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

function BuildPane({ build }) {
  const [step, setStep] = useState(0);
  return (
    <div className="build">
      <p className="viz-cap">{build.cap}</p>
      <div className="flow">
        {build.flow.map((f, i) => (
          <span key={f.label} style={{ display: 'contents' }}>
            {i > 0 && (
              <span className="farrow" aria-hidden="true">
                →
              </span>
            )}
            <button
              type="button"
              className={`fstep${i === step ? ' on' : ''}`}
              onClick={() => setStep(i)}
            >
              <b>{f.label}</b>
              <span>{f.sub}</span>
            </button>
          </span>
        ))}
      </div>
      <p className="fdetail">{build.flow[step].detail}</p>

      <div className="kvgrid">
        {build.kv.map(([k, v]) => (
          <div className="kv" key={k}>
            <b>{k}</b>
            <span>{v}</span>
          </div>
        ))}
      </div>

      <div className="mods">
        <b>{build.modsTitle}</b>
        {build.mods.map(([name, what, detail]) => (
          <details className="mod" key={name}>
            <summary>
              <b>{name}</b>
              <i>{what}</i>
            </summary>
            <p>{detail}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudy({ project, hidden, flip, stageRef, onNav, prev, next }) {
  const [why, setWhy] = useState(null);
  const [tech, setTech] = useState(false);
  // The screenshot is the placeholder, not an alternative: the embed fades in
  // over it once it has actually painted, so the panel is never empty and there
  // is nothing for the reader to press to make the real thing appear.
  const [frameReady, setFrameReady] = useState(false);
  // The embed renders at a desktop width and is scaled down, so the site lays
  // out like a desktop app instead of collapsing to its mobile breakpoint. The
  // factor has to be measured, not assumed - the column width is fluid.
  const [scale, setScale] = useState(0.6);
  const stageEl = useRef(null);
  const techRef = useRef(null);
  const setStage = useCallback(
    (el) => {
      stageEl.current = el;
      if (typeof stageRef === 'function') stageRef(el);
    },
    [stageRef],
  );

  // Every case stays mounted so the morph's flight target exists the moment it
  // is measured - remounting on open would null the ref. State is therefore
  // reset here on close rather than by unmounting.
  useEffect(() => {
    if (!hidden) return;
    setWhy(null);
    setTech(false);
    setFrameReady(false);
  }, [hidden]);

  // Opening the breakdown should move the reader to it - otherwise the content
  // they just asked for unfolds below the fold and nothing appears to happen.
  useEffect(() => {
    if (!tech) return;
    const el = techRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // centre it, unless it is taller than the viewport, in which case park it
    // under the nav - centring something tall scrolls past its own start
    const y = r.top + window.scrollY - Math.max(NAVH, (window.innerHeight - r.height) / 2);
    window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [tech]);

  useEffect(() => {
    if (hidden) return undefined;
    const measure = () => {
      const el = stageEl.current;
      if (el) setScale(el.getBoundingClientRect().width / EMBED_W);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [hidden]);

  const { live } = project;
  const canEmbed = !!live?.url && typeof window !== 'undefined' && window.innerWidth > 900;

  return (
    <article className={`case${flip ? ' flip' : ''}`} hidden={hidden}>
      <div className="case-top">
        <p className="case-no">{project.kicker}</p>
        <h3>{project.title}</h3>
        <p className="case-role">{project.role}</p>
        <div className="mstrip">
          {project.metrics.map((m) => (
            <Metric key={m.label} {...m} run={!hidden} />
          ))}
        </div>
      </div>

      {/* The default view carries little enough that a column split just left
          dead space - the lede reads across the top and the preview takes the
          full width, which is also the largest the embedded site can be. */}
      <div className="caselede">
        <p className="casesum">{project.card.teaser}</p>
        <div className="caselede-act">
          {project.links.some((l) => l.kind !== 'soon') && (
            <div className="links">
              {project.links
                .filter((l) => l.kind !== 'soon')
                .map((l) => (
                  <a className="lk" key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                ))}
            </div>
          )}
          <button className="techtoggle" aria-expanded={tech} onClick={() => setTech((v) => !v)}>
            {tech ? 'Hide the technical detail' : 'How it was built'}
            <em aria-hidden="true">{tech ? '−' : '+'}</em>
          </button>
        </div>
      </div>

      <div className="ev evwide">
        <div className="dshot">
          <div
            className={`stage${!canEmbed && project.panels ? ' panelled' : ''}`}
            ref={setStage}
          >
            {/* Small screens cannot run the embed, so the platform's own mobile
                panels stand in. Horizontal snap-scroll, matching how the real
                thing paginates - swipe rather than a single frozen shot. */}
            {!canEmbed && project.panels ? (
              <div className="panels">
                {project.panels.map((p) => (
                  <figure key={p.src}>
                    <img src={p.src} alt={p.alt} loading="lazy" />
                    <figcaption>{p.label}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <img
                src={project.shot}
                alt={project.shotAlt}
                loading="lazy"
                style={frameReady ? { opacity: 0 } : undefined}
              />
            )}
            {canEmbed && (
              <iframe
                className="scaler"
                src={live.url}
                title={`${project.title} - live site`}
                loading="lazy"
                onLoad={() => setFrameReady(true)}
                style={{ transform: `scale(${scale})`, opacity: frameReady ? 1 : 0 }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Everything technical lives here, closed by default. Full width because
          the architecture diagram and grouped stack need the room. */}
      <div className="tech" ref={techRef} hidden={!tech}>
        <div className="tech-grid">
          <div>
            {project.beats.map((b) => (
              <div className="beat" key={b.b}>
                <b>{b.b}</b>
                <p dangerouslySetInnerHTML={{ __html: b.p }} />
              </div>
            ))}

            <div className="stackgrid">
              {project.stack.map((g) => (
                <div className="sgrp" key={g.group}>
                  <b>{g.group}</b>
                  <div>
                    {g.chips.map((c) => (
                      <span
                        key={c.name}
                        className="chip"
                        tabIndex={0}
                        onMouseEnter={() => setWhy(c)}
                        onFocus={() => setWhy(c)}
                        onMouseLeave={() => setWhy(null)}
                        onBlur={() => setWhy(null)}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className={`whyline${why ? ' lit' : ''}`}>
              {why ? (
                <>
                  <em>{why.name}</em>
                  {why.why}
                </>
              ) : (
                "Hover or tap a technology to see why it's there."
              )}
            </p>
          </div>

          <BuildPane build={project.build} />
        </div>
      </div>

      <nav className="casenav" aria-label="Other case studies">
        <button onClick={() => onNav(prev.key)}>
          <small>← Previous</small>
          <strong>{prev.title}</strong>
        </button>
        <button onClick={() => onNav(next.key)}>
          <small>Next →</small>
          <strong>{next.title}</strong>
        </button>
      </nav>
    </article>
  );
}
