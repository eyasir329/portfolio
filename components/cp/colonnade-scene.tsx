"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

type Props = { ratings: number[]; plaster: string; accent: string; ink: string };

/** S2 "Colonnade": one fluted column per rated contest, height = rating after it (docs/05). */
export default function ColonnadeScene({ ratings, plaster, accent, ink }: Props) {
  const cols = useMemo(() => {
    const min = Math.min(...ratings) - 150;
    const max = Math.max(...ratings);
    const peak = ratings.indexOf(max);
    const spacing = 0.62;
    const offset = ((ratings.length - 1) * spacing) / 2;
    return ratings.map((r, i) => ({
      x: i * spacing - offset,
      h: 0.4 + ((r - min) / (max - min)) * 2.6,
      peak: i === peak,
    }));
  }, [ratings]);

  const width = Math.max(6, ratings.length * 0.62);
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.2, width * 0.72], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <group position={[0, -1.3, 0]}>
        <mesh position={[0, -0.06, 0]} receiveShadow>
          <boxGeometry args={[width + 0.6, 0.12, 1.1]} />
          <meshStandardMaterial color={plaster} roughness={0.95} />
        </mesh>
        {cols.map((c, i) => (
          <group key={i} position={[c.x, 0, 0]}>
            <mesh position={[0, c.h / 2, 0]} castShadow>
              <cylinderGeometry args={[0.17, 0.2, c.h, 20]} />
              <meshStandardMaterial color={plaster} roughness={0.85} flatShading />
            </mesh>
            <mesh position={[0, c.h + 0.06, 0]} castShadow>
              <boxGeometry args={[0.46, 0.12, 0.46]} />
              <meshStandardMaterial color={c.peak ? accent : plaster} roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>
      <ContactShadows position={[0, -1.42, 0]} opacity={0.25} scale={width + 4} blur={2.4} far={4} color={ink} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.0} maxPolarAngle={1.45} autoRotate={false} />
    </Canvas>
  );
}
