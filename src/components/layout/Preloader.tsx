"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/lib/store";
import { asset } from "@/lib/site";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const setReady = useApp((s) => s.setReady);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    const obj = { v: 0 };
    let seen = false;
    try {
      seen = sessionStorage.getItem("tirunex-intro") === "1";
      sessionStorage.setItem("tirunex-intro", "1");
    } catch {}
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });
    tl.from(".pl-word span", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.04 }, 0)
      .to(
        obj,
        {
          v: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(obj.v);
            if (count.current) count.current.textContent = String(v).padStart(3, "0");
            if (bar.current) bar.current.style.transform = `scaleX(${obj.v / 100})`;
          },
        },
        0,
      )
      .to(".pl-word span", { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.03 }, ">-0.1")
      .add(() => setReady(true), "-=0.2")
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, ">-0.25");
    // Returning visitors in the same session get a near-instant reveal.
    if (seen) tl.timeScale(4);
    return () => {
      tl.kill();
    };
  }, [setReady, reduced]);

  if (done || reduced) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#030812] p-6 text-white sm:p-10"
      style={{ clipPath: "inset(0 0 0 0)" }}
      aria-hidden
    >
      <div className="flex items-center justify-between font-mono text-label uppercase tracking-[0.12em] text-white/50">
        <span>Tirunex Systems</span>
        <span>Initialising core</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="pl-word overflow-hidden">
          <span className="block">
            <Image src={asset("/brand/tirunex-logo-white.png")} alt="" width={850} height={143} priority className="h-10 w-auto sm:h-14" />
          </span>
        </div>
        <div className="pl-word flex flex-wrap justify-center gap-x-3 gap-y-1 overflow-hidden font-mono text-label uppercase tracking-[0.12em] text-cyan">
          {["Technology", "+", "AI", "+", "Automation", "+", "Talent"].map((w, i) => (
            <span key={i} className="block">
              {w}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between">
          <span ref={count} className="font-display text-display font-semibold tabular-nums">
            000
          </span>
          <span className="font-mono text-label uppercase tracking-[0.12em] text-white/50">Loading experience</span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div ref={bar} className="h-px origin-left bg-gradient-to-r from-blue via-cyan to-indigo" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
