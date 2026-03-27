'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GlowButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
}: GlowButtonProps) {
  const baseClass =
    'relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 select-none cursor-none';

  const primaryClass =
    'bg-gradient-to-r from-[#4F8EF7] via-[#00D4FF] to-[#7B61FF] text-white shadow-[0_0_30px_rgba(79,142,247,0.4)]';

  const secondaryClass =
    'glass text-[#F0F4FF] border border-white/10 hover:border-[#4F8EF7]/50 hover:shadow-[0_0_20px_rgba(79,142,247,0.2)]';

  const variantClass = variant === 'primary' ? primaryClass : secondaryClass;

  const motionProps = {
    whileHover: { scale: 1.04, y: -1 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  };

  const inner = (
    <motion.span
      className={`${baseClass} ${variantClass} ${className}`}
      {...motionProps}
    >
      {/* Shimmer overlay on primary */}
      {variant === 'primary' && (
        <motion.span
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          initial={false}
        >
          <motion.span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </motion.span>
      )}
      {children}
    </motion.span>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }

  return <button onClick={onClick} type="button">{inner}</button>;
}
