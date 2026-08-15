import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

/* Light or dark, and who decides.
   ══════════════════════════════════════════════════════════════════════
   Two inputs, in that order of authority:

     the reader's own choice   stored, and null until they actually pick
     the machine               prefers-color-scheme, watched live

   The important part is that null is the ordinary case. Almost nobody
   touches the toggle, so "no choice stored" has to mean *follow the
   machine* rather than fall back to a default written here. Defaulting
   to light instead is what made a dark-mode visitor land on a white page
   and stay there: the default was written to storage on first paint, so
   by the second visit it was indistinguishable from a real preference.

   Nothing is stored until the reader picks, and picking whatever the
   machine already says clears the choice rather than pinning it, so the
   toggle can always be walked back to following without a third state
   in the UI. */

const STORE = 'theme';
const QUERY = '(prefers-color-scheme: dark)';

// localStorage throws in private-mode Safari and when storage is blocked, and
// a theme is not worth taking the page down over.
const readChoice = () => {
  try {
    const v = localStorage.getItem(STORE);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
};

const readSystem = () => (window.matchMedia(QUERY).matches ? 'dark' : 'light');

// Subscribed rather than copied into state, so there is no window between the
// first render and an effect attaching a listener in which the page can be
// showing one mode while the machine is on the other. A display flipping to
// dark at sunset takes an open tab with it.
const watchSystem = (notify) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', notify);
  return () => mq.removeEventListener('change', notify);
};

export default function useTheme() {
  const [choice, setChoice] = useState(readChoice);
  const system = useSyncExternalStore(watchSystem, readSystem, () => 'light');

  const theme = choice ?? system;

  // Both classes, never one. The stylesheets take their unset default from the
  // media query, so removing `dark` on a dark-preferring machine leaves the
  // reader exactly where they started.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);

  // The browser's own chrome is painted from the page, not by it: the address
  // bar on iOS, the status bar on Android. Read what the page actually paints
  // rather than repeating the palette here, since the two routes have
  // different grounds and a second copy would drift from the first.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return undefined;
    const id = requestAnimationFrame(() => {
      meta.setAttribute('content', getComputedStyle(document.body).backgroundColor);
    });
    return () => cancelAnimationFrame(id);
  }, [theme]);

  const setTheme = useCallback((next) => {
    // choosing what the machine already says is not an override, it is going
    // back to following it - in memory as well as in storage, so a display
    // that flips later still carries the page with it
    const following = next === readSystem();
    setChoice(following ? null : next);
    try {
      if (following) localStorage.removeItem(STORE);
      else localStorage.setItem(STORE, next);
    } catch {
      /* storage unavailable: the choice still holds for this page */
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme]
  );

  return { theme, setTheme, toggleTheme };
}
