import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const serif:  React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const serifI: React.CSSProperties = { ...serif };
const ease = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════════════════════════════════
   SHARED — single block tile
═══════════════════════════════════════════════════════════════════════ */
interface TileProps {
  label:   string;
  sub?:    string;
  dark?:   boolean;
  wide?:   boolean;           // stretch to fill its container
  inView:  boolean;
  delay:   number;
}

function Tile({ label, sub, dark = false, wide = false, inView, delay }: TileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.44, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width:        wide ? '100%' : undefined,
        background:   dark ? '#111411' : 'rgba(0,0,0,0.05)',
        border:       dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.09)',
        borderRadius: 6,
        padding:      '9px 13px',
        display:      'flex',
        alignItems:   'center',
        justifyContent: sub ? 'space-between' : 'flex-start',
        gap:          8,
      }}
    >
      {/* Left cluster */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 5, height: 5, borderRadius: 1.5, flexShrink: 0,
          background: dark ? 'rgba(255,255,255,0.42)' : 'rgba(0,0,0,0.22)',
        }} />
        <span style={{
          fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
          fontWeight: 600, whiteSpace: 'nowrap',
          color: dark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.55)',
        }}>
          {label}
        </span>
      </div>
      {/* Right sub-label */}
      {sub && (
        <span style={{
          fontSize: 8, letterSpacing: '0.07em',
          fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
          color: dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.26)',
        }}>
          {sub}
        </span>
      )}
    </motion.div>
  );
}

/* Thin connecting stem between block groups */
function Stem({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={inView ? { scaleY: 1, opacity: 1 } : {}}
      transition={{ duration: 0.26, delay, ease }}
      style={{
        height: 10, width: 1,
        background: 'rgba(0,0,0,0.13)',
        margin: '2px auto',
        transformOrigin: 'top',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SHARED — column wrapper
═══════════════════════════════════════════════════════════════════════ */
interface ColWrapperProps {
  number:      string;
  from:        string;
  to:          string;
  description: string;
  inView:      boolean;
  children:    React.ReactNode;
}

function ColWrapper({ number, from, to, description, inView, children }: ColWrapperProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Index */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.04, ease }}
        style={{ fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.22)', fontWeight: 500 }}
      >
        {number}
      </motion.p>

      {/* Block visualization */}
      {children}

      {/* From → To + descriptor */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.72, ease }}
        style={{ display: 'flex', flexDirection: 'column', gap: 7 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ ...serifI,  fontSize: '0.88rem', color: 'rgba(17,20,17,0.30)' }}>{from}</span>
          <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.20)' }}>→</span>
          <span style={{ ...serif,    fontSize: '0.88rem', color: '#111411' }}>{to}</span>
        </div>
        <p style={{ fontSize: '0.78rem', lineHeight: 1.78, letterSpacing: '0.01em', color: 'rgba(17,20,17,0.46)' }}>
          {description}
        </p>
      </motion.div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   COLUMN 01 — Direction
   Visual: three stacked tiles building bottom-up
   Assessment (appears 1st / sits at bottom) → Strategy → Clarity (dark cap, last)
═══════════════════════════════════════════════════════════════════════ */
function DirectionCol({ inView }: { inView: boolean }) {
  return (
    <ColWrapper
      number="01"
      from="Uncertainty"
      to="Direction"
      description="Turn ambiguity into a defined north star — specific enough to plan toward, flexible enough to evolve with you."
      inView={inView}
    >
      {/* DOM: Clarity (top) → Assessment (bottom). Delay: Assessment first → Clarity last */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Tile label="Clarity"    sub="own the direction"  dark  wide inView={inView} delay={0.52} />
        <Tile label="Strategy"   sub="chart the path"           wide inView={inView} delay={0.38} />
        <Tile label="Assessment" sub="know the baseline"        wide inView={inView} delay={0.24} />
      </div>
    </ColWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   COLUMN 02 — Readiness
   Visual: 2 × 2 grid of inputs converging into one dark output block
═══════════════════════════════════════════════════════════════════════ */
function ReadinessCol({ inView }: { inView: boolean }) {
  const inputs: [string, string | undefined, number][] = [
    ['Credentials',  undefined, 0.16],
    ['Presentation', undefined, 0.24],
    ['Technique',    undefined, 0.32],
    ['Mentality',    undefined, 0.40],
  ];

  return (
    <ColWrapper
      number="02"
      from="Credentials"
      to="Readiness"
      description="Capability that matters in practice — not just credentials that satisfy a checklist."
      inView={inView}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* 2 × 2 input tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {inputs.map(([lbl, , del]) => (
            <Tile key={lbl} label={lbl} inView={inView} delay={del} />
          ))}
        </div>

        {/* Converging stem */}
        <Stem inView={inView} delay={0.50} />

        {/* Merged output */}
        <Tile label="Genuine Readiness" sub="fully built" dark wide inView={inView} delay={0.57} />
      </div>
    </ColWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   COLUMN 03 — Momentum
   Visual: widening staircase — each block grows wider, Momentum at full width
═══════════════════════════════════════════════════════════════════════ */
function MomentumCol({ inView }: { inView: boolean }) {
  const steps: Array<{ label: string; width: string; delay: number; dark?: boolean }> = [
    { label: 'Entry',      width: '40%',  delay: 0.14 },
    { label: 'Exposure',   width: '58%',  delay: 0.25 },
    { label: 'Experience', width: '78%',  delay: 0.36 },
    { label: 'Momentum',   width: '100%', delay: 0.47, dark: true },
  ];

  return (
    <ColWrapper
      number="03"
      from="Entry"
      to="Momentum"
      description="Sustained growth, relevance, and distinction — not just a launch, but an ongoing arc of leadership."
      inView={inView}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {steps.map(s => (
          <div key={s.label} style={{ width: s.width }}>
            <Tile label={s.label} dark={s.dark} wide inView={inView} delay={s.delay} />
          </div>
        ))}
      </div>
    </ColWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════════ */
export function Outcomes() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const gridInView   = useInView(gridRef,   { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14 lg:py-24">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-14 lg:mb-20 grid lg:grid-cols-[1fr_1.55fr] gap-10 items-end">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <p
              className="text-[9px] tracking-[0.38em] uppercase font-medium mb-5"
              style={{ color: 'rgba(0,0,0,0.30)' }}
            >
              Outcomes
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(2.6rem, 3.5vw, 3.8rem)', color: '#111411', lineHeight: 1.06 }}>
              What We<br />
              <em style={{ ...serifI, color: 'rgba(17,20,17,0.48)' }}>Build for You</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease }}
            className="text-base leading-[1.85] lg:pb-2"
            style={{ color: 'rgba(17,20,17,0.50)' }}
          >
            Three constructions. Each transforms a liability into a lasting career asset — built
            layer by layer, so every advancement compounds on the one before.
          </motion.p>

        </div>

        {/* ── 3-column grid ── */}
        <div
          ref={gridRef}
          className="grid lg:grid-cols-3"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          {/* Col 01 — Direction */}
          <div
            className="py-8 border-b lg:border-b-0 lg:border-r lg:pr-9"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}
          >
            <DirectionCol inView={gridInView} />
          </div>

          {/* Col 02 — Readiness */}
          <div
            className="py-8 border-b lg:border-b-0 lg:border-r lg:px-9"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}
          >
            <ReadinessCol inView={gridInView} />
          </div>

          {/* Col 03 — Momentum */}
          <div className="py-8 lg:pl-9">
            <MomentumCol inView={gridInView} />
          </div>
        </div>

      </div>
    </section>
  );
}
