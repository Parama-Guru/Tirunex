import Link from "next/link";
import type { ReactNode } from "react";
import { Scene } from "@/components/layout/Scene";
import type { SceneConfig } from "@/lib/store";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
}) {
  if (align === "split") {
    return (
      <div className={`grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-10 ${className}`}>
        <div>
          <p data-reveal className="eyebrow">
            {eyebrow}
          </p>
          <h2 data-split className="mt-4 max-w-[22ch] text-h2">
            {title}
          </h2>
        </div>
        {text && (
          <p data-reveal className="max-w-[46ch] text-lead text-fg-soft md:justify-self-end">
            {text}
          </p>
        )}
      </div>
    );
  }
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-4xl ${className}`}>
      <p data-reveal className={`eyebrow ${center ? "justify-center" : ""}`}>
        {eyebrow}
      </p>
      <h2 data-split className={`mt-4 max-w-[22ch] text-h2 ${center ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {text && (
        <p data-reveal className={`mt-5 max-w-[60ch] text-lead text-fg-soft ${center ? "mx-auto" : ""}`}>
          {text}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  crumb,
  eyebrow,
  title,
  text,
  actions,
  scene,
  aside,
  children,
  compact = false,
}: {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  actions?: ReactNode;
  scene: SceneConfig;
  aside?: ReactNode;
  children?: ReactNode;
  /** Shorter hero for text-light pages (contact, FAQ, legal, about). */
  compact?: boolean;
}) {
  return (
    <Scene scene={scene} className={`relative flex flex-col justify-center pt-28 sm:pt-32 ${compact ? "min-h-[62svh] pb-12" : "min-h-[100svh] pb-20"}`}>
      <div className="container-site grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div>
          <nav aria-label="Breadcrumb" data-reveal="fade" data-hero className="mb-5 font-mono text-label uppercase text-muted">
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-fg">
              Home
            </Link>
            <span className="mx-2 text-cyan">/</span>
            <span className="text-fg">{crumb}</span>
          </nav>
          <p data-reveal data-hero className="eyebrow">
            {eyebrow}
          </p>
          <h1 data-split="hero" className="mt-5 max-w-[18ch] text-h1">
            {title}
          </h1>
          <p data-reveal data-hero className="mt-6 max-w-[60ch] text-lead text-fg-soft">
            {text}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside && <div className="relative hidden lg:block">{aside}</div>}
      </div>
      {children}
      {!compact && <ScrollCue />}
    </Scene>
  );
}

export function ScrollCue() {
  return (
    <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
      <span className="font-mono text-label uppercase text-muted">Scroll</span>
      <span className="relative h-10 w-px overflow-hidden bg-line">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-cyan" />
      </span>
    </div>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-chip px-3 py-1.5 text-small text-fg-soft ${className}`}>
      {children}
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-site ${className}`}>{children}</div>;
}
