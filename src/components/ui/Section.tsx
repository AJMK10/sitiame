import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'white' | 'surface' | 'navy';

const TONES: Record<Tone, string> = {
  white: 'bg-background',
  surface: 'bg-muted',
  navy: 'bg-primary text-primary-foreground',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Section({ id, tone = 'white', className, children }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-28', TONES[tone], className)}>
      <div className="container">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <span className={cn('eyebrow mb-5', dark && 'eyebrow-light')}>{eyebrow}</span>}
      <h2
        className={cn(
          'text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[2.75rem]',
          dark ? 'text-white' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            dark ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
