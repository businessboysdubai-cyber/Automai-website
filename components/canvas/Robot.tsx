'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import RobotHead from './RobotHead';
import RobotTorso from './RobotTorso';
import type { RobotHeadHandle } from './RobotHead';

interface RobotProps {
  mouseX: number;
  mouseY: number;
}

export default function Robot({ mouseX, mouseY }: RobotProps) {
  const rootRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<RobotHeadHandle>(null);

  useFrame(({ clock }) => {
    if (!rootRef.current) return;

    // ── Idle floating ─────────────────────────────────────────
    rootRef.current.position.y =
      Math.sin(clock.elapsedTime * 0.8) * 0.05;

    // ── Torso subtle orientation toward mouse ─────────────────
    if (torsoRef.current) {
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(
        torsoRef.current.rotation.y,
        mouseX * 0.1,
        0.02,
      );
    }
  });

  return (
    <group ref={rootRef}>
      {/* Torso group (light body sway) */}
      <group ref={torsoRef}>
        <RobotTorso />

        {/* Head sits above the torso */}
        <group position={[0, 0.82, 0]}>
          <RobotHead
            ref={headRef}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </group>
      </group>
    </group>
  );
}
