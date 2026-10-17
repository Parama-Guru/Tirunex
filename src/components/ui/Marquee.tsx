"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { live } from "@/lib/store";

/** Infinite marquee whose speed and direction react to scroll velocity. */
export function Marquee({ children, speed = 40, reverse = false, className = "" }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let x = 0;
      let dir = reverse ? 1 : -1;
      const tick = (_: number, dt: number) => {
        const half = el.scrollWidth / 2;
        const v = live.velocity;
        if (Math.abs(v) > 0.5) dir = (v > 0 ? -1 : 1) * (reverse ? -1 : 1);
        x += dir * (speed + Math.min(Math.abs(v) * 6, 400)) * (dt / 1000);
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        gsap.set(el, { x });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { dependencies: [speed, reverse] },
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={track} className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
