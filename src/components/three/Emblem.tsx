"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import { simplexNoise, palettes, palettesLight } from "@/lib/glsl";
import { useApp, type Tint } from "@/lib/store";

export type EmblemVariant =
  | "knot"
  | "orb"
  | "crystal"
  | "torus"
  | "gem"
  | "capsule"
  | "cube"
  | "cone"
  | "ring"
  | "tetra"
  | "helix"
  | "stack";

const holoVertex = /* glsl */ `
uniform float uTime;
uniform float uHover;
uniform float uDisp;
varying vec3 vN;
varying vec3 vV;
varying vec3 vP;
${simplexNoise}
void main(){
  vec3 p = position + normal * snoise(position * 1.8 + uTime * 0.6) * uDisp * (1.0 + uHover * 1.5);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  vP = position;
  gl_Position = projectionMatrix * mv;
}
`;

const holoFragment = /* glsl */ `
uniform vec3 uA;
uniform vec3 uB;
uniform float uTime;
uniform float uLight;
uniform float uHover;
varying vec3 vN;
varying vec3 vV;
varying vec3 vP;
void main(){
  float f = pow(1.0 - abs(dot(vN, vV)), 2.0);
  float bands = 0.5 + 0.5 * sin(vP.y * 16.0 - uTime * 2.5);
  vec3 col = mix(uA, uB, clamp(vP.y * 0.45 + 0.5 + f * 0.3, 0.0, 1.0));
  vec3 dark = col * (0.35 + f * 1.6 + bands * 0.18 + uHover * 0.3);
  float aDark = clamp(0.22 + f * 0.95 + bands * 0.07 + uHover * 0.15, 0.0, 1.0);
  vec3 light = mix(col, vec3(1.0), 0.25 * (1.0 - f)) * (0.85 + bands * 0.1);
  float aLight = clamp(0.35 + f * 0.65 + uHover * 0.1, 0.0, 1.0);
  gl_FragColor = vec4(mix(dark, light, uLight), mix(aDark, aLight, uLight));
}
`;

const dotTexture = (() => {
  let tex: THREE.CanvasTexture | null = null;
  return () => {
    if (tex) return tex;
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    tex = new THREE.CanvasTexture(c);
    return tex;
  };
})();

function buildGeometry(v: EmblemVariant): { geo: THREE.BufferGeometry; disp: number; edges: boolean } {
  switch (v) {
    case "knot":
      return { geo: new THREE.TorusKnotGeometry(0.62, 0.2, 200, 28, 2, 3), disp: 0.03, edges: false };
    case "orb":
      return { geo: new THREE.IcosahedronGeometry(0.95, 24), disp: 0.12, edges: false };
    case "crystal":
      return { geo: new THREE.OctahedronGeometry(1.0, 0), disp: 0, edges: true };
    case "torus":
      return { geo: new THREE.TorusGeometry(0.78, 0.3, 48, 120), disp: 0.04, edges: false };
    case "gem":
      return { geo: new THREE.DodecahedronGeometry(0.95, 0), disp: 0, edges: true };
    case "capsule":
      return { geo: new THREE.CapsuleGeometry(0.45, 0.9, 16, 48), disp: 0.05, edges: false };
    case "cube":
      return { geo: new THREE.BoxGeometry(1.2, 1.2, 1.2, 1, 1, 1), disp: 0, edges: true };
    case "cone":
      return { geo: new THREE.ConeGeometry(0.85, 1.5, 6, 1), disp: 0, edges: true };
    case "ring":
      return { geo: new THREE.TorusGeometry(0.85, 0.08, 24, 160), disp: 0.02, edges: false };
    case "tetra":
      return { geo: new THREE.TetrahedronGeometry(1.1, 0), disp: 0, edges: true };
    case "helix": {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 200; i++) {
        const t = i / 200;
        pts.push(new THREE.Vector3(Math.cos(t * Math.PI * 6) * 0.55, (t - 0.5) * 2, Math.sin(t * Math.PI * 6) * 0.55));
      }
      return { geo: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 300, 0.1, 16, false), disp: 0.02, edges: false };
    }
    case "stack":
      return { geo: new THREE.CylinderGeometry(0.9, 0.9, 0.22, 6, 1), disp: 0, edges: true };
  }
}

