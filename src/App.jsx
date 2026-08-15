import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// The homepage is the narrative deck. The scrolling design it replaced is
// still in src/features/home - unrouted, not deleted, until this one has been
// tested properly.
import NarrativeHome from '@/features/narrative/NarrativeHome';
import ToolboxPage from '@/features/toolbox/ToolboxPage';
import { TransitionProvider } from '@/components/PageTransition';
import LogoBanner from '@/components/LogoBanner';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // both classes, not just one: the stylesheet takes its default from the
    // system preference, so removing `dark` on a dark-preferring machine left
    // the reader exactly where they started.
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <TransitionProvider>
      <Routes>
        <Route
          path="/resources"
          element={
            <>
              <LogoBanner />
              <ToolboxPage theme={theme} onToggleTheme={toggleTheme} />
            </>
          }
        />
        <Route path="/" element={<NarrativeHome />} />
        <Route path="*" element={<NarrativeHome />} />
      </Routes>
    </TransitionProvider>
  );
}
