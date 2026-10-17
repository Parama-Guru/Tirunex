"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { getShape } from "@/lib/shapes";
import { simplexNoise, palettes, palettesLight } from "@/lib/glsl";
import { live, useApp } from "@/lib/store";

const vertex = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uSize;
uniform float uPixelRatio;
uniform float uVel;
uniform vec2 uMouse;
attribute vec3 aFrom;
attribute vec3 aTo;
attribute float aRand;
varying float vRand;
varying float vDepth;
varying float vMix;
${simplexNoise}
float easeInOut(float t){ return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }
void main(){
  float t = easeInOut(clamp((uMorph - aRand * 0.4) / 0.6, 0.0, 1.0));
  vec3 p = mix(aFrom, aTo, t);
  float swirl = sin(t * 3.14159);
  vec3 q = p * 0.35 + uTime * 0.08;
  vec3 n = vec3(snoise(q), snoise(q + 17.0), snoise(q + 41.0));
  p += n * (0.07 + swirl * 1.1 + min(abs(uVel), 3.0) * 0.12);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mv;
  vec2 ndc = clip.xy / clip.w;
  vec2 dm = ndc - uMouse;
  float infl = smoothstep(0.32, 0.0, length(dm));
  mv.xy += normalize(dm + 1e-4) * infl * 0.55;
  gl_Position = projectionMatrix * mv;
  float twinkle = 0.7 + 0.3 * sin(uTime * 2.2 + aRand * 60.0);
  gl_PointSize = uSize * (0.35 + aRand * 0.95) * twinkle * uPixelRatio * (8.0 / max(-mv.z, 0.5));
  vRand = aRand;
  vDepth = -mv.z;
  vMix = p.y * 0.22 + 0.5;
}
`;

const fragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
uniform float uLight;
varying float vRand;
varying float vDepth;
varying float vMix;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = pow(smoothstep(0.5, 0.0, d), mix(1.5, 1.1, uLight));
  vec3 col = mix(uColorA, uColorB, clamp(vMix + (vRand - 0.5) * 0.7, 0.0, 1.0));
  col = mix(col, uColorC, step(0.94, vRand));
  float fog = smoothstep(22.0, 3.5, vDepth) * smoothstep(0.4, 1.6, vDepth);
  gl_FragColor = vec4(col, a * uOpacity * fog);
}
`;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const gl = useThree((s) => s.gl);
  const shape = useApp((s) => s.scene.shape);
  const theme = useApp((s) => s.theme);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const initial = getShape("cloud", count);
    const target = getShape("sphere", count);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) rand[i] = Math.random();
    geo.setAttribute("position", new THREE.BufferAttribute(target.slice(), 3));
    geo.setAttribute("aFrom", new THREE.BufferAttribute(initial.slice(), 3));
    geo.setAttribute("aTo", new THREE.BufferAttribute(target.slice(), 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uSize: { value: 5.2 },
        uPixelRatio: { value: 1 },
        uVel: { value: 0 },
        uMouse: { value: new THREE.Vector2(9, 9) },
        uColorA: { value: new THREE.Color(palettes.blue[0]) },
        uColorB: { value: new THREE.Color(palettes.blue[1]) },
        uColorC: { value: new THREE.Color(palettes.blue[2]) },
        uOpacity: { value: 0.9 },
        uLight: { value: 0 },
      },
    });
    return { geometry: geo, material: mat };
  }, [count]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  // Morph: freeze the currently displayed positions into aFrom, then tween toward the new shape.
  useEffect(() => {
    const from = geometry.getAttribute("aFrom") as THREE.BufferAttribute;
    const to = geometry.getAttribute("aTo") as THREE.BufferAttribute;
    const rand = geometry.getAttribute("aRand") as THREE.BufferAttribute;
    const fa = from.array as Float32Array;
    const ta = to.array as Float32Array;
    const ra = rand.array as Float32Array;
    const m = material.uniforms.uMorph.value as number;
    for (let i = 0; i < count; i++) {
      const t = ease(Math.min(1, Math.max(0, (m - ra[i] * 0.4) / 0.6)));
      const j = i * 3;
      fa[j] += (ta[j] - fa[j]) * t;
      fa[j + 1] += (ta[j + 1] - fa[j + 1]) * t;
      fa[j + 2] += (ta[j + 2] - fa[j + 2]) * t;
    }
    ta.set(getShape(shape, count));
    from.needsUpdate = true;
    to.needsUpdate = true;
    material.uniforms.uMorph.value = 0;
    const tween = gsap.to(material.uniforms.uMorph, { value: 1, duration: 2.4, ease: "power2.inOut" });
    return () => {
      tween.kill();
    };
  }, [shape, count, geometry, material]);

  useEffect(() => {
    const dark = theme === "dark";
    material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
    material.needsUpdate = true;
    gsap.to(material.uniforms.uLight, { value: dark ? 0 : 1, duration: 0.8 });
    gsap.to(material.uniforms.uOpacity, { value: dark ? 0.9 : 0.75, duration: 0.8 });
    gsap.to(material.uniforms.uSize, { value: dark ? 5.2 : 3.6, duration: 0.8 });
  }, [theme, material]);

  const tmp = useMemo(() => new THREE.Color(), []);
  const tmpV = useMemo(() => new THREE.Vector2(), []);

  useFrame((state, delta) => {
    const u = material.uniforms;
    u.uTime.value += delta;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uVel.value = THREE.MathUtils.damp(u.uVel.value, live.velocity * 0.05, 4, delta);
    (u.uMouse.value as THREE.Vector2).lerp(tmpV.set(live.pointer.x, live.pointer.y), 1 - Math.exp(-6 * delta));
    const { scene, theme: th } = useApp.getState();
    const pal = (th === "dark" ? palettes : palettesLight)[scene.tint ?? "blue"];
    const k = 1 - Math.exp(-2.5 * delta);
    (u.uColorA.value as THREE.Color).lerp(tmp.set(pal[0]), k);
    (u.uColorB.value as THREE.Color).lerp(tmp.set(pal[1]), k);
    (u.uColorC.value as THREE.Color).lerp(tmp.set(pal[2]), k);
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
