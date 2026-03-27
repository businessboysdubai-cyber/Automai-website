'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MouseState } from '@/hooks/useMouse';

const PARTICLE_COUNT = 350;
const SPREAD = 12;

interface ParticleFieldProps {
  mouseRef: React.RefObject<MouseState>;
}

export default function ParticleField({ mouseRef }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    const mx = mouseRef.current ? mouseRef.current.x * 4 : 0;
    const my = mouseRef.current ? mouseRef.current.y * 4 : 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const dx = mx - arr[ix];
      const dy = my - arr[iy];
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Magnetic pull toward cursor
      if (dist < 3) {
        const strength = (3 - dist) / 3 * 0.003;
        velocities[ix] += dx * strength;
        velocities[iy] += dy * strength;
      }

      // Apply damping
      velocities[ix] *= 0.97;
      velocities[iy] *= 0.97;
      velocities[iz] *= 0.99;

      arr[ix] += velocities[ix];
      arr[iy] += velocities[iy];
      arr[iz] += velocities[iz];

      // Boundary wrap
      if (arr[ix] > SPREAD / 2)  arr[ix] = -SPREAD / 2;
      if (arr[ix] < -SPREAD / 2) arr[ix] =  SPREAD / 2;
      if (arr[iy] > SPREAD / 2)  arr[iy] = -SPREAD / 2;
      if (arr[iy] < -SPREAD / 2) arr[iy] =  SPREAD / 2;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#4F8EF7"
        size={0.025}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
