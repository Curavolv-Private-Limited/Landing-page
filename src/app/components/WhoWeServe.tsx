import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { motion, useScroll, useTransform, cubicBezier } from 'motion/react';
import { TextReveal } from './ui/TextReveal';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const serifLight: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 600 };
const ease = [0.22, 1, 0.36, 1] as const;

// easeOutExpo — card launches fast and decelerates precisely onto the stack
const landing = cubicBezier(0.16, 1, 0.3, 1);
// easeOutCubic — smooth push-back for the card underneath
const pushback = cubicBezier(0.33, 1, 0.68, 1);

const audiences = [
  {
    number: '01', label: 'Pre-Healthcare',
    title: 'Students Planning U.S. Healthcare Education',
    description: 'Building clarity and direction before committing to a pathway—so every decision is intentional, informed, and built to endure.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80',
    accent: '#3CC8C2',
  },
  {
    number: '02', label: 'Graduate Stage',
    title: 'Graduate Students Seeking Stronger Positioning',
    description: 'Maximising opportunities and creating strategic advantages while still in school—graduating career-ready, not just degree-ready.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80',
    accent: '#9370DB',
  },
  {
    number: '03', label: 'Early Career',
    title: 'Early Professionals Accelerating Advancement',
    description: 'Transitioning from entry-level roles to positions of real impact, influence, and long-term growth.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80',
    accent: '#C4A35A',
  },
];

function StackCard({ item }: { item: typeof audiences[0] }) {
  return (
    <div
      className="grid lg:grid-cols-[1fr_1.2fr] w-full h-full"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 16px 64px rgba(0,0,0,0.05)',
      }}
    >
      <div className="relative h-56 lg:h-auto overflow-hidden bg-[#F4FAF8]">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-85" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)' }} />
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: item.accent, opacity: 0.8 }} />
        <div className="absolute bottom-6 left-6">
          <span className="text-[9px] tracking-[0.28em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {item.label}
          </span>
        </div>
      </div>
      <div className="p-8 lg:p-12 flex flex-col justify-between">
        <div>
          <p style={{ ...serifLight, fontSize: '5.5rem', lineHeight: 1, color: item.accent, opacity: 0.07 }} className="select-none mb-4">
            {item.number}
          </p>
          <h3 style={{ ...serif, fontSize: 'clamp(1.6rem, 2.1vw, 2.1rem)', color: '#111411', lineHeight: 1.15 }} className="mb-4">
            {item.title}
          </h3>
          <p className="text-base leading-[1.85]" style={{ color: 'rgba(17,20,17,0.52)' }}>
            {item.description}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-8 pt-6" style={{ borderTop: `1px solid ${item.accent}18` }}>
          <div className="w-5 h-px" style={{ backgroundColor: item.accent }} />
          <span className="text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: item.accent }}>
            Learn about this path
          </span>
        </div>
      </div>
    </div>
  );
}

