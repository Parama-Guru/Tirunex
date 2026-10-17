"use client";

import { useRef, ViewTransition, type ReactNode } from "react";
import { useFX } from "@/lib/fx";

/** Wraps every route: page-level view transition + attribute-driven animations. */
export function Page({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useFX(ref);
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div ref={ref} id="main" className="relative">
        {children}
      </div>
    </ViewTransition>
  );
}
