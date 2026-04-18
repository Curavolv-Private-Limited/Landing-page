import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    number: '01',
    title: 'Potential',
    accent: 'Discover who you are',
    description:
      'Understanding strengths that extend far beyond academic achievement. Mapping natural aptitudes, values, and motivations before committing to a direction—because the right start makes every subsequent step more certain.',
    nodeColor: '#38A17C',
    textAccent: '#3CC8C2',
  },
  {
    number: '02',
    title: 'Purpose',
    accent: 'Align aspiration to reality',
    description:
      'Connecting personal aspirations to real-world healthcare roles. Purpose turns vague ambition into a defined north star—specific enough to plan toward, flexible enough to evolve with you.',
    nodeColor: '#6EBBA1',
    textAccent: '#3CC8C2',
  },
  {
    number: '03',
    title: 'Process',
    accent: 'Design with intention',
    description:
      'Building the path with deliberate structure rather than reacting to circumstance. This is where career architecture begins—sequencing decisions so each one compounds the one before it.',
    nodeColor: '#9B7ABE',
    textAccent: '#8454A8',
  },
  {
    number: '04',
    title: 'Proficiency',
    accent: 'Build genuine readiness',
    description:
      'Developing capability that matters in practice—not just credentials that satisfy a checklist. Proficiency is the stage where preparation becomes real, lasting competitive advantage.',
    nodeColor: '#8454A8',
    textAccent: '#8454A8',
  },
  {
    number: '05',
    title: 'Pinnacle',
    accent: 'Sustain and lead',
    description:
      'Maintaining growth, relevance, and distinction over the long arc of a career. The Pinnacle stage is not an endpoint—it is the ongoing practice of staying at the frontier of your field.',
    nodeColor: '#6B3D8E',
    textAccent: '#B494D4',
  },
];

/* ─── Single stage chapter ─── */
function StageChapter({
  stage,
  index,
}: {
  stage: (typeof stages)[0];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isLast = index === stages.length - 1;

  return (
    <div
      ref={ref}
      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.07)' }}
    >
      <div
        className="grid lg:grid-cols-[120px_1fr] gap-8 lg:gap-20 items-start"
        style={{ paddingTop: 'clamp(1.75rem, 3vw, 2.75rem)', paddingBottom: 'clamp(1.75rem, 3vw, 2.75rem)' }}
      >

        {/* ── Left: decorative strip ── */}
        <div className="relative" style={{ minHeight: 80 }}>
          {/* Huge ghost watermark number — bleeds off left */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.1, ease }}
            className="absolute select-none pointer-events-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(4rem, 7vw, 6rem)',
              lineHeight: 1,
              color: 'rgba(0,0,0,0.032)',
              letterSpacing: '-0.04em',
              top: -20,
              left: -18,
            }}
          >
            {stage.number}
          </motion.span>

          {/* Colored node + tiny stage label */}
          <div
            className="relative z-10"
            style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.2 }}
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: stage.nodeColor,
                boxShadow: `0 0 0 4px ${stage.nodeColor}20, 0 0 14px ${stage.nodeColor}38`,
              }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.58rem',
                color: stage.textAccent,
                letterSpacing: '0.22em',
              }}
            >
              {stage.number}
            </motion.span>
          </div>
        </div>

        {/* ── Right: all content ── */}
        <div>
          {/* Accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.16, ease }}
            style={{
              width: 36,
              height: 2,
              backgroundColor: stage.nodeColor,
              transformOrigin: 'left',
              marginBottom: '1.4rem',
            }}
          />

          {/* Stage title — LARGE */}
          <motion.h3
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.14, ease }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)',
              lineHeight: 1.04,
              color: '#111411',
              marginBottom: '0.45rem',
            }}
          >
            {stage.title}
          </motion.h3>

          {/* Italic accent phrase */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.24, ease }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
                            fontSize: '1.05rem',
              color: stage.textAccent,
              opacity: 0.72,
              marginBottom: '1.5rem',
            }}
          >
            {stage.accent}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.32, ease }}
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.75,
              color: 'rgba(17,20,17,0.52)',
              maxWidth: 520,
            }}
          >
            {stage.description}
          </motion.p>
        </div>

      </div>
    </div>
  );
}

/* ─── Main export ─── */
export function CareerEvolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.88], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 lg:py-16"
      style={{ borderTop: '1px solid rgba(0,0,0,0.07)', overflowX: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="pb-6 lg:pb-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-end"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="text-[10px] tracking-[0.36em] uppercase font-medium mb-4"
              style={{ color: '#8454A8' }}
            >
              The Framework
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
                  lineHeight: 1.06,
                  color: '#111411',
                }}
              >
                From{' '}
                <em
                  style={{
                    fontFamily: "'Inter', sans-serif",
                                        color: '#3CC8C2',
                  }}
                >
                  Potential
                </em>
                <br />
                to{' '}
                <em
                  style={{
                    fontFamily: "'Inter', sans-serif",
                                        color: '#8454A8',
                  }}
                >
                  Pinnacle
                </em>
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="lg:pb-2"
          >
            <p
              className="text-base leading-[1.85] mb-8"
              style={{ color: 'rgba(17,20,17,0.52)' }}
            >
              Five interconnected stages that form the foundation of every Curavolv engagement.
              When careers are built with intention, growth compounds—it never plateaus.
            </p>
            <div className="flex items-center gap-4">
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{ background: 'linear-gradient(to right, #3CC8C2, #8454A8)' }}
              />
              <span
                className="text-[10px] tracking-[0.24em] uppercase font-medium"
                style={{ color: 'rgba(17,20,17,0.35)' }}
              >
                Clarity · Continuity · Confidence
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Chapters ── */}
        <div className="relative">
          {/* Scroll-driven vertical teal→purple line, anchored inside 120px left col */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none overflow-hidden"
            style={{
              left: 4,
              width: 1,
              background: 'rgba(0,0,0,0.05)',
            }}
          >
            <motion.div
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, #3CC8C2, #8454A8)',
              }}
              className="w-full origin-top"
            />
          </div>

          {stages.map((stage, index) => (
            <StageChapter key={index} stage={stage} index={index} />
          ))}
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="py-6 lg:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
                            color: 'rgba(17,20,17,0.22)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              maxWidth: 400,
            }}
          >
            "Each stage builds on the one before—designed to compound across the full arc of a
            healthcare career."
          </p>

          <div className="flex items-center gap-2">
            {stages.map((s, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: 6, height: 6, backgroundColor: s.nodeColor }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
