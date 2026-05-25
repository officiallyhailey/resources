import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ResumePage from './resume';
import ResourcesPage from './resources';
import { TransitionProvider } from './shared/PageTransition';
import LogoBanner from './shared/LogoBanner';

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
      <Routes>
        <Route path="/resources" element={<ResourcesPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="*"          element={<ResumePage   theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
    </TransitionProvider>
  );
}
