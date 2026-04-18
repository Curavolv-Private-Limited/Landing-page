import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';

const tabs = [
  {
    label: 'Private & Secure',
    image: 'https://picsum.photos/seed/prvsec77/1400/800',
  },
  {
    label: 'Real-Time Insights',
    image: 'https://picsum.photos/seed/rtins44/1400/800',
  },
  {
    label: 'Automated Follow-Ups',
    image: 'https://picsum.photos/seed/autofol91/1400/800',
  },
];

// Deterministic vertical bars — wave-like heights for visual rhythm
const BARS = Array.from({ length: 60 }, (_, i) => ({
  h: 30 + Math.abs(Math.sin(i * 0.48) * 32 + Math.cos(i * 0.81) * 20),
  o: 0.035 + Math.abs(Math.sin(i * 1.2 + 1)) * 0.045,
}));

const ease = [0.22, 1, 0.36, 1] as const;

export function TabImageSection() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: '0 28px 100px', background: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        style={{
          position: 'relative',
          borderRadius: 28,
          overflow: 'hidden',
          background: '#080808',
          padding: '52px 44px 52px',
        }}
      >
        {/* Vertical bar background */}
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
        >
          {BARS.map((bar, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: 0,
                left: `${(i / BARS.length) * 100}%`,
                width: `${100 / BARS.length * 0.52}%`,
                height: `${bar.h}%`,
                background: `rgba(255,255,255,${bar.o})`,
                borderRadius: '2px 2px 0 0',
              }}
            />
          ))}
          {/* Subtle vignette overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 100%, rgba(8,8,8,0.6) 0%, transparent 70%)',
          }} />
        </div>

        {/* Tab selector */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.97)',
              borderRadius: 999,
              padding: '5px 6px',
              gap: 2,
              boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
            }}
          >
            {tabs.map((tab, i) => (
              <React.Fragment key={tab.label}>
                {i > 0 && (
                  <span
                    style={{
                      color: 'rgba(0,0,0,0.18)',
                      fontSize: 10,
                      padding: '0 2px',
                      userSelect: 'none',
                      lineHeight: 1,
                    }}
                  >
                    •
                  </span>
                )}
                <button
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '7px 16px',
                    borderRadius: 999,
                    border: 'none',
                    cursor: 'pointer',
                    background: active === i ? '#0a0a0a' : 'transparent',
                    color: active === i ? '#ffffff' : 'rgba(0,0,0,0.38)',
                    fontSize: 13,
                    fontWeight: active === i ? 600 : 400,
                    transition: 'background 0.22s ease, color 0.22s ease',
                    whiteSpace: 'nowrap',
                    letterSpacing: active === i ? '-0.01em' : '0',
                  }}
                >
                  {active === i && (
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path
                          d="M1.5 4.5L3.5 6.5L7.5 2.5"
                          stroke="#0a0a0a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            borderRadius: 18,
            overflow: 'hidden',
            background: '#1c1c1c',
            aspectRatio: '16 / 9',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={tabs[active].image}
              alt={tabs[active].label}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease }}
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
