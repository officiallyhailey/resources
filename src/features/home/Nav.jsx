import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '@/content/profile';
import { prefersReducedMotion } from '@/hooks/useReveal';

// The persistent pill nav. Hides on downward scroll and returns on upward -
// so it is out of the way while reading but never more than a flick away.
// Links only, so it must stay usable at phone width rather than be hidden.
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > last.current && y > 220);
        last.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Contact is the last section, so landing on its top edge leaves the links
  // and the footer below the fold - the reader arrives at a section that looks
  // cut off. It goes to the end of the page instead. Every other link keeps the
  // browser's own anchor behaviour.
  const go = (e, href) => {
    if (href !== '#contact') return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    window.history.replaceState(null, '', href);
    const smooth = !prefersReducedMotion();
    document.body.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end' });
  };

  return (
    <header className={`nav${hidden ? ' hide' : ''}`}>
      <div className="nav-in">
        <nav className="navpill">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
