'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface RobotHeadHandle {
  group: THREE.Group | null;
}

interface RobotHeadProps {
  mouseX: number;
  mouseY: number;
}

const RobotHead = forwardRef<RobotHeadHandle, RobotHeadProps>(
  ({ mouseX, mouseY }, ref) => {
    const groupRef = useRef<THREE.Group>(null);

    // Iris refs for pupil-shift effect
    const leftIrisRef = useRef<THREE.Mesh>(null);
    const rightIrisRef = useRef<THREE.Mesh>(null);

    useImperativeHandle(ref, () => ({
      get group() {
        return groupRef.current;
      },
    }));

    useFrame(() => {
      if (!groupRef.current) return;

      // Smooth head rotation following mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.4,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseY * 0.2,
        0.05,
      );

      // Iris shift — pupils move up to 0.02 units in mouse direction
      const irisOffsetX = mouseX * 0.02;
      const irisOffsetY = mouseY * 0.02;
      if (leftIrisRef.current) {
        leftIrisRef.current.position.x = THREE.MathUtils.lerp(
          leftIrisRef.current.position.x,
          -0.18 + irisOffsetX,
          0.08,
        );
        leftIrisRef.current.position.y = THREE.MathUtils.lerp(
          leftIrisRef.current.position.y,
          irisOffsetY,
          0.08,
        );
      }
      if (rightIrisRef.current) {
        rightIrisRef.current.position.x = THREE.MathUtils.lerp(
          rightIrisRef.current.position.x,
          0.18 + irisOffsetX,
          0.08,
        );
        rightIrisRef.current.position.y = THREE.MathUtils.lerp(
          rightIrisRef.current.position.y,
          irisOffsetY,
          0.08,
        );
      }
    });

    return (
      <group ref={groupRef}>
        {/* ── Skull ────────────────────────────────────────────── */}
        <mesh>
          <sphereGeometry args={[0.52, 64, 64]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Flatten head slightly on Y axis via scale on parent group */}
        {/* Done by scaling the skull mesh below instead */}
        <mesh scale={[1, 0.88, 0.94]}>
          <sphereGeometry args={[0.52, 64, 64]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* ── Visor / face plate ───────────────────────────────── */}
        <mesh position={[0, 0.04, 0.42]}>
          <boxGeometry args={[0.72, 0.32, 0.04]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.6}
            opacity={0.82}
            transparent
            metalness={0.2}
            roughness={0.05}
          />
        </mesh>

        {/* Visor inner darker panel */}
        <mesh position={[0, 0.04, 0.44]}>
          <boxGeometry args={[0.64, 0.24, 0.01]} />
          <meshStandardMaterial
            color="#001820"
            opacity={0.95}
            transparent
          />
        </mesh>

        {/* ── Left eye socket ──────────────────────────────────── */}
        <mesh position={[-0.18, 0.04, 0.44]}>
          <sphereGeometry args={[0.075, 32, 32]} />
          <meshStandardMaterial color="#001020" />
        </mesh>

        {/* Left eye glow sphere */}
        <mesh position={[-0.18, 0.04, 0.46]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={2.0}
            toneMapped={false}
          />
        </mesh>

        {/* Left iris (moves with mouse) */}
        <mesh
          ref={leftIrisRef}
          position={[-0.18, 0, 0.49]}
        >
          <sphereGeometry args={[0.03, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={3.0}
            toneMapped={false}
          />
        </mesh>

        {/* ── Right eye socket ─────────────────────────────────── */}
        <mesh position={[0.18, 0.04, 0.44]}>
          <sphereGeometry args={[0.075, 32, 32]} />
          <meshStandardMaterial color="#001020" />
        </mesh>

        {/* Right eye glow sphere */}
        <mesh position={[0.18, 0.04, 0.46]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={2.0}
            toneMapped={false}
          />
        </mesh>

        {/* Right iris (moves with mouse) */}
        <mesh
          ref={rightIrisRef}
          position={[0.18, 0, 0.49]}
        >
          <sphereGeometry args={[0.03, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={3.0}
            toneMapped={false}
          />
        </mesh>

        {/* ── Mouth / speaker grille ───────────────────────────── */}
        {[-0.12, -0.04, 0.04, 0.12].map((x, i) => (
          <mesh key={i} position={[x, -0.14, 0.44]}>
            <boxGeometry args={[0.04, 0.06, 0.01]} />
            <meshStandardMaterial
              color="#4F8EF7"
              emissive="#4F8EF7"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        {/* ── Side sensors / "ears" ────────────────────────────── */}
        <mesh position={[-0.52, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.06, 0.12, 32]} />
          <meshStandardMaterial color="#0d0d1a" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0.52, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.06, 0.12, 32]} />
          <meshStandardMaterial color="#0d0d1a" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* Sensor detail rings */}
        <mesh position={[-0.55, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.008, 16, 32]} />
          <meshStandardMaterial
            color="#7B61FF"
            emissive="#7B61FF"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0.55, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.008, 16, 32]} />
          <meshStandardMaterial
            color="#7B61FF"
            emissive="#7B61FF"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>

        {/* ── Antennae ─────────────────────────────────────────── */}
        {/* Left antenna */}
        <mesh position={[-0.2, 0.65, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.01, 0.015, 0.38, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[-0.23, 0.86, 0]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Right antenna */}
        <mesh position={[0.2, 0.65, 0]} rotation={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.01, 0.015, 0.38, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0.23, 0.86, 0]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial
            color="#7B61FF"
            emissive="#7B61FF"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* ── Crown detail stripe ──────────────────────────────── */}
        <mesh position={[0, 0.5, 0.1]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.06]} />
          <meshStandardMaterial
            color="#4F8EF7"
            emissive="#4F8EF7"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>
    );
  },
);

RobotHead.displayName = 'RobotHead';
export default RobotHead;
