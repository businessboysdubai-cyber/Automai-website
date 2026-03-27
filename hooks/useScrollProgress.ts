'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Returns the scroll progress [0, 1] of a given element ref
 * relative to the viewport. 0 = just entered from bottom, 1 = fully scrolled past.
 */
export function useScrollProgress<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  number,
] {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when bottom of el hits bottom of viewport; 1 when top of el hits top
      const p = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      );
      setProgress(p);
    };

    calc();
    window.addEventListener('scroll', calc, { passive: true });
    return () => window.removeEventListener('scroll', calc);
  }, []);

  return [ref, progress];
}

/**
 * Simple hook that returns global scroll progress [0, 1]
 */
export function useGlobalScroll(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calc = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    calc();
    window.addEventListener('scroll', calc, { passive: true });
    return () => window.removeEventListener('scroll', calc);
  }, []);

  return progress;
}
