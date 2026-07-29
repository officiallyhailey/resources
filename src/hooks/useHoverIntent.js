import { useCallback, useRef } from 'react';

/**
 * Fires `onIntent` after `delay` ms of sustained hover, cancelling if the pointer
 * leaves first. Returns handlers to spread onto the target element.
 *
 * Used for the "hover to navigate" affordance shared by the side nav and the
 * toolbox back button.
 */
export function useHoverIntent(onIntent, delay = 300) {
  const timer = useRef(null);

  const onMouseEnter = useCallback(() => {
    timer.current = setTimeout(onIntent, delay);
  }, [onIntent, delay]);

  const onMouseLeave = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  return { onMouseEnter, onMouseLeave };
}
