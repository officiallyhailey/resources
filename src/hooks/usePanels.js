import { useCallback, useRef, useState } from 'react';

/**
 * The screenshot rail shared by the project cases and the client-site
 * breakdowns. Both need the same three behaviours, and each one has a
 * non-obvious reason to be written this way:
 *
 *  1. Stepping scrolls to the figure's OWN offset rather than by rail width.
 *     Each figure can be narrower than the rail, so stepping by clientWidth
 *     drifts - the rail moves but the panel never lines up.
 *  2. Scroll position maps back to the nearest figure by actual offset, so the
 *     dots stay honest when someone swipes or trackpad-scrolls instead of
 *     clicking.
 *  3. `reset` exists because the panels stay mounted between openings; without
 *     it a case reopens showing whichever slide was last viewed.
 */
export function usePanels() {
  const [at, setAt] = useState(0);
  const railRef = useRef(null);

  const go = useCallback((i) => {
    const rail = railRef.current;
    if (!rail) return;
    const figs = rail.querySelectorAll('figure');
    const next = Math.max(0, Math.min(figs.length - 1, i));
    setAt(next);
    const target = figs[next];
    if (target) rail.scrollTo({ left: target.offsetLeft - rail.offsetLeft, behavior: 'smooth' });
  }, []);

  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const figs = [...rail.querySelectorAll('figure')];
    if (!figs.length) return;
    const x = rail.scrollLeft + rail.offsetLeft;
    let best = 0;
    let dist = Infinity;
    figs.forEach((f, i) => {
      const d = Math.abs(f.offsetLeft - x);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setAt(best);
  }, []);

  const reset = useCallback(() => {
    setAt(0);
    if (railRef.current) railRef.current.scrollLeft = 0;
  }, []);

  return { at, railRef, go, onScroll, reset };
}
