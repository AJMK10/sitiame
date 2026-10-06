import { ArrowRight, ArrowUpRight, CalendarCheck, Check, Clock, Globe2, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import HashLink from '@/components/HashLink';
import PromoVideo from '@/components/PromoVideo';
import AnimatedWords from '@/components/ui/AnimatedWords';
import CountUp from '@/components/ui/CountUp';
import HeroBackdrop from '@/components/ui/HeroBackdrop';
import HeroChart from '@/components/ui/HeroChart';
import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Seo from '@/components/ui/Seo';
import { Section, SectionHeading } from '@/components/ui/Section';
import { CONTACT, SITE_URL } from '@/constants/site';
import { PLATFORMS } from '@/content/platforms';
import { SERVICES } from '@/content/services';
import logo from '@/logo/sitiam.png';

const ScoringIcon = PLATFORMS[2].icon;
const TokenIcon = PLATFORMS[0].icon;

const TRUST_POINTS = [
  { icon: MapPin, label: "Siège à Abidjan, Côte d'Ivoire" },
  { icon: Globe2, label: "Interventions en Afrique de l'Ouest" },
  { icon: ShieldCheck, label: 'Confidentialité garantie (NDA)' },
];

const STATS: { to?: number; suffix?: string; text?: string; label: string }[] = [
  { to: 3, label: "Pôles d'expertise" },
  { to: 4, label: 'Plateformes spécialisées' },
  { to: 15, suffix: '+', label: "Années d'expérience" },
  { text: 'UEMOA', label: "Zone d'intervention" },
];

const MARQUEE_ITEMS = [
  'Capital-développement',
  'Levée de fonds',
  'Due diligence',
  'Tokenisation d’actifs',
  'Scoring PME',
  'Fusions & acquisitions',
  'Gouvernance',
  'Structuration financière',
  'Gestion de portefeuilles',
  'Produits dérivés',
];

const APPROACH = [
  {
    title: 'Diagnostic',
    description: "Analyse de votre situation financière, de vos besoins de financement et de vos objectifs de croissance.",
  },
  {
    title: 'Structuration',
    description: 'Construction du modèle économique, de la valorisation et du dossier présenté aux investisseurs.',
  },
  {
    title: 'Mobilisation',
    description: "Mise en relation avec des investisseurs institutionnels et privés, négociation et closing.",
  },
  {
    title: 'Accompagnement',
    description: "Suivi de la mise en œuvre et pilotage de la performance, appuyés par nos plateformes.",
  },
];

const VALUES = [
  { letter: 'R', name: 'Responsabilité', description: 'Engagement envers nos clients et partenaires.' },
  { letter: 'A', name: 'Ambition', description: 'Excellence et innovation dans tous nos services.' },
  { letter: 'S', name: 'Solidarité', description: "Esprit d'équipe et respect mutuel." },
];

const TEAM = {
  lead: {
    initials: 'FN',
    name: "Dr N'GUESSAN Fernand",
    role: 'Directeur Général — Fondateur',
    bio: [
      "Expert reconnu en finance d'entreprise et gestion d'actifs, avec plus de 15 ans d'expérience dans l'accompagnement des PME africaines.",
      "Sous sa direction, Sitiame Capital est devenu un acteur incontournable de l'écosystème financier ouest-africain, alliant finance traditionnelle et technologies de pointe.",
    ],
    link: { href: `mailto:${CONTACT.email}`, label: 'Contacter la direction' },
  },
  partners: [
    {
      initials: 'JA',
      name: 'Joseph Mardochée Ahoulou',
      role: 'Co-Fondateur — Software Engineer',
      focus: 'ERP & Data',
      bio: "Ingénieur logiciel spécialisé en ERP et Data, il pilote l'architecture technique des plateformes Sitiame Capital, de NexAsset à PME360, en intégrant les innovations en matière de gestion de données financières.",
      link: { href: 'https://ajmk10.github.io/', label: 'Voir le profil', external: true },
    },
    {
      initials: 'EN',
      name: "Eric N'DABIAN Aving Armand",
      role: 'Co-Fondateur — Analyste Quantitatif',
      focus: 'Franco-Ivoirien',
      bio: "Plus de 15 ans d'expérience internationale en modélisation financière, gestion des risques et structuration de produits dérivés (options, futures, swaps). Expert en ingénierie financière et en stratégies de couverture sur marchés multi-actifs.",
      link: { href: 'mailto:endabian@hotmail.com', label: 'Contacter', external: false },
    },
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Sitiame Capital',
  url: SITE_URL,
  logo,
  description:
    "Société de conseil en financement et investissement accompagnant les PME/PMI africaines : investissements stratégiques, conseils stratégiques et levée de fonds.",
  email: CONTACT.email,
  telephone: '+2250777443995',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dokui, à côté de la pharmacie Saint Odile',
    addressLocality: 'Abidjan',
    addressCountry: 'CI',
  },
};

export default function Home() {
  return (
    <>
      <Seo
        description="Sitiame Capital accompagne les PME africaines : investissements stratégiques, conseils stratégiques et levée de fonds, appuyés par quatre plateformes spécialisées. Basés à Abidjan."
        jsonLd={organizationJsonLd}
      />

      {/* HERO */}
      <section id="hero" className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <HeroBackdrop />
        <div className="container relative grid gap-12 pb-28 pt-14 sm:pb-32 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-36 lg:pt-24">
          <div className="lg:col-span-7">
            <Reveal immediate>
              <span className="eyebrow eyebrow-light mb-7">Conseil en financement et investissement</span>
            </Reveal>
            <h1 className="text-[2.5rem] font-semibold leading-[1.08] text-white sm:text-6xl lg:text-[4rem]">
              <AnimatedWords text="Votre partenaire stratégique pour financer la croissance des" delay={0.15} />{' '}
              <AnimatedWords
                text="PME africaines"
                delay={0.85}
                className="animate-shimmer bg-[linear-gradient(110deg,hsl(40_55%_52%),hsl(42_80%_78%),hsl(40_55%_52%))] bg-[length:200%_100%] bg-clip-text text-transparent"
              />
            </h1>
            <Reveal immediate delay={0.9}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75">
                Sitiame Capital accompagne les PME/PMI dans leur développement stratégique, organise la levée de fonds
                nécessaire à leur croissance et offre aux investisseurs des opportunités structurées via quatre
                plateformes spécialisées.
              </p>
            </Reveal>
            <Reveal immediate delay={1.05}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/rendez-vous" className="btn-gold">
                  Prendre rendez-vous <ArrowRight className="h-4 w-4" />
                </Link>
                <HashLink sectionId="services" className="btn-outline-light">
                  Découvrir nos expertises
                </HashLink>
              </div>
            </Reveal>
            <Reveal immediate delay={1.2}>
              <ul className="mt-12 flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {TRUST_POINTS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pastilles flottantes */}
            <div
              aria-hidden="true"
              className="absolute -left-8 -top-5 z-10 hidden animate-float items-center gap-2.5 rounded-lg border border-white/15 bg-primary/90 px-3.5 py-2.5 text-xs font-medium text-white shadow-lift backdrop-blur lg:flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/20 text-secondary">
                <ScoringIcon className="h-4 w-4" />
              </span>
              PME360 · Scoring
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-4 z-10 hidden items-center gap-2.5 rounded-lg border border-white/15 bg-primary/90 px-3.5 py-2.5 text-xs font-medium text-white shadow-lift backdrop-blur lg:flex"
              style={{ animation: 'float 6s ease-in-out -3s infinite' }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/20 text-secondary">
                <TokenIcon className="h-4 w-4" />
              </span>
              NexAsset · Tokenisation
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-2 shadow-2xl backdrop-blur-md">
              <div className="px-5 pb-1 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    Trajectoire de croissance
                  </p>
                  <span className="flex items-center gap-2 text-xs text-white/60">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                    </span>
                    Financement structuré
                  </span>
                </div>
                <div className="mt-4">
                  <HeroChart />
                </div>
              </div>
              <ul className="mt-2 border-t border-white/10 pt-1">
                {SERVICES.map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <li key={service.slug}>
                      <Link
                        to={service.path}
                        className="group flex items-center gap-4 rounded-lg px-5 py-3.5 transition-colors hover:bg-white/[0.06]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary/15 text-secondary transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-white/40">0{i + 1}</span>
                          <span className="block font-serif text-lg text-white">{service.title}</span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-secondary"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section aria-label="Sitiame Capital en chiffres" className="relative z-10 -mt-14 sm:-mt-16">
        <div className="container">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-lift lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-card px-6 py-7 text-center sm:py-9">
                <dt className="order-2 mt-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-1 font-serif text-3xl font-semibold text-primary sm:text-4xl">
                  {stat.to !== undefined ? <CountUp to={stat.to} suffix={stat.suffix} /> : stat.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />

      {/* EXPERTISES */}
      <Section id="services">
        <Reveal>
          <SectionHeading
            eyebrow="Nos domaines d'expertise"
            title="Une expertise financière au service de vos projets"
            description="Croissance, restructuration, fusions-acquisitions, diagnostic financier, modèles économiques, levée de fonds et évaluation de projets stratégiques : nous intervenons sur les décisions qui comptent."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const points = service.offerings.slice(0, 3);
            return (
              <Reveal key={service.slug} delay={i * 0.08} className="h-full">
                <SpotlightCard
                  as="article"
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-secondary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-3xl text-border">0{i + 1}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold text-primary">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{service.summary}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                    {points.map((offering) => (
                      <li key={offering.title} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                        {offering.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.path}
                    className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary transition-colors group-hover:text-gold-ink"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* DÉMARCHE */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading
            eyebrow="Notre démarche"
            title="Une méthode rigoureuse, de l'analyse au closing"
            align="center"
          />
        </Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((step, i) => (
            <li key={step.title} className="bg-card p-7 sm:p-8">
              <span className="font-serif text-4xl font-medium text-secondary">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-primary">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* PRÉSENTATION */}
      <Section id="presentation">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow mb-5">Sitiame Capital en 30 secondes</span>
            <h2 className="text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[2.75rem]">
              Ce que nous proposons, en images
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Investissements, conseils stratégiques, levée de fonds et plateformes digitales : découvrez notre offre
              en une courte présentation.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.slug}>
                    <Link
                      to={service.path}
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-gold-ink"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                      <span className="flex-1 font-semibold text-primary group-hover:text-gold-ink">{service.title}</span>
                      <ArrowRight
                        className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <PromoVideo />
          </Reveal>
        </div>
      </Section>

      {/* PLATEFORMES */}
      <Section id="platforms" tone="navy" className="relative isolate overflow-hidden">
        <HeroBackdrop />
        <div className="relative">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Notre écosystème digital"
              title="Quatre plateformes pour prolonger notre conseil"
              description="Pour mieux servir nos clients, nous avons développé quatre plateformes technologiques spécialisées qui complètent nos services de conseil et d'investissement."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {PLATFORMS.map((platform, i) => {
              const Icon = platform.icon;

              if (!platform.available) {
                return (
                  <Reveal key={platform.id} delay={(i % 2) * 0.08} className="h-full">
                    <div
                      aria-disabled="true"
                      className="flex h-full cursor-not-allowed select-none flex-col rounded-xl border border-white/10 bg-white/[0.02] p-8 opacity-50 grayscale"
                    >
                      <div className="flex items-start justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white/60">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                          Bientôt disponible
                        </span>
                      </div>
                      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{platform.tagline}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white/80">{platform.name}</h3>
                      <p className="mt-3 flex-1 leading-relaxed text-white/50">{platform.description}</p>
                    </div>
                  </Reveal>
                );
              }

              return (
                <Reveal key={platform.id} delay={(i % 2) * 0.08} className="h-full">
                  <SpotlightCard
                    dark
                    className="h-full rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:bg-white/[0.07]"
                  >
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/15 text-secondary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{platform.tagline}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{platform.name}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-white/70">{platform.description}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-secondary">
                      Accéder à la plateforme
                      <span className="sr-only"> {platform.name} (nouvel onglet)</span>
                    </span>
                  </a>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* À PROPOS */}
      <Section id="about">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow mb-5">Qui sommes-nous</span>
            <h2 className="text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[2.75rem]">
              Votre partenaire stratégique en Afrique
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                <strong className="font-semibold text-foreground">Sitiame Capital</strong> est une Société Coopérative
                Simplifiée à capital variable, société de conseil en financement et investissement. Elle accompagne les
                PME/PMI africaines dans leur développement stratégique et organise la levée de fonds nécessaire à leur
                croissance.
              </p>
              <p>
                Notre mission : faciliter l'accès au capital pour les entreprises africaines, tout en offrant aux
                investisseurs institutionnels des opportunités d'investissement structurées et sécurisées via nos quatre
                plateformes technologiques.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-xl bg-primary p-8 text-primary-foreground shadow-lift sm:p-10">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Nos valeurs — RAS
              </h3>
              <ul className="mt-7 space-y-6">
                {VALUES.map((value) => (
                  <li key={value.letter} className="flex items-start gap-5">
                    <span className="font-serif text-5xl font-medium leading-none text-secondary">{value.letter}</span>
                    <div>
                      <p className="font-serif text-xl text-white">{value.name}</p>
                      <p className="mt-1 text-sm text-white/65">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ÉQUIPE */}
      <Section id="leadership" tone="surface">
        <Reveal>
          <SectionHeading
            eyebrow="Équipe dirigeante"
            title="Les fondateurs"
            description="Finance, technologie et data au service de l'Afrique."
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl space-y-6">
          <Reveal>
            <article className="flex flex-col items-center gap-8 rounded-xl border border-border bg-card p-8 shadow-card md:flex-row md:gap-12 md:p-10">
              <div
                aria-hidden="true"
                className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-4xl text-secondary ring-4 ring-secondary/25 md:h-40 md:w-40 md:text-5xl"
              >
                {TEAM.lead.initials}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-primary sm:text-3xl">{TEAM.lead.name}</h3>
                <p className="mt-1 font-semibold text-gold-ink">{TEAM.lead.role}</p>
                <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                  {TEAM.lead.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <a
                  href={TEAM.lead.link.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-gold-ink"
                >
                  {TEAM.lead.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {TEAM.partners.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.08} className="h-full">
                <article className="flex h-full flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-card">
                  <div
                    aria-hidden="true"
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-primary font-serif text-3xl text-secondary ring-4 ring-secondary/25"
                  >
                    {person.initials}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-primary">{person.name}</h3>
                  <p className="mt-1 font-semibold text-gold-ink">{person.role}</p>
                  <p className="text-sm text-muted-foreground">{person.focus}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                  <a
                    href={person.link.href}
                    {...(person.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-gold-ink"
                  >
                    {person.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow mb-5">Contact</span>
            <h2 className="text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[2.75rem]">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Discutons de vos besoins et trouvons ensemble la solution la plus adaptée à votre entreprise.
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-primary">Siège social</p>
                  <p className="mt-1 text-muted-foreground">{CONTACT.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-primary">Téléphone</p>
                  <p className="mt-1 text-muted-foreground">
                    {CONTACT.phones.map((phone, i) => (
                      <span key={phone.href}>
                        {i > 0 && ' · '}
                        <a href={phone.href} className="transition-colors hover:text-primary">
                          {phone.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-primary">E-mail</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 block text-muted-foreground transition-colors hover:text-primary"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-primary">Horaires</p>
                  <p className="mt-1 text-muted-foreground">{CONTACT.hours}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/rendez-vous" className="btn-primary">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Réserver un créneau
              </Link>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
