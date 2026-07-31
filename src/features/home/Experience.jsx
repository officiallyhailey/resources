import { useEffect, useRef } from 'react';
import {
  siAirtable, siAnthropic, siCplusplus, siExpress, siFigma, siGithub, siGoogle,
  siJavascript, siMapbox, siNextdotjs, siNodedotjs, siPostgresql, siPython,
  siReact, siShopify, siSquare, siSquarespace, siTypescript, siVercel, siVite,
  siWordpress,
} from 'simple-icons';
import { CAPABILITIES, JOBS } from '@/content/about';

// Named imports so only the marks actually used are bundled.
const ICONS = {
  siAirtable, siAnthropic, siCplusplus, siExpress, siFigma, siGithub, siGoogle,
  siJavascript, siMapbox, siNextdotjs, siNodedotjs, siPostgresql, siPython,
  siReact, siShopify, siSquare, siSquarespace, siTypescript, siVercel, siVite,
  siWordpress,
};

export function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <p className="idx rv">04 - Toolkit</p>
        <h2 className="sectitle rv" style={{ marginBottom: '.6rem' }}>
          Current tech stacks <span className="o">&amp; what&apos;s next</span>
        </h2>
        <p className="idx rv" style={{ marginBottom: '2rem', maxWidth: '52ch' }}>
          The stack I reach for today - and the tools I&apos;m  adding.
        </p>
        <div className="caps">
          {CAPABILITIES.map((c) => (
            <div className={`capgrp rv${c.growing ? ' growing' : ''}`} key={c.k}>
              <b>{c.k}</b>
              <div className="capitems">
                {c.items.map((it) => {
                  const icon = it.i ? ICONS[it.i] : null;
                  return (
                    <span className="capitem" key={it.n}>
                      {icon && (
                        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: `#${icon.hex}` }}>
                          <path d={icon.path} />
                        </svg>
                      )}
                      {it.n}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const tlRef = useRef(null);
  const fillRef = useRef(null);

  // The rule fills as the timeline scrolls past. Driven from a rAF-throttled
  // scroll listener rather than animation-timeline, which is Chromium-only -
  // the mock used it and it silently did nothing in Safari and Firefox.
  //
  // The height is written straight to the node rather than held in state. It
  // changes on virtually every scroll frame, so setState here re-rendered the
  // whole section continuously while scrolling - cheap on a desktop, but on a
  // phone it competed with the nav's own scroll listener and made the page feel
  // like it had stopped scrolling altogether. Nothing else reads this value, so
  // there is no reason for React to know about it.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = tlRef.current;
        const bar = fillRef.current;
        if (el && bar) {
          const r = el.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / r.height));
          bar.style.height = `${p * 100}%`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="experience">
      <div className="wrap">
        <p className="idx rv">05 - Experience</p>
        <h2 className="sectitle rv" style={{ marginBottom: '2.5rem' }}>
          Where I&apos;ve <span className="o">worked</span>
        </h2>
        <div className="tl" ref={tlRef}>
          <span className="tl-fill" ref={fillRef} />
          {JOBS.map((j) => (
            <div className="job rv" key={j.title}>
              <p className="mono">{j.period}</p>
              <h3>{j.title}</h3>
              <p className="co">{j.company}</p>
              <ul>
                {j.points.map((p) => (
                  <li key={p.slice(0, 32)}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
