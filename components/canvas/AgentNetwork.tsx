'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 24;
const RADIUS = 4.5;

function randomSpherePoint(r: number): [number, number, number] {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

interface NodeData {
  position: THREE.Vector3;
  phase: number;  // for pulse animation offset
  speed: number;
}

export default function AgentNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);

  const nodes = useMemo<NodeData[]>(
    () =>
      Array.from({ length: NODE_COUNT }, () => ({
        position: new THREE.Vector3(...randomSpherePoint(RADIUS)),
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      })),
    [],
  );

  // Determine connections (edges) between nearby nodes
  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 4) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }, [nodes]);

  // Build lines geometry
  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    for (const [a, b] of edges) {
      positions.push(
        nodes[a].position.x, nodes[a].position.y, nodes[a].position.z,
        nodes[b].position.x, nodes[b].position.y, nodes[b].position.z,
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [edges, nodes]);

  useFrame(({ clock }) => {
    pulseRef.current = clock.getElapsedTime();
    if (groupRef.current) {
      // Slow drift rotation — mouse control is handled in Scene parent
      groupRef.current.rotation.y += 0.0008;
      groupRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <PulsingNode key={i} node={node} index={i} />
      ))}
    </group>
  );
}

function PulsingNode({ node, index }: { node: NodeData; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * node.speed + node.phase) * 0.5 + 0.5;

    if (meshRef.current) {
      const s = 0.06 + pulse * 0.06;
      meshRef.current.scale.setScalar(s);
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + pulse * 2;
    }

    if (ringRef.current) {
      const rScale = 1 + pulse * 2;
      ringRef.current.scale.setScalar(rScale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        (1 - pulse * 0.9) * 0.4;
    }
  });

  // Alternate node colors
  const colors = ['#4F8EF7', '#00D4FF', '#7B61FF'];
  const color = colors[index % 3];

  return (
    <group position={node.position}>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
