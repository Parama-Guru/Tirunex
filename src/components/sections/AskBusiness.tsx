"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type Department = { name: string; text: string };

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setN((v) => {
        if (v + 2 >= text.length) window.clearInterval(id);
        return Math.min(v + 2, text.length);
      });
    }, 24);
    return () => window.clearInterval(id);
  }, [text]);
  return <>{text.slice(0, n)}</>;
}

/** Enterprise assistant demo: pick a department and the assistant "types" what it can answer. */
export function AskBusiness({ items }: { items: Department[] }) {
  const [i, setI] = useState(0);
  const current = items[i];

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div role="tablist" aria-label="Departments" className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
        {items.map((d, idx) => (
          <button
            key={d.name}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
            className={`group relative shrink-0 rounded-2xl border px-5 py-4 text-left transition-colors ${
              idx === i ? "border-cyan/50 text-fg" : "border-line text-muted hover:text-fg"
            }`}
          >
            {idx === i && <motion.span layoutId="dept-bg" className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue/20 to-cyan/10" />}
            <span className="font-mono text-label text-cyan">0{idx + 1}</span>
            <span className="ml-3 font-medium">{d.name}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="relative min-h-[340px] overflow-hidden rounded-card glass-strong p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue to-cyan font-display text-sm font-bold text-white">AI</span>
          <div>
            <p className="text-sm font-semibold">Tirunex Enterprise Assistant</p>
            <p className="font-mono text-label uppercase tracking-[0.12em] text-green">Connected to approved business data</p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-blue px-4 py-3 text-sm text-white">
              What can you help {current.name === "Management" ? "management" : `the ${current.name} team`} with?
            </div>
            <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-card px-4 py-3 text-sm text-fg">
              <p className="font-mono text-label uppercase tracking-[0.12em] text-cyan">{current.name}</p>
              <p className="mt-2 text-base">
                <Typewriter key={current.name} text={current.text} />
                <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-cyan" />
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
