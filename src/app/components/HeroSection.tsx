import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { MagnetButton } from './ui/MagnetButton';

const ease = [0.22, 1, 0.36, 1] as const;
const cormorant: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const cormorantItalic: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };

const words1 = 'Design a Healthcare Career'.split(' ');
const words2 = 'That Endures'.split(' ');

/* ── Spinning rainbow ring ── */
function RainbowRing({ size = 18 }: { size?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size, height: size, borderRadius: '50%',
        border: '2px solid transparent',
        borderTopColor: '#FF8C42',
        borderRightColor: '#3CC8C2',
        borderBottomColor: '#9370DB',
        borderLeftColor: '#66CDAA',
        flexShrink: 0,
      }}
    />
  );
}

/* ── Expanding career path card — light glassmorphism ── */
function CareerPathCard() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), 2600);
    return () => clearTimeout(t);
  }, []);

  const programs = [
    { name: 'Compass™', label: 'Students',    color: '#3CC8C2' },
    { name: 'Propel™',  label: 'Graduate',    color: '#9370DB' },
    { name: 'Ascent™',  label: 'Early Career', color: '#C4A35A' },
  ];

  return (
    <motion.div
      animate={{ height: expanded ? 'auto' : 56, borderRadius: expanded ? 20 : 999 }}
      transition={{ height: { duration: 0.65, ease: [0.4,0,0.2,1] }, borderRadius: { duration: 0.65, ease: [0.4,0,0.2,1] } }}
      className="overflow-hidden w-72"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(0,0,0,0.10)',
        boxShadow: '0 8px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(60,200,194,0.10)',
      }}
    >
      <div className="flex items-center justify-between px-5" style={{ height: 56 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#111411', whiteSpace: 'nowrap' }}>
          Your Career Path
        </span>
        <RainbowRing size={16} />
      </div>

      {expanded && (
        <div>
          {programs.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, ease }}
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#111411', lineHeight: 1 }}>
                    {p.name}
                  </p>
                  <p className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: p.color, opacity: 0.75 }}>
                    {p.label}
                  </p>
                </div>
              </div>
              <RainbowRing size={14} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, ease }}
            className="px-5 py-3.5"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(17,20,17,0.30)' }}>
              Evidence-Guided · Human-Led
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

/* ── Floating stat badges — light ── */
function StatBadge({ value, label, delay, style }: { value: string; label: string; delay: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease }}
      className="absolute rounded-2xl px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.5rem', color: '#3CC8C2', lineHeight: 1 }}>
        {value}
      </p>
      <p className="text-[10px] tracking-[0.22em] uppercase mt-1" style={{ color: 'rgba(17,20,17,0.45)' }}>
        {label}
      </p>
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade     = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.7], [0.50, 0.85]);
  const cardScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.88]);
  const cardOp   = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Parallax video */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-[1.12]" src="/videos/gemini.mp4" />
      </motion.div>

      {/* Dark overlay — keeps text readable over video */}
      <motion.div className="absolute inset-0 bg-[#111411]" style={{ opacity: overlayOp }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111411]/80 via-[#111411]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111411]/70" />

      {/* Teal + violet ambient orbs */}
      <motion.div className="absolute top-1/4 right-[20%] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(60,200,194,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute bottom-1/3 right-1/3 w-[30rem] h-[30rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(147,112,219,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1], x: [0, -28, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      />

      {/* Accent line */}
      <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ top: '18%', background: 'linear-gradient(90deg, transparent, rgba(60,200,194,0.20), transparent)' }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <motion.div className="relative z-10 px-8 lg:px-16 mt-10 max-w-4xl" style={{ y: contentY, opacity: fade }}>

        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}
          className="flex items-center gap-3 mb-8">
          <motion.div className="h-px bg-[#3CC8C2]" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.8, delay: 0.45, ease }} />
          <p className="text-[10px] tracking-[0.32em] uppercase text-[#7BDAD6] font-medium">Healthcare Career Design</p>
        </motion.div>

        <h1 className="text-white mb-8 leading-[1.08]" style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', ...cormorant }}>
          <span className="block">
            {words1.map((w, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.09, ease }} style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}>
                {w}{i < words1.length - 1 ? '\u00a0' : ''}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {words2.map((w, i) => (
              <motion.em key={i} style={{ ...cormorantItalic, display: 'inline-block', willChange: 'transform, opacity, filter', color: '#7BDAD6' }}
                initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.72 + i * 0.1, ease }}>
                {w}{i < words2.length - 1 ? '\u00a0' : ''}
              </motion.em>
            ))}
          </span>
        </h1>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0, ease }}
          className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-[#3CC8C2]" />
          <p className="text-[10px] tracking-[0.22em] uppercase text-white/35">
            U.S.-Based Advisors&nbsp;·&nbsp;15+ Years Combined Experience&nbsp;·&nbsp;Evidence-Guided
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap items-center gap-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.15, ease }}>
          <MagnetButton className="inline-flex items-center gap-3 px-8 py-4 bg-[#3CC8C2] text-white text-sm font-semibold tracking-wide">
            <motion.span className="flex items-center gap-3">
              Understand Your Best-Fit Path
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}><ArrowRight size={14} /></motion.span>
            </motion.span>
          </MagnetButton>
          <motion.button
            whileHover={{ scale: 1.03, borderColor: 'rgba(123,218,214,0.5)' }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="inline-flex items-center gap-2 px-6 py-4 text-white/55 hover:text-white text-sm font-medium border border-white/15 transition-colors duration-200"
          >Our Programs</motion.button>
        </motion.div>
      </motion.div>

      {/* Floating career card */}
      <motion.div
        className="absolute right-12 xl:right-20 top-1/2 -translate-y-1/2 hidden lg:block z-20"
        style={{ scale: cardScale, opacity: cardOp }}
        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 1.8, ease }}
      >
        <motion.div animate={{ y: [0, -10, 0], rotateX: [-1, 1, -1], rotateY: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
          <CareerPathCard />
        </motion.div>
        <StatBadge value="15+" label="Years Experience" delay={2.8} style={{ bottom: -28, left: -60 }} />
        <StatBadge value="3" label="Programs" delay={3.0} style={{ top: -20, left: -70 }} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <motion.div className="flex items-center gap-3" animate={{ y: [0, 4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>✳</span>
          <span className="text-[9px] tracking-[0.45em] uppercase text-white/25">Scroll to Explore</span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>✳</span>
        </motion.div>
        <motion.div animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(60,200,194,0.5), transparent)', transformOrigin: 'top' }} />
      </motion.div>

    </section>
  );
}
