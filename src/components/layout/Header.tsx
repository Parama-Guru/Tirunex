"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { asset, nav, site } from "@/lib/site";
import { useApp } from "@/lib/store";
import { getLenis } from "@/lib/lenis";
import { magnetize } from "@/lib/fx";
import { ThemeToggle } from "./ThemeToggle";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block ${className}`}>
      <Image src={asset("/brand/tirunex-logo-white.png")} alt={site.legalName} width={850} height={143} priority className="hidden h-full w-auto dark:block" />
      <Image src={asset("/brand/tirunex-logo.png")} alt={site.legalName} width={850} height={143} priority className="block h-full w-auto dark:hidden" />
    </span>
  );
}

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Header() {
  const pathname = usePathname();
  const menuOpen = useApp((s) => s.menuOpen);
  const setMenuOpen = useApp((s) => s.setMenuOpen);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cta = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let last = 0;
    let raf = 0;
    const check = () => {
      const y = getLenis()?.scroll ?? window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 320);
        last = y;
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    if (!cta.current || !window.matchMedia("(hover: hover)").matches) return;
    return magnetize(cta.current, 0.25);
  }, []);

  return (
    <>
      <header
        data-vt-header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-expo)] ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-site pt-3">
          <div
            className={`flex h-16 items-center justify-between gap-4 rounded-full px-4 transition-all duration-700 ease-[var(--ease-expo)] sm:px-6 ${
              scrolled || menuOpen ? "glass-strong shadow-[var(--shadow)]" : "border border-transparent"
            }`}
          >
            <Link href="/" aria-label="Tirunex home" className="relative z-10 flex min-h-11 shrink-0 items-center" data-cursor="Home">
              <Logo className="h-7 sm:h-8" />
            </Link>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`group relative flex items-center rounded-full px-3 py-2.5 text-small font-medium transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`}
                      >
                        <span className="roll">
                          <span>{item.label}</span>
                          <span aria-hidden>{item.label}</span>
                        </span>
                        {active && (
                          <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative z-10 flex items-center gap-2">
              <ThemeToggle />
              <Link
                ref={cta}
                href="/contact#contact-form"
                data-cursor="Talk"
                className="group hidden min-h-11 items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-small font-medium text-white shadow-[0_10px_30px_-10px_rgba(23,105,255,0.9)] sm:inline-flex"
              >
                <span className="roll">
                  <span>Talk to an Expert</span>
                  <span aria-hidden>Talk to an Expert</span>
                </span>
                <span aria-hidden>↗</span>
              </Link>
              <button
                type="button"
                className="relative grid h-11 w-11 place-items-center rounded-full glass xl:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className={`absolute h-[1.5px] w-4 bg-fg transition-transform duration-500 ${menuOpen ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span className={`absolute h-[1.5px] w-4 bg-fg transition-transform duration-500 ${menuOpen ? "-rotate-45" : "translate-y-[4px]"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-bg/95 backdrop-blur-xl xl:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="container-site flex min-h-full flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-baseline gap-4 py-1 font-display text-[clamp(2rem,1.4rem+3vw,3rem)] font-semibold leading-tight ${
                          isActive(pathname, item.href) ? "text-gradient" : "text-fg"
                        }`}
                      >
                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 grid gap-2 text-sm text-muted"
              >
                <a href={`mailto:${site.email}`} className="hover:text-fg">
                  {site.email}
                </a>
                <a href={site.phoneHref} className="hover:text-fg">
                  {site.phone}
                </a>
                <Link href="/contact#contact-form" className="mt-4 inline-flex w-fit rounded-full bg-blue px-6 py-3 font-medium text-white">
                  Talk to an Expert ↗
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
