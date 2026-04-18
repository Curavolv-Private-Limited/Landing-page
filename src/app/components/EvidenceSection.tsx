import { useEffect, useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'motion/react';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

export function EvidenceSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) video.play().catch(() => {}); else video.pause(); },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section className="py-14 lg:py-20 overflow-hidden"
      initial={{ scale: 1.03, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <AnimatedSection>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-px h-16 flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(to bottom, #3CC8C2, rgba(60,200,194,0.15))' }} />
              <div>
                <p className="text-[10px] tracking-[0.32em] uppercase font-medium leading-tight" style={{ color: '#3CC8C2' }}>
                  The Curavolv Method
                </p>
                <p className="text-[10px] tracking-[0.22em] uppercase mt-1.5" style={{ color: 'rgba(17,20,17,0.35)' }}>
                  Evidence-Guided Career Design
                </p>
              </div>
            </div>

            <h2 style={{ ...serif, fontSize: 'clamp(2.75rem, 3.5vw, 3.5rem)', color: '#111411' }} className="mb-5 leading-[1.08]">
              A Smarter Way to Build a Healthcare Career
            </h2>

            <div className="space-y-4">
              <p className="text-base leading-[1.85]" style={{ color: 'rgba(17,20,17,0.62)' }}>
                Most career guidance is reactive—a list of tips, a single conversation, a résumé review. Curavolv is different.
              </p>
              <p className="text-base leading-[1.85]" style={{ color: 'rgba(17,20,17,0.45)' }}>
                We combine lived experience from U.S.-based healthcare professionals with structured career architecture and proprietary AI-supported intelligence—so every decision is intentional, not accidental.
              </p>
            </div>

          </AnimatedSection>

          {/* Right: video */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.05, ease }}
            className="relative hidden lg:block"
          >
            <div className="absolute -top-5 -left-5 w-10 h-10 border-t border-l" style={{ borderColor: 'rgba(60,200,194,0.35)' }} />
            <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b border-r" style={{ borderColor: 'rgba(60,200,194,0.35)' }} />
            <div
              className="relative overflow-hidden rounded-lg"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 24px 80px rgba(60,200,194,0.08)' }}
            >
              <video
                ref={videoRef}
                muted
                playsInline
                controls
                className="w-full aspect-video bg-[#F4FAF8] block"
                src="/videos/launch.mp4"
              />
            </div>
            <p
              className="text-[9px] tracking-[0.28em] uppercase mt-5 text-right"
              style={{ color: 'rgba(17,20,17,0.30)' }}
            >
              See how Curavolv works
            </p>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
