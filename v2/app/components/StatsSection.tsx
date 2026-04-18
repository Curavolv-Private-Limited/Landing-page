import { motion } from 'motion/react';

const items = [
  '15+ Years of Combined Healthcare Experience',
  'Evidence-Guided Career Design',
  'Clinical & Non-Clinical Pathways',
  'Human-Led · AI-Supported',
  'U.S.-Based Healthcare Professionals',
  'Structured Career Architecture',
];

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 600 };

export function StatsSection() {
  const doubled = [...items, ...items];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden py-[14px] border-y relative"
      style={{ borderColor: 'rgba(100,100,100,0.18)' }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
           style={{ background: 'linear-gradient(to right, #FFFFFF, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
           style={{ background: 'linear-gradient(to left, #FFFFFF, transparent)' }} />

      <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: '42s' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-7 mx-10">
            <span style={{ ...serif, color: 'rgba(17,20,17,0.45)' }} className="text-[10px] tracking-[0.32em] uppercase">
              {item}
            </span>
            <span className="w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: '#555555', opacity: 0.6 }} />
          </span>
        ))}
      </div>
    </motion.div>
  );
}
