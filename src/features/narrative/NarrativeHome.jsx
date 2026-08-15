import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ACCENT_WALK,
  accentStep,
  ACT_ONE,
  GATES,
  NARROW_AT,
  NARROW_ONLY,
  PAGE_ORDER,
} from '@/content/narrative';
import Breakdown from './Breakdown';
import ContactForm from './ContactForm';
import Gate from './Gate';
import Stage from './Stage';
import { AboutPanel, ContactPanel, ExperiencePanel, ToolkitPanel, WorkPanel } from './sections';
import { paintAccent } from './accent';
import { clamp, REDUCED, settled, wait } from './typewriter';
import '@/styles/narrative.css';

/* The gate's distance from the foot of the screen, as a fraction of it, and
   the two overflow ratios those ends are pinned to. GATE_FULL is a panel with
   more to show than fits, GATE_SPARSE one whose content stops inside the
   screen. */
const GATE_LOW = 0.055;
const GATE_HIGH = 0.2;
const GATE_FULL = 1.12;
const GATE_SPARSE = 1;

/* The gate's own height above its bottom padding - label, gap, button - and
   the air kept between a panel's last line and that label. */
const GATE_STACK = 81;
const GATE_GAP = 14;

/* The blocks a panel is actually made of, named rather than inferred. Two
   attempts to find the lowest ink by walking the tree both failed on this
   markup: full-height decorative layers measure as content, and the last
   child in source order is not the lowest one on screen. A list is duller and
   it does not guess. */
const BLOCKS = 'h1, h2, h3, p, ul, ol, form, figure, .flow, .flow-nav, .pcard, .lanes, .arc';

const blockBottom = (p) => {
  const box = p.getBoundingClientRect();
  let bot = -Infinity;
  p.querySelectorAll(BLOCKS).forEach((el) => {
    const b = el.getBoundingClientRect();
    if (!b.height || b.top > box.bottom) return;
    bot = Math.max(bot, b.bottom);
  });
  return bot === -Infinity ? box.bottom : bot;
};

/* ══════════════════════════════════════════════════════════════════════
   THE DECK
   ══════════════════════════════════════════════════════════════════════
   The document does not scroll. Every section is a full-viewport panel,
   absolutely placed, and exactly one is active. Navigation IS this file.

   FORWARD is gated: the arrow, or the forward keys, and nothing else. Each
   section plays, stops, and waits for the reader to ask for the next one.
   BACKWARD is free: the back chevron, the up keys, or simply scrolling up.
   Going back should never be work.

   A panel taller than the screen scrolls INSIDE itself. Content you cannot
   reach is not a gate, it is a bug.
   ══════════════════════════════════════════════════════════════════════ */

const ALL = ['intro', ...PAGE_ORDER];

// the surface the accent will be read on, whichever palette is in force
const cardColour = () => {
  const v = getComputedStyle(document.body).getPropertyValue('--card').trim() || '#0d0e10';
  const m = v.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16));
};

