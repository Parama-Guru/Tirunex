import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";
import { Container, PageHero, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Emblem } from "@/components/three/Emblem";

export const metadata: Metadata = {
  title: "About Tirunex | Technology & Talent Solutions",
  description: "Learn how Tirunex helps growing businesses adopt practical technology, AI, automation and workforce solutions.",
};

const values: { title: string; text: string; icon: IconName }[] = [
  { title: "Customer First", text: "We prioritize your operational goals and business realities to deliver practical, high-impact results.", icon: "handshake" },
  { title: "Innovation with Purpose", text: "We apply AI and modern technology where it solves real business friction, not for empty buzzwords.", icon: "spark" },
  { title: "Trust & Transparency", text: "Clear communication, predictable pricing, and collaborative milestones with no hidden dependencies.", icon: "eye" },
  { title: "Security & Responsibility", text: "Enterprise data privacy, confidentiality, and robust governance embedded into every engagement.", icon: "shield" },
  { title: "Practicality", text: "Solutions designed for seamless integration and immediate usability without disrupting your team.", icon: "gear" },
  { title: "Continuous Improvement", text: "Iterative refinement, ongoing optimization, and scalable architectures that grow with your ambitions.", icon: "refresh" },
];

const approach = ["Understand", "Design", "Implement", "Integrate", "Automate", "Measure", "Improve"];

export default function AboutPage() {
  return (
    <Page>
      <PageHero compact
        crumb="About"
        eyebrow="Technology + Talent, unified"
        title={
          <>
            Who <span className="text-gradient">We Are</span>
          </>
        }
        text="Run better. Grow faster. Automate intelligently. Scale confidently."
        actions={
          <Button href="/contact#contact-form" hero>
            Start a Conversation
          </Button>
        }
        scene={{ shape: "sphere", core: 1, x: 2.4, zoom: 7.5, tint: "aurora" }}
      />

      <Scene scene={{ shape: "galaxy", core: 0, x: 0, zoom: 8, tint: "blue" }} className="relative py-20 sm:py-28">
        <Container>
          <p data-highlight className="max-w-[34ch] font-display text-statement font-medium">
            Tirunex is a technology and talent solutions company focused on helping growing businesses adopt practical technology, AI, automation and workforce solutions.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 sm:mt-16">
            {[
              { k: "Mission", v: "To empower businesses with accessible, scalable and intelligent technology and talent solutions that create measurable business value.", e: "orb" as const, t: "blue" as const },
              { k: "Vision", v: "To become a trusted growth partner for businesses seeking to modernize operations, adopt AI and scale their workforce.", e: "crystal" as const, t: "indigo" as const },
            ].map((m) => (
              <article key={m.k} data-reveal="scale" data-tilt data-emblem-host className="spotlight relative overflow-hidden rounded-panel glass-strong p-6 sm:p-10">
                <Emblem variant={m.e} tint={m.t} className="absolute right-3 top-3 h-24 w-24 opacity-90 sm:h-32 sm:w-32" />
                <h2 className="font-mono text-label uppercase text-cyan">{m.k}</h2>
                <p className="relative mt-14 max-w-[32ch] font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.75rem)] font-medium leading-snug tracking-tight sm:mt-16">{m.v}</p>
              </article>
            ))}
          </div>
        </Container>
      </Scene>

      <Scene scene={{ shape: "lattice", core: 0, x: 0, zoom: 8.5, tint: "cyan" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading align="split" eyebrow="What guides us" title="Values designed for responsible progress." />
          <div data-reveal="stagger" className="mt-12 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="group relative bg-bg/85 p-5 backdrop-blur-xl transition-colors duration-500 hover:bg-bg-3/85 sm:p-7">
                <div className="flex items-center justify-between">
                  <Icon name={v.icon} className="h-6 w-6 text-cyan transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125" />
                  <span className="font-mono text-label text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-h3">{v.title}</h3>
                <p className="mt-2 text-body text-fg-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Scene>

      <Scene scene={{ shape: "rings", core: 0.5, x: 0, zoom: 7.5, tint: "indigo" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="Our approach" title="Structured progress. Continuous improvement." />
          <div data-draw-trigger className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
            <svg viewBox="0 0 10 700" preserveAspectRatio="none" className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2" aria-hidden>
              <path d="M5 0 V700" stroke="url(#ap-g)" strokeWidth="2" fill="none" data-draw />
              <defs>
                <linearGradient id="ap-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1769ff" />
                  <stop offset="1" stopColor="#26c6da" />
                </linearGradient>
              </defs>
            </svg>
            <ol className="relative space-y-6 sm:space-y-8">
              {approach.map((a, i) => (
                <li key={a} data-reveal={i % 2 ? "right" : "left"} className={`flex items-center gap-3 sm:gap-6 ${i % 2 ? "flex-row-reverse text-right" : ""}`}>
                  <div className="flex-1">
                    <p className="font-display text-h2 font-semibold">{a}</p>
                  </div>
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full glass-strong font-mono text-label text-cyan shadow-[0_0_40px_-8px_rgba(38,198,218,0.8)] sm:h-14 sm:w-14">
                    0{i + 1}
                  </span>
                  <div className="flex-1" />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Scene>
    </Page>
  );
}
