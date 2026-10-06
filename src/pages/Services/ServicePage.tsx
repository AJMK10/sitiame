import { ArrowRight, Check, Clock, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '@/components/ContactForm';
import CtaBand from '@/components/ui/CtaBand';
import PageHero from '@/components/ui/PageHero';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Section, SectionHeading } from '@/components/ui/Section';
import Seo from '@/components/ui/Seo';
import { CONTACT } from '@/constants/site';
import { SERVICES, getService } from '@/content/services';
import { scrollToSection } from '@/utils/scrollToSection';

interface ServicePageProps {
  slug: string;
}

export default function ServicePage({ slug }: ServicePageProps) {
  const service = getService(slug);
  const others = SERVICES.filter((s) => s.slug !== slug);
  const goToForm = () => scrollToSection('consultation');

  return (
    <>
      <Seo title={service.title} description={service.summary} path={service.path} />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.lead}
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Expertises', to: '/#services' },
          { label: service.title },
        ]}
      >
        <button type="button" onClick={goToForm} className="btn-gold">
          {service.ctaLabel} <ArrowRight className="h-4 w-4" />
        </button>
        <Link to="/#services" className="btn-outline-light">
          Toutes nos expertises
        </Link>
      </PageHero>

      {/* Introduction */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading title={service.introTitle} eyebrow="Notre approche" />
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Prestations */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading title={service.offeringsTitle} align="center" />
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
          {service.offerings.map((offering, i) => {
            const Icon = offering.icon;
            return (
              <Reveal key={offering.title} delay={(i % 2) * 0.08} className="h-full">
                <SpotlightCard
                  as="article"
                  className="h-full rounded-xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-secondary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-primary">{offering.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{offering.description}</p>
                  {offering.points && (
                    <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                      {offering.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Types */}
      {service.types && service.typesTitle && (
        <Section>
          <Reveal>
            <SectionHeading title={service.typesTitle} align="center" />
          </Reveal>
          <ul
            className={`mx-auto mt-14 grid max-w-6xl gap-px overflow-hidden rounded-xl border border-border bg-border ${
              service.types.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'
            }`}
          >
            {service.types.map((type) => (
              <li key={type.title} className="bg-card p-8">
                <span className="mb-5 block h-0.5 w-10 bg-secondary" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-primary">{type.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{type.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Processus */}
      {service.process && service.processTitle && (
        <Section tone={service.types ? 'surface' : 'white'}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHeading title={service.processTitle} eyebrow="Comment nous travaillons" />
            </Reveal>
            <ProcessTimeline steps={service.process} className="lg:col-span-8" />
          </div>
        </Section>
      )}

      {/* Consultation */}
      <Section id="consultation" tone={service.types && service.process ? 'white' : 'surface'}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Parlons de votre projet"
              title={service.ctaTitle}
              description={service.ctaText}
            />
            <ul className="mt-9 space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-ink" aria-hidden="true" />
                <a href={CONTACT.phones[1].href} className="transition-colors hover:text-primary">
                  {CONTACT.phones[1].label}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-ink" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold-ink" aria-hidden="true" />
                {CONTACT.hours}
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <ContactForm serviceType={service.slug} />
          </Reveal>
        </div>
      </Section>

      {/* Autres expertises */}
      <CtaBand
        title="Découvrez nos autres expertises"
        description="Chaque projet est unique : nos pôles d'expertise se combinent pour répondre à vos besoins."
      >
        {others.map((other) => (
          <Link key={other.slug} to={other.path} className="btn-outline-light">
            {other.title} <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </CtaBand>
    </>
  );
}