export default function NarrativeHome() {
  const [narrow, setNarrow] = useState(() => window.innerWidth <= NARROW_AT);
  const [current, setCurrent] = useState('intro');
  const [beatAt, setBeatAt] = useState(0);
  const [gate, setGate] = useState({ on: false, label: '' });
  const [veil, setVeil] = useState(false);
  const [shown, setShown] = useState(() => new Set());
  const [chosen, setChosen] = useState(null);
  const [openKey, setOpenKey] = useState(null);
  const [bdOn, setBdOn] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [fieldDown, setFieldDown] = useState(false);

  const moving = useRef(false);
  // the same set as `shown`, readable inside goPanel without making every move
  // depend on it
  const shownRef = useRef(new Set());
  // where the reader is, readable from a handler without re-binding every
  // listener on every move
  const currentRef = useRef('intro');
  const beatRef = useRef(0);

  const visible = useMemo(() => ALL.filter((id) => !(NARROW_ONLY.has(id) && !narrow)), [narrow]);

  // Panels are addressed by id rather than held in a ref map: they are always
  // mounted, and the ids are the same ones the running order is written in.
  const panelEl = (id) => document.getElementById(id);

  useEffect(() => {
    currentRef.current = current;
    beatRef.current = beatAt;
  }, [current, beatAt]);

  /* ── where the gate sits ──────────────────────────────────────────────
     A section with more to show wants its arrow out of the way, at the very
     foot of the screen. A sparse one does not: an arrow pinned to the bottom
     of a mostly empty panel reads as stranded, a long way under the thing it
     follows, so there it rises to meet the content.

     How much the panel overflows is the measure, because it is the same thing
     the reader is being told: a panel that runs past the fold has more to
     show. Panels are their own scroll containers, so it is a read of two
     numbers. Measuring where the ink actually ends would be the truer signal
     and was tried twice - it kept finding full-height decorative layers, and
     then the last child in source order rather than the lowest one on screen.
     The ratio is coarser and it is right. */
  useEffect(() => {
    const place = () => {
      const p = panelEl(currentRef.current);
      if (!p || !p.clientHeight) return;
      const over = p.scrollHeight / p.clientHeight;
      const t = clamp((over - GATE_FULL) / (GATE_SPARSE - GATE_FULL), 0, 1);
      const vh = window.innerHeight;
      // and never so high that it lands on the panel's own last line: the deck
      // is a fixed-height box, so the work panel barely overflows while its
      // content still reaches most of the way down
      const ceiling = vh - blockBottom(p) - GATE_STACK - GATE_GAP;
      const lift = Math.min(vh * (GATE_LOW + t * (GATE_HIGH - GATE_LOW)), ceiling);
      document.body.style.setProperty(
        '--gate-lift',
        `${Math.round(clamp(lift, vh * GATE_LOW, vh * GATE_HIGH))}px`
      );
    };
    // after the panel has arrived and its copy has been laid out, or it is the
    // outgoing panel's height being measured
    const id = window.setTimeout(place, 60);
    window.addEventListener('resize', place);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('resize', place);
    };
  }, [current, beatAt, narrow, shown]);

  /* The accent's derived colours are solved against the surface they will be
     read on, so a change of mode has to re-solve them: switching to dark left
     the accent holding a value worked out against the light card, which on a
     black ground is a different and worse thing. Watches the class the shell
     sets and the system preference behind it. */
  useEffect(() => {
    // reads the hue that is actually applied rather than the walk's own ref,
    // so the two never have to share a mutable value
    const repaint = () => {
      const h = parseFloat(getComputedStyle(document.body).getPropertyValue('--accent-h')) || 20;
      paintAccent(document.body, h, cardColour());
    };
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const mo = new MutationObserver(repaint);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    mq.addEventListener('change', repaint);
    repaint();
    return () => {
      mo.disconnect();
      mq.removeEventListener('change', repaint);
    };
  }, []);

  /* The accent walks further round the wheel with every section reached, and
     is eased here rather than by a CSS transition: the colours derived from it
     have to be re-solved as it travels, not only at the two ends. */
  const hueRef = useRef(ACCENT_WALK[0]);
  useEffect(() => {
    const to = ACCENT_WALK[accentStep(current, beatAt, visible)];
    if (to === undefined) return undefined;
    const ground = cardColour();
    const from = hueRef.current;
    // always the short way round, so it never spins the long way for one step
    const delta = ((to - from + 540) % 360) - 180;
    if (REDUCED) {
      hueRef.current = to;
      document.body.style.setProperty('--accent-h', String(to));
      paintAccent(document.body, to, ground);
      return undefined;
    }
    const start = performance.now();
    const DUR = 2600;
    let raf;
    const frame = (now) => {
      const t2 = Math.min(1, (now - start) / DUR);
      const eased = t2 < 0.5 ? 2 * t2 * t2 : 1 - (-2 * t2 + 2) ** 2 / 2;
      const h = from + delta * eased;
      hueRef.current = h;
      document.body.style.setProperty('--accent-h', String(Math.round(h)));
      paintAccent(document.body, h, ground);
      if (t2 < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [current, beatAt, visible]);

  /* ── the page is a deck, so the document itself must not scroll ──────
     Scoped to a class rather than set on html/body outright: /resources is
     still the old design and still scrolls. */
  useEffect(() => {
    document.documentElement.classList.add('narr');
    document.body.classList.add('narr');
    return () => {
      document.documentElement.classList.remove('narr');
      document.body.classList.remove('narr');
    };
  }, []);

  /* Crossing the breakpoint changes the running order. A panel dropped by a
     resize cannot be left as the active one, and a project picked from the
     ring has no place in the narrow layout. */
  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const n = window.innerWidth <= NARROW_AT;
        setNarrow(n);
        if (n) setChosen(null);
        const vis = ALL.filter((id) => !(NARROW_ONLY.has(id) && !n));
        const id = currentRef.current;
        if (vis.includes(id)) return;
        // hand on to whatever now follows it, rather than dumping the reader
        // back at the opening beat
        const after = ALL.slice(ALL.indexOf(id) + 1).find((x) => vis.includes(x)) || 'intro';
        currentRef.current = after;
        setCurrent(after);
      }, 220);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /* ── raising the gate ──────────────────────────────────────────────
     The opening panel is the exception: its gate belongs to whichever beat is
     showing, and where the last beat hands off depends on whether the work
     deck is in the running order. */
  const beatLabel = useCallback(
    (i) =>
      i === ACT_ONE.length - 1 ? (narrow ? 'See the work' : 'The full picture') : ACT_ONE[i].gate,
    [narrow]
  );

  const raise = useCallback((id) => {
    if (currentRef.current !== id) return;
    const g = GATES[id];
    if (!g) return;
    setTimeout(() => setGate({ on: true, label: g.label }), REDUCED ? 0 : 260);
  }, []);

  /* ── moving between panels ───────────────────────────────────────── */
  const goPanel = useCallback(
    async (id, { back = false } = {}) => {
      if (moving.current || !id || id === currentRef.current) return;
      moving.current = true;
      const from = panelEl(currentRef.current);
      const to = panelEl(id);

      setGate((g) => ({ ...g, on: false }));
      try {
        from?.classList.add(back ? 'leave-down' : 'leave-up');
        if (back) to?.classList.add('from-above');

        if (!REDUCED) {
          setVeil(true);
          await wait(230);
        }
        // a panel always opens at its own top, never halfway down from last time
        if (to) to.scrollTop = 0;
        setCurrent(id);
        currentRef.current = id;
        if (!REDUCED) {
          await wait(60);
          setVeil(false);
        }
      } finally {
        // this must clear even if something above throws: leave it set and the
        // deck wedges for good, with every arrow and key silently doing nothing
        from?.classList.remove('leave-down', 'leave-up');
        to?.classList.remove('from-above');
        setVeil(false);
        moving.current = false;
      }

      if (id === 'skills') {
        // direction follows travel, and a panel returned to must not still be
        // wearing the flight that took the reader off it
        setFieldDown(back);
        setLaunching(false);
      }
      // same rule as a beat: the panel finishes arriving before anything types
      settled(to, 'transform', 700).then(() => {
        // the beats have already played, so the opening panel only needs its
        // gate back
        if (id === 'intro') {
          setGate({ on: true, label: beatLabel(beatRef.current) });
          return;
        }
        // A section already played does not play again - but its gate still has
        // to come back, or a reader who went back to re-read something would
        // find the only way forward gone.
        if (shownRef.current.has(id)) {
          raise(id);
          return;
        }
        shownRef.current = new Set(shownRef.current).add(id);
        setShown(shownRef.current);
      });
    },
    [beatLabel, raise]
  );

  /* One beat gives way to the next inside the veil, so the change happens in
     a bank of light rather than in plain sight. */
  const goToBeat = useCallback(async (i) => {
    if (moving.current || i < 0 || i > ACT_ONE.length - 1) return;
    moving.current = true;
    setGate((g) => ({ ...g, on: false }));
    try {
      if (!REDUCED) {
        setVeil(true);
        await wait(420);
      }
      setBeatAt(i);
      beatRef.current = i;
      if (!REDUCED) {
        await wait(120);
        setVeil(false);
      }
    } finally {
      setVeil(false);
      moving.current = false;
    }
  }, []);

  /* ── forward, backward, and what each means where you are ────────── */
  const advance = useCallback(() => {
    const id = currentRef.current;
    if (id === 'intro') {
      if (beatRef.current < ACT_ONE.length - 1) {
        goToBeat(beatRef.current + 1);
      } else {
        // where the intro hands off depends on whether the work deck is in play
        goPanel(visible[1]);
      }
      return;
    }
    const next = GATES[id]?.next;
    if (!next) return;
    if (id === 'skills') {
      // the toolkit's exit IS its transition: let the field fly before moving
      if (launching) return;
      setGate((g) => ({ ...g, on: false }));
      setLaunching(true);
      setTimeout(() => goPanel(next), REDUCED ? 0 : 880);
      return;
    }
    goPanel(next);
  }, [goPanel, goToBeat, launching, visible]);

  const goBack = useCallback(() => {
    if (currentRef.current === 'intro') {
      // within the opening panel, back is the previous beat rather than the
      // previous panel - there is nothing before it
      goToBeat(beatRef.current - 1);
      return;
    }
    const i = visible.indexOf(currentRef.current);
    if (i > 0) goPanel(visible[i - 1], { back: true });
  }, [goPanel, goToBeat, visible]);

  /* The same two moves from the keyboard. Without this the gate would lock
     out anyone not using a mouse, which is the one cost of hard-gating worth
     refusing to pay. */
  useEffect(() => {
    const onKey = (e) => {
      if (bdOn || formOpen) return;
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      // the coverflow owns left/right, so the deck deliberately does not
      if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) {
        e.preventDefault();
        advance();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goBack();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [advance, goBack, bdOn, formOpen]);

  /* Scrolling UP goes back. Forward scrolling stays gated, so the wheel can
     only ever retreat. A panel that scrolls internally has to reach its own
     top first, or the gesture would yank the reader out of half-read copy. */
  useEffect(() => {
    const lock = { until: 0 };
    const tryBack = () => {
      const now = performance.now();
      const panel = panelEl(currentRef.current);
      if (moving.current || bdOn || now < lock.until || (panel?.scrollTop || 0) > 1) return;
      lock.until = now + 700;
      goBack();
    };
    const onWheel = (e) => {
      if (e.deltaY < -12) tryBack();
    };
    let touchY = null;
    const onStart = (e) => {
      touchY = e.touches[0].clientY;
    };
    const onMove = (e) => {
      if (touchY === null) return;
      // a finger travelling DOWN the screen is the content moving up: going back
      if (e.touches[0].clientY - touchY > 60) {
        touchY = null;
        tryBack();
      }
    };
    const onEnd = () => {
      touchY = null;
    };
    const opts = { passive: true };
    window.addEventListener('wheel', onWheel, opts);
    window.addEventListener('touchstart', onStart, opts);
    window.addEventListener('touchmove', onMove, opts);
    window.addEventListener('touchend', onEnd, opts);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goBack, bdOn]);

  const readyWork = useCallback(() => raise('work'), [raise]);
  const readyAbout = useCallback(() => raise('about'), [raise]);
  const readyExperience = useCallback(() => raise('experience'), [raise]);
  const readySkills = useCallback(() => raise('skills'), [raise]);
  const readyContact = useCallback(() => raise('contact'), [raise]);

  // The last beat's label depends on where the intro hands off, which depends
  // on whether the work deck is in the running order.
  const beatReady = useCallback(
    (i) => {
      if (currentRef.current !== 'intro') return;
      setGate({ on: true, label: beatLabel(i) });
    },
    [beatLabel]
  );

  /* ── the breakdown, and freezing what is behind it ───────────────── */
  const locked = useRef({ top: 0, panel: null });
  // The close clears the project only after the dialog has faded, so it does
  // not empty itself on screen on the way out. That pending clear has to be
  // cancelled when another card is opened inside the fade, or it fires into
  // the dialog that is now open and strips its content - leaving an empty
  // shell one border tall across a dimmed page.
  const bdClear = useRef(null);

  const openBreakdown = useCallback((key) => {
    clearTimeout(bdClear.current);
    const panel = panelEl(currentRef.current);
    if (panel) {
      locked.current = { top: panel.scrollTop, panel };
      panel.style.overflowY = 'hidden';
    }
    setFormOpen(false);
    setOpenKey(key);
    setBdOn(true);
  }, []);

  const closeBreakdown = useCallback(() => {
    const { panel, top } = locked.current;
    if (panel) {
      panel.style.overflowY = '';
      panel.scrollTop = top;
    }
    locked.current = { top: 0, panel: null };
    setBdOn(false);
    clearTimeout(bdClear.current);
    bdClear.current = setTimeout(() => setOpenKey(null), REDUCED ? 0 : 520);
  }, []);

  useEffect(() => () => clearTimeout(bdClear.current), []);

  // Picking from the ring marks the card and opens the dialog in one move.
  const chooseWork = useCallback(
    (key) => {
      setChosen(key);
      openBreakdown(key);
    },
    [openBreakdown]
  );

  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);

  const canGoBack = !(current === 'intro' && beatAt <= 0);
  const isShown = (id) => shown.has(id);
  const panel = (id, extra = '') =>
    `sec panel${current === id ? ' active' : ''}${visible.includes(id) ? '' : ' off'}${extra}`;

  return (
    <>
      {/* the veil is the transition itself: a bank of light that thickens over
          a change, so the swap happens inside it rather than in plain sight */}
      <div id="veil" className={veil ? 'on' : undefined} aria-hidden="true" />

      <main>
        <section className={`stage panel${current === 'intro' ? ' active' : ''}`} id="intro">
          <Stage beatAt={beatAt} onReady={beatReady} chosen={chosen} onChoose={chooseWork} />
        </section>

        <section className={panel('work')} id="work">
          <WorkPanel shown={isShown('work')} onReady={readyWork} onOpen={openBreakdown} />
        </section>

        <section className={panel('about')} id="about">
          <AboutPanel shown={isShown('about')} onReady={readyAbout} />
        </section>

        <section className={panel('experience')} id="experience">
          <ExperiencePanel shown={isShown('experience')} onReady={readyExperience} />
        </section>

        <section className={panel('skills', launching ? ' launch' : '')} id="skills">
          <ToolkitPanel shown={isShown('skills')} onReady={readySkills} down={fieldDown} />
        </section>

        <section className={panel('contact')} id="contact">
          <ContactPanel shown={isShown('contact')} onReady={readyContact} onOpenForm={openForm} />
        </section>
      </main>

      <Gate
        on={gate.on}
        label={gate.label}
        canGoBack={canGoBack}
        onNext={advance}
        onBack={goBack}
      />

      <button
        className={`fab${current === 'contact' && !formOpen && !bdOn ? ' beckon' : ''}`}
        hidden={formOpen || bdOn}
        aria-label="Open the contact form"
        onClick={openForm}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 4.8-8-4.8V6l8 4.8L20 6v2.2Z"
          />
        </svg>
      </button>

      <ContactForm open={formOpen} onClose={closeForm} />
      <Breakdown on={bdOn} openKey={openKey} onClose={closeBreakdown} />
    </>
  );
}
