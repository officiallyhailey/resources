import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useReveal';

const NAVH = 92;
const FADE = 420;
const MORPH = 520;

/**
 * The open/close interaction shared by both fanned decks (projects and client
 * sites). Both need the same three behaviours, and each one is subtle enough
 * that a second copy would drift:
 *
 *  1. A morph flight - the clicked card's image is cloned, and the clone flies
 *     to where the opened panel's image will sit.
 *  2. Instant placement, never smooth. This page sets `scroll-behavior:smooth`,
 *     so 'auto' would inherit it; measuring a flight target mid-scroll is what
 *     makes a morph land low and then snap.
 *  3. Fade-then-place on close. Hiding the taller panel collapses the document
 *     and the browser clamps scrollY, so repositioning after the fade has begun
 *     reads as the page reloading top-down.
 *
 * @param cardSelector class of the deck's card buttons, for the fan-out stagger
 * @returns openKey, fading, and the refs/handlers the deck component wires up
 */
export function useDeck(cardSelector = '.pcard') {
  const [openKey, setOpenKey] = useState(null);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef(null);
  const deckRef = useRef(null);
  const stageRefs = useRef({});
  const busy = useRef(false);
  const pending = useRef(null);
  // Seeded with the initial openKey so mount reads as 'unchanged'.
  const prevKey = useRef(openKey);

  // Centre what the reader should be looking at. Anything short enough to sit
  // whole on screen gets centred; anything taller than the viewport cannot be,
  // so it parks just under the nav - centring a tall panel would scroll past
  // its own heading, which is the opposite of focusing it.
  // Two different jobs, so two modes.
  //   'center' — opening: put the sample image in the middle of the screen,
  //              which is the thing the reader just asked to see.
  //   'top'    — closing: return to the top of the section they came from, so
  //              the heading re-orients them rather than dropping them mid-deck.
  const place = useCallback((el, mode) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    let y;
    if (mode === 'center' && r.height < window.innerHeight - NAVH) {
      y = r.top + window.scrollY - NAVH - (window.innerHeight - NAVH - r.height) / 2;
    } else {
      y = r.top + window.scrollY - NAVH - 12;
    }
    window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
  }, []);

  const open = useCallback(
    (key, cardEl) => {
      if (busy.current) return;
      busy.current = true;
      const img = cardEl?.querySelector('.shot img, .thumb img');

      if (prefersReducedMotion() || !img) {
        pending.current = null;
        setOpenKey(key);
        return;
      }

      // Stash what the flight needs, then let the commit trigger it.
      pending.current = { key, from: img.getBoundingClientRect(), img };
      const others = [...deckRef.current.querySelectorAll(cardSelector)].filter((c) => c !== cardEl);
      others.forEach((c, i) => setTimeout(() => c.classList.add('gone'), i * 70));
      setTimeout(() => {
        others.forEach((c) => c.classList.remove('gone'));
        setOpenKey(key);
      }, 240);
    },
    [cardSelector],
  );

  // Runs after React has committed the open panel, so the flight target exists.
  useLayoutEffect(() => {
    // Only reposition when openKey actually CHANGED. This effect also fires on
    // mount, where it would scroll to this deck's own section on page load -
    // with two decks mounted the second one won, dropping every visitor
    // part-way down the page instead of at the top.
    //
    // A "have I mounted yet" flag does not work here: StrictMode invokes
    // effects twice in development, so the first pass sets the flag and the
    // second scrolls anyway. Comparing against the previous key is immune to
    // that, because a repeated invocation is still no change.
    const changed = prevKey.current !== openKey;
    prevKey.current = openKey;
    if (!changed) {
      busy.current = false;
      return undefined;
    }

    // Opening: centre the sample image, which is what the reader asked to see.
    // Closing: return to the top of the section they came from, so its heading
    // re-orients them instead of dropping them part-way down the deck.
    const openPanel = openKey
      ? sectionRef.current?.querySelector('.case:not([hidden]), .sitecase:not([hidden])')
      : null;
    const preview = openPanel?.querySelector('.dshot, .shotfig');
    if (openKey) {
      // On a phone the panel fills the screen, so centring it hides the section
      // heading entirely and the reader loses track of where they are. Open at
      // the section top instead, so "Built for real clients" stays in view.
      const narrow = typeof window !== 'undefined' && window.innerWidth <= 768;
      const target = narrow ? sectionRef.current : preview || openPanel || sectionRef.current;
      place(target, narrow ? 'top' : 'center');
      // The project stage reserves its height with a fixed aspect, but the
      // client breakdowns use plain lazy-loaded figures with no reserved box -
      // so at this moment the figure is nearly empty and centring lands short,
      // then the image loads and pushes everything down. Re-centre once it has
      // real height. Harmless where the image is already cached: `complete` is
      // true and this never runs.
      const img = target?.querySelector?.('img');
      if (img && !img.complete) {
        img.addEventListener('load', () => place(target, 'center'), { once: true });
      }
    } else {
      place(sectionRef.current, 'top');
    }
    const job = pending.current;
    pending.current = null;

    if (!openKey) {
      busy.current = false;
      return undefined;
    }

    // Opening swaps the deck out from under the button that had focus, which
    // drops focus to <body> - a keyboard user is then stranded and has to tab
    // from the top of the document again. Hand focus to the back control.
    sectionRef.current
      ?.querySelector('[data-deck-back]')
      ?.focus({ preventScroll: true });
    const stage = stageRefs.current[openKey];
    if (!job || job.key !== openKey || !stage) {
      busy.current = false;
      return undefined;
    }

    const a = job.from;
    const b = stage.getBoundingClientRect();
    const clone = job.img.cloneNode(true);
    clone.className = 'morph';
    clone.style.cssText += `left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px`;
    document.body.appendChild(clone);
    // Hide the framed container, not just its contents. .dshot carries the white
    // background, border and drop shadow, so dimming only .stage left an empty
    // white panel on the page that the flying image visibly filled in - the
    // landing read as a placeholder being populated rather than an image
    // arriving. The clone already animates to a matching radius and shadow, so
    // with the frame hidden the clone simply becomes the panel.
    const frame = stage.closest('.dshot') || stage;
    frame.style.opacity = '0';

    // Safety net: a position:fixed clone must never outlive its transition.
    const reap = setTimeout(() => {
      clone.remove();
      frame.style.opacity = '1';
      busy.current = false;
    }, MORPH + 800);

    clone.style.transition =
      `transform ${MORPH}ms var(--e), border-radius ${MORPH}ms var(--e), box-shadow ${MORPH}ms var(--e)`;
    requestAnimationFrame(() => {
      clone.style.borderRadius = '14px';
      clone.style.boxShadow = '0 18px 44px rgba(0,0,0,.16)';
      clone.style.transform =
        `translate(${b.left - a.left}px,${b.top - a.top}px) scale(${b.width / a.width})`;
    });

    const done = setTimeout(() => {
      clearTimeout(reap);
      frame.style.transition = 'none';
      frame.style.opacity = '1';
      requestAnimationFrame(() => clone.remove());
      busy.current = false;
    }, MORPH);

    return () => {
      clearTimeout(reap);
      clearTimeout(done);
      clone.remove();
      frame.style.opacity = '1';
      busy.current = false;
    };
  }, [openKey, place]);

  const close = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setOpenKey(null);
      setFading(false);
    }, FADE);
  }, []);

  const goTo = useCallback((key) => setOpenKey(key), []);

  return { openKey, fading, sectionRef, deckRef, stageRefs, open, close, goTo };
}
