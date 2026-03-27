'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HERO } from '@/lib/constants';
import GlowButton from '@/components/ui/GlowButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' as const },
  }),
};

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);

  // Subtle float animation on badge via GSAP would go here
  // Using Framer Motion instead for simplicity
  useEffect(() => {}, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden"
    >
      {/* Radial glow behind content */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          style={{
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(79,142,247,0.12) 0%, rgba(123,97,255,0.06) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          ref={badgeRef}
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="glass-strong px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#00D4FF]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D4FF] mr-2 animate-pulse" />
            {HERO.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-[var(--font-space)] font-bold leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
        >
          <motion.span
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="block text-[#F0F4FF]"
          >
            {HERO.headline1}
          </motion.span>
          <motion.span
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="block text-[#F0F4FF]"
          >
            {HERO.headline2}
          </motion.span>
          <motion.span
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="block text-gradient-animated"
          >
            {HERO.headline3}
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-2xl mx-auto text-[#8892A4] leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          {HERO.subheadline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <GlowButton href="#cta" variant="primary">
            {HERO.cta_primary}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </GlowButton>
          <GlowButton href="#how-it-works" variant="secondary">
            {HERO.cta_secondary}
          </GlowButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 flex flex-wrap items-center justify-center gap-12"
        >
          {HERO.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-[var(--font-space)] font-bold text-gradient text-glow-blue"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#8892A4] tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        custom={7}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="text-[10px] tracking-widest uppercase text-[#8892A4]">
          Scorri
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#4F8EF7] to-transparent"
        />
      </motion.div>
    </section>
  );
}
