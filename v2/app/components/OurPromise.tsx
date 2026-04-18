import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const TEAL   = '#555555';
const PURPLE = '#444444';

const promises = [
  'Clarity before commitment',
  'Evidence-guided, human-led guidance',
  'Preparation that compounds',
  'Accountability at every step',
];

const notPromises = [
  'Guaranteed admissions or jobs',
  'Shortcuts over substance',
  'One-size-fits-all paths',
];

function IconBadge({ type, delay }: { type: 'check' | 'x'; delay: number }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 320, damping: 16, delay }}
      style={{
        width: 26, height: 26, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: 11, fontWeight: 700, marginTop: 1,
        background: type === 'check' ? 'rgba(100,100,100,0.15)' : 'rgba(0,0,0,0.05)',
        color: type === 'check' ? TEAL : '#888888',
      }}
    >
      {type === 'check' ? '✓' : '✕'}
    </motion.span>
  );
}

export function OurPromise() {
  const pillRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  const pillInView    = useInView(pillRef,    { once: true, margin: '-60px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const cardsInView   = useInView(cardsRef,   { once: true, margin: '-60px' });

  const headingWords = 'Built on Integrity. Guided by Reality.'.split(' ');

  return (
    <section className="relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="relative max-w-7xl mx-auto px-8 lg:px-16 py-14 lg:py-20" style={{ zIndex: 1 }}>

        {/* Pill */}
        <motion.div
          ref={pillRef}
          initial={{ opacity: 0 }}
          animate={pillInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(100,100,100,0.10)',
            border: `1px solid ${TEAL}`,
            color: TEAL,
            borderRadius: 999, fontSize: 12, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '6px 18px', marginBottom: 18,
          }}
        >
          OUR COMMITMENTS
        </motion.div>

        {/* Word-by-word heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.12,
            marginBottom: 12,
            color: '#111411',
          }}
        >
          {headingWords.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 1.18 }}>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
                style={{ display: 'inline-block', color: '#111411' }}
              >
                {word}{i < headingWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Quote above cards */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontSize: 20,
            color: TEAL,
            fontFamily: "'Inter', sans-serif",
            maxWidth: 620, marginBottom: 40, lineHeight: 1.6,
          }}
        >
          "Honest guidance builds confidence—and careers that endure."
        </motion.p>

        {/* Two-card row */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">

          {/* Left — teal-tinted promise card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={cardsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              background: 'rgba(100,100,100,0.06)',
              borderLeft: `4px solid ${TEAL}`,
              borderRadius: 20,
              padding: '32px 36px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22, fontWeight: 700,
              color: '#111411', marginBottom: 30,
            }}>What We Promise</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {promises.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 15, lineHeight: 1.65 }}>
                  <IconBadge type="check" delay={0.6 + i * 0.08} />
                  <span style={{ color: '#222222' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — white "don't" card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={cardsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDDDDD',
              borderRadius: 20,
              padding: '32px 36px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22, fontWeight: 700,
              color: '#111411', marginBottom: 30,
            }}>What We Don't Promise</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {notPromises.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 15, lineHeight: 1.65 }}>
                  <IconBadge type="x" delay={0.7 + i * 0.08} />
                  <span style={{ color: '#666666' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>


      </div>
    </section>
  );
}

