"use client";

import { type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/lib/store";

/**
 * Attribute-driven animation layer applied to a container:
 *  data-split[="hero"]   heading lines rise out of masks
 *  data-reveal[="up|fade|scale|left|right|stagger"] (+ data-hero for intro timing)
 *  data-highlight        words brighten as the paragraph is scrolled
 *  data-parallax="n"     vertical parallax (n = strength)
 *  data-counter="n"      count up to n
 *  data-draw             SVG strokes draw with scroll
 *  data-tilt             3D tilt + spotlight on pointer
 *  data-magnetic         element is attracted to the pointer
 */
export function useFX(scope: RefObject<HTMLElement | null>) {
  const ready = useApp((s) => s.ready);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !ready) return;
      const reduced = prefersReducedMotion();
      const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & Element>(sel)) as T[];

      if (reduced) {
        gsap.set(q("[data-reveal], [data-split]"), { opacity: 1 });
        q<HTMLElement>("[data-counter]").forEach((el) => (el.textContent = el.dataset.counter ?? ""));
        return;
      }

      let heroDelay = 0.15;

      q<HTMLElement>("[data-split]").forEach((el) => {
        const hero = el.dataset.split === "hero";
        const delay = hero ? heroDelay : 0;
        if (hero) heroDelay += 0.12;
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { opacity: 1 });
            return gsap.from(self.lines, {
              yPercent: 115,
              rotate: 3,
              transformOrigin: "0% 100%",
              duration: 1.4,
              ease: "expo.out",
              stagger: 0.09,
              delay,
              scrollTrigger: hero ? undefined : { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      });

      q<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const hero = el.hasAttribute("data-hero");
        const delay = hero ? (heroDelay += 0.1) + 0.2 : Number(el.dataset.delay ?? 0);
        const st = hero ? undefined : { trigger: el, start: "top 90%", once: true };
        if (kind === "stagger") {
          gsap.set(el, { opacity: 1 });
          gsap.from(el.children, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.07, delay, scrollTrigger: st });
          return;
        }
        const from: gsap.TweenVars =
          kind === "fade"
            ? { opacity: 0 }
            : kind === "scale"
              ? { opacity: 0, scale: 0.88, y: 40 }
              : kind === "left"
                ? { opacity: 0, x: -70 }
                : kind === "right"
                  ? { opacity: 0, x: 70 }
                  : { opacity: 0, y: 60 };
        gsap.fromTo(el, from, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.3, ease: "expo.out", delay, scrollTrigger: st });
      });

      q<HTMLElement>("[data-highlight]").forEach((el) => {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.14 },
              { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true } },
            );
          },
        });
      });

      q<HTMLElement>("[data-parallax]").forEach((el) => {
        const s = Number(el.dataset.parallax || 1);
        gsap.fromTo(
          el,
          { yPercent: 12 * s },
          { yPercent: -12 * s, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      q<HTMLElement>("[data-counter]").forEach((el) => {
        const raw = el.dataset.counter ?? "0";
        const target = parseFloat(raw);
        const decimals = (raw.split(".")[1] ?? "").length;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });

      q<SVGGeometryElement>("[data-draw]").forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        const trigger = path.closest("[data-draw-trigger]") ?? path;
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger, start: "top 70%", end: "bottom 60%", scrub: 1 },
        });
      });

      const cleanups: (() => void)[] = [];

      if (window.matchMedia("(hover: hover)").matches) {
        q<HTMLElement>("[data-tilt]").forEach((el) => {
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
          gsap.set(el, { transformPerspective: 900 });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            el.style.setProperty("--mx", `${px * 100}%`);
            el.style.setProperty("--my", `${py * 100}%`);
            rx((0.5 - py) * 8);
            ry((px - 0.5) * 10);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });

        q<HTMLElement>("[data-magnetic]").forEach((el) => cleanups.push(magnetize(el)));
      }

      ScrollTrigger.refresh();
      return () => cleanups.forEach((fn) => fn());
    },
    { scope, dependencies: [ready], revertOnUpdate: true },
  );
}

export function magnetize(el: HTMLElement, strength = 0.35) {
  const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  return () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", leave);
  };
}
