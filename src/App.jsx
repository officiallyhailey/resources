import { Routes, Route } from 'react-router-dom';
// The homepage is the narrative deck. The scrolling design it replaced is
// still in src/features/home - unrouted, not deleted, until this one has been
// tested properly.
import NarrativeHome from '@/features/narrative/NarrativeHome';
import ToolboxPage from '@/features/toolbox/ToolboxPage';
import { TransitionProvider } from '@/components/PageTransition';
import LogoBanner from '@/components/LogoBanner';
import useTheme from '@/hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const home = <NarrativeHome theme={theme} onToggleTheme={toggleTheme} />;

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
        <Route path="/" element={home} />
        <Route path="*" element={home} />
      </Routes>
    </TransitionProvider>
  );
}
