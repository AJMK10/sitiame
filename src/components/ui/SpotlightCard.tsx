import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article';
  /** Halo clair, pour les fonds sombres */
  dark?: boolean;
}

/** Carte dont un halo doré suit le curseur. */
export default function SpotlightCard({ children, className, as: Tag = 'div', dark = false }: SpotlightCardProps) {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onMouseMove={handleMove} className={cn('group relative isolate overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--secondary) / ${dark ? 0.16 : 0.14}), transparent 65%)`,
        }}
      />
      {children}
    </Tag>
  );
}
