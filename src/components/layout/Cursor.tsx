"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });
    let hovering: Element | null = null;
    let seen = false;

    const move = (e: PointerEvent) => {
      if (!seen) {
        seen = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const target = (e.target as Element | null)?.closest?.("a, button, [data-cursor], input, textarea, select, summary, label");
      if (target !== hovering) {
        hovering = target ?? null;
        const text = target?.getAttribute("data-cursor") ?? "";
        setLabel(text);
        const isField = !!target?.matches("input, textarea, select");
        gsap.to(ring.current, {
          scale: target ? (text ? 2.6 : 1.7) : 1,
          opacity: isField ? 0 : 1,
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.3 });
      }
    };
    const down = () => gsap.to(ring.current, { scale: "-=0.3", duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: hovering ? 1.7 : 1, duration: 0.4 });
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    document.documentElement.classList.add("has-cursor");
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150] mix-blend-difference">
      <div ref={dot} className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white opacity-0" />
      <div ref={ring} className="absolute left-0 top-0 -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full border border-white/80 opacity-0">
        <span className="font-mono text-[5px] uppercase tracking-[0.2em] text-white">{label}</span>
      </div>
    </div>
  );
}
