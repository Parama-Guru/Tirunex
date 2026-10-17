"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Pins its section on desktop and converts vertical scroll into horizontal travel of the track.
 * On small screens the track becomes a native horizontal swipe list.
 */
export function HorizontalScroll({ children, className = "", intro }: { children: ReactNode; className?: string; intro?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 48);
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        gsap.utils.toArray<HTMLElement>(el.children).forEach((card) => {
          gsap.from(card, {
            opacity: 0.25,
            scale: 0.92,
            rotateY: -12,
            transformPerspective: 1200,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true },
          });
        });
      });
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const el = track.current!;
        const onScroll = () => {
          const max = el.scrollWidth - el.clientWidth;
          if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? el.scrollLeft / max : 1})`;
        };
        onScroll();
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-20 ${className}`}>
      {intro}
      <div
        ref={track}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] sm:gap-5 lg:snap-none lg:overflow-visible lg:pl-[max(var(--gutter),calc((100vw-var(--container-site))/2))]"
      >
        {children}
      </div>
      <div className="container-site mt-8">
        <div className="h-px w-full bg-line">
          <div ref={bar} className="h-px origin-left bg-gradient-to-r from-blue via-cyan to-indigo" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
