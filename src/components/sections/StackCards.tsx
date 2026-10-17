"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Cards pin one after another; each earlier card recedes as the next slides over it. */
export function StackCards({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.9,
            "--dim": 0.7,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 85%",
              end: "top 20%",
              scrub: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative space-y-4 md:space-y-8">
      {children}
    </div>
  );
}
