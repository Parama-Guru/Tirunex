import Link from "next/link";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";
import { Chip, Container, ScrollCue, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Emblem, type EmblemVariant } from "@/components/three/Emblem";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import { AgentConsole } from "@/components/sections/AgentConsole";
import type { Tint } from "@/lib/store";

const capabilities: { title: string; text: string; emblem: EmblemVariant; tint: Tint; href: string }[] = [
  { title: "Business Technology", text: "ERP, CRM, Projects, Commerce and business applications.", emblem: "cube", tint: "blue", href: "/products" },
  { title: "AI & Automation", text: "AI-integrated products, AI Agents, intelligent workflows and enterprise automation.", emblem: "orb", tint: "indigo", href: "/ai-agents" },
  { title: "Digital Transformation", text: "Modern websites, cloud, system integration and digital solutions.", emblem: "knot", tint: "cyan", href: "/services" },
  { title: "Technology Services", text: "Consulting, cybersecurity, infrastructure, development and support.", emblem: "gem", tint: "blue", href: "/services" },
  { title: "Manpower Solutions", text: "Recruitment, staffing, outsourcing and workforce management.", emblem: "capsule", tint: "green", href: "/manpower" },
  { title: "Scalable Architecture", text: "Modular solutions capable of growing with your business.", emblem: "stack", tint: "aurora", href: "/about" },
];

const pillars: { title: string; tags: string[]; emblem: EmblemVariant; tint: Tint }[] = [
  { title: "Run Your Business", tags: ["ERP", "CRM", "Projects", "Commerce"], emblem: "cube", tint: "blue" },
  { title: "Grow Your Business", tags: ["Marketing", "Customer Engagement", "BI", "Analytics"], emblem: "cone", tint: "cyan" },
  { title: "Transform Your Business", tags: ["AI", "AI Agents", "Automation", "Cloud", "Cybersecurity", "Digital Transformation"], emblem: "knot", tint: "indigo" },
  { title: "Scale Your Business", tags: ["Recruitment", "Staffing", "Outsourcing", "Workforce Management"], emblem: "helix", tint: "green" },
];

const features: { title: string; text: string; icon: IconName }[] = [
  { title: "Modular", text: "Start with what you need and expand as the business grows.", icon: "layers" },
  { title: "Affordable", text: "Practical technology designed around SMB budgets.", icon: "coins" },
  { title: "Customizable", text: "Adapt workflows, integrations and applications to business needs.", icon: "sliders" },
  { title: "Scalable", text: "Support business growth without unnecessary redesign.", icon: "chart" },
  { title: "Flexible Deployment", text: "On-premise, private cloud or suitable hybrid environments.", icon: "server" },
  { title: "Data Sovereignty", text: "Maintain control over sensitive business information.", icon: "shield" },
];

const steps = ["Plan", "Digitize", "Automate", "Analyze", "Secure", "Scale"];

const agentSkills = [
  "Task automation",
  "Data analysis",
  "Document processing",
  "Customer queries",
  "Lead qualification",
  "Reporting",
  "Business research",
  "Workflow coordination",
];

const industries: { letter: string; title: string; text: string; id: string; emblem: EmblemVariant; tint: Tint }[] = [
  { letter: "R", title: "Retail", text: "POS + Inventory + Loyalty + E-commerce", id: "retail", emblem: "cube", tint: "blue" },
  { letter: "M", title: "Manufacturing", text: "MRP + Procurement + Quality + Maintenance", id: "manufacturing", emblem: "torus", tint: "cyan" },
  { letter: "P", title: "Professional Services", text: "Project Management + Timesheets + Invoicing + CRM", id: "professional-services", emblem: "crystal", tint: "indigo" },
  { letter: "L", title: "Logistics", text: "Fleet Tracking + Dispatch + POD + Billing", id: "logistics", emblem: "ring", tint: "blue" },
  { letter: "H", title: "Healthcare", text: "EMR + Appointments + Pharmacy Inventory + Telemedicine", id: "healthcare", emblem: "helix", tint: "green" },
  { letter: "F", title: "Financial Services", text: "Process Automation + Analytics + Customer Operations", id: "financial-services", emblem: "gem", tint: "aurora" },
];

