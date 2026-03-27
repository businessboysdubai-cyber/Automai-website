'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import AgentNetwork from './AgentNetwork';
import ParticleField from './ParticleField';
import { useMouse } from '@/hooks/useMouse';

function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useMouse();
  const targetRef = useRef(new THREE.Vector3());

  useFrame(() => {
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;
    targetRef.current.set(mx * 1.2, my * 0.8, 0);
    camera.position.lerp(
      new THREE.Vector3(
        targetRef.current.x,
        targetRef.current.y,
        10,
      ),
      0.04,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContent() {
  const mouseRef = useMouse();

  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} color="#4F8EF7" intensity={0.5} />
      <pointLight position={[-10, -5, -10]} color="#7B61FF" intensity={0.4} />
      <pointLight position={[0, 0, 5]} color="#00D4FF" intensity={0.3} />

      {/* Background stars */}
      <Stars
        radius={80}
        depth={50}
        count={2000}
        factor={2}
        saturation={0.5}
        fade
        speed={0.3}
      />

      {/* Floating agent network */}
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.3}>
        <AgentNetwork />
      </Float>

      {/* Particle field */}
      <Suspense fallback={null}>
        <ParticleField mouseRef={mouseRef} />
      </Suspense>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
      </EffectComposer>
    </>
  );
}

export default function Scene() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: '#050510' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
