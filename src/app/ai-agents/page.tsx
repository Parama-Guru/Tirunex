import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";
import { Chip, Container, PageHero, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Emblem, type EmblemVariant } from "@/components/three/Emblem";
import { OrbitLoop } from "@/components/sections/OrbitLoop";
import { AskBusiness } from "@/components/sections/AskBusiness";
import type { Tint } from "@/lib/store";

export const metadata: Metadata = {
  title: "Custom AI Agents for Business | Tirunex",
  description: "Custom AI Agents for sales, finance, HR, operations, customer service, IT and management workflows.",
};

const connectors = ["Enterprise systems", "Databases", "APIs", "Documents", "Emails", "Business applications"];

const agents: { title: string; tasks: string; emblem: EmblemVariant; tint: Tint }[] = [
  { title: "AI Business Agents", tasks: "Management Assistant • Executive Assistant • Business Analyst Agent • Reporting Agent • Research Agent", emblem: "orb", tint: "indigo" },
  { title: "Sales Agents", tasks: "Lead qualification • Lead enrichment • Sales follow-up • Proposal assistance • CRM updates • Opportunity analysis", emblem: "cone", tint: "blue" },
  {
    title: "Customer Service Agents",
    tasks: "Customer query handling • Knowledge-base assistance • Ticket classification • Response generation • Case summarization • Escalation management",
    emblem: "ring",
    tint: "cyan",
  },
  { title: "Finance Agents", tasks: "Invoice processing • Payment follow-up • Reconciliation assistance • Financial reporting • Expense analysis • Exception identification", emblem: "gem", tint: "green" },
  { title: "HR Agents", tasks: "Candidate screening • Resume analysis • Interview scheduling • Employee queries • HR policy assistant • Onboarding automation", emblem: "capsule", tint: "aurora" },
  {
    title: "Operations Agents",
    tasks: "Order processing • Procurement assistance • Inventory monitoring • Dispatch coordination • Exception management • Operational reporting",
    emblem: "stack",
    tint: "blue",
  },
  { title: "IT Agents", tasks: "IT helpdesk • Incident classification • Knowledge retrieval • System monitoring • Automated troubleshooting • Ticket management", emblem: "tetra", tint: "cyan" },
];

const pipeline = ["Lead Agent", "Sales Agent", "Pricing Agent", "CRM Agent", "Order Agent", "Finance Agent", "Management Agent"];

const loop = [
  ["Understands", "information"],
  ["Makes", "decisions"],
  ["Executes", "actions"],
  ["Connects", "systems"],
  ["Measures", "outcomes"],
];

const departments = [
  { name: "Management", text: "Sales, customers, performance and KPI questions" },
  { name: "Finance", text: "Overdue invoices, expenses and financial reporting" },
  { name: "HR", text: "Workforce availability, policies and employee information" },
  { name: "Operations", text: "Orders, delays, inventory and exceptions" },
  { name: "Sales", text: "Opportunities and follow-up priorities" },
  { name: "Customer Support", text: "Customer history, ticket resolutions, SLAs and service insights" },
];

const secure: { label: string; icon: IconName }[] = [
  { label: "Private AI environments", icon: "lock" },
  { label: "On-premise deployment", icon: "server" },
  { label: "Private cloud", icon: "cloud" },
  { label: "Controlled enterprise APIs", icon: "code" },
  { label: "Role-based access", icon: "users" },
  { label: "Data isolation", icon: "layers" },
  { label: "Audit logging", icon: "eye" },
  { label: "Secure retrieval", icon: "database" },
  { label: "Enterprise knowledge bases", icon: "brain" },
  { label: "Controlled Agent permissions", icon: "shield" },
];

