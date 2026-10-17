import type { SceneShape } from "./store";

const TAU = Math.PI * 2;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Gen = (n: number, r: () => number) => Float32Array;

const gaussian = (r: () => number) => {
  const u = 1 - r();
  const v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
};

const sphere: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const shell = r() < 0.82 ? 2.3 + gaussian(r) * 0.04 : 2.3 + r() * 1.6;
    out.set([Math.cos(th) * rad * shell, y * shell, Math.sin(th) * rad * shell], i * 3);
  }
  return out;
};

const galaxy: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  const arms = 4;
  for (let i = 0; i < n; i++) {
    const d = Math.pow(r(), 1.6) * 4.6;
    const arm = ((i % arms) / arms) * TAU;
    const spin = d * 1.15;
    const s = Math.pow(r(), 3) * (r() < 0.5 ? 1 : -1) * 0.5 * (1 + d * 0.2);
    out.set(
      [
        Math.cos(arm + spin) * d + s,
        gaussian(r) * 0.12 * (1.4 - d / 4.6),
        Math.sin(arm + spin) * d + Math.pow(r(), 3) * (r() < 0.5 ? 1 : -1) * 0.5,
      ],
      i * 3,
    );
  }
  return out;
};

const knot: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  const p = 2;
  const q = 3;
  for (let i = 0; i < n; i++) {
    const t = r() * TAU;
    const rr = Math.cos(q * t) + 2;
    const cx = rr * Math.cos(p * t);
    const cy = rr * Math.sin(p * t);
    const cz = -Math.sin(q * t);
    const a = r() * TAU;
    const tube = 0.28 + gaussian(r) * 0.03;
    out.set([cx * 0.85 + Math.cos(a) * tube, cy * 0.85 + Math.sin(a) * tube, cz * 0.85 + Math.cos(a + t) * tube], i * 3);
  }
  return out;
};

const helix: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = r();
    const y = (t - 0.5) * 9;
    const ang = t * TAU * 3.2;
    const kind = r();
    let x: number, z: number;
    if (kind < 0.42) {
      x = Math.cos(ang) * 1.3;
      z = Math.sin(ang) * 1.3;
    } else if (kind < 0.84) {
      x = Math.cos(ang + Math.PI) * 1.3;
      z = Math.sin(ang + Math.PI) * 1.3;
    } else {
      // Rungs connecting both strands.
      const rung = Math.round(t * 46) / 46;
      const ra = rung * TAU * 3.2;
      const k = r() * 2 - 1;
      x = Math.cos(ra) * 1.3 * k;
      z = Math.sin(ra) * 1.3 * k;
    }
    out.set([x + gaussian(r) * 0.05, y, z + gaussian(r) * 0.05], i * 3);
  }
  return out;
};

const terrain: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  const side = Math.ceil(Math.sqrt(n));
  for (let i = 0; i < n; i++) {
    const gx = (i % side) / side - 0.5;
    const gz = Math.floor(i / side) / side - 0.5;
    const x = gx * 14;
    const z = gz * 14;
    const y = Math.sin(x * 0.7) * 0.35 + Math.cos(z * 0.9 + x * 0.3) * 0.35 + (r() - 0.5) * 0.02;
    out.set([x, y - 1.6, z], i * 3);
  }
  return out;
};

const network: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  const nodes: number[][] = [];
  for (let k = 0; k < 14; k++) {
    const th = r() * TAU;
    const ph = Math.acos(2 * r() - 1);
    const d = 1.4 + r() * 1.8;
    nodes.push([Math.sin(ph) * Math.cos(th) * d, Math.cos(ph) * d * 0.8, Math.sin(ph) * Math.sin(th) * d]);
  }
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    const sorted = nodes
      .map((b, j) => [j, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])] as const)
      .filter(([j]) => j !== i)
      .sort((x, y) => x[1] - y[1]);
    edges.push([i, sorted[0][0]], [i, sorted[1][0]], [i, sorted[2][0]]);
  });
  for (let i = 0; i < n; i++) {
    if (r() < 0.45) {
      const c = nodes[Math.floor(r() * nodes.length)];
      const s = 0.22;
      out.set([c[0] + gaussian(r) * s, c[1] + gaussian(r) * s, c[2] + gaussian(r) * s], i * 3);
    } else {
      const [a, b] = edges[Math.floor(r() * edges.length)];
      const t = r();
      const A = nodes[a];
      const B = nodes[b];
      out.set(
        [A[0] + (B[0] - A[0]) * t + gaussian(r) * 0.02, A[1] + (B[1] - A[1]) * t + gaussian(r) * 0.02, A[2] + (B[2] - A[2]) * t + gaussian(r) * 0.02],
        i * 3,
      );
    }
  }
  return out;
};

