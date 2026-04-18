import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';

const tabs = [
  { label: 'Private & Secure',      image: 'https://picsum.photos/seed/prvsec77/1400/800' },
  { label: 'Real-Time Insights',    image: 'https://picsum.photos/seed/rtins44/1400/800' },
  { label: 'Automated Follow-Ups',  image: 'https://picsum.photos/seed/autofol91/1400/800' },
];

const BARS = Array.from({ length: 60 }, (_, i) => ({
  h: 30 + Math.abs(Math.sin(i * 0.48) * 32 + Math.cos(i * 0.81) * 20),
  o: 0.035 + Math.abs(Math.sin(i * 1.2 + 1)) * 0.045,
}));

const ease = [0.22, 1, 0.36, 1] as const;

export function TabImageSection() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: '20px 80px 80px', background: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
        style={{
          position: 'relative',
          borderRadius: 56,
          overflow: 'hidden',
          background: '#080808',
          padding: '36px 36px 36px',
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        {/* Vertical bar background */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {BARS.map((bar, i) => (
            <div key={i} style={{
              position: 'absolute',
              bottom: 0,
              left: `${(i / BARS.length) * 100}%`,
              width: `${100 / BARS.length * 0.52}%`,
              height: `${bar.h}%`,
              background: `rgba(255,255,255,${bar.o})`,
              borderRadius: '2px 2px 0 0',
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 110%, rgba(8,8,8,0.7) 0%, transparent 65%)',
          }} />
        </div>

        {/* Tab selector */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 999,
            padding: '4px 5px',
            gap: 1,
            boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
          }}>
            {tabs.map((tab, i) => (
              <React.Fragment key={tab.label}>
                {i > 0 && (
                  <span style={{ color: 'rgba(0,0,0,0.18)', fontSize: 9, padding: '0 2px', userSelect: 'none', lineHeight: 1 }}>
                    •
                  </span>
                )}
                <button
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '5px 12px',
                    borderRadius: 999,
                    border: 'none',
                    cursor: 'pointer',
                    background: active === i ? '#0a0a0a' : 'transparent',
                    color: active === i ? '#ffffff' : 'rgba(0,0,0,0.38)',
                    fontSize: 11.5,
                    fontWeight: active === i ? 600 : 400,
                    transition: 'background 0.22s ease, color 0.22s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {active === i && (
                    <span style={{
                      width: 15, height: 15, borderRadius: '50%',
                      background: '#fff', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                  {tab.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Image card */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: 40,
          overflow: 'hidden',
          background: '#1c1c1c',
          aspectRatio: '16 / 9',
          boxShadow: '0 6px 32px rgba(0,0,0,0.6)',
        }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={tabs[active].image}
              alt={tabs[active].label}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease }}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(100%) contrast(1.08) brightness(0.92)',
              }}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
