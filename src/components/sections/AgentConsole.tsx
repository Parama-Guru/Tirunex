"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const tasks = ["Qualifying a new sales lead", "Processing supplier documents", "Preparing a management report", "Coordinating the next workflow"];

/** Simulated agent console that works through the business tasks while in view. */
export function AgentConsole() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top 85%", end: "bottom 10%", onToggle: (s) => setRunning(s.isActive) });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((a) => (a + 1) % tasks.length);
          return 0;
        }
        return p + 4;
      });
    }, 60);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <div ref={root} className="relative overflow-hidden rounded-card glass-strong p-1 shadow-[var(--shadow)]">
      <div className="flex items-center justify-between gap-3 rounded-t-[24px] border-b border-line px-4 py-3 sm:px-5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="hidden font-mono text-label uppercase tracking-[0.12em] text-muted sm:inline">tirunex.agent / live</span>
        <span className="flex items-center gap-2 font-mono text-label uppercase tracking-[0.12em] text-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" /> Running
        </span>
      </div>
      <ol className="space-y-1.5 p-3 sm:space-y-2 sm:p-5">
        {tasks.map((t, i) => {
          const done = i < active;
          const now = i === active;
          return (
            <li
              key={t}
              className={`relative overflow-hidden rounded-xl border px-3 py-2.5 transition-all duration-500 sm:rounded-2xl sm:px-4 sm:py-3.5 ${
                now ? "border-cyan/50 bg-cyan/10" : "border-line bg-transparent"
              }`}
            >
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <span className={`font-mono text-label ${now ? "text-cyan" : "text-muted"}`}>0{i + 1}</span>
                <span className={`flex-1 text-small sm:text-body ${now || done ? "text-fg" : "text-muted"}`}>{t}</span>
                <span className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                  {done ? <span className="text-green">✓ done</span> : now ? `${progress}%` : "queued"}
                </span>
              </div>
              {now && <span className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue/25 to-cyan/25" style={{ width: `${progress}%` }} />}
            </li>
          );
        })}
      </ol>
      <div className="border-t border-line px-5 py-3 font-mono text-label text-muted">
        <span className="text-cyan">›</span> agent.execute(&quot;{tasks[active]}&quot;)<span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-cyan" />
      </div>
    </div>
  );
}