const lattice: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  const s = 2.1;
  for (let i = 0; i < n; i++) {
    // Points distributed along the edges of a 3x3x3 cube grid.
    const axis = Math.floor(r() * 3);
    const a = (Math.floor(r() * 4) / 3) * 2 - 1;
    const b = (Math.floor(r() * 4) / 3) * 2 - 1;
    const t = r() * 2 - 1;
    const p = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
    out.set([p[0] * s + gaussian(r) * 0.015, p[1] * s + gaussian(r) * 0.015, p[2] * s + gaussian(r) * 0.015], i * 3);
  }
  return out;
};

const rings: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  const tilts = [
    [0, 0],
    [Math.PI / 2.6, 0.3],
    [-Math.PI / 3.2, 1.2],
    [Math.PI / 2, 2.1],
  ];
  for (let i = 0; i < n; i++) {
    const ring = i % 5;
    if (ring === 4) {
      const v = [gaussian(r), gaussian(r), gaussian(r)];
      const l = Math.hypot(v[0], v[1], v[2]);
      const d = 0.7 + r() * 0.15;
      out.set([(v[0] / l) * d, (v[1] / l) * d, (v[2] / l) * d], i * 3);
      continue;
    }
    const rad = 1.6 + ring * 0.55 + gaussian(r) * 0.03;
    const a = r() * TAU;
    let x = Math.cos(a) * rad;
    let y = 0;
    let z = Math.sin(a) * rad;
    const [tx, ty] = tilts[ring];
    const y1 = y * Math.cos(tx) - z * Math.sin(tx);
    const z1 = y * Math.sin(tx) + z * Math.cos(tx);
    y = y1;
    z = z1;
    const x2 = x * Math.cos(ty) + z * Math.sin(ty);
    const z2 = -x * Math.sin(ty) + z * Math.cos(ty);
    x = x2;
    z = z2;
    out.set([x, y, z], i * 3);
  }
  return out;
};

const shield: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const kind = r();
    if (kind < 0.7) {
      // Hexagonal dome
      const th = r() * TAU;
      const ph = Math.acos(r());
      const d = 2.6;
      const hex = Math.round(th / (TAU / 6)) * (TAU / 6);
      const snap = r() < 0.35 ? hex : th;
      out.set([Math.sin(ph) * Math.cos(snap) * d, Math.cos(ph) * d - 0.8, Math.sin(ph) * Math.sin(snap) * d], i * 3);
    } else {
      // Inner protected core
      const v = [gaussian(r), gaussian(r), gaussian(r)];
      const l = Math.hypot(v[0], v[1], v[2]);
      const d = 0.9 * Math.cbrt(r());
      out.set([(v[0] / l) * d, (v[1] / l) * d, (v[2] / l) * d], i * 3);
    }
  }
  return out;
};

const wave: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = r();
    const lane = Math.floor(r() * 6);
    const x = (t - 0.5) * 13;
    const phase = lane * 0.5;
    const y = Math.sin(x * 0.6 + phase) * (0.6 + lane * 0.12) + (lane - 2.5) * 0.18;
    const z = Math.cos(x * 0.4 + phase) * 0.8 + (lane - 2.5) * 0.25;
    out.set([x, y + gaussian(r) * 0.04, z + gaussian(r) * 0.04], i * 3);
  }
  return out;
};

const tunnel: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = r() * TAU;
    const z = -r() * 22 + 4;
    const rad = 2.8 + gaussian(r) * 0.08;
    const seg = Math.round(z * 1.5) / 1.5;
    const zz = r() < 0.5 ? seg : z;
    out.set([Math.cos(a) * rad, Math.sin(a) * rad, zz], i * 3);
  }
  return out;
};

const cloud: Gen = (n, r) => {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    out.set([(r() - 0.5) * 18, (r() - 0.5) * 11, (r() - 0.5) * 10 - 2], i * 3);
  }
  return out;
};

const generators: Record<SceneShape, Gen> = {
  sphere,
  galaxy,
  knot,
  helix,
  terrain,
  network,
  lattice,
  rings,
  shield,
  wave,
  tunnel,
  cloud,
};

const cache = new Map<string, Float32Array>();

export function getShape(shape: SceneShape, n: number) {
  const key = `${shape}:${n}`;
  let arr = cache.get(key);
  if (!arr) {
    arr = generators[shape](n, rng(shape.length * 9973 + n));
    cache.set(key, arr);
  }
  return arr;
}