const hud = [
  { title: "AI & Automation", sub: "Autonomous AI Agents", pos: "left-0 top-[6%]" },
  { title: "Cloud ERP & CRM", sub: "Connected Operations", pos: "right-0 top-[14%]" },
  { title: "Live Intelligence", sub: "Predictive Intelligence", pos: "left-[4%] bottom-[18%]" },
  { title: "Workforce & Talent", sub: "Skilled & Deployment Ready", pos: "right-[2%] bottom-[8%]" },
];

export default function Home() {
  return (
    <Page>
      {/* HERO */}
      <Scene scene={{ shape: "sphere", core: 1, x: 2.1, zoom: 7.2, tint: "blue" }} className="relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28 sm:pt-32">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative z-10">
            <p data-reveal data-hero className="eyebrow">
              Technology + AI + Automation + Talent
            </p>
            <h1 data-split="hero" className="mt-5 max-w-[15ch] text-display">
              Build a Smarter, More <span className="text-gradient">Scalable</span> Business
            </h1>
            <p data-reveal data-hero className="mt-6 max-w-[56ch] text-lead text-fg-soft">
              Unified Technology, AI, Automation &amp; Talent Solutions for Growing Businesses. Tirunex connects business applications, intelligent automation, digital
              transformation and workforce solutions so you can operate smarter and scale faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#contact-form" hero>
                Talk to an Expert
              </Button>
              <Button href="/products" variant="ghost" hero>
                Explore Solutions
              </Button>
            </div>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[min(100%,68vh)] lg:block" aria-label="Tirunex platform architecture">
            <div data-reveal="fade" data-hero className="absolute inset-x-0 -top-6 flex items-center justify-between font-mono text-label uppercase tracking-[0.12em] text-muted">
              <span>Tirunex Platform Architecture</span>
              <span className="flex items-center gap-2 text-green">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" /> Synced • Live
              </span>
            </div>
            <div data-reveal="scale" data-hero className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="font-mono text-label uppercase tracking-[0.12em] text-cyan">Core Engine</p>
              <p className="mt-1 font-display text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(23,105,255,0.9)] light:text-ink light:drop-shadow-[0_0_14px_rgba(255,255,255,0.95)]">TIRUNEX AI</p>
              <p className="mt-1 font-mono text-label text-white/80 light:text-fg-soft">
                <span data-counter="99.8">0</span>% Precision
              </p>
            </div>
            {hud.map((h) => (
              <div key={h.title} data-reveal="scale" data-hero className={`absolute ${h.pos}`}>
                <div className="animate-[float_6s_ease-in-out_infinite] rounded-2xl glass px-4 py-3 shadow-[var(--shadow)]">
                  <p className="text-small font-semibold">{h.title}</p>
                  <p className="text-label normal-case tracking-normal text-muted">{h.sub}</p>
                </div>
              </div>
            ))}
            <div data-reveal data-hero className="absolute inset-x-[8%] -bottom-4 grid grid-cols-3 divide-x divide-line rounded-2xl glass text-center">
              {[
                ["Latency", "< 15ms"],
                ["Workflows", "Automated"],
                ["Security", "Enterprise"],
              ].map(([k, v]) => (
                <div key={k} className="px-3 py-3">
                  <p className="font-mono text-label uppercase tracking-[0.12em] text-muted">{k}</p>
                  <p className="mt-1 text-sm font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ScrollCue />
      </Scene>

      {/* VALUE MARQUEE */}
      <div className="border-y border-line bg-bg/40 py-5 backdrop-blur-sm">
        <Marquee speed={50}>
          {["Modular by design", "Private deployment options", "Built for growing businesses", "Technology + talent"].map((t) => (
            <span key={t} className="flex items-center gap-4 px-8 font-mono text-label uppercase tracking-[0.12em] text-fg-soft">
              <Icon name="check" className="h-4 w-4 text-cyan" />
              {t}
            </span>
          ))}
        </Marquee>
      </div>

      {/* CAPABILITIES */}
      <Scene scene={{ shape: "network", core: 0, x: 0, zoom: 8, tint: "indigo" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="split"
            eyebrow="One partner. Multiple capabilities."
            title="Everything your business needs to move forward."
            text="Connected capabilities remove the friction between strategy, technology, automation and the people who make it work."
          />
          <div data-reveal="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                data-tilt
                data-emblem-host
                data-cursor="Explore"
                className="spotlight group relative flex flex-col overflow-hidden rounded-card glass p-5 transition-colors sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <Emblem variant={c.emblem} tint={c.tint} className="-ml-2 -mt-2 h-20 w-20 lg:h-24 lg:w-24" />
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-label text-cyan">0{i + 1}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-small transition-all duration-500 group-hover:rotate-45 group-hover:border-cyan group-hover:bg-cyan group-hover:text-ink">
                      ↗
                    </span>
                  </span>
                </div>
                <h3 className="mt-4 text-h3">{c.title}</h3>
                <p className="mt-2 text-body text-fg-soft">{c.text}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Scene>

      {/* FOUR PILLARS */}
      <Scene scene={{ shape: "rings", core: 0, x: 0, zoom: 7.5, tint: "cyan" }} className="relative">
        <HorizontalScroll
          intro={
            <Container>
              <SectionHeading eyebrow="Four pillars of business growth" title={<>One connected path from operations to <span className="text-gradient">scale.</span></>} />
            </Container>
          }
        >
          {pillars.map((p, i) => (
            <article
              key={p.title}
              data-emblem-host
              className="relative flex w-[min(80vw,20rem)] shrink-0 snap-center flex-col overflow-hidden rounded-panel glass-strong p-6 lg:w-[clamp(19rem,23vw,25rem)] lg:p-7"
            >
              <div className="pointer-events-none absolute -right-3 -top-6 hidden font-display text-[7rem] font-bold leading-none text-fg/[0.035] md:block">0{i + 1}</div>
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-label text-cyan">0{i + 1} / 04</span>
                <Emblem variant={p.emblem} tint={p.tint} className="-my-3 h-20 w-20 lg:h-24 lg:w-24" />
              </div>
              <div className="mt-10 lg:mt-14">
                <h3 className="font-display text-[clamp(1.5rem,1.25rem+0.9vw,2.125rem)] font-semibold leading-[1.08] tracking-[-0.02em] [font-stretch:88%]">{p.title}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Chip key={t} className="py-1 text-[0.8125rem]">
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </HorizontalScroll>
      </Scene>

      {/* ENTERPRISE FEATURES */}
      <Scene scene={{ shape: "lattice", core: 0, x: -2.2, zoom: 8, tint: "blue" }} className="relative py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Designed for ambitious SMBs" title="Enterprise capabilities without enterprise complexity." />
          </div>
          <div data-reveal="stagger" className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} data-tilt className="spotlight group rounded-card glass p-5 sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/25 to-cyan/10 text-cyan ring-1 ring-cyan/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-h3">{f.title}</h3>
                <p className="mt-2 text-body text-fg-soft">{f.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Scene>

      {/* TECHNOLOGY + TALENT */}
      <Scene scene={{ shape: "wave", core: 0, x: 0, zoom: 7, tint: "aurora" }} className="relative py-20 sm:py-28">
        <Container>
          <p data-reveal className="eyebrow">
            Technology + Talent
          </p>
          <h2 data-split className="mt-4 max-w-[16ch] text-h1">
            Technology alone is not enough.
          </h2>
          <p data-highlight className="mt-8 max-w-[38ch] font-display text-statement font-medium">
            Tirunex brings together software, AI, automation, technology services and people to turn plans into measurable progress.
          </p>

          <div data-draw-trigger className="relative mt-14">
            <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="absolute inset-x-0 top-4 hidden h-20 w-full lg:block" aria-hidden>
              <path d="M20 80 C 200 0, 300 160, 420 80 S 640 0, 780 80 S 1020 160, 1180 80" fill="none" stroke="url(#steps-g)" strokeWidth="2" data-draw />
              <defs>
                <linearGradient id="steps-g" x1="0" x2="1">
                  <stop offset="0" stopColor="#1769ff" />
                  <stop offset="0.5" stopColor="#26c6da" />
                  <stop offset="1" stopColor="#6558ff" />
                </linearGradient>
              </defs>
            </svg>
            <ol data-reveal="stagger" className="relative grid grid-cols-3 gap-x-3 gap-y-6 lg:grid-cols-6">
              {steps.map((s, i) => (
                <li key={s} className="group flex flex-col items-center text-center">
                  <span className="relative grid h-14 w-14 place-items-center rounded-full glass-strong font-mono text-small text-cyan transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_50px_-5px_rgba(38,198,218,0.8)] sm:h-20 sm:w-20">
                    <span className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-cyan/40" />
                    0{i + 1}
                  </span>
                  <span className="mt-3 font-display text-body font-semibold sm:text-h3">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Scene>

      {/* AI AGENT */}
      <Scene scene={{ shape: "galaxy", core: 0.45, x: -2.6, zoom: 7.5, tint: "indigo" }} className="relative py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-reveal="left" className="order-2 lg:order-1">
            <AgentConsole />
          </div>
          <div className="order-1 lg:order-2">
            <p data-reveal className="eyebrow">
              Intelligent digital work
            </p>
            <h2 data-split className="mt-4 max-w-[18ch] text-h2">
              Your Next Employee Could Be an <span className="text-gradient">AI Agent</span>
            </h2>
            <p data-reveal className="mt-5 max-w-[56ch] text-lead text-fg-soft">
              Tirunex AI Agents can perform real business tasks while employees focus on decisions, relationships and higher-value work.
            </p>
            <div data-reveal="stagger" className="mt-6 flex flex-wrap gap-2">
              {agentSkills.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <p data-reveal className="mt-6 border-l-2 border-cyan pl-4 text-body font-medium text-fg">
              Your employees focus on decisions and relationships. AI handles the repetitive work.
            </p>
            <div data-reveal className="mt-6">
              <Button href="/ai-agents">Build an AI Agent</Button>
            </div>
          </div>
        </Container>
      </Scene>

      {/* INDUSTRIES */}
      <Scene scene={{ shape: "terrain", core: 0, x: 0, zoom: 7, y: 0.6, tint: "cyan" }} className="relative py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Industry-ready solutions" title="Technology shaped around how your industry works." />
            <div data-reveal>
              <Button href="/industries" variant="ghost">
                Explore Industry Solutions
              </Button>
            </div>
          </div>
          <div data-reveal="stagger" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries#${ind.id}`}
                data-tilt
                data-emblem-host
                data-cursor="View"
                className="spotlight group relative overflow-hidden rounded-card glass p-5 sm:p-6"
              >
                <span className="pointer-events-none absolute -right-2 -top-6 hidden font-display text-[8rem] font-bold leading-none text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_var(--line-strong)] group-hover:[-webkit-text-stroke:1px_rgba(38,198,218,0.6)] md:block">
                  {ind.letter}
                </span>
                <Emblem variant={ind.emblem} tint={ind.tint} className="-ml-2 -mt-2 h-20 w-20" />
                <h3 className="mt-3 text-h3">{ind.title}</h3>
                <p className="mt-2 text-body text-fg-soft">{ind.text}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-small font-medium text-cyan">
                  View solution <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Scene>

      {/* CTA */}
      <Scene scene={{ shape: "knot", core: 0, x: 0, zoom: 6.5, tint: "blue" }} className="relative py-20 sm:py-32">
        <Container className="text-center">
          <h2 data-split className="mx-auto max-w-[16ch] text-h1">
            Ready to Build a <span className="text-gradient">Smarter</span> Business?
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-[56ch] text-lead text-fg-soft">
            Bring us your bottlenecks, manual processes, data-visibility gaps, AI opportunities or workforce requirements.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact#contact-form">Schedule a Consultation</Button>
            <Button href="/contact#contact-form" variant="ghost">
              Request an AI Assessment
            </Button>
          </div>
        </Container>
      </Scene>
    </Page>
  );
}
