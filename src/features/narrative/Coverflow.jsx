import { useCallback, useEffect, useRef, useState } from 'react';
import { DEPTH, KIND, WORK } from '@/content/narrative';
import { clamp } from './typewriter';

// Distance around the ring, so the first card and the last are neighbours.
function ringDist(i, from, n) {
  let d = i - from;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

const cardWidth = () => clamp(window.innerWidth * 0.26, 230, 340);

/* The Up and running deck: the work as a coverflow, dealt out of a single
   stack. This is how the work is shown on a phone or tablet, where the ring
   behind the profile card is dropped.

   Positions are written as custom properties straight onto the nodes rather
   than held in state - they change on every arrow press and every resize, and
   nothing else needs to know them. */
export default function Coverflow({ fan, onOpen }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const dragX = useRef(null);
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      WORK.findIndex((p) => p.key === 'devdeck')
    )
  );

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const n = WORK.length;
    const cw = cardWidth();
    [...track.querySelectorAll('.fcard')].forEach((c, i) => {
      const d = ringDist(i, active, n);
      const rank = Math.min(Math.abs(d), DEPTH.length - 1);
      const step = DEPTH[rank];
      c.style.setProperty('--cw', `${cw}px`);
      c.style.setProperty('--x', `${Math.sign(d) * step.x * cw}px`);
      c.style.setProperty('--s', step.s);
      c.style.setProperty('--o', step.o);
      c.style.setProperty('--b', `${step.b}px`);
      c.style.setProperty('--sat', step.sat);
      c.style.setProperty('--br', step.br);
      c.style.setProperty('--z', String(50 - Math.abs(d)));
      c.classList.toggle('is-center', d === 0);
      const btn = c.querySelector('.fhit');
      btn.tabIndex = d === 0 ? 0 : -1;
    });
  }, [active]);

  useEffect(() => {
    paint();
    window.addEventListener('resize', paint);
    return () => window.removeEventListener('resize', paint);
  }, [paint]);

  // The fan: the cards leave one stack at the centre and deal out to their
  // places. A synchronous reflow rather than rAF, because rAF is deferred
  // while the tab is backgrounded and the cards would sit invisible until it
  // resumed.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!fan || !wrap || wrap.classList.contains('fanned')) return undefined;
    paint();
    wrap.classList.add('fanning');
    void wrap.offsetWidth;
    wrap.classList.add('fanned');
    const t = setTimeout(() => wrap.classList.remove('fanning'), 1150);
    return () => clearTimeout(t);
  }, [fan, paint]);

  const goTo = (i) => setActive(((i % WORK.length) + WORK.length) % WORK.length);

  return (
    <>
      <div
        className="flow"
        ref={wrapRef}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(active - 1);
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(active + 1);
          }
        }}
      >
        <div
          className="flow-track"
          ref={trackRef}
          onPointerDown={(e) => {
            dragX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (dragX.current === null) return;
            const dx = e.clientX - dragX.current;
            dragX.current = null;
            if (Math.abs(dx) > 45) goTo(active + (dx < 0 ? 1 : -1));
          }}
          onPointerCancel={() => {
            dragX.current = null;
          }}
        >
          {WORK.map((p, i) => (
            <article className="fcard" key={p.key}>
              <button
                className="fhit"
                aria-label={
                  i === active ? `Open the ${p.title} breakdown` : `Bring ${p.title} forward`
                }
                onClick={() => (i === active ? onOpen(p.key) : goTo(i))}
              >
                <span className="fshot">
                  <img src={p.shot} alt="" loading="lazy" />
                </span>
                <span className="fmeta">
                  <span className="frow">
                    <span className="ftag">
                      <i />
                      {p.tag}
                    </span>
                    <span className="fbadge">{KIND[p.kind]}</span>
                  </span>
                  <h3>{p.title}</h3>
                  <p className="fteaser">{p.teaser}</p>
                  <span className="fchips">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </span>
                  <span className="fcta">
                    Open the breakdown <em>&rarr;</em>
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="flow-nav fade" data-d="1">
          <button onClick={() => goTo(active - 1)} aria-label="Previous project">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flow-dots">
            {WORK.map((p, i) => (
              <button
                key={p.key}
                className={i === active ? 'on' : undefined}
                aria-label={`Go to ${p.title}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button onClick={() => goTo(active + 1)} aria-label="Next project">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
