import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary:
    "bg-blue text-white shadow-[0_10px_40px_-10px_rgba(23,105,255,0.8)] hover:shadow-[0_20px_60px_-10px_rgba(38,198,218,0.8)]",
  ghost: "glass text-fg hover:border-cyan/60",
  light: "bg-white text-ink hover:bg-cyan hover:text-ink",
};

function Arrow({ variant }: { variant: Variant }) {
  return (
    <span className={`relative grid h-7 w-7 place-items-center overflow-hidden rounded-full ${variant === "ghost" ? "bg-fg/10" : variant === "light" ? "bg-ink/10" : "bg-white/15"}`}>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-5 group-hover:-translate-y-5" aria-hidden>
        <path d="M4 12 12 4M5 4h7v7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <svg viewBox="0 0 16 16" className="absolute h-3.5 w-3.5 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden>
        <path d="M4 12 12 4M5 4h7v7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  hero = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  hero?: boolean;
}) {
  const cls = `group relative inline-flex items-center gap-3 rounded-full py-2.5 pl-6 pr-2.5 text-sm font-medium transition-[box-shadow,border-color,background-color,color] duration-500 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      <Arrow variant={variant} />
    </>
  );
  const fx = { "data-magnetic": "", "data-cursor": "Go", ...(hero ? { "data-reveal": "up", "data-hero": "" } : {}) };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...fx}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...fx}>
      {inner}
    </Link>
  );
}
