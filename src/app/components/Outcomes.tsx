import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const TEAL   = '#3CC8C2';
const PURPLE = '#8454A8';

/* ── Animated SVG trend chart ── */
function AnimatedChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <svg viewBox="0 0 280 80" className="w-full overflow-visible">
        <defs>
          <linearGradient id="cgiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={TEAL} stopOpacity="0.18" />
            <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50].map((y, i) => (
          <motion.line
            key={i} x1="0" y1={y} x2="280" y2={y}
            stroke="rgba(0,0,0,0.06)" strokeWidth="0.5"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
          />
        ))}
        <motion.path
          d="M0,60 L40,45 L80,50 L120,30 L160,20 L200,25 L240,12 L280,8 L280,80 L0,80 Z"
          fill="url(#cgiGrad)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }}
        />
        <motion.path
          d="M0,60 L40,45 L80,50 L120,30 L160,20 L200,25 L240,12 L280,8"
          fill="none" stroke={TEAL} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.6, delay: 0.4, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="200" cy="25" r="4" fill={TEAL}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: 1.8, stiffness: 300 }}
        />
        <motion.line
          x1="200" y1="25" x2="200" y2="80"
          stroke={TEAL} strokeWidth="1" strokeDasharray="3 3"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 0.35 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.9 }}
          style={{ transformOrigin: '200px 25px' }}
        />
      </svg>
      <div className="flex justify-between mt-2 px-1">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, i) => (
          <motion.span
            key={m}
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.06 }}
            className="text-[9px] tracking-wide"
            style={{ color: 'rgba(17,20,17,0.28)' }}
          >
            {m}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Career Growth Index dashboard card ── */
function CareerGrowthCard({ inView }: { inView: boolean }) {
  const cardMetrics = [
    { label: 'Clarity Score', value: '94%', color: TEAL },
    { label: 'Readiness',     value: '88%', color: PURPLE },
    { label: 'Momentum',      value: '76%', color: '#C4A35A' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 20,
        boxShadow: '0 12px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(132,84,168,0.10)',
        padding: '28px',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p
            className="text-[9px] tracking-[0.28em] uppercase mb-1"
            style={{ color: 'rgba(17,20,17,0.35)' }}
          >
            Career Growth Index
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '1.75rem',
              color: '#111411',
              lineHeight: 1.1,
            }}
          >
            +47%{' '}
            <span style={{ color: TEAL }}>↑</span>
          </p>
        </div>
        <div className="flex gap-1.5 mt-1">
          {[TEAL, PURPLE, '#C4A35A'].map((c, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Chart */}
      <AnimatedChart />

      {/* Metric row */}
      <div
        className="flex gap-4 mt-6 pt-5"
        style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
      >
        {cardMetrics.map((m) => (
          <div key={m.label} className="flex-1">
            <p
              className="text-[8px] tracking-wider uppercase mb-1.5"
              style={{ color: 'rgba(17,20,17,0.30)' }}
            >
              {m.label}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '1.15rem',
                color: m.color,
                lineHeight: 1,
              }}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Purple accent strip at bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 2,
          background: `linear-gradient(to right, ${PURPLE}, ${TEAL})`,
          borderRadius: 999,
          transformOrigin: 'left',
          marginTop: 20,
        }}
      />
    </motion.div>
  );
}

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

const transformRows = [
  { left: 'Uncertainty', right: 'Direction',  accent: TEAL,   delay: 0.10 },
  { left: 'Credentials', right: 'Readiness',  accent: PURPLE, delay: 0.22 },
  { left: 'Entry',       right: 'Momentum',   accent: PURPLE, delay: 0.34 },
];

const stats = [
  { label: 'Goal-to-path alignment',           value: '94%', pct: '94%',  color: TEAL   },
  { label: 'Application & interview readiness', value: '87%', pct: '87%',  color: PURPLE },
  { label: 'Decision clarity at programme end', value: '91%', pct: '91%',  color: PURPLE },
];

/* ── Animated stat bar ── */
function StatBar({
  stat,
  delay,
  parentInView,
}: {
  stat: typeof stats[0];
  delay: number;
  parentInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-end justify-between mb-2.5">
        <p
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(17,20,17,0.40)',
            lineHeight: 1.4,
            maxWidth: 200,
          }}
        >
          {stat.label}
        </p>
        <p
          style={{
            ...serif,
            fontSize: '1.55rem',
            color: stat.color,
            lineHeight: 1,
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          {stat.value}
        </p>
      </div>
      <div
        style={{
          height: 3,
          background: 'rgba(0,0,0,0.06)',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={parentInView ? { width: stat.pct } : {}}
          transition={{ duration: 1.5, delay: delay + 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(to right, ${stat.color}, ${stat.color}70)`,
            borderRadius: 999,
          }}
        />
      </div>
    </motion.div>
  );
}

export function Outcomes() {
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const leftInView   = useInView(leftRef,   { once: true, margin: '-60px' });
  const imageInView  = useInView(rightRef,  { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14 lg:py-20">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-10"
        >
          <p
            className="text-[10px] tracking-[0.36em] uppercase font-semibold mb-5"
            style={{ color: PURPLE }}
          >
            Outcomes
          </p>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(2.75rem, 3.5vw, 3.5rem)',
                color: '#111411',
                lineHeight: 1.08,
              }}
            >
              What Progress Looks Like<br />
              <em style={{ ...serif, color: PURPLE }}>
                When Careers Are Designed.
              </em>
            </h2>
            <p
              className="text-base leading-relaxed lg:pb-2"
              style={{ color: 'rgba(17,20,17,0.52)' }}
            >
              We measure progress by alignment, readiness, confidence, and long-term
              growth — not just titles or credentials.
            </p>
          </div>
        </motion.div>

        {/* ── Asymmetric content grid ── */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-stretch">

          {/* Left — transformations + stat bars */}
          <div ref={leftRef}>

            {/* Transformation list */}
            <div
              className="mb-8"
              style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
            >
              {transformRows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -22 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: row.delay, ease }}
                  className="flex items-center py-5"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', gap: 16 }}
                >
                  {/* From label */}
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                                            fontSize: 17,
                      color: 'rgba(17,20,17,0.32)',
                      minWidth: 108,
                    }}
                  >
                    {row.left}
                  </span>

                  {/* Animated connector line */}
                  <div
                    className="flex items-center flex-1"
                    style={{ gap: 6 }}
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={leftInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.7, delay: row.delay + 0.18, ease }}
                      style={{
                        flex: 1,
                        height: 1,
                        background: `linear-gradient(to right, ${row.accent}30, ${row.accent})`,
                        transformOrigin: 'left',
                      }}
                    />
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={leftInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: row.delay + 0.4, ease }}
                    >
                      <ArrowRight size={13} color={row.accent} />
                    </motion.span>
                  </div>

                  {/* To label */}
                  <span
                    style={{
                      ...serif,
                      fontSize: 18,
                      color: row.accent,
                      minWidth: 100,
                      textAlign: 'right',
                    }}
                  >
                    {row.right}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stat bars */}
            <div className="space-y-8">
              {stats.map((stat, i) => (
                <StatBar
                  key={i}
                  stat={stat}
                  delay={0.45 + i * 0.15}
                  parentInView={leftInView}
                />
              ))}
            </div>
          </div>

          {/* Right — Career Growth Index dashboard card */}
          <div ref={rightRef} className="flex flex-col justify-center">
            <CareerGrowthCard inView={imageInView} />
          </div>

        </div>
      </div>
    </section>
  );
}
