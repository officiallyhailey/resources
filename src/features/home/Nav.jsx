import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '@/content/profile';

// The persistent pill nav. Hides on downward scroll and returns on upward —
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

  return (
    <header className={`nav${hidden ? ' hide' : ''}`}>
      <div className="nav-in">
        <nav className="navpill">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