export function WhoWeServe() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Phase 1: Card 2 slides up over Card 1 (progress 0.05 → 0.42) ──
  // Card 2 launches from 108% (just below) and lands perfectly at 0%
  const card2Y       = useTransform(scrollYProgress, [0.05, 0.42], ['108%', '0%'], { ease: landing });
  // Card 2 scales from 0.96 up to 1 on arrival, then shrinks to 0.93 when card 3 comes
  const card2Scale   = useTransform(scrollYProgress, [0.05, 0.42, 0.52, 0.90], [0.96, 1, 1, 0.93]);
  // Card 2 dims as card 3 covers it
  const card2Opacity = useTransform(scrollYProgress, [0.60, 0.90], [1, 0.55]);

  // Card 1 scales back and dims in sync with card 2's arrival — same range, same easing
  const card1Scale   = useTransform(scrollYProgress, [0.05, 0.42], [1, 0.93], { ease: pushback });
  const card1Opacity = useTransform(scrollYProgress, [0.12, 0.42], [1, 0.55]);

  // ── Phase 2: Card 3 slides up over Card 2 (progress 0.52 → 0.90) ──
  const card3Y       = useTransform(scrollYProgress, [0.52, 0.90], ['108%', '0%'], { ease: landing });
  const card3Scale   = useTransform(scrollYProgress, [0.52, 0.90], [0.96, 1],     { ease: landing });

  // Step indicator dots
  const dot2Fill = useTransform(scrollYProgress, [0.05, 0.42], [0, 1]);
  const dot3Fill = useTransform(scrollYProgress, [0.52, 0.90], [0, 1]);

  return (
    // No overflow-hidden — it breaks position:sticky
    <section id="who-we-serve">
      {/* Header — scrolls normally above the pinned zone */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-10 lg:pt-14 pb-6 lg:pb-8">
        <AnimatedSection>
          <motion.p
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-[10px] tracking-[0.32em] uppercase font-medium mb-3" style={{ color: '#3CC8C2' }}
          >
            Who We Serve
          </motion.p>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <TextReveal
              text="Who Curavolv Is For"
              style={{ ...serif, fontSize: 'clamp(2.4rem,3.5vw,3.5rem)', lineHeight: 1.08, color: '#111411' }}
              className="" delay={0.05} staggerMs={80}
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="text-base leading-relaxed lg:pb-2" style={{ color: 'rgba(17,20,17,0.52)' }}
            >
              We support individuals at three distinct stages of the healthcare journey—united by ambition and a desire for long-term success.
            </motion.p>
          </div>
        </AnimatedSection>
      </div>

      {/*
        300vh scroll container. The sticky child pins at top:0 for the full
        200vh of scroll travel, giving scrollYProgress 0→1 to drive the stack.
      */}
      <div ref={containerRef} style={{ height: '300vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Card stack */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '80rem', padding: '0 2rem', height: 'min(72vh, 520px)' }}>

            {/* Card 1 — base, scales back and dims as card 2 lands */}
            <motion.div style={{ position: 'absolute', inset: 0, scale: card1Scale, opacity: card1Opacity, transformOrigin: 'top center', zIndex: 1 }}>
              <StackCard item={audiences[0]} />
            </motion.div>

            {/* Card 2 — slides up from below, then dims as card 3 lands */}
            <motion.div style={{ position: 'absolute', inset: 0, y: card2Y, scale: card2Scale, opacity: card2Opacity, transformOrigin: 'top center', zIndex: 2 }}>
              <StackCard item={audiences[1]} />
            </motion.div>

            {/* Card 3 — slides up last, stays on top */}
            <motion.div style={{ position: 'absolute', inset: 0, y: card3Y, scale: card3Scale, transformOrigin: 'top center', zIndex: 3 }}>
              <StackCard item={audiences[2]} />
            </motion.div>
          </div>

          {/* Step indicator — bottom right */}
          <div style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            {/* Dot 1 — always active */}
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3CC8C2' }} />
            {/* Dot 2 — fills as card 2 arrives */}
            <div style={{ position: 'relative', width: 6, height: 6 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(17,20,17,0.15)' }} />
              <motion.div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#9370DB', scale: dot2Fill, opacity: dot2Fill }} />
            </div>
            {/* Dot 3 — fills as card 3 arrives */}
            <div style={{ position: 'relative', width: 6, height: 6 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(17,20,17,0.15)' }} />
              <motion.div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#C4A35A', scale: dot3Fill, opacity: dot3Fill }} />
            </div>
          </div>

          {/* Scroll hint — fades away once stacking begins */}
          <motion.div
            style={{
              position: 'absolute', bottom: '2rem', left: '50%', translateX: '-50%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(17,20,17,0.35)' }}>
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ width: 1, height: '1.5rem', background: 'linear-gradient(to bottom, rgba(17,20,17,0.3), transparent)' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
