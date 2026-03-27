'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, BRAND } from '@/lib/constants';
import GlowButton from './GlowButton';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 30);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
          <div
            className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              atTop
                ? 'bg-transparent'
                : 'glass border border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            }`}
          >
            {/* Logo */}
            <a
              href="#"
              className="font-[var(--font-space)] font-bold text-xl tracking-tight text-gradient"
            >
              {BRAND.logo}
            </a>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#8892A4] hover:text-[#F0F4FF] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <GlowButton href="#cta" variant="primary" className="text-xs px-5 py-2.5">
              Inizia ora
            </GlowButton>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
