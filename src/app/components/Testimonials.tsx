import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TEAL   = '#3CC8C2';
const PURPLE = '#8454A8';
const NAVY   = '#0D1B2A';

const serif: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
};
const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote:
      'Curavolv transformed how I saw my career trajectory. Within weeks I had clarity about my path into clinical consulting that took colleagues years to find. The structured, evidence-guided approach is unlike anything else in this space.',
    author: 'Dr. Priya M.',
    role: 'Internal Medicine Physician',
    transition: 'Now: Pharmaceutical Strategy Consultant',
    rating: 5,
    initials: 'PM',
    accentColor: TEAL,
  },
  {
    quote:
      'As an international medical graduate I was overwhelmed by the U.S. healthcare landscape. The mentorship I received here gave me a genuine competitive advantage I simply could not have built alone.',
    author: 'Rahul S., MBBS',
    role: 'International Medical Graduate',
    transition: 'Now: Research Coordinator, Academic Medical Center',
    rating: 5,
    initials: 'RS',
    accentColor: PURPLE,
  },
  {
    quote:
      'I had years of residency ahead and zero clarity on where I was heading. The career architecture they built with me converted vague anxiety into a precise, actionable roadmap I actually trust.',
    author: 'Dr. Aisha K.',
    role: 'Resident Physician, Internal Medicine',
    transition: 'Now: Fellowship Track with Full Clarity',
    rating: 5,
    initials: 'AK',
    accentColor: TEAL,
  },
  {
    quote:
      'The insight here goes far beyond generic coaching. It is precise, strategic, and genuinely tailored to healthcare careers. I stopped drifting and started building with real, lasting intention.',
    author: 'James C., PharmD',
    role: 'Clinical Pharmacist',
    transition: 'Now: Health Technology Product Manager',
    rating: 5,
    initials: 'JC',
    accentColor: PURPLE,
  },
  {
    quote:
      'Three focused conversations gave me more strategic direction than three years of trying to figure it out independently. The depth of understanding they bring to healthcare career paths is genuinely exceptional.',
    author: 'Dr. Maria S.',
    role: 'Clinical Researcher',
    transition: 'Now: Medical Affairs Lead, Biotech',
    rating: 5,
    initials: 'MS',
    accentColor: TEAL,
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 110 : -110,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -110 : 110,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Testimonials() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const headerRef   = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerInView   = useInView(headerRef,   { once: true, margin: '-60px' });
  const carouselInView = useInView(carouselRef, { once: true, margin: '-80px' });

  const paginate = useCallback((newDir: number) => {
    setPage(([prev]) => {
      const next = (prev + newDir + testimonials.length) % testimonials.length;
      return [next, newDir];
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => paginate(1), 5200);
    return () => clearInterval(id);
  }, [isPaused, paginate]);

  const t = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${NAVY} 0%, #0F2337 50%, #0D1B2A 100%)`,
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          style={{
            position: 'absolute', top: '-8%', right: '-8%',
            width: 600, height: 600, borderRadius: '50%',
            background: `radial-gradient(circle, ${TEAL}0D 0%, transparent 65%)`,
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '-10%', left: '-8%',
            width: 500, height: 500, borderRadius: '50%',
            background: `radial-gradient(circle, ${PURPLE}0D 0%, transparent 65%)`,
          }}
        />
        {/* Horizontal rule accent */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${TEAL}22, transparent)`,
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${TEAL}22, transparent)`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-20 lg:py-28 relative">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-14"
        >
          <p
            className="text-[10px] tracking-[0.36em] uppercase font-semibold mb-5"
            style={{ color: TEAL }}
          >
            Testimonials
          </p>
          <h2
            style={{
              ...serif,
              fontSize: 'clamp(2.5rem, 3.5vw, 3.25rem)',
              color: '#FFFFFF',
              lineHeight: 1.1,
            }}
          >
            Voices of Those Who{' '}
            <em style={{ ...serif, color: TEAL }}>
              Found Their Path.
            </em>
          </h2>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 32 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote icon */}
          <div className="flex justify-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={carouselInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35, ease }}
              style={{
                width: 58, height: 58,
                background: `linear-gradient(135deg, ${TEAL}1A, ${PURPLE}1A)`,
                border: `1px solid ${TEAL}30`,
                borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 32px ${TEAL}18`,
              }}
            >
              <Quote size={24} color={TEAL} strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Slide container */}
          <div
            className="overflow-hidden"
            style={{ minHeight: 300, position: 'relative' }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -55) paginate(1);
                  else if (info.offset.x > 55) paginate(-1);
                }}
                className="text-center"
                style={{ cursor: 'grab', userSelect: 'none' }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-[5px] mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 16,
                        delay: 0.05 + i * 0.06,
                      }}
                    >
                      <Star size={14} fill={TEAL} color={TEAL} />
                    </motion.span>
                  ))}
                </div>

                {/* Quote text */}
                <blockquote
                  style={{
                    ...serif,
                                        fontSize: 'clamp(1.3rem, 2.1vw, 1.7rem)',
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.58,
                    maxWidth: 760,
                    margin: '0 auto 2.5rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  &#8220;{t.quote}&#8221;
                </blockquote>

                {/* Author block */}
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                    style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${t.accentColor}40, ${t.accentColor}18)`,
                      border: `1.5px solid ${t.accentColor}50`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 14,
                      boxShadow: `0 0 20px ${t.accentColor}22`,
                    }}
                  >
                    <span style={{ ...serif, fontSize: 17, color: t.accentColor }}>
                      {t.initials}
                    </span>
                  </motion.div>

                  <p style={{ fontSize: 15.5, fontWeight: 600, color: '#FFFFFF', marginBottom: 5 }}>
                    {t.author}
                  </p>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em', marginBottom: 14 }}>
                    {t.role}
                  </p>

                  {/* Transition badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease }}
                    style={{
                      padding: '5px 18px',
                      background: `${t.accentColor}18`,
                      border: `1px solid ${t.accentColor}35`,
                      borderRadius: 999,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: t.accentColor,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {t.transition}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-center gap-7 mt-12">
            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              style={{
                width: 46, height: 46, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = `${TEAL}20`;
                (e.currentTarget as HTMLButtonElement).style.border = `1px solid ${TEAL}40`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(255,255,255,0.14)';
              }}
            >
              <ChevronLeft size={18} color="rgba(255,255,255,0.7)" strokeWidth={1.75} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-[10px]">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setPage([i, i > currentIndex ? 1 : -1])}
                  animate={{
                    width: i === currentIndex ? 28 : 6,
                    opacity: i === currentIndex ? 1 : 0.35,
                    backgroundColor: i === currentIndex ? TEAL : '#FFFFFF',
                  }}
                  transition={{ duration: 0.3, ease }}
                  style={{
                    height: 6,
                    borderRadius: 999,
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              style={{
                width: 46, height: 46, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = `${TEAL}20`;
                (e.currentTarget as HTMLButtonElement).style.border = `1px solid ${TEAL}40`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(255,255,255,0.14)';
              }}
            >
              <ChevronRight size={18} color="rgba(255,255,255,0.7)" strokeWidth={1.75} />
            </motion.button>
          </div>

          {/* Swipe hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={carouselInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1, ease }}
            className="text-center mt-6"
            style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Drag or swipe to navigate
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
