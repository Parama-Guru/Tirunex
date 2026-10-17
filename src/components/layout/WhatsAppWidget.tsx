"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";
import { getLenis } from "@/lib/lenis";

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);

  // Tuck the button away while scrolling down so it never covers content being read.
  useEffect(() => {
    let last = 0;
    let raf = 0;
    const check = () => {
      const y = getLenis()?.scroll ?? window.scrollY;
      if (Math.abs(y - last) > 8) {
        setTucked(y > last && y > 300);
        last = y;
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-[45] flex flex-col items-end gap-3 transition-transform duration-500 ease-[var(--ease-expo)] sm:bottom-5 sm:right-5 ${
        tucked && !open ? "translate-y-[calc(100%+2rem)]" : ""
      }`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(300px,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-3xl glass-strong shadow-[var(--shadow)]"
            role="dialog"
            aria-label="Chat with Tirunex on WhatsApp"
          >
            <div className="flex items-center justify-between bg-[#0b5c4a] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 font-display text-sm font-semibold">T</span>
                <div>
                  <p className="text-sm font-semibold">Tirunex Systems</p>
                  <p className="text-label text-white/75">Online • Replies within minutes</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/15">
                ×
              </button>
            </div>
            <div className="space-y-3 p-4">
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-card-strong p-3 text-sm text-fg shadow-sm">
                <p>Hello! 👋 Welcome to Tirunex Systems.</p>
                <p className="mt-1 text-fg-soft">How can we assist you today with AI, business technology, or workforce solutions?</p>
                <p className="mt-1 text-right text-label text-muted">Just now</p>
              </div>
              <a
                href={site.whatsappHello}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-semibold text-[#062b1c] transition-transform hover:scale-[1.02]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us on WhatsApp"
        aria-expanded={open}
        data-cursor="Chat"
        className="relative grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,0.8)] transition-transform hover:scale-110 sm:h-14 sm:w-14"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.1c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3Zm0 23.2c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.2 1.3-4-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.5 9.9 10.2 5.3 16 5.3s10.5 4.6 10.5 10.4S21.8 26.2 16 26.2Zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.9-1.7-2.2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5.1 2.8 1.1 3.4.9 4 .8.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.3Z" />
        </svg>
      </button>
    </div>
  );
}
