"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { simplexNoise, palettes, palettesLight } from "@/lib/glsl";
import { live, useApp } from "@/lib/store";

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uPulse;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${simplexNoise}
void main(){
  float n = snoise(normal * 1.4 + uTime * 0.35);
  float n2 = snoise(normal * 3.5 - uTime * 0.5) * 0.35;
  vNoise = n + n2;
  vec3 p = position + normal * (n * 0.16 + n2 * 0.08) * (1.0 + uPulse);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const coreFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uLight;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float f = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  vec3 col = mix(uColorA, uColorB, smoothstep(-0.6, 0.8, vNoise));
  float veins = smoothstep(0.02, 0.0, abs(fract(vNoise * 3.0 + uTime * 0.15) - 0.5) - 0.46);
  vec3 dark = col * (0.04 + f * 1.55) + veins * col * 0.45;
  vec3 light = mix(col * 1.15, vec3(1.0), 0.35 * (1.0 - f)) + veins * 0.25;
  float aDark = clamp(0.06 + f * 0.95 + veins * 0.3, 0.0, 1.0);
  float aLight = clamp(0.12 + f * 0.7 + veins * 0.25, 0.0, 0.85);
  gl_FragColor = vec4(mix(dark, light, uLight), mix(aDark, aLight, uLight));
}
`;

function makeHaloTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.18, "rgba(255,255,255,0.55)");
  grd.addColorStop(0.45, "rgba(255,255,255,0.12)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const RING_TILTS: [number, number, number][] = [
  [Math.PI / 2.3, 0, 0.2],
  [Math.PI / 1.7, 0.6, -0.4],
  [Math.PI / 2, -0.9, 0.9],
];

export function AICore() {
  const root = useRef<THREE.Group>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const rings = useRef<THREE.Group>(null);
  const satellites = useRef<THREE.Mesh[]>([]);
  const theme = useApp((s) => s.theme);

  const { coreMat, haloMat, shellMat, ringMat, shellGeo, halo } = useMemo(() => {
    const coreMat = new THREE.ShaderMaterial({
      vertexShader: coreVertex,
      fragmentShader: coreFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: 0 },
        uLight: { value: 0 },
        uColorA: { value: new THREE.Color(palettes.blue[0]) },
        uColorB: { value: new THREE.Color(palettes.blue[1]) },
      },
    });
    const halo = makeHaloTexture();
    const haloMat = new THREE.SpriteMaterial({
      map: halo,
      color: new THREE.Color("#3d8bff"),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    });
    const shellGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.85, 1));
    const shellMat = new THREE.LineBasicMaterial({ color: "#26c6da", transparent: true, opacity: 0.22, depthWrite: false });
    const ringMat = new THREE.MeshBasicMaterial({ color: "#7fb2ff", transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
    return { coreMat, haloMat, shellMat, ringMat, shellGeo, halo };
  }, []);

  useEffect(() => () => {
    [coreMat, haloMat, shellMat, ringMat, shellGeo, halo].forEach((d) => d.dispose());
  }, [coreMat, haloMat, shellMat, ringMat, shellGeo, halo]);

  useEffect(() => {
    const dark = theme === "dark";
    coreMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
    ringMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
    coreMat.needsUpdate = true;
    ringMat.needsUpdate = true;
    coreMat.uniforms.uLight.value = dark ? 0 : 1;
    haloMat.opacity = dark ? 0.85 : 0.0;
    haloMat.blending = THREE.AdditiveBlending;
    shellMat.opacity = dark ? 0.22 : 0.3;
    shellMat.color.set(dark ? "#26c6da" : "#1769ff");
    ringMat.color.set(dark ? "#7fb2ff" : "#1769ff");
    ringMat.opacity = dark ? 0.5 : 0.45;
  }, [theme, coreMat, haloMat, shellMat, ringMat]);

  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    const { scene, theme: th } = useApp.getState();
    // Small phones have no free space for the core, so it is hidden there to keep text legible.
    const w = state.size.width;
    const target = (scene.core ?? 0) * (w < 640 ? 0 : w < 768 ? 0.4 : 1);
    const s = THREE.MathUtils.damp(g.scale.x, target, 3, delta);
    g.scale.setScalar(Math.max(s, 0.0001));
    g.visible = s > 0.01;
    if (!g.visible) return;

    const t = state.clock.elapsedTime;
    coreMat.uniforms.uTime.value = t;
    coreMat.uniforms.uPulse.value = THREE.MathUtils.damp(coreMat.uniforms.uPulse.value, Math.min(Math.abs(live.velocity) * 0.04, 1.2), 4, delta);
    const pal = (th === "dark" ? palettes : palettesLight)[scene.tint ?? "blue"];
    const k = 1 - Math.exp(-2.5 * delta);
    (coreMat.uniforms.uColorA.value as THREE.Color).lerp(tmp.set(pal[0]), k);
    (coreMat.uniforms.uColorB.value as THREE.Color).lerp(tmp.set(pal[1]), k);
    haloMat.color.lerp(tmp.set(pal[0]), k);

    if (shell.current) {
      shell.current.rotation.y += delta * 0.12;
      shell.current.rotation.x += delta * 0.05;
    }
    if (rings.current) {
      rings.current.children.forEach((ring, i) => {
        ring.rotation.z += delta * (0.15 + i * 0.08) * (i % 2 ? -1 : 1);
      });
    }
    satellites.current.forEach((sat, i) => {
      if (!sat) return;
      const a = t * (0.6 + i * 0.25) + i * 2.1;
      const r = 2.25 + i * 0.25;
      sat.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
    });
  });

  return (
    <group ref={root} scale={0.0001}>
      <sprite material={haloMat} scale={7.5} />
      <mesh material={coreMat}>
        <icosahedronGeometry args={[1.25, 40]} />
      </mesh>
      <lineSegments ref={shell} geometry={shellGeo} material={shellMat} />
      <group ref={rings}>
        {RING_TILTS.map((rot, i) => (
          <group key={i} rotation={rot}>
            <mesh material={ringMat}>
              <torusGeometry args={[2.25 + i * 0.25, 0.006, 8, 220]} />
            </mesh>
            <mesh
              ref={(el) => {
                if (el) satellites.current[i] = el;
              }}
              material={ringMat}
            >
              <sphereGeometry args={[0.045, 16, 16]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
