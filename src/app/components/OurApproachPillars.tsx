import { AnimatedSection } from './AnimatedSection';
import { motion } from 'motion/react';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const serifLight: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 600 };
const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    number: '01',
    title: 'People',
    subtitle: 'Human Expertise at the Core',
    description: 'Guidance by U.S.-based healthcare professionals with lived experience in the careers they advise on. Not theorists—practitioners who have navigated the very paths they now help others design.',
    accent: '#3CC8C2',
    glow: 'rgba(60,200,194,0.08)',
  },
  {
    number: '02',
    title: 'Process',
    subtitle: 'Structured Career Architecture',
    description: 'Not a list of tips, but a system built for continuity and compounding growth. Stage-aware, evidence-guided, and designed to endure across every inflection point in your career.',
    accent: '#8454A8',
    glow: 'rgba(132,84,168,0.08)',
  },
  {
    number: '03',
    title: 'Technology',
    subtitle: 'AI-Supported Intelligence',
    description: 'Proprietary tools that surface insight and inform human judgment—without replacing the human at the center. AI that amplifies expertise rather than substitutes for it.',
    accent: '#C4A35A',
    glow: 'rgba(196,163,90,0.08)',
  },
];

export function OurApproachPillars() {
  return (
    <section className="py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <AnimatedSection className="mb-10">
          <p className="text-[10px] tracking-[0.32em] uppercase font-medium mb-3" style={{ color: '#8454A8' }}>The Foundation</p>
          <div className="grid lg:grid-cols-2 gap-6 items-end">
            <h2 style={{ ...serif, fontSize: 'clamp(2.75rem, 3.5vw, 3.5rem)', color: '#111411', lineHeight: 1.08 }}>
              Three Pillars.<br />
              <em style={{ ...serif, color: '#8454A8' }}>
                One Integrated Approach.
              </em>
            </h2>
            <p className="text-base leading-relaxed lg:pb-2" style={{ color: 'rgba(17,20,17,0.52)' }}>
              Together, these ensure clarity, continuity, and confidence at every inflection point in your healthcare career.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32, scale: 1.02 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: index * 0.13, ease }}
              whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(0,0,0,0.10), 0 4px 16px ${pillar.accent}20` }}
              className="relative flex flex-col p-8 lg:p-10 cursor-pointer"
              style={{
                background: '#FFFFFF',
                border: `1px solid rgba(0,0,0,0.08)`,
                borderLeft: `2px solid ${pillar.accent}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.04)',
              }}
            >
              {/* Ghost number */}
              <span
                style={{ ...serifLight, fontSize: '5rem', lineHeight: 1, color: pillar.accent, opacity: 0.10 }}
                className="absolute top-6 right-7 select-none"
                aria-hidden
              >
                {pillar.number}
              </span>

              {/* Accent bar */}
              <motion.div
                className="w-8 h-0.5 mb-8"
                style={{ backgroundColor: pillar.accent, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.13, ease }}
              />

              <h3 style={{ ...serif, fontSize: '2.1rem', color: '#111411', lineHeight: 1 }} className="mb-2">
                {pillar.title}
              </h3>

              <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-6" style={{ color: pillar.accent }}>
                {pillar.subtitle}
              </p>

              <p className="text-[0.92rem] leading-[1.85] flex-1" style={{ color: 'rgba(17,20,17,0.52)' }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
