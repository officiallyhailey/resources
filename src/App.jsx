import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/features/home/HomePage';
import ToolboxPage from '@/features/toolbox/ToolboxPage';
import { TransitionProvider } from '@/components/PageTransition';
import LogoBanner from '@/components/LogoBanner';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <TransitionProvider>
      <Routes>
        <Route path="/resources" element={<><LogoBanner /><ToolboxPage theme={theme} onToggleTheme={toggleTheme} /></>} />
        <Route path="/"    element={<HomePage />} />
        <Route path="*"    element={<HomePage />} />
      </Routes>
    </TransitionProvider>
  );
}
