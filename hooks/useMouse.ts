'use client';

import { useEffect, useRef } from 'react';

export interface MouseState {
  x: number; // normalized [-1, 1]
  y: number; // normalized [-1, 1]
  rawX: number; // pixels
  rawY: number; // pixels
}

/**
 * Returns a ref that holds the current mouse position.
 * Values x/y are normalized to [-1, 1] (center of screen = 0,0).
 * Using a ref instead of state avoids re-renders on every mouse move.
 */
export function useMouse(): React.RefObject<MouseState> {
  const mouse = useRef<MouseState>({ x: 0, y: 0, rawX: 0, rawY: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.rawX = e.clientX;
      mouse.current.rawY = e.clientY;
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}
