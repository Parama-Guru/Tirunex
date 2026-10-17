import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";
import { Container, PageHero } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Emblem, type EmblemVariant } from "@/components/three/Emblem";
import { StackCards } from "@/components/sections/StackCards";
import type { SceneShape, Tint } from "@/lib/store";

export const metadata: Metadata = {
  title: "IT Consulting & Engineering Services | Tirunex",
  description: "Practical IT consulting, AI, engineering, web, marketing, cybersecurity, cloud and training services.",
};

const services: { title: string; text: string; items: string[]; emblem: EmblemVariant; tint: Tint; shape: SceneShape }[] = [
  {
    title: "IT Consulting & Engineering",
    text: "Architecture and engineering across the modern technology lifecycle.",
    items: [
      "Software Engineering",
      "Application Engineering",
      "System & Solution Architecture",
      "API & Integration Engineering",
      "Data Engineering",
      "AI & ML Engineering",
      "Cloud Engineering",
      "Automation Engineering",
      "DevOps & CI/CD",
      "Quality Engineering & Test Automation",
      "Application Modernization",
      "Performance Engineering",
      "Production Support & Maintenance",
    ],
    emblem: "cube",
    tint: "blue",
    shape: "lattice",
  },
  {
    title: "AI & Intelligent Automation",
    text: "Make intelligence useful inside real processes.",
    items: ["AI strategy", "AI-integrated applications", "AI Agent development", "RAG and knowledge systems", "Predictive analytics", "Intelligent document processing", "Conversational AI", "Workflow automation"],
    emblem: "orb",
    tint: "indigo",
    shape: "network",
  },
  {
    title: "Web Design & Development",
    text: "Clear, fast digital experiences built around business goals.",
    items: ["Modern responsive websites", "Corporate websites", "Portals", "Business applications", "Integrations", "Conversion-focused digital experiences"],
    emblem: "crystal",
    tint: "cyan",
    shape: "wave",
  },
  {
    title: "Digital Marketing",
    text: "Connected content, campaigns and measurement.",
    items: ["SEO", "Content", "Social media", "Campaigns", "Lead generation", "Landing pages", "Analytics-driven marketing"],
    emblem: "cone",
    tint: "green",
    shape: "galaxy",
  },
  {
    title: "Cybersecurity",
    text: "Improve controls, visibility and response.",
    items: ["Security assessment", "Access management", "Monitoring", "Compliance support", "Risk management", "Security improvement"],
    emblem: "gem",
    tint: "blue",
    shape: "shield",
  },
  {
    title: "Cloud & Infrastructure",
    text: "Flexible foundations for changing business needs.",
    items: ["Cloud", "Private cloud", "On-premise and hybrid infrastructure", "Migration", "Integration", "Monitoring", "Support"],
    emblem: "stack",
    tint: "aurora",
    shape: "terrain",
  },
  {
    title: "Training & Change Management",
    text: "Help people adopt technology and new ways of working.",
    items: ["User training", "Technology adoption", "Process transition", "Documentation", "Skill development", "Change management"],
    emblem: "helix",
    tint: "cyan",
    shape: "helix",
  },
];

export default function ServicesPage() {
  return (
    <Page>
      <PageHero
        crumb="Services"
        eyebrow="Advisory + Delivery"
        title={
          <>
            IT Consulting, Advisory &amp; <span className="text-gradient">Engineering</span> Services
          </>
        }
        text="Practical capabilities designed to identify priorities, improve processes, define architecture and deliver scalable solutions."
        actions={
          <Button href="/contact#contact-form" hero>
            Request a Consultation
          </Button>
        }
        scene={{ shape: "knot", core: 0, x: 2.6, zoom: 8.5, tint: "blue" }}
        aside={
          <ol data-reveal="stagger" data-hero className="ml-auto grid max-w-sm gap-1 font-mono text-label uppercase text-muted">
            {services.map((s, i) => (
              <li key={s.title} className="flex items-center gap-4 border-b border-line py-2.5">
                <span className="text-cyan">0{i + 1}</span>
                <span className="text-fg-soft">{s.title}</span>
              </li>
            ))}
          </ol>
        }
      />

      <Container className="pb-16">
        <StackCards>
          {services.map((s, i) => (
            <Scene
              as="article"
              key={s.title}
              data-stack-card
              data-emblem-host
              scene={{ shape: s.shape, core: 0, x: 0, zoom: 8.5, tint: s.tint }}
              className="relative overflow-hidden rounded-panel border border-line-strong shadow-[var(--shadow)] md:sticky md:top-[var(--stack-top)]"
              style={{ "--stack-top": `${96 + i * 12}px`, background: "linear-gradient(160deg, var(--bg-3) 0%, var(--bg-2) 55%, var(--bg) 100%)" } as React.CSSProperties}
            >
              <div className="pointer-events-none absolute inset-0 z-20 bg-bg" style={{ opacity: "var(--dim, 0)" }} />
              <div className="pointer-events-none absolute -right-4 -top-8 hidden font-display text-[10rem] font-bold leading-none text-fg/[0.04] md:block">0{i + 1}</div>
              <div className="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:gap-10 lg:p-10">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="w-fit rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-label text-cyan">0{i + 1} / 07</span>
                    <Emblem variant={s.emblem} tint={s.tint} className="-my-4 h-20 w-20 lg:-my-2 lg:h-28 lg:w-28" />
                  </div>
                  <h2 className="mt-4 max-w-[16ch] text-h2">{s.title}</h2>
                  <p className="mt-3 max-w-[40ch] text-lead text-fg-soft">{s.text}</p>
                </div>
                <ul className="flex flex-wrap content-center gap-1.5 sm:grid sm:grid-cols-2 sm:gap-0 sm:gap-x-6">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="group flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-small text-fg-soft transition-colors hover:text-fg sm:gap-3 sm:rounded-none sm:border-0 sm:border-b sm:px-0 sm:py-2.5 sm:text-body"
                    >
                      <Icon name="check" className="hidden h-4 w-4 shrink-0 text-cyan transition-transform duration-500 group-hover:scale-125 sm:block" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Scene>
          ))}
        </StackCards>
      </Container>
    </Page>
  );
}
