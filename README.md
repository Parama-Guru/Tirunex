# Tirunex — Immersive Website

A fully animated, scroll-driven website for Tirunex Systems, built with Next.js, three.js and GSAP.

**Live:** https://parama-guru.github.io/Tirunex/

## Stack

| Layer | Package |
| --- | --- |
| Framework | Next.js 16.4 (App Router, static export) + React 19.3 |
| 3D | three.js 0.186, @react-three/fiber 9.8, @react-three/drei 10.7 |
| Scroll & animation | GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3, Motion 14 |
| Styling / state | Tailwind CSS 4, Zustand 5 |

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm run lint
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the static export with `NEXT_PUBLIC_BASE_PATH=/Tirunex` and publishes `out/` to GitHub Pages. `scripts/fix-export.mjs` runs after `next build` and copies the route prefetch files to the flat names the Next 16 client requests.

## Design system

- **Fonts** – Instrument Sans (headings, 600 weight, 88% width), Geist (body), Geist Mono (labels), via `next/font/google`.
- **Fluid type scale** – Tailwind tokens in `src/app/globals.css`: `text-display`, `text-h1`, `text-h2`, `text-statement`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-label` (all `clamp()`, 320px → 1920px).
- **Layout** – `container-site` utility (90rem max + fluid gutter). On large monitors the root font size scales up so type, spacing and the container grow together.
- **Cards** – `rounded-card` for grid cards and `rounded-panel` for large panels; 3D emblems 80–112px.
- **Targets** – 320px phones to 3440px ultrawide; tap targets ≥ 44px; no text under 11px; light-theme accents meet WCAG AA.

## How it works

- **One frame loop** – `src/components/layout/Experience.tsx` drives Lenis, ScrollTrigger and both WebGL canvases from the GSAP ticker.
- **Background scene** – a 15k-particle GLSL field plus the "Tirunex AI" core; each `<Scene scene={…}>` section retargets shape, colour, position and zoom on scroll. Shapes live in `src/lib/shapes.ts`.
- **Emblems** – `<Emblem>` renders small 3D objects inside cards through drei `View` on one overlay canvas.
- **Declarative animations** – `src/lib/fx.ts` wires `data-split`, `data-reveal`, `data-highlight`, `data-parallax`, `data-counter`, `data-draw`, `data-tilt` and `data-magnetic`.
- **Theme** – dark/light toggle with a circular View Transition reveal, saved in `localStorage`.
- **Accessibility** – `prefers-reduced-motion` disables smooth scroll, reveals, the preloader and custom cursor.

## Contact form

There is no backend: the form validates input and opens the visitor's email client with a pre-filled message to `sales@tirunex.com`.
