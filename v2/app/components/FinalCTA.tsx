import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { MagnetButton } from './ui/MagnetButton';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const serifItalic: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

type FormData = { name: string; email: string; program: string };

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log('Form submitted:', data);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    borderBottom: '1px solid rgba(100,100,100,0.20)',
    color: '#111411',
    fontSize: '0.875rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section className="relative overflow-hidden" style={{ borderTop: '1px solid rgba(120,120,120,0.10)' }}>
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
           style={{ background: 'linear-gradient(to right, #555555, #444444)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: copy */}
          <AnimatedSection>
            <p className="text-[10px] tracking-[0.32em] uppercase font-medium mb-7" style={{ color: '#555555' }}>
              Start Your Journey
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(2.4rem,3.75vw,3.75rem)', lineHeight: 1.06, color: '#111411' }} className="mb-6">
              Begin With<br />
              <em style={serifItalic} className="text-[#555555]">Clarity</em>
            </h2>
            <p className="text-base leading-[1.85] mb-8 max-w-sm" style={{ color: 'rgba(17,20,17,0.52)' }}>
              A thoughtful first step focused on understanding—not selling. A guided conversation to bring clarity before commitment.
            </p>

            <div className="space-y-4 pt-6" style={{ borderTop: '1px solid rgba(100,100,100,0.10)' }}>
              {[
                ['No obligation', 'A conversation, not a commitment.'],
                ['Personalised insights', 'Specific to your background and goals.'],
                ['Expert guidance', "From professionals who've been there."],
              ].map(([label, detail], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                  className="flex items-start gap-4"
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#555555' }} />
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'rgba(17,20,17,0.70)' }}>{label}</span>
                    <span className="text-sm ml-2" style={{ color: 'rgba(17,20,17,0.38)' }}>{detail}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: form in glassmorphism card */}
          <AnimatedSection delay={0.15}>
            <motion.div
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 16,
                boxShadow: '0 8px 48px rgba(0,0,0,0.07), 0 2px 12px rgba(100,100,100,0.06)',
                padding: '2.5rem',
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="text-center py-8"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                       style={{ border: '1px solid rgba(100,100,100,0.35)' }}>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path d="M1 6l5 5L15 1" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ ...serif, fontSize: '1.5rem', color: '#111411' }} className="mb-3">We'll be in touch soon.</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,20,17,0.52)' }}>
                    Thank you for reaching out. A member of our team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-0">

                  {/* Name */}
                  <div className="mb-6">
                    <label className="text-[9px] tracking-[0.28em] uppercase font-medium block mb-2" style={{ color: 'rgba(17,20,17,0.45)' }}>
                      Your Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      placeholder="Full name"
                      style={{
                        ...inputStyle,
                        borderBottomColor: errors.name ? 'rgba(220,38,38,0.5)' : 'rgba(100,100,100,0.20)',
                      }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = '#555555')}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = errors.name ? 'rgba(220,38,38,0.5)' : 'rgba(100,100,100,0.20)')}
                      className="placeholder:text-[rgba(17,20,17,0.30)]"
                    />
                    {errors.name && <p className="text-red-400/70 text-xs mt-1.5">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="text-[9px] tracking-[0.28em] uppercase font-medium block mb-2" style={{ color: 'rgba(17,20,17,0.45)' }}>
                      Email Address
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                      type="email"
                      placeholder="you@example.com"
                      style={{
                        ...inputStyle,
                        borderBottomColor: errors.email ? 'rgba(220,38,38,0.5)' : 'rgba(100,100,100,0.20)',
                      }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = '#555555')}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = errors.email ? 'rgba(220,38,38,0.5)' : 'rgba(100,100,100,0.20)')}
                      className="placeholder:text-[rgba(17,20,17,0.30)]"
                    />
                    {errors.email && <p className="text-red-400/70 text-xs mt-1.5">{errors.email.message}</p>}
                  </div>

                  {/* Program */}
                  <div className="mb-10">
                    <label className="text-[9px] tracking-[0.28em] uppercase font-medium block mb-2" style={{ color: 'rgba(17,20,17,0.45)' }}>
                      I'm Interested In
                    </label>
                    <div className="relative">
                      <select
                        {...register('program', { required: 'Please select a program' })}
                        defaultValue=""
                        style={{
                          ...inputStyle,
                          borderBottomColor: errors.program ? 'rgba(220,38,38,0.5)' : 'rgba(100,100,100,0.20)',
                          appearance: 'none',
                          cursor: 'pointer',
                          backgroundColor: 'transparent',
                        }}
                        className="w-full"
                      >
                        <option value="" disabled style={{ backgroundColor: '#FFFFFF', color: 'rgba(17,20,17,0.45)' }}>Select a program</option>
                        <option value="compass" style={{ backgroundColor: '#FFFFFF', color: '#111411' }}>Curavolv Compass™ — Students</option>
                        <option value="propel" style={{ backgroundColor: '#FFFFFF', color: '#111411' }}>Curavolv Propel™ — Graduate Students</option>
                        <option value="ascent" style={{ backgroundColor: '#FFFFFF', color: '#111411' }}>Curavolv Ascent™ — Early Professionals</option>
                        <option value="unsure" style={{ backgroundColor: '#FFFFFF', color: '#111411' }}>Not sure yet — help me decide</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                        style={{ color: '#555555', opacity: 0.45 }}
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {errors.program && <p className="text-red-400/70 text-xs mt-1.5">{errors.program.message}</p>}
                    </div>
                  </div>

                  <MagnetButton
                    type="submit"
                    disabled={isSubmitting}
                    strength={12}
                    className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 text-white text-sm font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#555555' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Schedule Your Discovery Call
                        <ArrowRight size={14} />
                      </>
                    )}
                  </MagnetButton>

                  <p className="text-xs text-center mt-4" style={{ color: 'rgba(17,20,17,0.28)' }}>
                    We respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </motion.div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
