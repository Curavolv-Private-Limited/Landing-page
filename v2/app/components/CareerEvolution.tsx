import { motion, AnimatePresence, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { X, Lock, Sparkles, TrendingUp } from 'lucide-react';

const ease       = [0.22, 1, 0.36, 1] as const;
const springPop  = { type: 'spring', stiffness: 420, damping: 26 } as const;
const cormorant  = { fontFamily: "'Inter', sans-serif", fontWeight: 700 } as React.CSSProperties;
const cormorantI = { ...cormorant } as React.CSSProperties;

/* ─────────────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────────────── */
interface Stage {
  number:      string;
  title:       string;
  accent:      string;
  description: string;
  exclusive:   boolean;
  /* SVG coords in viewBox "0 0 1000 180" */
  svgX: number;
  svgY: number;
}

const STAGES: Stage[] = [
  {
    number: '01', title: 'Potential', accent: 'Discover who you are',
    description:
      'Understanding strengths that extend far beyond academic achievement. Mapping natural aptitudes, values, and motivations before committing to a direction—because the right start makes every subsequent step more certain.',
    exclusive: false, svgX: 100, svgY: 155,
  },
  {
    number: '02', title: 'Purpose', accent: 'Align aspiration to reality',
    description:
      'Connecting personal aspirations to real-world healthcare roles. Purpose turns vague ambition into a defined north star—specific enough to plan toward, flexible enough to evolve with you.',
    exclusive: false, svgX: 290, svgY: 120,
  },
  {
    number: '03', title: 'Process', accent: 'Design with intention',
    description:
      'Building the path with deliberate structure rather than reacting to circumstance. This is where career architecture begins—sequencing decisions so each one compounds the one before it.',
    exclusive: false, svgX: 500, svgY: 88,
  },
  {
    number: '04', title: 'Proficiency', accent: 'Build genuine readiness',
    description:
      'Developing capability that matters in practice—not just credentials that satisfy a checklist. Proficiency is the stage where preparation becomes real, lasting competitive advantage. Most advisors never guide you here.',
    exclusive: true, svgX: 715, svgY: 54,
  },
  {
    number: '05', title: 'Pinnacle', accent: 'Sustain and lead',
    description:
      'Maintaining growth, relevance, and distinction over the long arc of a career. The Pinnacle stage is not an endpoint—it is the ongoing practice of staying at the frontier of your field. Only Curavolv takes you here.',
    exclusive: true, svgX: 900, svgY: 22,
  },
];

/* The viewBox is 1000 × 180. Container uses paddingBottom = 18% so height = 18% of width.
   This makes 1 SVG unit = 1/1000 of container width = 1/180 of container height, keeping
   the SVG perfectly scaled to the DOM so our absolute-positioned buttons align exactly. */
const PATH_D =
  'M 100,155 C 175,140 225,123 290,120 ' +
  'C 368,117 428,90 500,88 ' +
  'C 578,86 638,55 715,54 ' +
  'C 793,53 840,23 900,22';

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */

/** Pulsing ring around an active node */
function PulseRing({ color }: { color: string }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{ border: `1.5px solid ${color}` }}
      animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/** Single interactive node dot on the path */
function PathNode({
  stage, index, active, pathInView, onClick,
}: {
  stage: Stage; index: number; active: boolean; pathInView: boolean; onClick: () => void;
}) {
  const nodeColor  = stage.exclusive ? '#0a0a0a' : '#555555';
  const ringColor  = stage.exclusive ? '#0a0a0a' : '#666666';
  const cssLeft    = `${(stage.svgX / 1000) * 100}%`;
  const cssTop     = `${(stage.svgY / 180) * 100}%`;

  return (
    <motion.button
      onClick={onClick}
      aria-label={`View ${stage.title} stage`}
      aria-expanded={active}
      className="absolute flex items-center justify-center focus-visible:outline-none"
      style={{ left: cssLeft, top: cssTop, transform: 'translate(-50%, -50%)', cursor: 'pointer' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={pathInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ ...springPop, delay: 0.4 + index * 0.12 }}
    >
      {/* Outer hover ring */}
      <motion.span
        className="absolute rounded-full pointer-events-none"
        style={{ inset: -8, border: `1px solid ${ringColor}`, opacity: 0 }}
        whileHover={{ opacity: 0.35, scale: 1.1 }}
        transition={{ duration: 0.25 }}
      />

      {/* Active pulse ring */}
      {active && <PulseRing color={ringColor} />}

      {/* Main circle */}
      <motion.span
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: active ? 38 : (stage.exclusive ? 32 : 26),
          height: active ? 38 : (stage.exclusive ? 32 : 26),
          backgroundColor: nodeColor,
          boxShadow: active
            ? `0 0 0 4px white, 0 0 0 5px ${nodeColor}, 0 8px 24px rgba(0,0,0,0.28)`
            : stage.exclusive
              ? `0 0 0 2px white, 0 0 0 3px ${nodeColor}, 0 4px 12px rgba(0,0,0,0.20)`
              : `0 0 0 2px white, 0 0 0 3px rgba(0,0,0,0.20)`,
          transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        transition={springPop}
      >
        {stage.exclusive && (
          <Lock size={active ? 14 : 11} color="white" strokeWidth={2.5} />
        )}
        {!stage.exclusive && active && (
          <TrendingUp size={14} color="white" strokeWidth={2.5} />
        )}
      </motion.span>
    </motion.button>
  );
}

/** Detail card that slides up when a stage is active */
function DetailCard({
  stage, onClose,
}: {
  stage: Stage; onClose: () => void;
}) {
  const isExclusive = stage.exclusive;

  return (
    <motion.div
      key={stage.number}
      initial={{ opacity: 0, y: 22, clipPath: 'inset(0 0 100% 0 round 12px)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 12px)' }}
      exit={{   opacity: 0, y: -10, clipPath: 'inset(100% 0 0 0 round 12px)', transition: { duration: 0.22, ease: 'easeIn' } }}
      transition={{ duration: 0.5, ease }}
      className="mt-6 overflow-hidden relative"
      style={{
        borderRadius: 12,
        background:    isExclusive ? '#0a0a0a' : '#fafafa',
        border:        isExclusive ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow:     isExclusive ? '0 20px 60px rgba(0,0,0,0.28)' : '0 8px 32px rgba(0,0,0,0.06)',
      }}
    >
      {/* Premium shimmer strip */}
      {isExclusive && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
        />
      )}

      <div className="p-8 lg:p-10 grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">

        {/* Left: meta */}
        <div>
          {/* Stage number */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease }}
            className="text-[9px] tracking-[0.38em] uppercase mb-4"
            style={{ color: isExclusive ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.30)' }}
          >
            Stage {stage.number}
          </motion.p>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease }}
            style={{ ...cormorant, fontSize: 'clamp(2rem, 3vw, 2.8rem)', lineHeight: 1.05,
                     color: isExclusive ? '#ffffff' : '#111411' }}
          >
            {stage.title}
          </motion.h3>

          {/* Accent phrase */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease }}
            style={{ ...cormorantI, fontSize: '1rem', marginTop: '0.5rem',
                     color: isExclusive ? 'rgba(255,255,255,0.48)' : 'rgba(0,0,0,0.42)' }}
          >
            {stage.accent}
          </motion.p>

          {/* Exclusive badge */}
          {isExclusive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springPop, delay: 0.28 }}
              className="inline-flex items-center gap-2 mt-5 px-3 py-1.5"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6 }}
            >
              <Sparkles size={11} color="rgba(255,255,255,0.65)" />
              <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Curavolv Exclusive
              </span>
            </motion.div>
          )}

          {!isExclusive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="inline-flex items-center gap-2 mt-5 px-3 py-1.5"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 6 }}
            >
              <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: 'rgba(0,0,0,0.35)' }}>
                Industry Standard
              </span>
            </motion.div>
          )}
        </div>

        {/* Right: description + close */}
        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease }}
            style={{ height: 1, width: 40, marginBottom: '1.5rem', transformOrigin: 'left',
                     backgroundColor: isExclusive ? 'rgba(255,255,255,0.20)' : 'rgba(0,0,0,0.15)' }}
          />

          <motion.p
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="text-base leading-[1.85]"
            style={{ color: isExclusive ? 'rgba(255,255,255,0.58)' : 'rgba(17,20,17,0.55)' }}
          >
            {stage.description}
          </motion.p>

          {isExclusive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38, ease }}
              className="mt-6 p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.30)' }}>
                What sets us apart
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Most career advisors stop at Process—helping you plan the path. Curavolv continues with you through {stage.title}, ensuring your career doesn't just start well, but sustains and leads.
              </p>
            </motion.div>
          )}

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={springPop}
            className="absolute top-0 right-0 flex items-center justify-center"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: isExclusive ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              border: isExclusive ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.10)',
              cursor: 'pointer',
            }}
            aria-label="Close detail card"
          >
            <X size={13} color={isExclusive ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.50)'} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile: vertical accordion layout
