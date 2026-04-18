import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const serif: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
};
const ease = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 6000;

const testimonials = [
  {
    quote: 'Curavolv transformed how I saw my career trajectory. Within weeks I had clarity about my path into clinical consulting that took colleagues years to find. The structured approach is unlike anything else in this space.',
    author: 'Dr. Priya M.',
    role: 'Internal Medicine Physician',
    tag: 'Now: Pharmaceutical Strategy Consultant',
    initials: 'PM',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1100&fit=crop&crop=top&auto=format&q=80',
  },
  {
    quote: 'As an international medical graduate I was overwhelmed by the U.S. healthcare landscape. The mentorship I received here gave me a genuine competitive advantage I could not have built alone.',
    author: 'Rahul S., MBBS',
    role: 'International Medical Graduate',
    tag: 'Now: Research Coordinator, Academic Medical Center',
    initials: 'RS',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1100&fit=crop&crop=top&auto=format&q=80',
  },
  {
    quote: 'I had years of residency ahead and zero clarity on direction. The career architecture they built with me converted vague anxiety into a precise, actionable roadmap I actually trust.',
    author: 'Dr. Aisha K.',
    role: 'Resident Physician, Internal Medicine',
    tag: 'Now: Fellowship Track with Full Clarity',
    initials: 'AK',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&h=1100&fit=crop&crop=top&auto=format&q=80',
  },
  {
    quote: 'Precise, strategic, genuinely tailored to healthcare careers. I stopped drifting and started building with real intention. Nothing else comes close to this level of specificity.',
    author: 'James C., PharmD',
    role: 'Clinical Pharmacist',
    tag: 'Now: Health Technology Product Manager',
    initials: 'JC',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&h=1100&fit=crop&crop=top&auto=format&q=80',
  },
  {
    quote: 'Three focused conversations gave me more strategic direction than three years of trying alone. The depth of understanding they bring to healthcare career paths is genuinely exceptional.',
    author: 'Dr. Maria S.',
    role: 'Clinical Researcher',
    tag: 'Now: Medical Affairs Lead, Biotech',
    initials: 'MS',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1100&fit=crop&crop=top&auto=format&q=80',
  },
];

export function Testimonials() {
  const [[idx, dir], setPage] = useState([0, 0]);
  const [paused, setPaused]   = useState(false);
  const [tick, setTick]       = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const go = useCallback((d: number) => {
    setPage(([p]) => [(p + d + testimonials.length) % testimonials.length, d]);
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, inView, go]);

  const t = testimonials[idx];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ background: '#0D0D0D', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 620 }} className="max-lg:!grid-cols-1">

          {/* ── LEFT: Photo ──────────────────────────────────── */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380 }}>

            {/* Photos crossfade independently */}
            <AnimatePresence>
              <motion.img
                key={idx}
                src={t.photo}
                alt={t.author}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center 15%',
                  filter: 'grayscale(1) brightness(0.82) contrast(1.08)',
                  display: 'block',
                }}
              />
            </AnimatePresence>

            {/* Gradient: right edge bleeds into content panel */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(to right, transparent 55%, #0D0D0D 100%)',
            }} />
            {/* Bottom darkening */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(13,13,13,0.75) 0%, transparent 45%)',
            }} />

            {/* Counter — bottom left of photo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              style={{
                position: 'absolute', bottom: 32, left: 36,
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <span style={{ ...serif, fontSize: 28, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.3)', display: 'block' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
                {String(testimonials.length).padStart(2, '0')}
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: Content ───────────────────────────────── */}
          <div style={{
            background: '#0D0D0D',
            padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 72px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative',
          }}>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 48, fontWeight: 600 }}
            >
              Testimonials
            </motion.p>

            {/* Quote — animates independently on slide change */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Decorative opening mark */}
                <div style={{ ...serif, fontSize: 96, lineHeight: 0.55, color: 'rgba(255,255,255,0.07)', marginBottom: 24, userSelect: 'none' }}>
                  &#8220;
                </div>

                <blockquote style={{
                  ...serif,
                  fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)',
                  color: 'rgba(255,255,255,0.86)',
                  lineHeight: 1.68,
                  marginBottom: 40,
                }}>
                  {t.quote}
                </blockquote>

                {/* Rule */}
                <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)', marginBottom: 28 }} />

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* Avatar circle */}
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    overflow: 'hidden', flexShrink: 0,
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ ...serif, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{t.initials}</span>
                  </div>

                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', lineHeight: 1, marginBottom: 4 }}>
                      {t.author}
                    </p>
                    <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.02em' }}>
                      {t.role}
                    </p>
                  </div>

                  <div style={{ marginLeft: 'auto', paddingLeft: 12 }}>
                    <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {t.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Navigation ── */}
            <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 20 }}>

              {/* Arrows */}
              {[{ d: -1, Icon: ArrowLeft }, { d: 1, Icon: ArrowRight }].map(({ d, Icon }) => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => go(d)}
                  aria-label={d === -1 ? 'Previous' : 'Next'}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  <Icon size={16} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
                </motion.button>
              ))}

              {/* Progress tracks */}
              <div style={{ display: 'flex', gap: 6, flex: 1, alignItems: 'center' }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage([i, i > idx ? 1 : -1])}
                    aria-label={`Go to ${i + 1}`}
                    style={{ flex: 1, height: 2, background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'relative' }}
                  >
                    {/* Track bg */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }} />
                    {/* Fill */}
                    {i === idx && (
                      <motion.div
                        key={tick}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? undefined : 1 }}
                        transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(255,255,255,0.8)',
                          borderRadius: 2,
                          transformOrigin: 'left',
                        }}
                      />
                    )}
                    {/* Visited */}
                    {i < idx && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
