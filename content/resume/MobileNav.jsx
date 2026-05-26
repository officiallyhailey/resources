import { useState } from 'react';
import { useNavigateTo } from '../shared/navigateTo';

const links = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Contact',    id: 'contact' },
  { label: 'Portfolio',  id: 'portfolio' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigateTo = useNavigateTo();

  function go(id) {
    setOpen(false);
    setTimeout(() => navigateTo(id), 420);
  }

  return (
    <>
      <div className={`mn-overlay${open ? ' mn-open' : ''}`} aria-hidden={!open}>
        <nav className="mn-links">
          {links.map(({ label, id }, i) => (
            <button
              key={id}
              className="mn-item"
              style={{ transitionDelay: open ? `${i * 55 + 180}ms` : '0ms' }}
              onClick={() => go(id)}
            >
              <span className="mn-dot" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <button
        className={`mn-btn${open ? ' mn-btn-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span className="mn-bar" />
        <span className="mn-bar" />
      </button>
    </>
  );
}
