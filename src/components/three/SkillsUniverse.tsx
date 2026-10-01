import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, Environment, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { pointerState, prefersReducedMotion } from "@/lib/scroll-store";

const SKILLS = [
  "Python",
  "C++",
  "HTML",
  "Artificial Intelligence",
  "RAG",
  "LangChain",
  "LangSmith",
  "LLMs",
  "Prompt Engineering",
  "Chatbot Development",
  "Git",
  "GitHub",
  "DSA",
  "OOP",
  "NLP",
  "Backend Development",
  "API Integration",
];

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    if (ref.current) {
      ref.current.rotation.y += dt * 0.18;
      ref.current.rotation.x += dt * 0.06;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.85, 1]} />
      <meshStandardMaterial color="#8e949c" metalness={0.75} roughness={0.3} flatShading />
    </mesh>
  );
}

function Orbit() {
  const group = useRef<THREE.Group>(null);
  const reduced = useMemo(prefersReducedMotion, []);

  const nodes = useMemo(() => {
    return SKILLS.map((label, i) => {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / SKILLS.length);
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
      const r = 3.6;
      return {
        label,
        pos: new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.cos(phi) * 0.72,
          r * Math.sin(theta) * Math.sin(phi),
        ),
      };
    });
  }, []);

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    if (!reduced) g.rotation.y += dt * 0.08;
    g.rotation.y += (pointerState.x * 0.6 - g.rotation.y * 0) * 0;
    const tx = -pointerState.y * 0.35;
    g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-2 * dt));
    g.position.x += (pointerState.x * 0.35 - g.position.x) * (1 - Math.exp(-2 * dt));
  });

  return (
    <group ref={group}>
      <Core />
      <Billboard>
        <Text
          fontSize={0.34}
          color="#f2f2f4"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 1.1]}
        >
          AI
        </Text>
      </Billboard>
      {nodes.map((n) => (
        <group key={n.label} position={n.pos}>
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#8ab4f8" roughness={0.4} />
          </mesh>
          <Billboard>
            <Text
              fontSize={0.155}
              color="#e8e8ea"
              anchorX="left"
              anchorY="middle"
              position={[0.12, 0, 0]}
              letterSpacing={-0.02}
            >
              {n.label}
            </Text>
          </Billboard>
        </group>
      ))}
    </group>
  );
}

export default function SkillsUniverse() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  return (
    <Canvas
      dpr={[1, isMobile ? 1.2 : 1.6]}
      camera={{ position: [0, 0, isMobile ? 8.2 : 6.4], fov: 45 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 5, 4]} intensity={1} />
        <Orbit />
        <Environment resolution={64}>
          <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 8, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
