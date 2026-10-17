"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Styled, accessible replacement for a native <select>; submits through a hidden input. */
export function Select({
  name,
  label,
  options,
  placeholder,
  required,
  error,
}: {
  name: string;
  label: string;
  options: string[];
  placeholder: string;
  required?: boolean;
  error?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (v: string) => {
    setValue(v);
    setOpen(false);
  };

  const onKey = (e: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " ", "Escape", "Home", "End"].includes(e.key)) e.preventDefault();
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      setActive(Math.max(0, options.indexOf(value)));
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") setActive((a) => Math.min(options.length - 1, a + 1));
    if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
    if (e.key === "Home") setActive(0);
    if (e.key === "End") setActive(options.length - 1);
    if (e.key === "Enter" || e.key === " ") choose(options[active]);
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-describedby={error ? `${id}-err` : undefined}
        onClick={() => {
          setActive(Math.max(0, options.indexOf(value)));
          setOpen((o) => !o);
        }}
        onKeyDown={onKey}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-card px-4 pb-3 pt-6 text-left text-body transition-colors hover:border-line-strong focus:border-cyan focus:bg-card-strong focus:outline-none ${
          open ? "border-cyan bg-card-strong" : error ? "border-[#ff6b81]/70" : "border-line"
        }`}
      >
        <span className="pointer-events-none absolute left-4 top-2 text-[0.75rem] text-muted">
          {label}
          {required && " *"}
        </span>
        <span className={value ? "text-fg" : "text-muted"}>{value || placeholder}</span>
        <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180 text-cyan" : ""}`} aria-hidden>
          <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={list}
            id={`${id}-list`}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 max-h-64 origin-top overflow-y-auto overscroll-contain rounded-2xl border border-line-strong bg-bg-2/95 p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            {options.map((o, i) => {
              const selected = o === value;
              return (
                <li
                  key={o}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => choose(o)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-body transition-colors ${
                    i === active ? "bg-cyan/12 text-fg" : "text-fg-soft"
                  }`}
                >
                  {o}
                  {selected && (
                    <svg viewBox="0 0 16 16" className="h-4 w-4 text-cyan" aria-hidden>
                      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 pl-1 text-small text-[#ff6b81]">
          {error}
        </p>
      )}
    </div>
  );
}
