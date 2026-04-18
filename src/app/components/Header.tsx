import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

const serif700 = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { label: 'Programs', href: '#programs' },
  { label: 'Resources', href: '#resources' },
  { label: 'Review', href: '#review' },
  { label: 'Webinars', href: '#webinars' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX: progressScaleX, background: '#111411' }}
      />

      <motion.header
        className="fixed top-[2px] left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        } : { background: 'transparent' }}
      >
        <div className="w-full px-8 lg:px-16">
          <div className="relative flex items-center h-20">

            {/* Logo — left */}
            <div className="flex-1 flex justify-start">
              <motion.a
                href="#"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease }}
                className="flex items-center gap-3 flex-shrink-0"
              >
                <motion.img
                  src="/images/LOGO.png"
                  alt=""
                  className="h-10 w-auto"
                  whileHover={{ scale: 1.1, rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                />
                <span style={{ ...serif700, fontSize: '1.7rem', letterSpacing: '-0.01em', color: '#111411' }}>
                  Curavolv
                </span>
              </motion.a>
            </div>

            {/* Desktop nav — centered */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease }}
                  className="text-sm font-medium relative group transition-colors duration-300"
                  style={{ color: 'rgba(17,20,17,0.50)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#111411')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,20,17,0.50)')}
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#111411] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* CTA + mobile toggle — right */}
            <div className="flex-1 flex justify-end items-center gap-3">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.42, ease }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200"
                style={{ backgroundColor: '#111411', color: '#FFFFFF' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#333';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#111411';
                }}
              >
                Connect with us
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={11} />
                </span>
              </motion.button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5"
                style={{ color: '#111411' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: 'block' }}>
                      <X size={22} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: 'block' }}>
                      <Menu size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease }}
                className="-mx-8 px-8 py-5 overflow-hidden md:hidden"
                style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid rgba(0,0,0,0.07)' }}
              >
                <nav className="flex flex-col gap-4">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, ease }}
                      href={item.href}
                      className="text-sm font-medium"
                      style={{ color: 'rgba(17,20,17,0.60)' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-1 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full w-fit"
                    style={{ backgroundColor: '#111411', color: '#FFFFFF' }}
                  >
                    Connect with us
                    <ArrowRight size={13} />
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
