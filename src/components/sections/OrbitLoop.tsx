"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Pinned circular diagram: steps sit on an orbit and light up one by one as the user scrolls.
 * Falls back to a simple list on small screens.
 */
export function OrbitLoop({ steps, center, children }: { steps: string[]; center: ReactNode; children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const len = ring.current!.getTotalLength();
        gsap.set(ring.current, { strokeDasharray: len, strokeDashoffset: len });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(ring.current, { strokeDashoffset: len * (1 - self.progress) });
            setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [steps.length] },
  );

  const R = 42;
  return (
    <div ref={root} className="relative flex min-h-[100svh] items-center py-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>{children}</div>
        <div className="relative mx-auto hidden aspect-square w-full max-w-[min(30rem,70vh)] lg:block">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line-strong)" strokeWidth="0.3" strokeDasharray="0.6 1.4" />
            <circle ref={ring} cx="50" cy="50" r={R} fill="none" stroke="url(#orbit-g)" strokeWidth="0.6" strokeLinecap="round" />
            <defs>
              <linearGradient id="orbit-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#1769ff" />
                <stop offset="1" stopColor="#26c6da" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-[22%] grid place-items-center rounded-full glass-strong text-center">{center}</div>
          {steps.map((s, i) => {
            const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * R;
            const y = 50 + Math.sin(a) * R;
            const on = i <= active;
            return (
              <div key={s} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                <div
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-small font-medium backdrop-blur-xl transition-all duration-500 ${
                    on ? "border-cyan/60 bg-cyan/15 text-fg shadow-[0_0_40px_-6px_rgba(38,198,218,0.7)]" : "border-line bg-card text-muted"
                  } ${i === active ? "scale-110" : ""}`}
                >
                  <span className="font-mono text-label text-cyan">0{i + 1}</span>
                  {s}
                </div>
              </div>
            );
          })}
        </div>
        <ol className="grid gap-2 sm:grid-cols-2 lg:hidden">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-card glass px-5 py-3.5">
              <span className="font-mono text-label text-cyan">0{i + 1}</span>
              <span className="font-medium">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
