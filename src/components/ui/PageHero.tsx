import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import HeroBackdrop from './HeroBackdrop';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <HeroBackdrop />
      <div className="container relative py-14 sm:py-20 lg:py-24">
        {breadcrumbs && (
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/90">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow eyebrow-light mb-6">{eyebrow}</span>}
          <h1 className="text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{description}</p>
          )}
          {children && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}
