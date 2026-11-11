import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";

function Blob() {
  const ref = useRef();
  useFrame(({ pointer }, delta) => {
    const m = ref.current;
    if (!m) return;
    // Nghiêng theo chuột, mượt dần
    m.rotation.y += (pointer.x * 0.6 - m.rotation.y) * 0.05;
    m.rotation.x += (-pointer.y * 0.4 - m.rotation.x) * 0.05;
    m.rotation.z += delta * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} scale={1.25}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#5a3bd6"
          emissive="#e45fb0"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.3}
          distort={0.45}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 4]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={40} color="#2cb67d" />
        <pointLight position={[4, -3, -2]} intensity={40} color="#e45fb0" />
        <Blob />
        <Sparkles count={70} scale={[9, 6, 4]} size={2.2} speed={0.35} color="#e45fb0" />
      </Canvas>
    </div>
  );
}
