import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";
import { scrollState, pointerState, prefersReducedMotion } from "@/lib/scroll-store";

const damp = (current: number, target: number, k: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-k * dt));

function Monolith() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const reduced = useMemo(prefersReducedMotion, []);
  const state = useRef({ rx: 0, ry: 0 });

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const p = scrollState.heroProgress;

    const targetRy = pointerState.x * 0.35 + p * 2.4 + (reduced ? 0 : performance.now() * 0.00004);
    const targetRx = -pointerState.y * 0.28 + p * 0.9;
    state.current.ry = damp(state.current.ry, targetRy, 2.2, dt);
    state.current.rx = damp(state.current.rx, targetRx, 2.2, dt);
    g.rotation.y = state.current.ry;
    g.rotation.x = state.current.rx;

    const s = 1 + p * 2.2;
    g.scale.setScalar(s);
    g.position.z = p * 5.2;
    g.position.y = damp(g.position.y, pointerState.y * 0.12 - p * 0.4, 3, dt);
    g.position.x = damp(g.position.x, -1.9 + pointerState.x * 0.18, 3, dt);

    if (inner.current) inner.current.rotation.z += dt * 0.15;
  });

  return (
    <group ref={group} position={[-1.9, -0.35, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.7, 24]} />
        <MeshDistortMaterial
          speed={0.6}
          distort={0.28}
          color="#7f858d"
          metalness={0.7}
          roughness={0.32}
        />
      </mesh>
      <mesh ref={inner} scale={1.42}>
        <torusGeometry args={[0.92, 0.005, 8, 220]} />
        <meshBasicMaterial color="#9aa3ad" transparent opacity={0.35} />
      </mesh>
      <mesh scale={1.62} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[0.92, 0.004, 8, 220]} />
        <meshBasicMaterial color="#9aa3ad" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Dust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 14;
      a[i * 3 + 1] = (Math.random() - 0.5) * 8;
      a[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return a;
  }, [count]);

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    if (ref.current) {
      ref.current.rotation.y += dt * 0.02;
      ref.current.position.z = scrollState.progress * 6;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#aeb6c0" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    const p = scrollState.heroProgress;
    camera.position.z = damp(camera.position.z, 4.2 - p * 3.4, 3, dt);
    camera.position.x = damp(camera.position.x, pointerState.x * 0.22, 2, dt);
    camera.position.y = damp(camera.position.y, pointerState.y * 0.16, 2, dt);
    camera.lookAt(0.4, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const dpr = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : ([1, 1.75] as [number, number]);
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      dpr={dpr as never}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <Monolith />
        {!mobile && <Dust />}
        <Environment resolution={128}>
          <Lightformer intensity={1.5} position={[0, 4, 2]} scale={[8, 8, 1]} color="#dfe4ea" />
          <Lightformer
            intensity={1.1}
            color="#98a1ab"
            position={[-5, 0, 1]}
            rotation-y={Math.PI / 2}
            scale={[16, 3, 1]}
          />
          <Lightformer
            intensity={0.8}
            color="#5b6169"
            position={[5, -1, -2]}
            rotation-y={-Math.PI / 2}
            scale={[16, 3, 1]}
          />
        </Environment>
        <Rig />
      </Suspense>
    </Canvas>
  );
}
