import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ResumePage from './content/resume';
import ResourcesPage from './content/resources';
import { TransitionProvider } from './content/shared/PageTransition';
import LogoBanner from './content/shared/LogoBanner';
import Nav from './content/resume/Nav';
import MobileNav from './content/resume/MobileNav';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme') ?? 'dark';
    document.documentElement.classList.toggle('dark', saved === 'dark');
    return saved;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <TransitionProvider>
      <LogoBanner />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <MobileNav />
      <Routes>
        <Route path="/resources" element={<ResourcesPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="*"          element={<ResumePage   theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
    </TransitionProvider>
  );
}
