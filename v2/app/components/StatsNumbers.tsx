import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

function useCounter(target: number, duration: number, delay: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let frame: number;
    const timer = setTimeout(() => {
      const tick = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [active, target, duration, delay]);
  return value;
}

const serif: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
};
const ease = [0.22, 1, 0.36, 1] as const;

const statsData = [
  { value: 500, suffix: '+', label: 'Professionals Guided',   sublabel: 'Across clinical & non-clinical pathways' },
  { value: 94,  suffix: '%', label: 'Satisfaction Score',     sublabel: 'Measured through structured feedback'   },
  { value: 15,  suffix: '+', label: 'Years of Experience',    sublabel: 'In U.S. healthcare career advisory'     },
  { value: 200, suffix: '+', label: 'Career Transitions',     sublabel: 'From clinical to non-clinical roles'    },
  { value: 3,   suffix: 'x', label: 'Faster Career Clarity',  sublabel: 'Compared to self-directed searching'   },
] as const;

function StatItem({ stat, index, active }: {
  stat: typeof statsData[number];
  index: number;
  active: boolean;
}) {
  const count = useCounter(stat.value, 2.4, index * 0.12, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.72, delay: index * 0.11, ease }}
      className="flex flex-col items-center text-center"
    >
      <div style={{ position: 'relative', marginBottom: 18, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <span style={{ ...serif, fontSize: 'clamp(3rem, 4.5vw, 4.25rem)', color: '#111411', lineHeight: 1, letterSpacing: '-0.025em' }}>
          {count}
        </span>
        <span style={{ ...serif, fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)', color: '#555', lineHeight: 1, marginTop: 6 }}>
          {stat.suffix}
        </span>
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={active ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.45 + index * 0.08, ease }}
        style={{ width: 36, height: 1.5, background: '#111411', borderRadius: 2, marginBottom: 14, transformOrigin: 'left' }}
      />

      <p style={{ fontSize: 13.5, fontWeight: 600, color: '#111411', marginBottom: 6, lineHeight: 1.35 }}>
        {stat.label}
      </p>
      <p style={{ fontSize: 11.5, color: 'rgba(17,20,17,0.44)', lineHeight: 1.6, maxWidth: 160 }}>
        {stat.sublabel}
      </p>
    </motion.div>
  );
}

export function StatsNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const isInView     = useInView(sectionRef, { once: true, margin: '-80px' });
  const headerInView = useInView(headerRef,  { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#F8F9F7' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(17,20,17,0.08)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(17,20,17,0.08)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-24 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.36em] uppercase font-semibold mb-5" style={{ color: 'rgba(17,20,17,0.4)' }}>
            By the Numbers
          </p>
          <h2 style={{ ...serif, fontSize: 'clamp(2.25rem, 3vw, 3rem)', color: '#111411', lineHeight: 1.1 }}>
            Impact Built Over{' '}
            <em style={{ ...serif }}>Years of Practice.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12">
          {statsData.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} active={isInView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1, ease }}
          className="text-center mt-14"
          style={{ fontSize: 10.5, color: 'rgba(17,20,17,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Based on advisory work across healthcare career programs · 2019–2025
        </motion.p>
      </div>
    </section>
  );
}