export default function AIAgentsPage() {
  return (
    <Page>
      <PageHero
        crumb="AI Agents"
        eyebrow="From AI chatbots to autonomous business agents"
        title={
          <>
            AI Agents That <span className="text-gradient">Work</span> for Your Business
          </>
        }
        text="Tirunex designs AI Agents that understand business objectives, access approved enterprise information, use business applications, make decisions within defined rules and execute tasks."
        actions={
          <Button href="/contact#contact-form" hero>
            Talk to an AI Expert
          </Button>
        }
        scene={{ shape: "network", core: 0.8, x: 2.4, zoom: 7.5, tint: "indigo" }}
      />

      <Scene scene={{ shape: "rings", core: 0.35, x: 2.6, zoom: 8, tint: "cyan" }} className="relative">
        <OrbitLoop
          steps={["Understand", "Reason", "Decide", "Act", "Learn"]}
          center={
            <div>
              <p className="font-mono text-label uppercase tracking-[0.12em] text-cyan">Agent loop</p>
              <p className="mt-2 font-display text-h2 font-semibold">AI Agent</p>
            </div>
          }
        >
          <p data-reveal className="eyebrow">
            What is an AI Agent?
          </p>
          <h2 data-split className="mt-4 max-w-[14ch] text-h1">
            From information to <span className="text-gradient">action.</span>
          </h2>
          <p data-reveal className="mt-5 max-w-[52ch] text-lead text-fg-soft">
            Agents may interact with enterprise systems, databases, APIs, documents, emails and business applications to complete defined tasks.
          </p>
          <div data-reveal="stagger" className="mt-6 flex flex-wrap gap-2">
            {connectors.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </OrbitLoop>
      </Scene>

      <Scene scene={{ shape: "galaxy", core: 0, x: 0, zoom: 8, tint: "indigo" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading align="split" eyebrow="Custom AI Agent development" title="Specialized agents for every team." />
          <div data-reveal="stagger" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((a, i) => (
              <article
                key={a.title}
                data-tilt
                data-emblem-host
                className={`spotlight group relative flex flex-col overflow-hidden rounded-card glass p-5 sm:p-6 ${i === 0 ? "md:col-span-2 md:flex-row md:items-center md:gap-6 lg:col-span-3" : ""}`}
              >
                <div className="flex items-start justify-between md:block">
                  <Emblem variant={a.emblem} tint={a.tint} className={i === 0 ? "-ml-2 -mt-2 h-20 w-20 shrink-0 md:m-0 md:h-32 md:w-32" : "-ml-2 -mt-2 h-20 w-20"} />
                  <span className="font-mono text-label text-cyan md:hidden">0{i + 1}</span>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="hidden font-mono text-label text-cyan md:inline">0{i + 1}</span>
                  <h3 className="mt-1 text-h3">{a.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {a.tasks.split(" • ").map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-small text-fg-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Scene>

      <Scene scene={{ shape: "helix", core: 0, x: 0, zoom: 8, tint: "blue" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Multi-agent business automation"
            title="Specialists working as one connected team."
            text="Each agent performs a defined role, handing work and context forward across an end-to-end process."
          />
          <div className="relative mt-12 sm:mt-16">
            <div aria-hidden className="absolute left-[7%] right-[7%] top-8 hidden h-px bg-gradient-to-r from-blue via-cyan to-indigo lg:block">
              {[0, 1, 2].map((k) => (
                <span
                  key={k}
                  className="absolute -top-[5px] h-[11px] w-[11px] rounded-full bg-cyan shadow-[0_0_20px_4px_rgba(38,198,218,0.8)]"
                  style={{ animation: `packet 4.5s ${k * 1.5}s linear infinite` }}
                />
              ))}
            </div>
            <ol data-reveal="stagger" className="relative mx-auto grid max-w-md gap-2 sm:max-w-none sm:grid-cols-4 sm:gap-6 lg:grid-cols-7">
              {pipeline.map((p, i) => (
                <li key={p} className="group flex items-center gap-4 rounded-card glass px-4 py-3 sm:flex-col sm:gap-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:text-center sm:backdrop-blur-none">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl glass-strong transition-all duration-500 group-hover:-translate-y-1 group-hover:border-cyan/60 sm:h-16 sm:w-16 sm:rounded-2xl">
                    <span className="font-mono text-label text-cyan">0{i + 1}</span>
                    <span className="absolute -inset-1 -z-10 rounded-3xl bg-cyan/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <span className="text-body font-semibold sm:mt-3">{p}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Scene>

      <Scene scene={{ shape: "knot", core: 0, x: 2.8, zoom: 8, tint: "aurora" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="AI + Automation architecture" title="A complete loop from understanding to outcomes." />
          <ol className="mt-12 border-t border-line">
            {loop.map(([a, b], i) => (
              <li key={a} data-reveal className="group relative overflow-hidden border-b border-line">
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-blue/20 via-cyan/10 to-transparent transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
                <div className="relative flex items-baseline gap-5 py-5 sm:gap-8 sm:py-6">
                  <span className="font-mono text-label text-cyan">0{i + 1}</span>
                  <p className="font-display text-h2 font-semibold transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3">
                    {a} <span className="text-muted transition-colors duration-500 group-hover:text-fg">{b}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Scene>

      <Scene scene={{ shape: "wave", core: 0, x: 0, zoom: 7, tint: "cyan" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading align="split" eyebrow="Enterprise AI assistants" title="Ask the business. Get useful answers." />
          <div data-reveal className="mt-10">
            <AskBusiness items={departments} />
          </div>
        </Container>
      </Scene>

      <Scene scene={{ shape: "shield", core: 0.5, x: 0, y: -0.2, zoom: 7.5, tint: "blue" }} className="relative py-20 sm:py-32">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Private & secure AI"
            title={
              <>
                Your Data. Your Environment. <span className="text-gradient">Your Control.</span>
              </>
            }
            text="AI architecture aligned to your security, access and data requirements."
          />
          <ul data-reveal="stagger" className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {secure.map((s) => (
              <li key={s.label} data-tilt className="spotlight group flex flex-col gap-3 rounded-card glass p-4 sm:p-5">
                <Icon name={s.icon} className="h-5 w-5 text-cyan transition-transform duration-500 group-hover:scale-125" />
                <span className="text-small font-medium sm:text-body">{s.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Scene>
    </Page>
  );
}
