"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useApp, type SceneConfig } from "@/lib/store";

type Props = ComponentPropsWithoutRef<"section"> & { scene: SceneConfig; as?: "section" | "article" | "div" };

/** A page section that retargets the background 3D scene while it is in the middle of the viewport. */
export function Scene({ scene, as: Tag = "section", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const key = JSON.stringify(scene);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const config = JSON.parse(key) as SceneConfig;
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) useApp.getState().setScene(config);
        },
      });
    },
    { dependencies: [key] },
  );

  return (
    <Tag ref={ref as never} {...rest}>
      {children}
    </Tag>
  );
}
