'use client';

import * as THREE from 'three';

// ── Torso / bust of the robot ──────────────────────────────────────────────
// All geometry is programmatic — no external assets.

export default function RobotTorso() {
  return (
    <group>
      {/* ── Neck ──────────────────────────────────────────────── */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.14, 0.18, 0.32, 32]} />
        <meshStandardMaterial
          color="#0d0d1a"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Neck decorative rings */}
      {[-0.04, 0.04].map((y, i) => (
        <mesh key={i} position={[0, 0.08 + y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.175, 0.012, 16, 64]} />
          <meshStandardMaterial
            color="#7B61FF"
            emissive="#7B61FF"
            emissiveIntensity={1.0}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* ── Main torso block ──────────────────────────────────── */}
      <mesh position={[0, -0.52, 0]} scale={[1.1, 1, 0.7]}>
        <boxGeometry args={[0.92, 0.9, 0.72]} />
        <meshStandardMaterial
          color="#0d0d1a"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Torso beveled edge highlight (top) */}
      <mesh position={[0, -0.07, 0.22]}>
        <boxGeometry args={[0.96, 0.04, 0.06]} />
        <meshStandardMaterial
          color="#4F8EF7"
          emissive="#4F8EF7"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* ── Chest panel ───────────────────────────────────────── */}
      <mesh position={[0, -0.42, 0.26]}>
        <boxGeometry args={[0.54, 0.42, 0.04]} />
        <meshStandardMaterial
          color="#4F8EF7"
          emissive="#4F8EF7"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Chest panel inner dark recess */}
      <mesh position={[0, -0.42, 0.28]}>
        <boxGeometry args={[0.46, 0.35, 0.01]} />
        <meshStandardMaterial color="#040410" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* ── Chest "core" energy orb ───────────────────────────── */}
      <mesh position={[0, -0.38, 0.3]}>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={2.0}
          toneMapped={false}
        />
      </mesh>
      {/* Orb ring */}
      <mesh position={[0, -0.38, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.095, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#4F8EF7"
          emissive="#4F8EF7"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* ── Chest vent slots ──────────────────────────────────── */}
      {[-0.1, -0.02, 0.06, 0.14].map((yOff, i) => (
        <mesh key={i} position={[0, -0.58 + yOff, 0.3]}>
          <boxGeometry args={[0.32, 0.022, 0.015]} />
          <meshStandardMaterial
            color="#4F8EF7"
            emissive="#4F8EF7"
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}

      {/* ── Shoulder joints ───────────────────────────────────── */}
      {/* Left shoulder */}
      <mesh position={[-0.64, -0.22, 0]} scale={[0.9, 0.7, 0.9]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#111128"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[-0.64, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.21, 0.016, 16, 64]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Right shoulder */}
      <mesh position={[0.64, -0.22, 0]} scale={[0.9, 0.7, 0.9]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#111128"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.64, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.21, 0.016, 16, 64]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* ── Upper arms (stumps) ───────────────────────────────── */}
      {/* Left arm */}
      <mesh position={[-0.64, -0.56, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.13, 0.11, 0.42, 32]} />
        <meshStandardMaterial
          color="#0d0d1a"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>
      {/* Left arm end ring */}
      <mesh position={[-0.68, -0.78, 0]} rotation={[Math.PI / 2, 0, 0.1]}>
        <torusGeometry args={[0.115, 0.018, 16, 32]} />
        <meshStandardMaterial
          color="#7B61FF"
          emissive="#7B61FF"
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.64, -0.56, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.13, 0.11, 0.42, 32]} />
        <meshStandardMaterial
          color="#0d0d1a"
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>
      {/* Right arm end ring */}
      <mesh position={[0.68, -0.78, 0]} rotation={[Math.PI / 2, 0, -0.1]}>
        <torusGeometry args={[0.115, 0.018, 16, 32]} />
        <meshStandardMaterial
          color="#7B61FF"
          emissive="#7B61FF"
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </mesh>

      {/* ── Side torso details ────────────────────────────────── */}
      {/* Left panel indent */}
      <mesh position={[-0.32, -0.52, 0.22]}>
        <boxGeometry args={[0.14, 0.32, 0.03]} />
        <meshStandardMaterial
          color="#0a0a18"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Right panel indent */}
      <mesh position={[0.32, -0.52, 0.22]}>
        <boxGeometry args={[0.14, 0.32, 0.03]} />
        <meshStandardMaterial
          color="#0a0a18"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* ── Lower torso trim ──────────────────────────────────── */}
      <mesh position={[0, -0.98, 0]}>
        <boxGeometry args={[0.98, 0.06, 0.5]} />
        <meshStandardMaterial
          color="#4F8EF7"
          emissive="#4F8EF7"
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