───────────────────────────────────────────────────────────────────────────── */
function MobileStage({
  stage, index, active, onClick,
}: {
  stage: Stage; index: number; active: boolean; onClick: () => void;
}) {
  const isLast = index === STAGES.length - 1;
  const isExclusive = stage.exclusive;

  return (
    <div className="relative">
      {/* Connecting line */}
      {!isLast && (
        <div
          className="absolute"
          style={{
            left: 15, top: 48, bottom: 0, width: 1,
            background: index === 2
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.06))'
              : isExclusive
                ? 'rgba(0,0,0,0.30)'
                : 'rgba(0,0,0,0.12)',
            borderLeft: index === 2 ? '1px dashed rgba(0,0,0,0.18)' : 'none',
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, delay: index * 0.08, ease }}
      >
        {/* Row */}
        <button
          onClick={onClick}
          className="w-full flex items-center gap-5 py-4 text-left focus-visible:outline-none"
          style={{ cursor: 'pointer' }}
          aria-expanded={active}
        >
          {/* Node dot */}
          <div className="relative flex-shrink-0">
            <motion.div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 32, height: 32,
                backgroundColor: isExclusive ? '#0a0a0a' : '#f0f0f0',
                border: isExclusive ? 'none' : '1px solid rgba(0,0,0,0.12)',
                boxShadow: active ? '0 0 0 3px rgba(0,0,0,0.10)' : 'none',
              }}
              animate={{ scale: active ? 1.12 : 1 }}
              transition={springPop}
            >
              {isExclusive
                ? <Lock size={11} color="white" strokeWidth={2.5} />
                : <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.75rem', color: '#555' }}>{stage.number}</span>
              }
            </motion.div>
          </div>

          {/* Title row */}
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p style={{ ...cormorant, fontSize: '1.1rem', color: '#111411' }}>{stage.title}</p>
              <p style={{ ...cormorantI, fontSize: '0.82rem', color: 'rgba(0,0,0,0.38)' }}>{stage.accent}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
              {isExclusive && (
                <span className="text-[8px] tracking-[0.28em] uppercase px-2 py-1 rounded-sm"
                      style={{ backgroundColor: '#0a0a0a', color: 'rgba(255,255,255,0.65)' }}>
                  Exclusive
                </span>
              )}
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.28, ease }}
                style={{ width: 16, height: 16, position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: 'rgba(0,0,0,0.35)', transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(0,0,0,0.35)', transform: 'translateX(-50%)' }} />
              </motion.div>
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div
                className="ml-14 mb-5 p-5 rounded-xl"
                style={{
                  background: isExclusive ? '#0a0a0a' : '#f9f9f9',
                  border: isExclusive ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
                }}
              >
                <p className="text-sm leading-relaxed"
                   style={{ color: isExclusive ? 'rgba(255,255,255,0.55)' : 'rgba(17,20,17,0.55)' }}>
                  {stage.description}
                </p>
                {isExclusive && (
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>What sets us apart</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      Most advisors stop at Process. Curavolv continues with you through {stage.title}.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────────────────── */
export function CareerEvolution() {
  const [active, setActive] = useState<number | null>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const pathAreaRef  = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' });
  const pathInView   = useInView(pathAreaRef, { once: true, margin: '-40px' });

  const toggle = (i: number) => setActive(prev => (prev === i ? null : i));

  /* "Others stop here" divider: SVG x=610 → CSS 61% */
  const dividerLeft = '61%';

  return (
    <section
      className="relative py-16 lg:py-24"
      style={{ borderTop: '1px solid rgba(0,0,0,0.07)', overflowX: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-12 lg:mb-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -14 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="text-[10px] tracking-[0.38em] uppercase font-medium mb-4"
              style={{ color: 'rgba(0,0,0,0.35)' }}
            >
              The 5P Framework
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              style={{ ...cormorant, fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', lineHeight: 1.06, color: '#111411' }}
            >
              From{' '}
              <em style={{ ...cormorantI, color: '#555' }}>Potential</em>
              <br />to{' '}
              <em style={{ ...cormorantI, color: '#111411' }}>Pinnacle</em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease }}
            className="lg:pb-2"
          >
            <p className="text-base leading-[1.85] mb-6" style={{ color: 'rgba(17,20,17,0.52)' }}>
              Five interconnected stages forming the foundation of every Curavolv engagement.
              Most companies guide careers through the first three. We go further.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-px" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }} />
                <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: 'rgba(0,0,0,0.35)' }}>Others</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-px" style={{ backgroundColor: '#0a0a0a' }} />
                <span className="text-[9px] tracking-[0.28em] uppercase font-medium" style={{ color: 'rgba(0,0,0,0.70)' }}>Curavolv</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Desktop: SVG path visualization ── */}
        <div className="hidden lg:block">

          {/* Path container — paddingBottom 18% keeps height = 18% of width to match SVG aspect */}
          <div
            ref={pathAreaRef}
            className="relative"
            style={{ paddingBottom: '18%', minHeight: 130 }}
          >
            {/* ── Exclusive zone background ── */}
            <motion.div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{ left: dividerLeft, right: 0, background: 'rgba(0,0,0,0.028)', borderRadius: '0 0 0 0' }}
              initial={{ opacity: 0 }}
              animate={pathInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6 }}
            />

            {/* ── SVG path + gradient definitions ── */}
            <svg
              className="absolute inset-0 w-full h-full overflow-visible"
              viewBox="0 0 1000 180"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* Path gradient: grey → near-black at the "others stop here" divide */}
                <linearGradient id="cev-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="rgba(0,0,0,0.18)" />
                  <stop offset="56%"  stopColor="rgba(0,0,0,0.28)" />
                  <stop offset="63%"  stopColor="rgba(0,0,0,0.60)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.88)" />
                </linearGradient>

                {/* Glow filter for exclusive nodes */}
                <filter id="cev-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Ghost/shadow path behind (always visible, very faint) */}
              <path d={PATH_D} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="2" />

              {/* Animated draw path */}
              <motion.path
                d={PATH_D}
                fill="none"
                stroke="url(#cev-path-grad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={pathInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Dashed "others boundary" vertical line */}
              <motion.line
                x1="610" y1="-10" x2="610" y2="190"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="1"
                strokeDasharray="4 5"
                initial={{ opacity: 0 }}
                animate={pathInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.8 }}
              />
            </svg>

            {/* ── "Others stop here" floating badge ── */}
            <motion.div
              className="absolute"
              style={{ left: dividerLeft, top: '-8%', transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, y: -6 }}
              animate={pathInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 2.0, ease }}
            >
              <div
                className="whitespace-nowrap px-2.5 py-1 flex items-center gap-1.5"
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.14)',
                  borderRadius: 4,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }} />
                <span className="text-[8.5px] tracking-[0.25em] uppercase" style={{ color: 'rgba(0,0,0,0.40)' }}>
                  Most companies stop here
                </span>
              </div>
            </motion.div>

            {/* ── "Curavolv exclusive zone" badge ── */}
            <motion.div
              className="absolute"
              style={{ right: 0, top: '-8%' }}
              initial={{ opacity: 0, y: -6 }}
              animate={pathInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 2.15, ease }}
            >
              <div
                className="whitespace-nowrap px-2.5 py-1 flex items-center gap-1.5"
                style={{
                  background: '#0a0a0a',
                  borderRadius: 4,
                }}
              >
                <Sparkles size={9} color="rgba(255,255,255,0.55)" />
                <span className="text-[8.5px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Curavolv exclusive
                </span>
              </div>
            </motion.div>

            {/* ── Interactive nodes ── */}
            {STAGES.map((stage, i) => (
              <PathNode
                key={i}
                stage={stage}
                index={i}
                active={active === i}
                pathInView={pathInView}
                onClick={() => toggle(i)}
              />
            ))}
          </div>

          {/* ── Stage labels row ── */}
          <div className="grid grid-cols-5 mt-2">
            {STAGES.map((stage, i) => (
              <motion.button
                key={i}
                onClick={() => toggle(i)}
                className="flex flex-col items-center gap-1.5 py-3 px-2 group focus-visible:outline-none"
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, y: 8 }}
                animate={pathInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.09, ease }}
                aria-label={`Select ${stage.title} stage`}
              >
                <span
                  className="transition-colors duration-200"
                  style={{
                    ...cormorant,
                    fontSize: '1.05rem',
                    lineHeight: 1.1,
                    color: active === i ? '#111411' : 'rgba(17,20,17,0.45)',
                  }}
                >
                  {stage.title}
                </span>
                <span
                  className="text-[8px] tracking-[0.25em] uppercase transition-colors duration-200"
                  style={{ color: active === i ? 'rgba(0,0,0,0.50)' : 'rgba(0,0,0,0.22)' }}
                >
                  {stage.exclusive ? '★ exclusive' : `0${i + 1}`}
                </span>
                {/* Active underline */}
                <motion.div
                  className="h-px"
                  style={{ backgroundColor: stage.exclusive ? '#0a0a0a' : '#555' }}
                  animate={{ width: active === i ? 24 : 0 }}
                  transition={{ duration: 0.3, ease }}
                />
              </motion.button>
            ))}
          </div>

          {/* ── Detail card ── */}
          <AnimatePresence mode="wait">
            {active !== null && (
              <DetailCard key={active} stage={STAGES[active]} onClose={() => setActive(null)} />
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile: vertical accordion ── */}
        <div className="lg:hidden">
          {/* "Others stop here" visual between stage 3 and 4 */}
          <div className="relative">
            {STAGES.map((stage, i) => (
              <div key={i}>
                {i === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 py-3 my-1 pl-3"
                    style={{ borderLeft: '2px dashed rgba(0,0,0,0.15)' }}
                  >
                    <span className="text-[8px] tracking-[0.28em] uppercase" style={{ color: 'rgba(0,0,0,0.32)' }}>
                      Most companies stop here · Curavolv continues ↓
                    </span>
                  </motion.div>
                )}
                <MobileStage
                  stage={stage}
                  index={i}
                  active={active === i}
                  onClick={() => toggle(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer quote ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="mt-12 lg:mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          <p style={{ ...cormorantI, color: 'rgba(17,20,17,0.22)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 420 }}>
            "Each stage builds on the one before—designed to compound across the full arc of a healthcare career."
          </p>
          <div className="flex items-center gap-2">
            {STAGES.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => toggle(i)}
                className="rounded-full transition-all duration-200 focus-visible:outline-none"
                style={{
                  width:  active === i ? 20 : 6,
                  height: 6,
                  backgroundColor: s.exclusive ? (active === i ? '#0a0a0a' : 'rgba(0,0,0,0.30)') : (active === i ? '#444' : 'rgba(0,0,0,0.18)'),
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.2 }}
                transition={springPop}
                aria-label={`Go to ${s.title}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
