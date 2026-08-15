import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ACT_ONE, GATES, NARROW_AT, NARROW_ONLY, PAGE_ORDER } from '@/content/narrative';
import Breakdown from './Breakdown';
import ContactForm from './ContactForm';
import Gate from './Gate';
import Stage from './Stage';
import { AboutPanel, ContactPanel, ExperiencePanel, ToolkitPanel, WorkPanel } from './sections';
import { REDUCED, settled, wait } from './typewriter';
import '@/styles/narrative.css';

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
