import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const videoY   = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const fade     = useTransform(scrollYProgress, [0, 0.42], [1, 0]);

  const headline = ['Design a', 'Healthcare', 'Career That'];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '100svh', minHeight: 680 }}
    >
      {/* ── Video ── */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
          style={{ objectPosition: '65% center' }}
          src="/videos/gemini.mp4"
        />
      </motion.div>

      {/* Left shield — suppresses video watermark, creates editorial canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(108deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.62) 38%, rgba(0,0,0,0.32) 58%, rgba(0,0,0,0.06) 78%, transparent 100%)',
        }}
      />

      {/* Top + bottom atmospheric vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 22%, transparent 62%, rgba(0,0,0,0.52) 100%)',
        }}
      />

      {/* ── All UI ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-between"
        style={{ y: contentY, opacity: fade }}
      >
        <div className="pt-28 lg:pt-32" />

        {/* ── MAIN CONTENT — vertically centered in remaining space ── */}
        <div className="flex-1 flex items-center px-10 lg:px-20">
          <div style={{ maxWidth: 720 }}>

            {/* Headline — three regular lines */}
            <h1 style={{ margin: 0, padding: 0 }}>
              {headline.map((line, i) => (
                <div key={line} style={{ overflow: 'hidden', lineHeight: 1.18, marginBottom: '0.04em' }}>
                  <motion.div
                    initial={{ y: '112%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.0, delay: 0.38 + i * 0.13, ease }}
                    style={{
                      fontSize:      'clamp(2.4rem, 4vw, 3.6rem)',
                      fontWeight:    600,
                      lineHeight:    1.18,
                      letterSpacing: '-0.022em',
                      color:         '#ffffff',
                    }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}

              {/* Final line — muted: creates depth & closure */}
              <div style={{ overflow: 'hidden', lineHeight: 1.18 }}>
                <motion.div
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 0.77, ease }}
                  style={{
                    fontSize:      'clamp(2.4rem, 4vw, 3.6rem)',
                    fontWeight:    600,
                    lineHeight:    1.18,
                    letterSpacing: '-0.022em',
                    color:         'rgba(255,255,255,0.28)',
                  }}
                >
                  Endures.
                </motion.div>
              </div>
            </h1>

            {/* Thin rule — editorial separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.95, ease }}
              style={{
                width: '100%', maxWidth: 360, height: 1,
                backgroundColor: 'rgba(255,255,255,0.12)',
                transformOrigin: 'left',
                marginTop: '2.6rem',
              }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.05, ease }}
              style={{
                margin:        '1.6rem 0 0',
                fontSize:      'clamp(0.88rem, 1.15vw, 1.02rem)',
                color:         'rgba(255,255,255,0.48)',
                fontWeight:    400,
                lineHeight:    1.82,
                maxWidth:      440,
                letterSpacing: '0.008em',
              }}
            >
              Strategic career guidance for physicians, residents, and healthcare
              professionals navigating high-stakes decisions about their future.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex items-center gap-5 flex-wrap"
              style={{ marginTop: '2.6rem' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.18, ease }}
            >
              {/* Primary — solid white pill */}
              <motion.a
                href="#programs"
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(245,245,245,1)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5"
                style={{
                  backgroundColor: '#ffffff',
                  color:           '#080808',
                  fontSize:        '0.80rem',
                  fontWeight:      600,
                  letterSpacing:   '0.10em',
                  textTransform:   'uppercase',
                  textDecoration:  'none',
                  padding:         '0.88rem 1.85rem',
                  borderRadius:    '100px',
                  transition:      'background-color 0.22s',
                  flexShrink:      0,
                }}
              >
                Explore Programs
                <ArrowRight size={12} />
              </motion.a>

              {/* Divider */}
              <div style={{ width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />

              {/* Ghost link */}
              <a
                href="#our-approach"
                className="group relative inline-flex items-center gap-2"
                style={{
                  fontSize:       '0.80rem',
                  fontWeight:     500,
                  letterSpacing:  '0.10em',
                  textTransform:  'uppercase',
                  color:          'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition:     'color 0.25s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                <span className="relative">
                  Our Approach
                  <span
                    className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.45)', transition: 'width 0.3s ease' }}
                  />
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="px-10 lg:px-20 pb-10 flex items-end justify-between">

          <div />

          {/* Scroll indicator */}
          <motion.div
            className="hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 5, 0], opacity: [0.28, 0.60, 0.28] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.32)' }} />
            </motion.div>
            <span
              style={{
                fontSize:      '7px',
                letterSpacing: '0.44em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.18)',
                writingMode:   'vertical-rl',
                fontWeight:    500,
              }}
            >
              Scroll
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
