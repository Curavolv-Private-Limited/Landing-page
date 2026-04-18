import { Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease },
});

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#F4FAF8', borderTop: '1px solid rgba(0,0,0,0.07)' }}>

      {/* Gradient top rule */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(60,200,194,0.12), rgba(132,84,168,0.10), transparent)' }} />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-16 pb-12">
        <div className="grid md:grid-cols-12 gap-10 mb-16">

          {/* Brand */}
          <motion.div {...fadeUp(0)} className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/images/LOGO.png" alt="Curavolv" className="h-6 w-auto" />
              <span style={{ ...serif, color: '#111411' }} className="text-lg tracking-tight">
                Curavolv
              </span>
            </div>
            <p className="text-sm leading-[1.85] mb-7 max-w-[280px]" style={{ color: 'rgba(17,20,17,0.45)' }}>
              Evidence-guided career design for healthcare professionals. Building careers that endure through clarity, preparation, and human-led guidance.
            </p>
            <div className="flex gap-2.5">
              {[Linkedin, Twitter, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease }}
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                  style={{
                    border: '1px solid rgba(0,0,0,0.10)',
                    color: 'rgba(17,20,17,0.35)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#111411'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,0,0,0.25)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(17,20,17,0.35)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,0,0,0.10)'; }}
                >
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="hidden md:block md:col-span-1" />

          {/* Programs */}
          <motion.div {...fadeUp(0.1)} className="md:col-span-3">
            <p className="text-[9px] tracking-[0.28em] uppercase font-medium mb-6" style={{ color: 'rgba(17,20,17,0.28)' }}>Programs</p>
            <ul className="space-y-3.5">
              {[
                ['Curavolv Compass™', 'For students'],
                ['Curavolv Propel™', 'For grad students'],
                ['Curavolv Ascent™', 'For early professionals'],
              ].map(([name, sub], i) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                >
                  <a href="#" className="group flex flex-col">
                    <span
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(17,20,17,0.45)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#111411')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,20,17,0.45)')}
                    >{name}</span>
                    <span className="text-[10px] mt-0.5" style={{ color: 'rgba(17,20,17,0.28)' }}>{sub}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div {...fadeUp(0.18)} className="md:col-span-3">
            <p className="text-[9px] tracking-[0.28em] uppercase font-medium mb-6" style={{ color: 'rgba(17,20,17,0.28)' }}>Company</p>
            <ul className="space-y-3.5">
              {['About Us', 'Our Approach', 'Advisory Board', 'Contact', 'Privacy Policy'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease }}
                >
                  <a
                    href="#"
                    className="text-sm block transition-colors duration-200"
                    style={{ color: 'rgba(17,20,17,0.45)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#111411')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,20,17,0.45)')}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          <p className="text-xs tracking-wide" style={{ color: 'rgba(17,20,17,0.30)' }}>© 2026 Curavolv. All rights reserved.</p>
          <p style={{ ...serif, color: 'rgba(17,20,17,0.22)' }} className="text-xs">
            Designed for healthcare professionals who aim higher.
          </p>
        </motion.div>
      </div>

    </footer>
  );
}
