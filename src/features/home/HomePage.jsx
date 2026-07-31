import { useCallback, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import Hero from './Hero';
import Work from './Work';
import Sites from './Sites';
import About from './About';
import { Skills, Experience } from './Experience';
import Contact from './Contact';
import ContactModal from './ContactModal';
import { useReveal } from '@/hooks/useReveal';

const MARQUEE = ['Front End', 'Backend', 'Automations', 'Data Visualization', 'Next.js', 'Operations', 'AI Agents'];
import '@/styles/site.css';

// The site shell. Everything the new design renders lives inside .site-root,
// which is what keeps its tokens and generic rules off /resources while that
// page still runs the old design.
export default function HomePage() {
  const rootRef = useRef(null);
  const [lifted, setLifted] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [progress, setProgress] = useState(0);
  // The curtain is removed outright once it has lifted rather than parked
  // off-screen by a transform: a full-viewport fixed element that lingers can
  // swallow clicks, and there is nothing to gain from keeping it mounted.
  const [curtainGone, setCurtainGone] = useState(false);

  useEffect(() => {
    if (lifted) return undefined;
    const t = setTimeout(() => setLifted(true), 520);
    return () => clearTimeout(t);
  }, [lifted]);

  useEffect(() => {
    if (!lifted || curtainGone) return undefined;
    const t = setTimeout(() => setCurtainGone(true), 1100);
    return () => clearTimeout(t);
  }, [lifted, curtainGone]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A cross-link in a client-site breakdown opens the matching tier-1 case.
  // The nonce makes each click a distinct signal, so following the same link
  // twice is not swallowed as "no change".
  const [jump, setJump] = useState(null);
  // Lights up the contact headline and the floating button once the reader
  // reaches the end. Clicking Contact in the nav scrolls here, so that path is
  // covered by the same observer rather than needing its own wiring.
  const [contactLive, setContactLive] = useState(false);
  useEffect(() => {
    const el = document.getElementById('contact');
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => setContactLive(e.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const crossToProject = useCallback((key) => setJump({ key, n: (performance.now() | 0) }), []);

  // The form opens once the reader reaches the bottom - they have seen the work
  // by then, so it reads as an invitation rather than an interruption. Once per
  // session only, and never if they already opened it themselves; a popup that
  // reappears on every visit is the thing people close without reading.
  const [contactOpen, setContactOpen] = useState(false);

  // No auto-open. It fired within 120px of the bottom and ContactModal sets
  // body{overflow:hidden} while open, so reaching the end of the page locked
  // scrolling - which read as the page simply breaking. The contact section
  // lights up instead, and the floating button is always there. A timed prompt
  // could return later, but it must not lock scroll to do it.

  useReveal(rootRef);

  return (
    <div className="site-root" ref={rootRef}>
      {!curtainGone && (
        <div id="curtain" className={lifted ? 'up' : undefined} aria-hidden="true">
          <p className="cnt">
            HG <b>/</b> LOADING
          </p>
        </div>
      )}
      <div id="prog" style={{ width: `${progress}%` }} />

      <Nav />
      <Hero />

      <div className="marq" aria-hidden="true">
        <div className="marq-track">
          {/* The list is repeated ONCE END-TO-END so the loop can wrap seamlessly.
              Repeating each word individually instead reads as a stutter -
              "Backend · Backend" - which is what it was doing. */}
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={`${w}-${i}`}>{w}</span>
          ))}
        </div>
      </div>

      <Work jump={jump} />
      <Sites onCross={crossToProject} />
      <About />
      <Skills />
      <Experience />
      <Contact onOpenForm={() => setContactOpen(true)} live={contactLive} />
      {/* Always reachable - a reader who decides to get in touch three sections
          up should not have to scroll to the bottom to find how. Hidden while
          the dialog is open so it cannot sit on top of its own panel. */}
      {!contactOpen && (
        <button className={`cfab${contactLive ? ' beckon' : ''}`} onClick={() => setContactOpen(true)} aria-label="Open contact form">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 4.8-8-4.8V6l8 4.8L20 6v2.2Z"
            />
          </svg>

        </button>
      )}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
