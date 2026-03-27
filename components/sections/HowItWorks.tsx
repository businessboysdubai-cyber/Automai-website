'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { HOW_IT_WORKS } from '@/lib/constants';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Animate the connector line with GSAP-style approach using CSS
  useEffect(() => {
    if (!inView || !lineRef.current) return;
    lineRef.current.style.width = '100%';
  }, [inView]);

  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="section-sep mb-20" />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <div
          style={{
            width: 800,
            height: 400,
            background:
              'radial-gradient(ellipse, rgba(123,97,255,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={sectionRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase text-[#7B61FF] mb-4"
          >
            Come funziona
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[var(--font-space)] font-bold text-[#F0F4FF]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {HOW_IT_WORKS.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#8892A4] max-w-2xl mx-auto text-base leading-relaxed"
          >
            {HOW_IT_WORKS.subheading}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connector line (desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px overflow-hidden">
            <div className="absolute inset-0 bg-white/5" />
            <div
              ref={lineRef}
              style={{
                width: 0,
                height: '100%',
                background: 'linear-gradient(90deg, #4F8EF7, #00D4FF, #7B61FF)',
                transition: 'width 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
              }}
            />
          </div>

          {/* Step cards */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.2,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                {/* Number circle */}
                <div className="relative mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-[var(--font-space)] font-bold text-sm relative z-10"
                    style={{
                      background: `${step.color}20`,
                      border: `2px solid ${step.color}`,
                      color: step.color,
                      boxShadow: `0 0 20px ${step.color}40`,
                    }}
                  >
                    {step.number}
                  </div>
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${step.color}` }}
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.6,
                      ease: 'easeOut',
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-[var(--font-space)] font-bold text-xl text-[#F0F4FF] mb-3"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#8892A4] text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (desktop, not on last) */}
                {i < HOW_IT_WORKS.steps.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
