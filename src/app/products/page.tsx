import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";
import { Container, PageHero, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Emblem, type EmblemVariant } from "@/components/three/Emblem";
import type { SceneShape, Tint } from "@/lib/store";

export const metadata: Metadata = {
  title: "AI-Powered Business Products | Tirunex",
  description: "Explore Tirunex AI-powered ERP, CRM, marketing, project, BI, security and commerce products.",
};

type Product = {
  id: string;
  area: string;
  name: string;
  short: string;
  sub: string;
  emblem: EmblemVariant;
  tint: Tint;
  shape: SceneShape;
  groups: { title: string; items: string[] }[];
};

const products: Product[] = [
  {
    id: "core-ai",
    area: "Operations",
    name: "Tirunex Core AI",
    short: "Core AI",
    sub: "AI-Powered ERP & Business Operations",
    emblem: "cube",
    tint: "blue",
    shape: "lattice",
    groups: [
      { title: "Business core", items: ["Financials", "Inventory", "SCM", "Manufacturing", "HR & Payroll"] },
      { title: "Financial intelligence", items: ["AI financial assistant", "Cash-flow forecasting", "Revenue and expense analysis", "Business anomaly detection"] },
      { title: "Supply & production", items: ["Inventory demand forecasting", "Purchase recommendations", "Supplier performance analysis", "Production planning assistance"] },
      { title: "Decision support", items: ["Workforce analytics", "Automated management reports", "Natural-language ERP queries"] },
    ],
  },
  {
    id: "engage-ai",
    area: "Customer",
    name: "Tirunex Engage AI",
    short: "Engage AI",
    sub: "Intelligent CRM & Customer Engagement",
    emblem: "ring",
    tint: "cyan",
    shape: "rings",
    groups: [
      { title: "CRM foundation", items: ["Sales automation", "Contact management", "Customer service", "Field force"] },
      { title: "Sales intelligence", items: ["AI sales assistant", "Lead scoring", "Opportunity prediction", "Next-best-action recommendations"] },
      { title: "Customer insight", items: ["Customer sentiment analysis", "Customer segmentation", "Sales conversation summaries"] },
      { title: "Engagement automation", items: ["Automated follow-ups", "Email/message generation", "Customer service assistant"] },
    ],
  },
  {
    id: "grow-ai",
    area: "Marketing",
    name: "Tirunex Grow AI",
    short: "Grow AI",
    sub: "AI-Powered Marketing & Lead Generation",
    emblem: "cone",
    tint: "green",
    shape: "galaxy",
    groups: [
      { title: "Campaign foundation", items: ["Omnichannel campaigns", "Social", "Landing pages", "SEO"] },
      { title: "Content intelligence", items: ["AI content generation", "Social content assistance", "SEO recommendations", "Landing-page content generation"] },
      { title: "Audience & leads", items: ["Lead qualification", "Customer segmentation", "Personalized campaigns", "Predictive lead scoring"] },
      { title: "Performance", items: ["Campaign recommendations", "Campaign performance analysis"] },
    ],
  },
  {
    id: "deliver-ai",
    area: "Delivery",
    name: "Tirunex Deliver AI",
    short: "Deliver AI",
    sub: "Intelligent Project & Resource Management",
    emblem: "stack",
    tint: "indigo",
    shape: "terrain",
    groups: [
      { title: "Project control", items: ["Kanban/Gantt", "Resource allocation", "Client portals", "Budgeting"] },
      { title: "Planning intelligence", items: ["Project risk prediction", "Schedule-risk analysis", "Resource demand forecasting", "Budget variance prediction"] },
      { title: "Automation", items: ["Automated task creation", "Project status summarization", "Timesheet analysis", "AI project assistant"] },
    ],
  },
  {
    id: "insight-ai",
    area: "Intelligence",
    name: "Tirunex Insight AI",
    short: "Insight AI",
    sub: "AI-Powered Business Intelligence",
    emblem: "orb",
    tint: "aurora",
    shape: "wave",
    groups: [
      { title: "Business visibility", items: ["Dashboards", "Reports", "Conversational BI", "Natural-language queries"] },
      { title: "Predictive intelligence", items: ["Predictive analytics", "Forecasting", "Anomaly detection", "Trend identification"] },
      { title: "Executive support", items: ["Automated dashboards", "AI-generated management summaries", "KPI recommendations", "Executive decision support"] },
    ],
  },
  {
    id: "secure-ai",
    area: "Risk",
    name: "Tirunex Secure AI",
    short: "Secure AI",
    sub: "AI-Powered Security & Risk Management",
    emblem: "gem",
    tint: "blue",
    shape: "shield",
    groups: [
      { title: "Security foundation", items: ["RBAC", "2FA", "Audit logs", "GDPR tools"] },
      { title: "Intelligent monitoring", items: ["Intelligent access monitoring", "Anomaly detection", "User-behavior analysis", "Suspicious activity identification"] },
      { title: "Risk response", items: ["AI-assisted security investigation", "Automated audit analysis", "Risk scoring", "Security alerts and recommendations"] },
    ],
  },
  {
    id: "commerce-ai",
    area: "Commerce",
    name: "Tirunex Commerce AI",
    short: "Commerce AI",
    sub: "Intelligent E-Commerce",
    emblem: "knot",
    tint: "cyan",
    shape: "knot",
    groups: [
      { title: "Commerce foundation", items: ["B2B/B2C storefront", "Unified inventory", "Marketplace connectors"] },
      { title: "Shopping experience", items: ["AI product recommendations", "Intelligent search", "Customer personalization", "AI shopping assistant"] },
      { title: "Growth intelligence", items: ["Demand forecasting", "Customer segmentation", "Sales forecasting", "Customer behavior analysis"] },
      { title: "Content & inventory", items: ["Automated product descriptions", "Inventory intelligence"] },
    ],
  },
];

