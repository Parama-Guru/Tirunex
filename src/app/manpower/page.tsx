import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";
import { Container, PageHero, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";
import { Emblem, type EmblemVariant } from "@/components/three/Emblem";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import type { Tint } from "@/lib/store";

export const metadata: Metadata = {
  title: "Manpower & Workforce Solutions | Tirunex",
  description: "Skilled, trained and deployment-ready workforce solutions across technology and business sectors.",
};

const capabilities: { title: string; text: string; icon: IconName }[] = [
  { title: "Skilled manpower", text: "Role-aligned capability for business needs.", icon: "user" },
  { title: "Trained manpower", text: "Preparation for process and performance.", icon: "graduation" },
  { title: "Deployment-ready workforce", text: "People prepared for operational environments.", icon: "target" },
  { title: "Industry-specific talent", text: "Context aligned to sector requirements.", icon: "factory" },
  { title: "Technical & professional resources", text: "Specialized capabilities across functions.", icon: "code" },
  { title: "Operational workforce", text: "Support for day-to-day business execution.", icon: "gear" },
  { title: "Upskilling & reskilling", text: "Capabilities that develop with changing work.", icon: "spark" },
  { title: "Replacement support", text: "Continuity when workforce needs change.", icon: "refresh" },
];

const model = ["Source", "Screen", "Assess", "Train", "Deploy", "Support", "Upskill"];

const coverage = ["IT", "Healthcare", "Manufacturing", "Retail", "Logistics", "Financial Services", "Other business sectors"];

const training = [
  "Technical skills",
  "Industry-specific processes",
  "Business applications",
  "Customer-specific workflows",
  "Workplace communication",
  "Compliance and process awareness",
  "Safety and operational procedures",
  "Digital skills",
  "AI and automation tools",
  "Continuous upskilling",
];

const why: { title: string; text: string; emblem: EmblemVariant; tint: Tint }[] = [
  { title: "Skilled Talent", text: "Role-aligned capability pre-screened to meet your domain, technology stack, and operational standards.", emblem: "gem", tint: "blue" },
  { title: "Trained Workforce", text: "Candidates prepared through structured process, compliance, tool usage, and workplace performance training.", emblem: "stack", tint: "cyan" },
  { title: "Flexible Engagement", text: "Scalable contract staffing, temp-to-hire, or permanent recruitment models tailored to project roadmaps.", emblem: "torus", tint: "indigo" },
  { title: "AI-Enabled Matching", text: "Data-driven candidate evaluation to rapidly match skills, experience, and cultural fit to your requirements.", emblem: "orb", tint: "aurora" },
  { title: "Industry Coverage", text: "Specialized talent pools spanning IT, engineering, healthcare, logistics, manufacturing, and retail.", emblem: "ring", tint: "green" },
  { title: "Workforce Continuity", text: "Proactive talent bench, seamless replacement support, and ongoing upskilling to maintain project momentum.", emblem: "helix", tint: "cyan" },
];

export default function ManpowerPage() {
  return (
    <Page>
      <PageHero
        crumb="Manpower"
        eyebrow="Skilled people. Trained for performance. Ready to deploy."
        title={
          <>
            Technology + Talent. <span className="text-gradient">One Growth Partner.</span>
          </>
        }
        text="Recruitment, skill assessment, training, deployment and workforce management—combined to deliver capable people aligned with role, industry, process and operational requirements."
        actions={
          <>
            <Button href="/contact#contact-form" hero>
              Find Skilled Manpower
            </Button>
            <Button href="/contact#contact-form" variant="ghost" hero>
              Request Workforce Support
            </Button>
          </>
        }
        scene={{ shape: "helix", core: 0, x: 2.6, zoom: 7.5, tint: "green" }}
      />

      <Scene scene={{ shape: "network", core: 0, x: 0, zoom: 8, tint: "cyan" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading align="split" eyebrow="Manpower capabilities" title="A workforce model built around readiness." />
          <div data-reveal="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <div key={c.title} data-tilt className="spotlight group flex flex-col rounded-card glass p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-green/25 to-cyan/10 text-green ring-1 ring-green/30 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-label text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-h3">{c.title}</h3>
                <p className="mt-2 text-body text-fg-soft">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Scene>

      <Scene scene={{ shape: "wave", core: 0, x: 0, zoom: 7, tint: "green" }} className="relative">
        <HorizontalScroll
          intro={
            <Container>
              <SectionHeading eyebrow="Workforce model" title={<>From sourcing to continuous <span className="text-gradient">capability.</span></>} />
            </Container>
          }
        >
          {model.map((m, i) => (
            <div
              key={m}
              className="relative flex h-[clamp(13rem,30vh,18rem)] w-[min(72vw,17rem)] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-panel glass-strong p-6 lg:w-[clamp(17rem,18vw,22rem)]"
            >
              <span className="relative grid h-12 w-12 place-items-center self-end rounded-full border border-dashed border-cyan/40 font-mono text-small text-cyan">
                <span className="absolute inset-2 rounded-full bg-gradient-to-br from-green/40 to-cyan/10 blur-sm" />
                <span className="relative">0{i + 1}</span>
              </span>
              <span className="absolute left-6 top-6 font-mono text-label text-muted">STEP / 07</span>
              <p className="font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-semibold leading-none tracking-tight">{m}</p>
              <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-gradient-to-r from-green to-cyan" style={{ width: `${((i + 1) / model.length) * 100}%` }} />
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </Scene>

      <Scene scene={{ shape: "terrain", core: 0, x: 0, y: 0.4, zoom: 7, tint: "cyan" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Industry coverage" title="Talent across technology and operations." />
        </Container>
        <ul className="mt-10 border-t border-line">
          {coverage.map((c, i) => (
            <li key={c} data-reveal className="group relative overflow-hidden border-b border-line">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-blue to-cyan transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100" />
              <Container className="relative flex items-center justify-between gap-4 py-4 sm:py-5">
                <span className="font-display text-h2 font-semibold transition-colors duration-500 group-hover:text-white">{c}</span>
                <span className="font-mono text-label text-muted transition-colors duration-500 group-hover:text-white">0{i + 1}</span>
              </Container>
            </li>
          ))}
        </ul>
      </Scene>

      <Scene scene={{ shape: "lattice", core: 0, x: -2.6, zoom: 8, tint: "indigo" }} className="relative py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Training & skill development" title="Prepared for the work ahead." />
          </div>
          <ol data-reveal="stagger" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {training.map((t, i) => (
              <li key={t} className="group flex items-center gap-4 rounded-card glass px-5 py-3.5 transition-all duration-500 hover:translate-x-2 hover:border-cyan/50">
                <span className="font-mono text-label text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-body font-medium">{t}</span>
                <Icon name="check" className="h-5 w-5 text-green opacity-40 transition-opacity group-hover:opacity-100" />
              </li>
            ))}
          </ol>
        </Container>
      </Scene>

      <Scene scene={{ shape: "galaxy", core: 0, x: 0, zoom: 8, tint: "aurora" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="Why Tirunex manpower?" title="Workforce support connected to business growth." />
          <div data-reveal="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w) => (
              <article key={w.title} data-tilt data-emblem-host className="spotlight rounded-card glass p-5 sm:p-6">
                <Emblem variant={w.emblem} tint={w.tint} className="-ml-2 -mt-2 h-20 w-20" />
                <h3 className="mt-3 text-h3">{w.title}</h3>
                <p className="mt-2 text-body text-fg-soft">{w.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Scene>

      <div className="border-y border-line py-6">
        <Marquee speed={45} reverse>
          {coverage.map((c) => (
            <span key={c} className="flex items-center gap-8 px-6 font-mono text-label uppercase tracking-[0.12em] text-fg-soft">
              {c}
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
            </span>
          ))}
        </Marquee>
      </div>

      <Scene scene={{ shape: "sphere", core: 0.8, x: 0, zoom: 7.5, tint: "green" }} className="relative py-20 sm:py-32">
        <Container className="text-center">
          <h2 data-split className="mx-auto max-w-[18ch] text-h1">
            Don&apos;t just hire people. <span className="text-gradient">Build a capable workforce.</span>
          </h2>
          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact#contact-form">Find Skilled Manpower</Button>
            <Button href="/contact#contact-form" variant="ghost">
              Request Workforce Support
            </Button>
          </div>
        </Container>
      </Scene>
    </Page>
  );
}
