import * as Accordion from '@radix-ui/react-accordion';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'motion/react';

const serif: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontWeight: 700 };
const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: 'Who is Curavolv designed for?',
    a: 'Curavolv is built for three distinct groups: students planning a U.S. healthcare education, graduate students who want to position themselves proactively, and early-career professionals looking to accelerate advancement. Each of our programs—Compass, Propel, and Ascent—is designed to meet a specific stage of the healthcare career journey.',
  },
  {
    q: 'How is Curavolv different from a traditional career counselor?',
    a: 'Traditional career counselors often offer generic advice drawn from broad fields. Curavolv advisors are U.S.-based healthcare professionals with firsthand experience in the careers they advise on. We combine lived expertise with structured career architecture and proprietary AI-supported tools—so guidance is specific, evidence-grounded, and built for compounding growth over time.',
  },
  {
    q: 'Does Curavolv guarantee job placement or school admission?',
    a: "No, and we're transparent about that. Curavolv guarantees clarity, preparation, and accountability—the conditions under which success becomes achievable. We don't promise shortcuts or outcomes we cannot control. What we do promise is that every decision you make with us will be intentional, informed, and built to endure.",
  },
  {
    q: 'What does the Discovery Call involve?',
    a: "The Discovery Call is a focused, no-obligation conversation designed to understand your background, goals, and current stage. It's not a sales pitch—it's a diagnostic session. Based on what we learn, we'll provide initial insights and recommend whether, and how, Curavolv can genuinely help. If we're not the right fit, we'll say so.",
  },
  {
    q: 'Can I engage multiple programs over time?',
    a: 'Yes. Our programs are designed to stand alone and to connect. A student who begins with Compass can transition naturally to Propel during graduate school and Ascent as an early professional. Continuity is a core part of how Curavolv is built—career architecture works best when it compounds across stages.',
  },
];

export function FAQ() {
  return (
    <section className="overflow-hidden">

      {/* Top strip */}
      <div className="py-4 px-8 lg:px-16" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <p className="text-[10px] tracking-[0.32em] uppercase font-medium" style={{ color: '#8454A8' }}>Common Questions</p>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14 lg:py-20">

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">

          <AnimatedSection>
            <h2 style={{ ...serif, fontSize: 'clamp(2.5rem, 3vw, 3rem)', color: '#111411', lineHeight: 1.1 }} className="mb-6">
              Questions We Often Hear
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(17,20,17,0.52)' }}>
              Honest answers to the questions worth asking before you begin.
            </p>
            <div className="w-8 h-px" style={{ backgroundColor: '#3CC8C2' }} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Accordion.Root type="single" collapsible className="space-y-0" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              {faqs.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="group"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-start justify-between gap-8 py-7 text-left cursor-pointer">
                      <span
                        style={{ ...serif, fontSize: '1.15rem', lineHeight: 1.35, color: '#111411' }}
                        className="group-data-[state=open]:text-[#3CC8C2] transition-colors duration-200 pr-4"
                      >
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                        <span className="relative w-3 h-3">
                          <span className="absolute inset-y-1/2 left-0 right-0 h-px bg-[#3CC8C2]/35 group-data-[state=open]:bg-[#3CC8C2] transition-colors duration-200" />
                          <span className="absolute inset-x-1/2 top-0 bottom-0 w-px bg-[#3CC8C2]/35 group-data-[state=open]:scale-y-0 group-data-[state=open]:opacity-0 transition-all duration-200" />
                        </span>
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                    <div className="pb-8 pt-0">
                      <div className="w-4 h-px mb-5" style={{ backgroundColor: '#3CC8C2' }} />
                      <p className="text-base leading-[1.85]" style={{ color: 'rgba(17,20,17,0.55)' }}>
                        {faq.a}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
