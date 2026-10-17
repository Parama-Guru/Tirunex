"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import { AICore } from "./AICore";
import { live, useApp, type SceneShape } from "@/lib/store";

const BASE_TILT: Partial<Record<SceneShape, [number, number]>> = {
  galaxy: [0.55, 0],
  terrain: [0.32, 0],
  rings: [0.25, 0],
  wave: [0.1, 0],
  shield: [0.15, 0],
};

function Rig() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const { scene } = useApp.getState();
    const tilt = BASE_TILT[scene.shape] ?? [0, 0];
    const vel = Math.min(Math.abs(live.velocity), 60);
    spin.current += delta * (0.06 + vel * 0.004);

    const tx = isMobile ? 0 : scene.x ?? 0;
    const ty = (scene.y ?? 0) + (isMobile && (scene.core ?? 0) > 0 ? -3.2 : 0);
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 2.2, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 2.2, delta);

    const tunnel = scene.shape === "tunnel";
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tilt[0] + live.pointer.y * 0.12, 3, delta);
    g.rotation.y = tunnel ? THREE.MathUtils.damp(g.rotation.y, 0, 3, delta) : spin.current + live.scroll * 0.00025;
    g.rotation.z = tunnel ? spin.current * 1.5 : THREE.MathUtils.damp(g.rotation.z, tilt[1], 3, delta);

    const zoom = (scene.zoom ?? 7) * (isMobile ? 1.35 : 1);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, live.pointer.x * 0.35, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, live.pointer.y * 0.25, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, zoom, 2, delta);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <ParticleField count={isMobile ? 6500 : 15000} />
      <AICore />
    </group>
  );
}

export default function BackgroundCanvas() {
  const dpr = useMemo<[number, number]>(() => [1, 1.75], []);
  return (
    <Canvas
      frameloop="never"
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 60 }}
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
      aria-hidden
    >
      <Rig />
    </Canvas>
  );
}
