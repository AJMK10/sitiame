import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Pause, Play, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT, PROMO_VIDEO } from '@/constants/site';
import { PLATFORMS } from '@/content/platforms';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';
import HeroBackdrop from '@/components/ui/HeroBackdrop';

/* ───────── Vraie vidéo (si PROMO_VIDEO.src est renseigné) ───────── */

function youtubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

function HostedVideo() {
  const id = youtubeId(PROMO_VIDEO.src);
  return (
    <div className="aspect-video overflow-hidden rounded-2xl bg-primary shadow-lift ring-1 ring-white/10">
      {id ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title="Présentation de Sitiame Capital"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <video
          className="h-full w-full"
          src={PROMO_VIDEO.src}
          poster={PROMO_VIDEO.poster || undefined}
          controls
          playsInline
          preload="metadata"
        >
          Votre navigateur ne peut pas lire cette vidéo.
        </video>
      )}
    </div>
  );
}

/* ───────── Présentation animée ───────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function Stage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center px-6 pb-16 pt-8 sm:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

function SceneTitle({ index, title }: { index: string; title: string }) {
  return (
    <>
      <motion.span {...fadeUp(0.05)} className="eyebrow eyebrow-light">
        {index}
      </motion.span>
      <motion.h3 {...fadeUp(0.2)} className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
        {title}
      </motion.h3>
    </>
  );
}

function IntroScene() {
  return (
    <Stage>
      <motion.span {...fadeUp(0.1)} className="eyebrow eyebrow-light">
        Sitiame Capital
      </motion.span>
      <motion.h3 {...fadeUp(0.3)} className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-white sm:text-4xl">
        Le capital au service de la croissance des <span className="text-secondary">PME africaines</span>
      </motion.h3>
      <motion.p {...fadeUp(0.8)} className="mt-4 text-sm text-white/70 sm:text-base">
        Investissements · Conseils · Levée de fonds
      </motion.p>
    </Stage>
  );
}

function InvestScene() {
  const bars = [32, 48, 40, 68, 92];
  const points = ['Analyse de marché', 'Structuration financière', 'Due diligence', 'Mise en relation'];
  return (
    <Stage>
      <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10">
        <div>
          <SceneTitle index="01" title={SERVICES[0].title} />
          <ul className="mt-4 space-y-2">
            {points.map((point, i) => (
              <motion.li key={point} {...fadeUp(0.6 + i * 0.35)} className="flex items-center gap-2 text-sm text-white/80">
                <Check className="h-4 w-4 text-secondary" aria-hidden="true" />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="hidden h-40 items-end gap-3 sm:flex" aria-hidden="true">
          {bars.map((height, i) => (
            <motion.div
              key={height}
              className="flex-1 rounded-t-md bg-gradient-to-t from-secondary/40 to-secondary"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
    </Stage>
  );
}

function AdvisoryScene() {
  const rows = [
    { label: 'Diagnostic financier', note: 'Forces, faiblesses, trésorerie' },
    { label: 'Planification stratégique', note: 'Business plan et modélisation' },
    { label: 'Gouvernance', note: 'Contrôle interne et gestion des risques' },
  ];
  return (
    <Stage>
      <SceneTitle index="02" title={SERVICES[1].title} />
      <ul className="mt-4 space-y-2">
        {rows.map((row, i) => (
          <motion.li
            key={row.label}
            {...fadeUp(0.6 + i * 0.5)}
            className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white sm:text-base">{row.label}</span>
              <span className="block text-xs text-white/60 sm:text-sm">{row.note}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </Stage>
  );
}

function FundraisingScene() {
  const steps = ['Dossier', 'Valorisation', 'Investisseurs', 'Closing'];
  return (
    <Stage>
      <SceneTitle index="03" title={SERVICES[2].title} />
      <div className="relative mt-8 sm:mt-10">
        <motion.div
          aria-hidden="true"
          className="absolute left-5 right-5 top-5 h-px origin-left bg-secondary/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.4, delay: 0.5, ease: 'easeInOut' }}
        />
        <ol className="relative flex justify-between">
          {steps.map((step, i) => (
            <motion.li
              key={step}
              className="flex w-1/4 flex-col items-center gap-2 text-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.5 + i * 0.7 }}
            >
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold',
                  i === steps.length - 1
                    ? 'border-secondary bg-secondary text-secondary-foreground'
                    : 'border-secondary/60 bg-primary text-secondary',
                )}
              >
                {i === steps.length - 1 ? <Check className="h-5 w-5" aria-hidden="true" /> : i + 1}
              </span>
              <span className="text-xs font-medium text-white/85 sm:text-sm">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Stage>
  );
}

function PlatformsScene() {
  return (
    <Stage>
      <SceneTitle index="04" title="Quatre plateformes digitales" />
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PLATFORMS.map((platform, i) => {
          const Icon = platform.icon;
          return (
            <motion.li
              key={platform.id}
              {...fadeUp(0.5 + i * 0.25)}
              className={cn(
                'rounded-lg border p-3 text-center',
                platform.available
                  ? 'border-secondary bg-secondary/15'
                  : 'border-white/10 bg-white/[0.04] opacity-60',
              )}
            >
              <Icon className={cn('mx-auto h-6 w-6', platform.available ? 'text-secondary' : 'text-white/60')} aria-hidden="true" />
              <span className="mt-2 block text-sm font-semibold text-white">{platform.name}</span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-white/60">
                {platform.available ? 'Disponible' : 'Bientôt'}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </Stage>
  );
}

function OutroScene() {
  return (
    <Stage>
      <motion.h3 {...fadeUp(0.1)} className="text-2xl font-semibold leading-tight text-white sm:text-4xl">
        Parlons de votre projet
      </motion.h3>
      <motion.p {...fadeUp(0.4)} className="mt-3 text-sm text-white/70 sm:text-base">
        Première consultation gratuite de 30 minutes.
      </motion.p>
      <motion.div {...fadeUp(0.7)} className="mt-6 flex flex-wrap items-center gap-4">
        <Link to="/rendez-vous" className="btn-gold">
          Prendre rendez-vous <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a href={CONTACT.phones[1].href} className="text-sm font-medium text-white/80 hover:text-white">
          {CONTACT.phones[1].label}
        </a>
      </motion.div>
    </Stage>
  );
}

const SCENES: { label: string; duration: number; render: () => ReactNode }[] = [
  { label: 'Introduction', duration: 4000, render: () => <IntroScene /> },
  { label: 'Investissements', duration: 5500, render: () => <InvestScene /> },
  { label: 'Conseils', duration: 5500, render: () => <AdvisoryScene /> },
  { label: 'Levée de fonds', duration: 6500, render: () => <FundraisingScene /> },
  { label: 'Plateformes', duration: 4500, render: () => <PlatformsScene /> },
  { label: 'Contact', duration: 4000, render: () => <OutroScene /> },
];

const TOTAL_MS = SCENES.reduce((sum, scene) => sum + scene.duration, 0);
const TICK_MS = 100;

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

function AnimatedPresentation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Lecture automatique quand la présentation est visible, pause quand elle ne l'est plus.
  useEffect(() => {
    if (!inView) setPlaying(false);
    else if (!userPaused && !ended && !reduceMotion) setPlaying(true);
  }, [inView, userPaused, ended, reduceMotion]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setElapsed((value) => value + TICK_MS), TICK_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (elapsed < SCENES[index].duration) return;
    if (index < SCENES.length - 1) {
      setIndex(index + 1);
      setElapsed(0);
    } else {
      setPlaying(false);
      setEnded(true);
    }
  }, [elapsed, index]);

  const jumpTo = (target: number) => {
    setIndex(target);
    setElapsed(0);
    setEnded(false);
    setUserPaused(false);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (ended) {
      jumpTo(0);
    } else if (playing) {
      setUserPaused(true);
      setPlaying(false);
    } else {
      setUserPaused(false);
      setPlaying(true);
    }
  };

  const elapsedTotal = SCENES.slice(0, index).reduce((sum, scene) => sum + scene.duration, 0) + elapsed;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Présentation animée de Sitiame Capital"
      className="relative isolate aspect-[4/5] overflow-hidden rounded-2xl bg-primary shadow-lift ring-1 ring-white/10 sm:aspect-video"
    >
      <HeroBackdrop />

      <p className="sr-only">
        Présentation animée de 30 secondes : Sitiame Capital propose des investissements stratégiques, des conseils
        stratégiques et un accompagnement à la levée de fonds, complétés par quatre plateformes digitales dont PME360,
        déjà disponible. Première consultation gratuite sur rendez-vous.
      </p>

      <div key={index} aria-hidden={index !== SCENES.length - 1}>
        {SCENES[index].render()}
      </div>

      <span className="absolute right-4 top-4 text-xs font-medium tracking-wider text-white/40" aria-hidden="true">
        {String(index + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
      </span>

      {/* Commandes */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-primary via-primary/80 to-transparent px-4 pb-3 pt-8 sm:px-6">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={ended ? 'Revoir la présentation' : playing ? 'Mettre en pause' : 'Lancer la lecture'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {ended ? (
            <RotateCcw className="h-4 w-4" />
          ) : playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 translate-x-px" />
          )}
        </button>

        <div className="flex flex-1 gap-1.5" role="group" aria-label="Chapitres">
          {SCENES.map((scene, i) => {
            const fill = i < index ? 100 : i === index ? Math.min(100, (elapsed / scene.duration) * 100) : 0;
            return (
              <button
                key={scene.label}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Aller à : ${scene.label}`}
                aria-current={i === index}
                className="group relative h-4 flex-1 focus-visible:outline-none"
              >
                <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/20 transition-all group-hover:h-1.5 group-focus-visible:h-1.5">
                  <span
                    className="block h-full rounded-full bg-secondary"
                    style={{ width: `${fill}%`, transition: `width ${TICK_MS}ms linear` }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <span className="hidden w-20 shrink-0 text-right text-xs tabular-nums text-white/60 sm:block" aria-hidden="true">
          {formatTime(elapsedTotal)} / {formatTime(TOTAL_MS)}
        </span>
      </div>
    </div>
  );
}

export default function PromoVideo() {
  return PROMO_VIDEO.src ? <HostedVideo /> : <AnimatedPresentation />;
}
