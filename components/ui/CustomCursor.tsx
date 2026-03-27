'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const springX = useSpring(dotX, { stiffness: 200, damping: 30 });
  const springY = useSpring(dotY, { stiffness: 200, damping: 30 });

  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const checkPointer = () => {
      const el = document.elementFromPoint(
        dotX.get(),
        dotY.get(),
      );
      if (!el) return;
      const style = window.getComputedStyle(el);
      setIsPointer(
        style.cursor === 'pointer' ||
          el.tagName === 'A' ||
          el.tagName === 'BUTTON',
      );
    };

    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousemove', checkPointer, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkPointer);
      document.removeEventListener('mouseleave', leave);
    };
  }, [dotX, dotY, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Small dot — follows exactly */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          backgroundColor: '#00D4FF',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Ring — follows with spring lag */}
      <motion.div
        className="cursor-ring"
        style={{
          x: springX,
          y: springY,
          width: isPointer ? 40 : 28,
          height: isPointer ? 40 : 28,
          border: `1.5px solid ${isPointer ? '#4F8EF7' : 'rgba(240,244,255,0.5)'}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s',
          mixBlendMode: 'normal',
        }}
      />
    </>
  );
}
