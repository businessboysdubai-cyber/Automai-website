'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import Robot from './Robot';
import { useMouse } from '@/hooks/useMouse';

// Initialize RectAreaLight uniforms once
if (typeof window !== 'undefined') {
  RectAreaLightUniformsLib.init();
}

function RobotLights() {
  return (
    <>
      {/* Ambient — low so emissives pop */}
      <ambientLight intensity={0.3} />

      {/* Key light — blue from upper right */}
      <pointLight
        position={[2, 3, 2]}
        color="#4F8EF7"
        intensity={2.0}
        decay={2}
      />

      {/* Rim light — violet from left */}
      <pointLight
        position={[-2, 1, 1]}
        color="#7B61FF"
        intensity={1.5}
        decay={2}
      />

      {/* Frontal fill — cyan, illuminates face */}
      <rectAreaLight
        position={[0, 0.5, 2.5]}
        rotation={[0, 0, 0]}
        color="#00D4FF"
        intensity={1.0}
        width={3}
        height={3}
      />
    </>
  );
}

function SceneContent() {
  const mouseRef = useMouse();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    const update = () => {
      setMouse({
        x: mouseRef.current?.x ?? 0,
        y: mouseRef.current?.y ?? 0,
      });
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [mouseRef]);

  return (
    <>
      <RobotLights />
      <Robot mouseX={mouse.x} mouseY={mouse.y} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          intensity={1.5}
          mipmapBlur
          radius={0.7}
        />
      </EffectComposer>
    </>
  );
}

interface RobotSceneProps {
  /** When true, renders as a block element filling its parent container.
   *  When false (default), renders as a fixed right-half viewport overlay. */
  embedded?: boolean;
}

export default function RobotScene({ embedded = false }: RobotSceneProps) {
  const canvas = (
    <Canvas
      camera={{ position: [0, embedded ? 0.3 : 0, embedded ? 4 : 5], fov: embedded ? 42 : 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );

  if (embedded) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {canvas}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      className="robot-canvas-wrapper"
    >
      {/* On mobile: full width, dimmed, behind content */}
      <style>{`
        @media (max-width: 768px) {
          .robot-canvas-wrapper {
            width: 100% !important;
            opacity: 0.4;
            z-index: -1 !important;
          }
        }
      `}</style>
      {canvas}
    </div>
  );
}
