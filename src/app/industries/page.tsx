import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";
import { Container, PageHero } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Emblem, type EmblemVariant } from "@/components/three/Emblem";
import { ScrollSpy } from "@/components/sections/ScrollSpy";
import type { SceneShape, Tint } from "@/lib/store";

export const metadata: Metadata = {
  title: "Industry Technology Solutions | Tirunex",
  description: "Connected technology, automation and operational solutions for retail, manufacturing, services, logistics, healthcare and finance.",
};

type Industry = {
  id: string;
  label: string;
  title: string;
  text: string;
  cta: string;
  icon: IconName;
  emblem: EmblemVariant;
  tint: Tint;
  shape: SceneShape;
  rows: [string, string][];
};

const industries: Industry[] = [
  {
    id: "retail",
    label: "Retail",
    title: "Connected retail operations",
    text: "Improve store operations, inventory visibility, customer engagement and omnichannel commerce.",
    cta: "Discuss Retail",
    icon: "cart",
    emblem: "cube",
    tint: "blue",
    shape: "lattice",
    rows: [
      ["Industry challenge", "Disconnected store, stock and digital-commerce workflows."],
      ["Tirunex solution", "POS + Inventory + Loyalty + E-commerce"],
      ["Relevant technology", "Business applications, commerce, analytics and integrations."],
      ["Automation opportunity", "Inventory updates, customer engagement and order workflows."],
      ["Expected benefits", "Improved visibility, connected operations and customer experience."],
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    title: "Operational flow from plan to maintenance",
    text: "Connect production, procurement, inventory, quality and maintenance operations.",
    cta: "Discuss Manufacturing",
    icon: "factory",
    emblem: "torus",
    tint: "cyan",
    shape: "knot",
    rows: [
      ["Industry challenge", "Limited coordination across material, production and quality processes."],
      ["Tirunex solution", "MRP + Procurement + Quality + Maintenance"],
      ["Relevant technology", "ERP, planning, analytics and connected operations."],
      ["Automation opportunity", "Procurement, production planning, inspections and alerts."],
      ["Expected benefits", "Stronger operational visibility, coordination and control."],
    ],
  },
  {
    id: "professional-services",
    label: "Professional Services",
    title: "Projects, people and profitability",
    text: "Manage projects, resources, customers, billing and profitability in one connected environment.",
    cta: "Discuss Services",
    icon: "briefcase",
    emblem: "crystal",
    tint: "indigo",
    shape: "network",
    rows: [
      ["Industry challenge", "Fragmented project, resource, time and customer information."],
      ["Tirunex solution", "Project Management + Timesheets + Invoicing + CRM"],
      ["Relevant technology", "Project systems, CRM, analytics and client portals."],
      ["Automation opportunity", "Task creation, status reporting, time and billing workflows."],
      ["Expected benefits", "Clearer delivery, resource and commercial visibility."],
    ],
  },
  {
    id: "logistics",
    label: "Logistics",
    title: "Visibility across every movement",
    text: "Improve fleet visibility, dispatch, proof of delivery and billing processes.",
    cta: "Discuss Logistics",
    icon: "truck",
    emblem: "ring",
    tint: "blue",
    shape: "wave",
    rows: [
      ["Industry challenge", "Manual handoffs across fleet, dispatch, delivery and invoicing."],
      ["Tirunex solution", "Fleet Tracking + Dispatch + POD + Billing"],
      ["Relevant technology", "Tracking, mobile workflows, integrations and analytics."],
      ["Automation opportunity", "Dispatch updates, POD processing, exception handling and billing."],
      ["Expected benefits", "Improved visibility, response and process continuity."],
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Connected care workflows",
    text: "Connect patient, appointment, pharmacy and digital-care workflows.",
    cta: "Discuss Healthcare",
    icon: "heart",
    emblem: "helix",
    tint: "green",
    shape: "helix",
    rows: [
      ["Industry challenge", "Separate patient, scheduling, pharmacy and digital-care processes."],
      ["Tirunex solution", "EMR + Appointments + Pharmacy Inventory + Telemedicine"],
      ["Relevant technology", "Secure records, scheduling, inventory and communication systems."],
      ["Automation opportunity", "Scheduling, reminders, inventory workflows and secure information handling."],
      ["Expected benefits", "More connected information and coordinated service workflows."],
    ],
  },
  {
    id: "financial-services",
    label: "Financial Services",
    title: "Intelligent, controlled operations",
    text: "Improve operational efficiency, analytics, customer processes, controls and intelligent automation.",
    cta: "Discuss Financial Services",
    icon: "bank",
    emblem: "gem",
    tint: "aurora",
    shape: "shield",
    rows: [
      ["Industry challenge", "Complex workflows, exceptions and information-heavy customer processes."],
      ["Tirunex solution", "Process Automation + Analytics + Customer Operations"],
      ["Relevant technology", "Secure automation, analytics, access controls and integrations."],
      ["Automation opportunity", "Document processing, exception identification and customer workflows."],
      ["Expected benefits", "Improved process visibility, consistency and operational control."],
    ],
  },
];

export default function IndustriesPage() {
  return (
    <Page>
      <PageHero
        crumb="Industry Solutions"
        eyebrow="Solutions with operational context"
        title={
          <>
            Connected Solutions for the Way Your <span className="text-gradient">Industry</span> Works
          </>
        }
        text="Bring applications, automation, data and workflows together around the realities of your operation—without unsupported promises or one-size-fits-all thinking."
        actions={
          <Button href="#retail" hero>
            Explore Industry Solutions
          </Button>
        }
        scene={{ shape: "terrain", core: 0, x: 0, y: 0.8, zoom: 7, tint: "cyan" }}
        aside={
          <div data-reveal="stagger" data-hero className="ml-auto grid max-w-md grid-cols-3 gap-3">
            {industries.map((ind) => (
              <a key={ind.id} href={`#${ind.id}`} data-cursor="Jump" className="group grid aspect-square place-items-center rounded-3xl glass text-center transition-all duration-500 hover:-translate-y-1 hover:border-cyan/50">
                <div>
                  <Icon name={ind.icon} className="mx-auto h-7 w-7 text-cyan transition-transform duration-500 group-hover:scale-110" />
                  <p className="mt-3 px-2 text-small font-medium">{ind.label}</p>
                </div>
              </a>
            ))}
          </div>
        }
      />

      <Container className="grid gap-10 pb-10 xl:grid-cols-[200px_1fr]">
        <aside className="hidden xl:block">
          <ScrollSpy items={industries.map((i) => ({ id: i.id, label: i.label }))} label="Industries" />
        </aside>
        <div className="space-y-4 md:space-y-6">
          {industries.map((ind, idx) => (
            <Scene
              key={ind.id}
              id={ind.id}
              data-emblem-host
              scene={{ shape: ind.shape, core: 0, x: idx % 2 ? -2.8 : 2.8, zoom: 8.5, tint: ind.tint }}
              className="relative scroll-mt-28 overflow-hidden rounded-panel glass p-5 sm:p-8 lg:p-10"
            >
              <div className="pointer-events-none absolute -right-4 -top-8 hidden font-display text-[10rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--line)] md:block">
                {ind.label[0]}
              </div>
              <div className="relative grid gap-8 md:grid-cols-[1fr_1.2fr] lg:gap-10">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <p data-reveal className="flex items-center gap-3 font-mono text-label uppercase text-cyan">
                      <Icon name={ind.icon} className="h-4 w-4" />
                      {ind.label}
                    </p>
                    <Emblem variant={ind.emblem} tint={ind.tint} className="-my-4 h-20 w-20 lg:h-28 lg:w-28" />
                  </div>
                  <h2 data-split className="mt-4 max-w-[18ch] text-h2">
                    {ind.title}
                  </h2>
                  <p data-reveal className="mt-4 max-w-[46ch] text-lead text-fg-soft">
                    {ind.text}
                  </p>
                  <div data-reveal className="mt-6">
                    <Button href="/contact#contact-form" variant="ghost">
                      {ind.cta}
                    </Button>
                  </div>
                </div>
                <dl data-draw-trigger className="relative">
                  <svg className="absolute bottom-6 left-[11px] top-6 w-px overflow-visible" aria-hidden>
                    <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--line-strong)" strokeWidth="1" />
                  </svg>
                  <div data-reveal="stagger" className="relative space-y-1.5">
                    {ind.rows.map(([k, v], ri) => (
                      <div key={k} className="relative pl-8">
                        <span
                          className={`absolute left-0 top-3.5 grid h-6 w-6 place-items-center rounded-full border font-mono text-label md:top-4 ${
                            ri === 1 ? "border-cyan bg-cyan text-ink" : "border-line-strong bg-bg text-muted"
                          }`}
                        >
                          {ri + 1}
                        </span>
                        <div
                          className={`border-b py-3 transition-colors md:rounded-card md:border md:px-4 md:py-3 ${ri === 1 ? "border-cyan/40 md:bg-cyan/10" : "border-line md:bg-card"}`}
                        >
                          <dt className="font-mono text-label uppercase text-muted">{k}</dt>
                          <dd className={`mt-1.5 max-w-[60ch] ${ri === 1 ? "font-display text-h3 text-fg" : "text-body text-fg-soft"}`}>{v}</dd>
                        </div>
                      </div>
                    ))}
                  </div>
                </dl>
              </div>
            </Scene>
          ))}
        </div>
      </Container>
    </Page>
  );
}
