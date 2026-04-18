import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'motion/react';
import { Card3D } from './ui/Card3D';
import { TextReveal } from './ui/TextReveal';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

const programs = [
  {
    name: 'Compass™',
    tagline: 'Discover direction. Unlock clarity.',
    description: 'For students planning U.S. healthcare education.',
    features: ['Career path exploration', 'Strategic academic planning', 'Personalised roadmap'],
    accent: '#555555',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
    number: '01',
  },
  {
    name: 'Propel™',
    tagline: 'Build confidence. Create opportunity.',
    description: 'For graduate students seeking proactive positioning.',
    features: ['Professional development', 'Network architecture', 'Career positioning strategy'],
    accent: '#444444',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
    number: '02',
  },
  {
    name: 'Ascent™',
    tagline: 'Rise higher. Lead with distinction.',
    description: 'For early-career professionals accelerating growth.',
    features: ['Leadership development', 'Career acceleration', 'Executive positioning'],
    accent: '#888888',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
    number: '03',
  },
];

export function Programs() {
  return (
    <section id="programs" className="py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <AnimatedSection className="mb-8">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-[10px] tracking-[0.32em] uppercase font-medium mb-5"
            style={{ color: '#555555' }}
          >Our Programs</motion.p>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <TextReveal
                text="Curavolv Program Pathways"
                style={{ ...serif, fontSize: 'clamp(2.4rem,3.5vw,3.5rem)', lineHeight: 1.08, color: '#111411' }}
                className=""
                delay={0.05}
                staggerMs={70}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="text-base leading-relaxed lg:pb-2"
              style={{ color: 'rgba(17,20,17,0.52)' }}
            >
              Distinct programs aligned to different career stages. Each stands alone—and each is designed to connect over time.
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: index * 0.12, ease }}
            >
              <Card3D
                intensity={8}
                className="flex flex-col overflow-hidden cursor-pointer h-full"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.07), 0 12px 40px rgba(0,0,0,0.05)',
                } as React.CSSProperties}
              >
                {/* Image header */}
                <div className="relative h-52 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-[1.05] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />

                  {/* Ghost number */}
                  <div className="absolute top-4 right-5">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '4rem', lineHeight: 1, color: 'rgba(17,20,17,0.08)' }}
                          className="select-none">
                      {program.number}
                    </span>
                  </div>

                  {/* Accent bar bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: program.accent, opacity: 0.7 }} />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-8">
                  <h3 style={{ ...serif, fontSize: '1.75rem', color: '#111411', lineHeight: 1 }} className="mb-1">
                    {program.name}
                  </h3>
                  <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-4" style={{ color: program.accent }}>
                    {program.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(17,20,17,0.52)' }}>
                    {program.description}
                  </p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {program.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(17,20,17,0.52)' }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: program.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="inline-flex items-center gap-2 text-sm font-semibold group/btn"
                    style={{ color: program.accent }}
                  >
                    <span className="group-hover/btn:underline underline-offset-4">Learn More</span>
                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="mt-8 pt-6 border-t" style={{ borderTopColor: 'rgba(0,0,0,0.07)' }}>
          <p className="text-sm tracking-[0.08em]" style={{ color: 'rgba(17,20,17,0.35)' }}>
            Designed to stand alone. Built to connect.
          </p>
        </AnimatedSection>

      </div>
    </section>
  );
}
