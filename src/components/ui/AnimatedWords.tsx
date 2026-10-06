import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
}

/** Révèle un titre mot par mot, chaque mot montant depuis un masque. */
export default function AnimatedWords({ text, className, delay = 0 }: AnimatedWordsProps) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={cn('inline-block', className)}
              initial={{ y: '115%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  );
}
