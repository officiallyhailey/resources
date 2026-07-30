import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/hooks/useReveal';

// Counts a metric up once, when it first appears. Numbers that simply exist
// read as decoration; numbers that arrive read as facts.
// the width the embedded site is rendered at before being scaled to fit
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

  const { live } = project;
  // Narrow screens get the platform's own mobile panels where they exist; wide
  // screens get the desktop screenshot. Nothing is embedded any more - the live
  // site is an out-link instead, which costs nothing to load and shows the real
  // thing full size rather than scaled into a frame.
  const isNarrow = typeof window !== 'undefined' && window.innerWidth <= 900;
  // Portrait mobile captures only make sense on a phone; landscape section
  // shots read at any width, so a project can opt into showing them always.
  const showPanels = !!project.panels && (project.panelsAt === 'all' || isNarrow);

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
          {/* The live site is an out-link now rather than an embed: it costs
              nothing to load and opens the real thing full size instead of
              scaled into a frame. */}
          <div className="links">
            {live?.url && (
              <a
                className="lk"
                href={live.url}
                {...(live.url.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                Open it live <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.links
              .filter((l) => l.kind !== 'soon')
              .map((l) => (
                <a className="lk" key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
          </div>
          <button className="techtoggle" aria-expanded={tech} onClick={() => setTech((v) => !v)}>
            {tech ? 'Hide the technical detail' : 'How it was built'}
            <em aria-hidden="true">{tech ? '−' : '+'}</em>
          </button>
        </div>
      </div>

      <div className="ev evwide">
        <div className="dshot">
          <div
            className={`stage${showPanels ? ' panelled' : ''}`}
            ref={setStage}
          >
            {/* Small screens cannot run the embed, so the platform's own mobile
                panels stand in. Horizontal snap-scroll, matching how the real
                thing paginates - swipe rather than a single frozen shot. */}
            {showPanels ? (
              <div className="panels">
                {project.panels.map((p) => (
                  <figure key={p.src}>
                    {/* Not lazy: these only render once the case is open, so
                        they are never wasted - and lazy left them unfetched,
                        laid out at full size but complete:false. */}
                    <img src={p.src} alt={p.alt} />
                    <figcaption>{p.label}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <img src={project.shot} alt={project.shotAlt} />
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
