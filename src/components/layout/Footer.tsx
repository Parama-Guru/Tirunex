"use client";

import { useRef } from "react";
import Link from "next/link";
import { footerConnect, footerExplore, site } from "@/lib/site";
import { useFX } from "@/lib/fx";
import { getLenis } from "@/lib/lenis";
import { Scene } from "./Scene";
import { Logo } from "./Header";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 min-w-11 items-center text-body text-fg-soft hover:text-fg">
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </Link>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useFX(ref);

  return (
    <footer ref={ref} className="relative mt-10 overflow-hidden">
      {/* core: 0 keeps the AI core from sitting behind the footer links. */}
      <Scene scene={{ shape: "tunnel", core: 0, x: 0, zoom: 5.5, tint: "aurora" }} className="relative py-20 sm:py-28">
        <div className="container-site">
          <div data-reveal="scale" className="relative overflow-hidden rounded-panel glass-strong px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(23,105,255,0.35),transparent)]" />
            <p className="eyebrow relative justify-center">Start a conversation</p>
            <h2 data-split className="relative mx-auto mt-5 max-w-[18ch] text-h1">
              Ready to Transform Your <span className="text-gradient">Business?</span>
            </h2>
            <p data-reveal className="relative mx-auto mt-5 max-w-[48ch] text-lead text-fg-soft">
              Bring together technology, AI, automation and talent with one trusted partner.
            </p>
            <div data-reveal className="relative mt-8 flex justify-center">
              <Button href="/contact#contact-form">Start a Conversation</Button>
            </div>
          </div>
        </div>
      </Scene>

      <Marquee className="border-y border-line py-5" speed={60}>
        {["Technology", "AI", "Automation", "Talent"].map((w) => (
          <span key={w} className="flex items-center gap-8 px-4 font-display text-h1 font-semibold text-fg/90">
            {w}
            <span className="text-cyan">+</span>
          </span>
        ))}
      </Marquee>

      <div className="relative pb-24 pt-16 sm:pb-8">
        <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div data-reveal className="sm:col-span-2 lg:col-span-1">
            <Logo className="h-8" />
            <p className="mt-5 max-w-sm font-display text-h3 text-fg">{site.footerLine}</p>
            <p className="mt-3 max-w-sm text-small text-muted">{site.motto}</p>
            <p className="mt-5 flex items-start gap-2 text-small text-fg-soft">
              <span aria-hidden>📍</span>
              {site.address}
            </p>
          </div>
          <div data-reveal>
            <h3 className="font-mono text-label uppercase text-muted">Explore</h3>
            <ul className="mt-4">
              {footerExplore.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <h3 className="font-mono text-label uppercase text-muted">Connect</h3>
            <ul className="mt-4">
              {footerConnect.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-body text-fg-soft hover:text-cyan">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex min-h-11 items-center text-body text-fg-soft hover:text-cyan">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-5">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-body text-fg-soft hover:text-cyan">
                  LinkedIn
                </a>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-body text-fg-soft hover:text-cyan">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="container-site pointer-events-none mt-12 select-none overflow-hidden">
          <p
            data-parallax="0.6"
            className="text-center font-display text-[20vw] font-bold leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_var(--line-strong)] lg:text-[15rem]"
          >
            TIRUNEX
          </p>
        </div>

        <div className="container-site mt-8">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-small text-muted sm:flex-row">
            <p className="text-center sm:text-left">© 2026 {site.legalName}. All rights reserved.</p>
            <p className="text-center font-mono text-label uppercase sm:text-left">{site.tagline}</p>
            <button
              type="button"
              onClick={() => getLenis()?.scrollTo(0, { duration: 2 })}
              className="grid h-11 w-11 place-items-center rounded-full glass text-base hover:border-cyan/60"
              aria-label="Back to top"
              data-cursor="Top"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
