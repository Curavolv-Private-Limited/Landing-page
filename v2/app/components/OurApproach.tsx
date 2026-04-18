import { motion } from 'motion/react';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const serifItalic: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

export function OurApproach() {
  return (
    <section id="our-approach" className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover opacity-25" />
        {/* Light overlay with mint tint */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(250,250,250,0.94) 0%, rgba(248,248,248,0.85) 50%, rgba(250,250,250,0.92) 100%)' }} />
        {/* Teal glow left */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 15% 50%, rgba(100,100,100,0.10) 0%, transparent 60%)' }} />
        {/* Violet glow right */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 85% 50%, rgba(120,120,120,0.08) 0%, transparent 60%)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(100,100,100,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(120,120,120,0.18), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-14 lg:py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease }} className="lg:col-span-7">
            <p className="text-[10px] tracking-[0.32em] uppercase font-medium mb-5" style={{ color: 'rgba(17,20,17,0.45)' }}>
              Our Methodology
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', color: '#111411' }} className="mb-0 leading-[1.08]">
              Careers Don't Happen by Chance.
              <br />
              <em style={{ ...serifItalic, color: '#555555' }}>They're Designed.</em>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease }} className="lg:col-span-5">
            <div className="border-l-2 pl-7 space-y-5" style={{ borderColor: 'rgba(0,0,0,0.12)' }}>
              <p className="text-base leading-[1.85]" style={{ color: 'rgba(17,20,17,0.72)' }}>
                At Curavolv, we approach healthcare careers as systems—not a series of disconnected steps.
              </p>
              <p className="text-base leading-[1.85]" style={{ color: 'rgba(17,20,17,0.52)' }}>
                We begin by building a complete picture of the individual: strengths, motivations, aspirations, and real-world preferences—captured through structured conversations and human judgment.
              </p>
              <p className="text-base leading-[1.85]" style={{ color: 'rgba(17,20,17,0.52)' }}>
                That input is then evaluated using proprietary, AI-supported career intelligence—identifying pathways aligned with long-term success and sustainability.
              </p>
            </div>
            <div className="mt-10 pl-7">
              <p className="font-medium text-base leading-relaxed" style={{ color: '#555555' }}>
                Intentional. Resilient. Enduring.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
