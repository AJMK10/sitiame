import { motion } from 'framer-motion';

const LINE = 'M0,150 C40,142 62,118 92,124 C122,130 142,92 176,88 C210,84 232,108 262,72 C292,38 336,52 396,16';
const BENCH = 'M0,162 C80,152 160,142 240,127 C300,116 350,110 396,100';

/** Graphique de croissance illustratif : la courbe se dessine puis le point final pulse. */
export default function HeroChart() {
  return (
    <svg viewBox="0 0 410 180" className="h-auto w-full" role="img" aria-label="Illustration d'une trajectoire de croissance">
      <defs>
        <linearGradient id="hc-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(40 55% 52%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(40 55% 52%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hc-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(40 55% 52%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(40 70% 70%)" />
        </linearGradient>
      </defs>

      {[30, 70, 110, 150].map((y) => (
        <line key={y} x1="0" x2="410" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />
      ))}

      <motion.path
        d={BENCH}
        fill="none"
        stroke="white"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
      />

      <motion.path
        d={`${LINE} L396,180 L0,180 Z`}
        fill="url(#hc-area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6 }}
      />

      <motion.path
        d={LINE}
        fill="none"
        stroke="url(#hc-line)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
        <motion.circle
          cx="396"
          cy="16"
          fill="hsl(40 55% 52%)"
          initial={{ r: 5, opacity: 0.5 }}
          animate={{ r: 16, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <circle cx="396" cy="16" r="5" fill="hsl(40 70% 70%)" />
      </motion.g>
    </svg>
  );
}
