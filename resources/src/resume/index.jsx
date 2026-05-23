import { useEffect } from 'react';
import Background from './Background';
import Nav from './Nav';
import MobileNav from './MobileNav';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Contact from './Contact';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 40px 0px' }
    );
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    });
    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, []);
}

export default function ResumePage({ theme, onToggleTheme }) {
  useScrollReveal();
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Background />
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <MobileNav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
