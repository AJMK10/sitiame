import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description: string;
}

/** Frise verticale dont le trait doré se remplit au fil du scroll. */
export default function ProcessTimeline({ steps, className }: { steps: Step[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  return (
    <ol ref={ref} className={cn('relative', className)}>
      <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-border" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-6 left-6 top-6 w-px origin-top bg-secondary"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-secondary ring-4 ring-muted"
          >
            {i + 1}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pt-1.5"
          >
            <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
