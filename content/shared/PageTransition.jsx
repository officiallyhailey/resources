import { createContext, useContext, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoVideo from '../assets/gallery/logo.mp4';

const TRAVEL = 380;
const HOLD   = 400;
const HIDE   = 250;

const TransitionContext = createContext(null);
export const usePageTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const busy     = useRef(false);
  const videoRef = useRef(null);
  const realLogo = useRef(null);

  const [phase,  setPhase]  = useState('idle');
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const transitionTo = useCallback((path) => {
    if (busy.current) return;
    busy.current = true;

    realLogo.current = document.querySelector('.res-logo');
    const logo = realLogo.current;

    let x = 0, y = 0;
    if (logo) {
      const r = logo.getBoundingClientRect();
      x = (r.left + r.width  / 2) - window.innerWidth  / 2;
      y = (r.top  + r.height / 2) - window.innerHeight / 2;
      logo.style.opacity = '0';
    }

    setOffset({ x, y });
    setPhase('snap');

    requestAnimationFrame(() => requestAnimationFrame(() => {
      setPhase('flying-in');

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }

      setTimeout(() => setPhase('centered'), TRAVEL);

      setTimeout(() => {
        navigate(path);
        window.scrollTo(0, 0);
        setPhase('flying-out');

        setTimeout(() => {
          // Clone is back at banner — hand off to the (same) real logo
          if (realLogo.current) realLogo.current.style.opacity = '';
          setPhase('hiding');
          setTimeout(() => {
            setPhase('idle');
            busy.current = false;
          }, HIDE);
        }, TRAVEL);
      }, TRAVEL + HOLD);
    }));
  }, [navigate]);

  const atBanner = phase === 'snap' || phase === 'flying-out';
  const tx = atBanner ? offset.x : 0;
  const ty = atBanner ? offset.y : 0;
  const animate = phase !== 'snap' && phase !== 'idle';

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}

      <div className={`pt-backdrop ${phase !== 'idle' ? 'pt-on' : ''} ${phase === 'hiding' ? 'pt-hide' : ''}`} />

      <video
        ref={videoRef}
        src={logoVideo}
        className={[
          'pt-logo',
          phase !== 'idle'     ? 'pt-on'     : '',
          animate              ? 'pt-animate' : '',
          phase === 'centered' ? 'pt-pulse'   : '',
          phase === 'hiding'   ? 'pt-hide'    : '',
        ].join(' ')}
        style={{ transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))` }}
        muted
        playsInline
        loop
      />
    </TransitionContext.Provider>
  );
}
