'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CTA_SECTION, FOOTER } from '@/lib/constants';
import GlowButton from '@/components/ui/GlowButton';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      <div className="section-sep mb-20" />

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 900,
            height: 500,
            background:
              'radial-gradient(ellipse, rgba(79,142,247,0.1) 0%, rgba(123,97,255,0.06) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center" ref={ref}>
        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-widest uppercase text-[#4F8EF7] mb-4 flex items-center justify-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4F8EF7] animate-pulse" />
          {CTA_SECTION.social_proof}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[var(--font-space)] font-bold text-[#F0F4FF] mb-6"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
        >
          {CTA_SECTION.heading}
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892A4] mb-10 text-base leading-relaxed max-w-xl mx-auto"
        >
          {CTA_SECTION.subheading}
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-strong rounded-2xl px-8 py-6 text-center"
            >
              <div className="text-3xl mb-3">✓</div>
              <p className="font-semibold text-[#F0F4FF]">
                Ottimo! Ti contatteremo entro 24 ore.
              </p>
              <p className="text-[#8892A4] text-sm mt-1">
                Controlla la tua inbox (e la cartella spam).
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={CTA_SECTION.placeholder}
                required
                className="flex-1 glass rounded-full px-5 py-3.5 text-sm text-[#F0F4FF] placeholder:text-[#8892A4] outline-none focus:border-[#4F8EF7]/50 transition-colors border border-transparent"
                style={{ cursor: 'text' }}
              />
              <GlowButton variant="primary">
                {CTA_SECTION.cta}
              </GlowButton>
            </form>
          )}

          {!submitted && (
            <p className="mt-4 text-xs text-[#8892A4] opacity-60">
              {CTA_SECTION.disclaimer}
            </p>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-24 text-center"
      >
        <div className="section-sep mb-8" />
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#8892A4]">
          <span>{FOOTER.copy}</span>
          {FOOTER.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[#F0F4FF] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </motion.footer>
    </section>
  );
}
