import type { ReactNode, MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/utils/scrollToSection';

type HashLinkProps = {
  sectionId: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export default function HashLink({ sectionId, className, children, onNavigate }: HashLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (location.pathname !== '/') return;

    e.preventDefault();
    if (location.hash !== `#${sectionId}`) {
      navigate({ pathname: '/', hash: sectionId });
    }
    window.requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  };

  return (
    <Link to={`/#${sectionId}`} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
