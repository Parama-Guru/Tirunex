"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis";

/** Sticky in-page navigation that highlights the section currently in view. */
export function ScrollSpy({ items, label = "On this page" }: { items: { id: string; label: string }[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <p className="mb-4 font-mono text-label uppercase tracking-[0.12em] text-muted">{label}</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  getLenis()?.scrollTo(`#${item.id}`, { offset: -110, duration: 1.4 });
                }}
                className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${on ? "border-cyan text-fg" : "border-transparent text-muted hover:text-fg"}`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
