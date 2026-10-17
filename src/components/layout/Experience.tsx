"use client";

import { useEffect, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { advance } from "@react-three/fiber";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { live, useApp, type Theme } from "@/lib/store";
import { setLenis, getLenis } from "@/lib/lenis";

const BackgroundCanvas = dynamic(() => import("@/components/three/BackgroundCanvas"), { ssr: false });
const OverlayCanvas = dynamic(() => import("@/components/three/OverlayCanvas"), { ssr: false });

/**
 * Client runtime shared by every page: Lenis smooth scroll, a single GSAP-driven frame loop
 * that also advances both WebGL canvases, pointer tracking and route-change housekeeping.
 */
export function Experience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const menuOpen = useApp((s) => s.menuOpen);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js");
    useApp.getState().setTheme((html.dataset.theme as Theme) || "dark");

    const reduced = prefersReducedMotion();
    const lenis = new Lenis({
      autoRaf: false,
      lerp: reduced ? 1 : 0.09,
      smoothWheel: !reduced,
      anchors: { offset: -90 },
    });
    setLenis(lenis);

    const onScroll = () => {
      live.scroll = lenis.scroll;
      live.velocity = lenis.velocity;
      live.progress = lenis.progress;
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
      if (!lenis.isScrolling) live.velocity *= 0.9;
      advance(time);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onPointer = (e: PointerEvent) => {
      live.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      live.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointer);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen]);

  // Reset scroll on navigation, honour hash targets, then re-measure every ScrollTrigger.
  useEffect(() => {
    const hash = window.location.hash;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash) {
        const target = document.querySelector<HTMLElement>(hash);
        if (target) getLenis()?.scrollTo(target, { offset: -90, duration: 1.4 });
      }
    }, 450);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <div className="backdrop" aria-hidden />
      <BackgroundCanvas />
      <OverlayCanvas />
      {children}
      <div className="grain" aria-hidden />
    </>
  );
}
