import { usePageTransition } from './PageTransition';

export function useNavigateTo() {
  const { transitionTo } = usePageTransition();
  return (id) => {
    if (id === 'portfolio') {
      if (window.location.pathname === '/resources') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        transitionTo('/resources');
      }
    } else if (id === 'home') {
      if (window.location.pathname !== '/') {
        transitionTo('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(id);
      if (el) {
        const block = window.innerWidth <= 600 ? 'start' : 'center';
        el.scrollIntoView({ behavior: 'smooth', block });
      } else {
        transitionTo('/');
      }
    }
  };
}
