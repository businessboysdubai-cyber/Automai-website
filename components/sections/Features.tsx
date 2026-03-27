'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FEATURES } from '@/lib/constants';

// Inline SVG icons
function BrainIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="24" r="20" fill={color} fillOpacity="0.1" />
      <path
        d="M16 28c0-4.4 3.6-8 8-8s8 3.6 8 8M24 20v-4M18 22l-3-3M30 22l3-3M20 32h8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="32" r="3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function NetworkIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="24" r="20" fill={color} fillOpacity="0.1" />
      <circle cx="24" cy="18" r="3" fill={color} />
      <circle cx="14" cy="30" r="3" fill={color} />
      <circle cx="34" cy="30" r="3" fill={color} />
      <line x1="24" y1="21" x2="14" y2="27" stroke={color} strokeWidth="2" />
      <line x1="24" y1="21" x2="34" y2="27" stroke={color} strokeWidth="2" />
      <line x1="14" y1="30" x2="34" y2="30" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
}

function IntegrationIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="24" r="20" fill={color} fillOpacity="0.1" />
      <rect x="14" y="20" width="8" height="8" rx="2" stroke={color} strokeWidth="2" />
      <rect x="26" y="20" width="8" height="8" rx="2" stroke={color} strokeWidth="2" />
      <path d="M22 24h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 20v-3M30 20v-3M18 28v3M30 28v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  brain: BrainIcon,
  network: NetworkIcon,
  integration: IntegrationIcon,
} as const;

function FeatureCard({
  item,
  index,
}: {
  item: (typeof FEATURES.items)[number];
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const Icon = ICONS[item.icon as keyof typeof ICONS];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      className="group relative glass rounded-2xl p-8 flex flex-col gap-5 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(79,142,247,0.15)]"
    >
      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${item.color}22, transparent)`,
          border: `1px solid ${item.color}33`,
        }}
      />

      {/* Icon */}
      <div className="relative z-10">
        <Icon color={item.color} />
      </div>

      {/* Title */}
      <h3
        className="relative z-10 font-[var(--font-space)] font-bold text-lg text-[#F0F4FF]"
      >
        {item.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-[#8892A4] text-sm leading-relaxed">
        {item.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="section-sep mb-20" />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase text-[#00D4FF] mb-4"
          >
            Servizi
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[var(--font-space)] font-bold text-[#F0F4FF]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {FEATURES.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#8892A4] max-w-2xl mx-auto text-base leading-relaxed"
          >
            {FEATURES.subheading}
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.items.map((item, i) => (
            <FeatureCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
