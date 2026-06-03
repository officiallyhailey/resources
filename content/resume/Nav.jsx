import { useRef } from 'react';
import { useNavigateTo } from '../shared/navigateTo';

const links = [
  { label: 'Home',       id: 'home'       },
  { label: 'About',      id: 'about'      },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Contact',    id: 'contact'    },
  { label: 'Portfolio',  id: 'portfolio'  },
];

export default function Nav({ theme, onToggleTheme }) {
  const timers = useRef({});
  const navigateTo = useNavigateTo();

  function handleMouseEnter(id) {
    timers.current[id] = setTimeout(() => navigateTo(id), 300);
  }

  function handleMouseLeave(id) {
    clearTimeout(timers.current[id]);
  }

  return (
    <nav className="side-nav">
      <div className="side-nav-links">
        {links.map(({ label, id }, i) => (
          <div key={label} className="side-nav-item">
            {i > 0 && <div className="side-nav-line" />}
            <span
              className="side-nav-link"
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={() => handleMouseLeave(id)}
            >
              {i > 0 && <span className="side-nav-dot" />}
              <span className="side-nav-label">{label}</span>
            </span>
          </div>
        ))}
      </div>
      <button
        className="theme-btn"
        onClick={onToggleTheme}
        aria-label="Toggle light/dark mode"
      >
        {theme === 'dark' ? '☀' : '◑'}
      </button>
    </nav>
  );
}
