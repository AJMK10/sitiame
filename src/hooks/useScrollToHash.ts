import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '@/utils/scrollToSection';

const HOME_SECTION_IDS = new Set([
  'hero',
  'services',
  'platforms',
  'about',
  'leadership',
  'contact',
]);

export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));
    if (!HOME_SECTION_IDS.has(sectionId)) return;

    const attemptScroll = () => scrollToSection(sectionId);
    if (attemptScroll()) return;

    const t1 = window.setTimeout(attemptScroll, 100);
    const t2 = window.setTimeout(attemptScroll, 350);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, location.hash]);
}