function EmblemScene({ variant, tint, host }: { variant: EmblemVariant; tint: Tint; host: RefObject<HTMLElement | null> }) {
  const group = useRef<THREE.Group>(null);
  const hover = useRef(0);
  const shown = useRef(0);
  const occluded = useRef(false);
  const frame = useRef(Math.floor(Math.random() * 8));
  const theme = useApp((s) => s.theme);

  const { geo, mat, edgeGeo, edgeMat, dust, dustMat } = useMemo(() => {
    const { geo, disp, edges } = buildGeometry(variant);
    const mat = new THREE.ShaderMaterial({
      vertexShader: holoVertex,
      fragmentShader: holoFragment,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: Math.random() * 10 },
        uHover: { value: 0 },
        uDisp: { value: disp },
        uLight: { value: 0 },
        uA: { value: new THREE.Color() },
        uB: { value: new THREE.Color() },
      },
    });
    const edgeGeo = edges ? new THREE.EdgesGeometry(geo) : null;
    const edgeMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.9 });
    const count = 160;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.05 + Math.random() * 0.2;
      pos.set([Math.cos(a) * r, (Math.random() - 0.5) * 0.18, Math.sin(a) * r], i * 3);
    }
    const dust = new THREE.BufferGeometry();
    dust.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.045, map: dotTexture(), transparent: true, opacity: 0.9, depthWrite: false });
    return { geo, mat, edgeGeo, edgeMat, dust, dustMat };
  }, [variant]);

  useEffect(() => () => {
    [geo, mat, edgeMat, dust, dustMat].forEach((d) => d.dispose());
    edgeGeo?.dispose();
  }, [geo, mat, edgeGeo, edgeMat, dust, dustMat]);

  useEffect(() => {
    const dark = theme === "dark";
    const pal = (dark ? palettes : palettesLight)[tint];
    mat.uniforms.uA.value.set(pal[0]);
    mat.uniforms.uB.value.set(pal[1]);
    mat.uniforms.uLight.value = dark ? 0 : 1;
    mat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
    mat.needsUpdate = true;
    edgeMat.color.set(dark ? pal[2] : pal[0]);
    dustMat.color.set(dark ? pal[1] : pal[0]);
  }, [theme, tint, mat, edgeMat, dustMat]);

  useFrame((state, delta) => {
    const g = group.current;
    const view = host.current;
    if (!g || !view) return;
    if (view.offsetParent === null) {
      // Host is display:none at this breakpoint; skip the work.
      g.visible = false;
      return;
    }
    const card = view.closest<HTMLElement>("[data-emblem-host]") ?? view;

    // The overlay canvas sits above the DOM, so hide the emblem whenever other content covers it
    // (stacked cards, the fixed header, the mobile menu...). Hit-testing is throttled to every 8th frame.
    if (++frame.current % 8 === 0) {
      const r = view.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (cx > 0 && cy > 0 && cx < innerWidth && cy < innerHeight) {
        const hit = document.elementFromPoint(cx, cy);
        occluded.current = !!hit && !card.contains(hit) && !hit.contains(card);
      }
    }

    const isHover = card.matches(":hover") ? 1 : 0;
    hover.current = THREE.MathUtils.damp(hover.current, isHover, 5, delta);
    shown.current = THREE.MathUtils.damp(shown.current, occluded.current ? 0 : 1, 10, delta);
    g.visible = shown.current > 0.02;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uHover.value = hover.current;
    g.rotation.y += delta * (0.35 + hover.current * 1.4);
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.25 + 0.35;
    g.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.06;
    g.scale.setScalar((0.86 + hover.current * 0.12) * shown.current);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4.4]} fov={35} />
      <group ref={group}>
        <mesh geometry={geo} material={mat} />
        {edgeGeo && <lineSegments geometry={edgeGeo} material={edgeMat} />}
        <points geometry={dust} material={dustMat} rotation={[0.3, 0, 0.1]} />
      </group>
    </>
  );
}

export function Emblem({
  variant,
  tint = "blue",
  className = "",
}: {
  variant: EmblemVariant;
  tint?: Tint;
  className?: string;
}) {
  const host = useRef<HTMLElement>(null);
  return (
    <View ref={host} className={className} aria-hidden>
      <EmblemScene variant={variant} tint={tint} host={host} />
    </View>
  );
}
