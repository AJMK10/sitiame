import type { ReactNode } from 'react';
import HeroBackdrop from './HeroBackdrop';

interface CtaBandProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function CtaBand({ title, description, children }: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <HeroBackdrop />
      <div className="container relative py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-5 text-lg text-white/75">{description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">{children}</div>
        </div>
      </div>
    </section>
  );
}
