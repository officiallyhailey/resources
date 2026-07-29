import { useEffect } from 'react';

// Adds .in to every .rv inside `rootRef` as it scrolls into view.
//
// NB: an IntersectionObserver never fires for a display:none element, so
// anything that starts hidden (a case study, a pane swapped out) must not rely
// on this for its visibility — it would open stuck at opacity 0.
export function useReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );

    root.querySelectorAll('.rv, .job').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 70}ms`;
      io.observe(el);
    });

    // Word-by-word blocks reveal their children, not themselves — the paragraph
    // carries [data-words] but no .rv, and each .word starts at opacity 0.
    // Without this second observer nothing ever adds .in and the text stays
    // permanently invisible, which is exactly what happened to the About lead.
    const wio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll('.word').forEach((w) => w.classList.add('in'));
          wio.unobserve(e.target);
        });
      },
      { threshold: 0.15 },
    );
    root.querySelectorAll('[data-words]').forEach((el) => wio.observe(el));

    return () => {
      io.disconnect();
      wio.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
