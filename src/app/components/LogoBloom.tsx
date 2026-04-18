import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;
const TEAL   = '#49B0C0';
const PURPLE = '#8454A8';

export function LogoBloom() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ width: 260, height: 260 }}
    >
      {/* Outermost glow ring — teal */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260, height: 260,
          background: `radial-gradient(circle, rgba(73,176,192,0.10) 0%, rgba(132,84,168,0.06) 55%, transparent 75%)`,
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: [1, 1.08, 1], opacity: 0.9 } : { scale: 0.6, opacity: 0 }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
          opacity: { duration: 0.7, ease },
        }}
      />

      {/* Outer thin ring — purple */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 234, height: 234,
          border: `1px solid rgba(132,84,168,0.18)`,
        }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
      />

      {/* Mid thin ring — teal */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200, height: 200,
          border: `1px solid rgba(73,176,192,0.24)`,
        }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
      />

      {/* Rotating dashed accent — teal */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 216, height: 216,
          border: `1.5px dashed rgba(73,176,192,0.22)`,
        }}
        initial={{ opacity: 0 }}
        animate={inView
          ? { opacity: 1, rotate: 360 }
          : { opacity: 0 }
        }
        transition={{
          opacity: { duration: 0.6, delay: 0.6, ease },
          rotate: { duration: 28, repeat: Infinity, ease: 'linear', delay: 0.6 },
        }}
      />

      {/* Main white circle */}
      <motion.div
        className="absolute rounded-full bg-white flex items-center justify-center"
        style={{
          width: 168, height: 168,
          boxShadow: [
            '0 0 0 1px rgba(73,176,192,0.20)',
            '0 0 0 2px rgba(132,84,168,0.10)',
            '0 20px 60px rgba(73,176,192,0.18)',
            '0 8px 24px rgba(0,0,0,0.06)',
          ].join(', '),
        }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
        transition={{ duration: 0.95, ease }}
      >
        {/* Logo */}
        <motion.img
          src="/images/LOGO.png"
          alt="Curavolv"
          style={{ height: 56, width: 'auto' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.65, ease }}
        />
      </motion.div>

      {/* 4 cardinal accent dots */}
      {([
        { top: '50%', left: 0,   tl: '-50%' , tt: '-50%', color: TEAL   },
        { top: '50%', right: 0,  tl: '0'    , tt: '-50%', color: PURPLE },
        { top: 0,     left: '50%', tl: '-50%', tt: '0'  , color: PURPLE },
        { bottom: 0,  left: '50%', tl: '-50%', tt: '0'  , color: TEAL   },
      ] as const).map((pos, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 5, height: 5,
            background: pos.color,
            opacity: 0.45,
            ...pos,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.45 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.06, ease }}
        />
      ))}
    </div>
  );
}
