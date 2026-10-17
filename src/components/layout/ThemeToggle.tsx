"use client";

import { flushSync } from "react-dom";
import { useApp, type Theme } from "@/lib/store";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useApp((s) => s.theme);
  const setTheme = useApp((s) => s.setTheme);
  const dark = theme === "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = dark ? "light" : "dark";
    const html = document.documentElement;
    const apply = () => {
      html.dataset.theme = next;
      try {
        localStorage.setItem("tirunex-theme", next);
      } catch {}
      flushSync(() => setTheme(next));
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) return apply();

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    html.style.setProperty("--tx", `${x}px`);
    html.style.setProperty("--ty", `${y}px`);
    html.style.setProperty("--tr", `${radius}px`);
    html.classList.add("theme-transition");
    const vt = document.startViewTransition(apply);
    vt.finished.finally(() => html.classList.remove("theme-transition"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
      data-cursor={dark ? "Light" : "Dark"}
      className={`group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full glass transition-colors hover:border-cyan/60 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-fg transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-45" aria-hidden>
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle
            cx={dark ? 17 : 30}
            cy={dark ? 7 : -6}
            r="6"
            fill="black"
            style={{ transition: "cx .6s cubic-bezier(.16,1,.3,1), cy .6s cubic-bezier(.16,1,.3,1)" }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r={dark ? 8 : 5}
          fill="currentColor"
          mask="url(#moon-mask)"
          style={{ transition: "r .6s cubic-bezier(.16,1,.3,1)" }}
        />
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ opacity: dark ? 0 : 1, transform: dark ? "scale(.4) rotate(-90deg)" : "none", transformOrigin: "12px 12px", transition: "all .6s cubic-bezier(.16,1,.3,1)" }}
        >
          <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6 6 6M18 18l1.4 1.4M4.6 19.4 6 18M18 6l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
