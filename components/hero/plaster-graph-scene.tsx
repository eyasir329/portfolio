"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { buildGraph } from "@/lib/graph";

function readColours() {
  const s = getComputedStyle(document.documentElement);
  return {
    plaster: s.getPropertyValue("--plaster").trim() || "#ece7de",
    accent: s.getPropertyValue("--accent").trim() || "#8b2a1c",
    ink: s.getPropertyValue("--ink").trim() || "#15130f",
  };
}

function useThemeColours() {
  const [colours, setColours] = useState(readColours);
  useEffect(() => {
    const update = () => setColours(readColours());
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", update);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);
  return colours;
}

const up = new THREE.Vector3(0, 1, 0);

function Sculpture({ paused, colours }: { paused: boolean; colours: ReturnType<typeof readColours> }) {
  const group = useRef<THREE.Group>(null);
  const graph = useMemo(() => buildGraph(), []);
  const pathEdges = useMemo(() => {
    const s = new Set<string>();
    graph.path.forEach((v, i) => {
      const w = graph.path[i + 1];
      if (w !== undefined) s.add(v < w ? `${v}-${w}` : `${w}-${v}`);
    });
    return s;
  }, [graph]);

  const edges = useMemo(
    () =>
      graph.edges.map(([a, b]) => {
        const A = new THREE.Vector3(...graph.nodes[a]!);
        const B = new THREE.Vector3(...graph.nodes[b]!);
        const mid = A.clone().add(B).multiplyScalar(0.5);
        const dir = B.clone().sub(A);
        const q = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize());
        return { key: `${a}-${b}`, mid, q, len: dir.length() };
      }),
    [graph],
  );

  useFrame((_, delta) => {
    if (!group.current || paused) return;
    group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} rotation={[0.28, 0.5, 0]}>
      {graph.nodes.map((n, i) => {
        const hot = graph.path.includes(i);
        return (
          <mesh key={i} position={n} castShadow>
            <sphereGeometry args={[hot ? 0.12 : 0.095, 32, 32]} />
            <meshStandardMaterial color={hot ? colours.accent : colours.plaster} roughness={0.85} />
          </mesh>
        );
      })}
      {edges.map((e) => {
        const hot = pathEdges.has(e.key);
        return (
          <mesh key={e.key} position={e.mid} quaternion={e.q} castShadow>
            <cylinderGeometry args={[hot ? 0.028 : 0.016, hot ? 0.028 : 0.016, e.len, 10]} />
            <meshStandardMaterial color={hot ? colours.accent : colours.plaster} roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function PlasterGraphScene({ paused, onReady }: { paused: boolean; onReady: () => void }) {
  const colours = useThemeColours();
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "demand" : "always"}
      onCreated={() => onReady()}
      aria-hidden="true"
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3.5, 5, 4]} intensity={1.7} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, -1, -3]} intensity={0.35} color={colours.accent} />
      <Sculpture paused={paused} colours={colours} />
      <ContactShadows position={[0, -2.05, 0]} opacity={0.28} scale={7} blur={2.6} far={3} color={colours.ink} />
    </Canvas>
  );
}
