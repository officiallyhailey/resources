import { usePageTransition } from './PageTransition';

export function useNavigateTo() {
  const { transitionTo } = usePageTransition();
  return (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'portfolio') {
      transitionTo('/resources');
    } else {
      const block = window.innerWidth <= 600 ? 'start' : 'center';
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block });
    }
  };
}
