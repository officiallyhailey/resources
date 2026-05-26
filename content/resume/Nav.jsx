import { useRef, useEffect } from 'react';
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
  const navRef = useRef(null);
  const navigateTo = useNavigateTo();

  useEffect(() => {
    const align = () => {
      const heroName = document.querySelector('.hero-name');
      if (heroName && navRef.current) {
        navRef.current.style.top = `${heroName.getBoundingClientRect().top}px`;
        navRef.current.style.transform = 'none';
      }
    };
    requestAnimationFrame(align);
    window.addEventListener('resize', align);
    return () => window.removeEventListener('resize', align);
  }, []);

  function handleMouseEnter(id) {
    timers.current[id] = setTimeout(() => navigateTo(id), 300);
  }

  function handleMouseLeave(id) {
    clearTimeout(timers.current[id]);
  }

  return (
    <>
      <nav className="side-nav" ref={navRef}>
        {links.map(({ label, id }, i) => (
          <div key={label} className="side-nav-item">
            {i > 0 && <div className="side-nav-line" />}
            <span
              className="side-nav-link"
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={() => handleMouseLeave(id)}
            >
              {id !== 'home' && <span className="side-nav-dot" />}
              <span className="side-nav-label">{label}</span>
            </span>
          </div>
        ))}
      </nav>
      <button
        className="theme-btn theme-btn-fixed"
        onClick={onToggleTheme}
        aria-label="Toggle light/dark mode"
      >
        {theme === 'dark' ? '☀' : '◑'}
      </button>
    </>
  );
}
