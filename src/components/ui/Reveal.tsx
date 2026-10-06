import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Joue l'animation dès le chargement au lieu d'attendre le scroll (pour le haut de page). */
  immediate?: boolean;
}

/**
 * Apparition discrète. Les animations de mouvement sont désactivées globalement
 * quand l'utilisateur préfère moins d'animations (voir MotionConfig dans main.tsx).
 */
export default function Reveal({ children, delay = 0, className, immediate = false }: RevealProps) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: '0px 0px -60px 0px' } })}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
