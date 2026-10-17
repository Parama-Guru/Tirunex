"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} data-reveal>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
              >
                <span className="font-mono text-label text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <span className={`flex-1 font-display text-h3 font-medium transition-colors ${isOpen ? "text-fg" : "text-fg-soft group-hover:text-fg"}`}>
                  {item.q}
                </span>
                <span
                  className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    isOpen ? "rotate-45 border-cyan bg-cyan text-ink" : "border-line-strong text-fg"
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[65ch] pb-6 text-lead text-fg-soft sm:pb-8 sm:pl-12">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