const aiCapabilities = [
  "AI-powered business assistants",
  "Intelligent document processing",
  "Natural-language search",
  "Predictive analytics",
  "Automated recommendations",
  "Intelligent workflow automation",
  "AI-generated reports and summaries",
  "Conversational interfaces",
  "Anomaly and fraud detection",
  "Intelligent forecasting",
  "Automated customer engagement",
  "AI-powered decision support",
];

export default function ProductsPage() {
  return (
    <Page>
      <PageHero
        crumb="Products"
        eyebrow="Tirunex product ecosystem"
        title={
          <>
            Intelligent Business Software - <span className="text-gradient">Powered by AI</span>
          </>
        }
        text="Business process management meets AI, analytics, automation and decision support—so you can understand what is happening, predict what is coming and take action."
        actions={
          <Button href="/contact#contact-form" hero>
            Explore a Product Fit
          </Button>
        }
        scene={{ shape: "lattice", core: 0, x: 2.6, zoom: 8, tint: "blue" }}
        aside={
          <ul data-reveal="stagger" data-hero className="ml-auto grid max-w-sm gap-2">
            {products.map((p, i) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  data-cursor="Jump"
                  className="group flex items-center justify-between rounded-2xl glass px-5 py-3.5 transition-all duration-500 hover:-translate-x-2 hover:border-cyan/50"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-label text-cyan">0{i + 1}</span>
                    <span className="font-medium">{p.short}</span>
                  </span>
                  <span className="text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cyan">→</span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <Scene scene={{ shape: "network", core: 0, x: 0, zoom: 8, tint: "indigo" }} className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="Intelligence across the platform" title="AI capabilities built around real business work." />
          <ul data-reveal="stagger" className="mt-12 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {aiCapabilities.map((c, i) => (
              <li key={c} className="group relative flex items-center gap-4 bg-bg/80 px-5 py-4 backdrop-blur-xl transition-colors duration-500 hover:bg-bg-3/80 sm:p-5">
                <span className="font-mono text-label text-muted transition-colors group-hover:text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body font-medium">{c}</span>
                <Icon name="spark" className="ml-auto h-4 w-4 shrink-0 text-cyan opacity-0 transition-all duration-500 group-hover:rotate-90 group-hover:opacity-100" />
              </li>
            ))}
          </ul>
        </Container>
      </Scene>

      {products.map((p, idx) => (
        <Scene
          key={p.id}
          id={p.id}
          scene={{ shape: p.shape, core: 0, x: idx % 2 ? -2.6 : 2.6, zoom: 8, tint: p.tint }}
          className="relative scroll-mt-24 py-16 sm:py-24"
        >
          <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div className={`lg:sticky lg:top-28 lg:self-start ${idx % 2 ? "lg:order-2" : ""}`}>
              <p data-reveal className="font-mono text-label uppercase text-cyan">
                0{idx + 1} / {p.area}
              </p>
              <h2 data-split className="mt-3 max-w-[16ch] text-h2">
                {p.name}
              </h2>
              <p data-reveal className="mt-3 text-lead text-fg-soft">
                {p.sub}
              </p>
              <div data-reveal="scale" data-emblem-host className="relative mt-8 hidden aspect-square w-[clamp(10rem,18vw,16rem)] place-items-center rounded-full md:grid">
                <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-line-strong" />
                <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />
                <Emblem variant={p.emblem} tint={p.tint} className="h-[78%] w-[78%]" />
              </div>
            </div>
            <div data-reveal="stagger" className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4">
              {p.groups.map((g, gi) => (
                <div key={g.title} data-tilt className={`spotlight rounded-card glass p-5 ${p.groups.length === 3 && gi === 2 ? "sm:col-span-2" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-h3">{g.title}</h3>
                    <span className="font-mono text-label text-muted">
                      {String(gi + 1).padStart(2, "0")}/{String(p.groups.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className={`mt-4 space-y-2 ${p.groups.length === 3 && gi === 2 ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-2" : ""}`}>
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-body text-fg-soft">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="sm:col-span-2">
                <Button href="/contact#contact-form" variant="ghost">
                  Explore {p.short}
                </Button>
              </div>
            </div>
          </Container>
        </Scene>
      ))}
    </Page>
  );
}
