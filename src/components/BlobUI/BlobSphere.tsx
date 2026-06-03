"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BlobSphereProps {
  color?: string;
  size?: number;
  sensitivity?: number;
  isSpeaking?: boolean;
}

/**
 * Inner 3D blob with vertex displacement (breathing effect),
 * particle ring, and glow shader.
 */
function BlobMesh({
  color = "#6366f1",
  size = 1,
  sensitivity = 1,
  isSpeaking = false,
}: BlobSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Points>(null!);

  // Geometry with enough subdivisions for smooth deformation
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(size, 64);
    return geo;
  }, [size]);

  // Particle ring
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorObj = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = size * (1.8 + Math.random() * 0.6);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const c = colorObj.clone().lerp(
        new THREE.Color("#a855f7"),
        Math.random() * 0.5,
      );
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return [
      new THREE.BufferAttribute(positions, 3),
      new THREE.BufferAttribute(colors, 3),
    ];
  }, [size, color]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const elapsed = clock.getElapsedTime();

    // Breathing effect: vertex displacement
    const positions = meshRef.current.geometry.attributes.position;
    const original = positions.array as Float32Array;
    const count = positions.count;

    // Slight rotation
    meshRef.current.rotation.x = Math.sin(elapsed * 0.2) * 0.1;
    meshRef.current.rotation.y += 0.003 * sensitivity;

    // Pulse amplitude based on speaking state
    const baseAmplitude = isSpeaking ? 0.12 : 0.04;
    const pulseSpeed = isSpeaking ? 3 : 1.5;
    const pulse = Math.sin(elapsed * pulseSpeed) * baseAmplitude * sensitivity;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = original[i3];
      const y = original[i3 + 1];
      const z = original[i3 + 2];

      const len = Math.sqrt(x * x + y * y + z * z);
      const noise =
        Math.sin(x * 3 + elapsed) * 0.02 +
        Math.cos(y * 3 + elapsed * 0.7) * 0.02 +
        Math.sin(z * 3 + elapsed * 1.3) * 0.02;

      const displacement = 1 + pulse + noise;

      original[i3] = x * displacement;
      original[i3 + 1] = y * displacement;
      original[i3 + 2] = z * displacement;
    }

    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Rotate particle ring
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(elapsed * 0.1) * 0.05;
      ringRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Glow sphere (slightly larger, transparent) */}
      <mesh>
        <icosahedronGeometry args={[size * 1.15, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe={false}
        />
      </mesh>

      {/* Main blob */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.85}
          emissive={color}
          emissiveIntensity={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[size * 1.01, 32]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Particle ring */}
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute {...particlePositions} />
          <bufferAttribute {...particleColors} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Main BlobSphere component (Canvas wrapper).
 */
export default function BlobSphere(props: BlobSphereProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#a855f7" />
      <spotLight
        position={[2, 3, 4]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.5}
        color="#818cf8"
      />
      <BlobMesh {...props} />
    </Canvas>
  );
}
