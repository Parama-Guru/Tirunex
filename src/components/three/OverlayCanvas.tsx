"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

/** Transparent canvas above the page that renders every <Emblem> through drei's View tracking. */
export default function OverlayCanvas() {
  return (
    <Canvas
      frameloop="never"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 30, pointerEvents: "none" }}
      eventPrefix="client"
      aria-hidden
    >
      <View.Port />
    </Canvas>
  );
}
