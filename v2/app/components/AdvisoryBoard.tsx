import { AnimatedSection } from './AnimatedSection';
import { motion } from 'motion/react';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

const advisors = [
  {
    name: 'Advisory Board Member',
    title: 'Healthcare Strategy',
    credentials: 'Clinical Expertise · U.S.-Based',
    image: '/images/advisor1.jpg',
    fallback: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80',
    index: '01',
    accent: '#555555',
  },
  {
    name: 'Advisory Board Member',
    title: 'Career Architecture',
    credentials: 'Non-Clinical Pathways · U.S.-Based',
    image: '/images/advisor2.jpg',
    fallback: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    index: '02',
    accent: '#444444',
  },
  {
    name: 'Dr. Rahul Nagda',
    title: 'Advisory Board',
    credentials: 'Healthcare Leadership · U.S.-Based',
    image: '/images/advisor3.jpg',
    fallback: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    index: '03',
    accent: '#888888',
  },
];

function AdvisorImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-top"
      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallback; }}
    />
  );
}

export function AdvisoryBoard() {
  return (
    <section className="py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <AnimatedSection className="mb-10">
          <p className="text-[10px] tracking-[0.32em] uppercase font-medium mb-5" style={{ color: '#444444' }}>Our Experts</p>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2 style={{ ...serif, fontSize: 'clamp(2.75rem, 3.5vw, 3.5rem)', color: '#111411', lineHeight: 1.08 }}>
              Experts Guiding Careers
            </h2>
            <p className="text-base leading-relaxed lg:pb-2" style={{ color: 'rgba(17,20,17,0.52)' }}>
              Our advisory board brings decades of lived experience across clinical and non-clinical healthcare careers in the United States.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: index * 0.13, ease }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              {/* Portrait */}
              <div
                className="relative overflow-hidden mb-3"
                style={{
                  aspectRatio: '3/4',
                  backgroundColor: '#F5F5F5',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.06)',
                }}
              >
                <AdvisorImage src={advisor.image} fallback={advisor.fallback} alt={advisor.name} />

                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(17,20,17,0.35) 0%, transparent 50%)' }}
                />

                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: advisor.accent, opacity: 0.5 }} />

                {/* Index number */}
                <div className="absolute top-4 right-5">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '2.5rem', lineHeight: 1, color: 'rgba(17,20,17,0.07)' }}
                        className="select-none">
                    {advisor.index}
                  </span>
                </div>
              </div>

              {/* Name + credentials */}
              <div className="px-1">
                <div className="w-5 h-0.5 mb-3" style={{ backgroundColor: advisor.accent }} />
                <h3 style={{ ...serif, fontSize: '1.25rem', color: '#111411', lineHeight: 1.2 }} className="mb-1">
                  {advisor.name}
                </h3>
                <p className="text-[9px] tracking-[0.22em] uppercase font-medium mb-1" style={{ color: advisor.accent }}>
                  {advisor.title}
                </p>
                <p className="text-[9px] tracking-[0.15em] uppercase" style={{ color: 'rgba(17,20,17,0.38)' }}>
                  {advisor.credentials}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
