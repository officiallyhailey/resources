import { useEffect, useRef, useState } from 'react';
import {
  ABOUT_BODY,
  ABOUT_FACTS,
  ABOUT_LEAD,
  BRAND,
  CONTACT_LINKS,
  SCRIPT,
} from '@/content/narrative';
import { JOBS } from '@/content/about';
import Coverflow from './Coverflow';
import Toolkit from './Toolkit';
import Typed from './Typed';
import { playGroup, REDUCED, wait } from './typewriter';

/* One file per section would be four files of about thirty lines each. They
   live together instead, in the running order, so the shape of the page can be
   read top to bottom.

   Every section takes the same two props:
     shown    this panel has been reached, and may start playing
     onReady  its own sequence has finished; raise the gate
   A section with nothing to play calls onReady straight away. */

// `.fade` lifts its content in; `.in` is what starts it. It is sticky, so a
// section the reader goes back to is still there rather than fading out again.
const fade = (shown, extra = '') => `fade${extra ? ` ${extra}` : ''}${shown ? ' in' : ''}`;

/* ── the work, as a deck ────────────────────────────────────────────
   Small screens only. On desktop the work is already ringed behind the
   profile card in the intro, and a second pass at the same six projects is a
   repeat rather than a browse. */
export function WorkPanel({ shown, onReady, onOpen }) {
  const rootRef = useRef(null);
  const [fan, setFan] = useState(false);

  useEffect(() => {
    if (!shown) return undefined;
    let cancelled = false;
    const root = rootRef.current;
    // heading first, then the cards land, and only THEN the note - typing all
    // three before the fan left a big empty stage for several seconds
    playGroup(root.querySelector('.sec-head'))
      .then(() => {
        if (cancelled) return null;
        setFan(true);
        onReady();
        return wait(REDUCED ? 0 : 420);
      })
      .then(() => {
        if (!cancelled) playGroup(root.querySelector('.pilenote'));
      });
    return () => {
      cancelled = true;
    };
  }, [shown, onReady]);

  return (
    <div className="panel-inner" ref={rootRef}>
      <div className="wrap">
        <div className="sec-head">
          <p className="mono idx">
            <Typed text={SCRIPT.workIdx} wrap={40} />
          </p>
          <h2 className="sectitle">
            <Typed text={SCRIPT.workTitle} wrap={26} />
          </h2>
        </div>
      </div>

      <Coverflow fan={fan} onOpen={onOpen} />

      <div className="wrap">
        <p className="pilenote mono" style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Typed text={SCRIPT.workNote} wrap={40} />
        </p>
      </div>
    </div>
  );
}

/* ── the full picture ───────────────────────────────────────────────── */
export function AboutPanel({ shown, onReady }) {
  useEffect(() => {
    if (shown) onReady();
  }, [shown, onReady]);

  return (
    <div className="panel-inner">
      <div className="wrap">
        <div className={fade(shown, 'sec-head')}>
          <p className="mono idx">02 · About</p>
          <h2 className="sectitle">
            The full <em>picture</em>
          </h2>
        </div>

        {/* no profile card here: it has already had its moment in the intro,
            and repeating it makes this section read as a rerun */}
        <div className="about">
          <div className={fade(shown)} data-d="1">
            <p className="lead">{ABOUT_LEAD}</p>
            <p className="body">{ABOUT_BODY}</p>
          </div>
          <div className={fade(shown)} data-d="2">
            <div className="facts">
              {ABOUT_FACTS.map((f) => (
                <div className="fact" key={f.label}>
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noopener noreferrer">
                      {f.label}
                    </a>
                  ) : (
                    <span>{f.label}</span>
                  )}
                  <b>{f.year || ''}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── where I've worked ──────────────────────────────────────────────
   Nothing scrolls any more, so the rule down the side draws itself once the
   panel is reached rather than following a scroll position. */
export function ExperiencePanel({ shown, onReady }) {
  const fillRef = useRef(null);

  useEffect(() => {
    if (!shown) return undefined;
    onReady();
    const t = setTimeout(
      () => {
        const bar = fillRef.current;
        if (!bar) return;
        bar.style.transition = REDUCED ? 'none' : 'height 1.6s ease-out';
        bar.style.height = '100%';
      },
      REDUCED ? 0 : 500
    );
    return () => clearTimeout(t);
  }, [shown, onReady]);

  return (
    <div className="panel-inner">
      <div className="wrap">
        <div className={fade(shown, 'sec-head')}>
          <p className="mono idx">04 · Experience</p>
          <h2 className="sectitle">
            Where I&apos;ve <em>worked</em>
          </h2>
        </div>
        <div className={fade(shown, 'tl')} data-d="1">
          <span className="tl-fill" ref={fillRef} />
          {JOBS.map((j) => (
            <div className="job" key={j.title}>
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
    </div>
  );
}

/* ── the toolkit ────────────────────────────────────────────────────
   Somewhere you arrive, read, and leave by the arrow. Leaving is the whole
   transition: the field flies up off the screen and lands on Contact. */
export function ToolkitPanel({ shown, onReady, down, launching }) {
  useEffect(() => {
    if (shown) onReady();
  }, [shown, onReady]);

  return (
    <div className="panel-inner">
      <Toolkit shown={shown} down={down} launching={launching} />
    </div>
  );
}

/* ── contact ────────────────────────────────────────────────────────── */
export function ContactPanel({ shown, onReady, onOpenForm }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!shown) return undefined;
    let cancelled = false;
    // the form opens itself once the question has finished asking
    playGroup(rootRef.current)
      .then(() => {
        if (cancelled) return null;
        onReady();
        return wait(REDUCED ? 0 : 320);
      })
      .then(() => {
        if (!cancelled) onOpenForm();
      });
    return () => {
      cancelled = true;
    };
  }, [shown, onReady, onOpenForm]);

  return (
    <div className="panel-inner" ref={rootRef}>
      {/* the question sits in the middle of the screen and the footer keeps
          the floor: without this wrapper the footer's auto margin eats the
          free space and pushes everything to the top */}
      <div className="contact-mid">
        <div className="wrap">
          <p className={fade(shown, 'mono idx')} style={{ marginBottom: '1.2rem' }}>
            05 · Contact
          </p>
          <h2 className="ask">
            <Typed text={SCRIPT.ask} wrap={24} />
          </h2>
          <div className={fade(shown, 'clinks')} data-d="2">
            {CONTACT_LINKS.map((l) => (
              <a
                className="cl"
                key={l.label}
                href={l.href}
                {...(l.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <b>{l.label}</b>
                <span>{l.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* inside the panel: a footer left as a sibling of the sections sits at
          the top of the fixed <main> and prints itself over every panel */}
      <footer>
        <div className="wrap">
          <span className="mono">
            © {new Date().getFullYear()} {BRAND}
          </span>
          <span className="mono">[ABC = true]</span>
        </div>
      </footer>
    </div>
  );
}
