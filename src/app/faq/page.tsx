import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Container, PageHero } from "@/components/ui/Section";
import { Accordion } from "@/components/sections/Accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Tirunex",
  description: "Answers about Tirunex products, AI Agents, private AI, modular solutions and manpower services.",
};

const faqs = [
  { q: "What is Tirunex?", a: "Tirunex is a technology, AI, automation and talent solutions provider focused on helping growing businesses modernize and scale." },
  {
    q: "What AI solutions does Tirunex provide?",
    a: "AI-integrated business applications, AI Agents, enterprise AI assistants, RAG and knowledge systems, predictive analytics, intelligent document processing and AI-powered automation.",
  },
  { q: "Can Tirunex build a custom AI Agent?", a: "Yes. Custom AI Agents can be designed for sales, customer service, finance, HR, operations, IT and management use cases." },
  { q: "Can AI Agents integrate with existing systems?", a: "Yes. Agents can be designed to work with approved APIs, databases, documents, enterprise applications and workflow systems." },
  { q: "Can Tirunex deploy AI privately?", a: "Private, on-premise, private-cloud and controlled enterprise AI architectures can be supported based on security and data requirements." },
  { q: "Are Tirunex products modular?", a: "Yes. Businesses can start with selected capabilities and expand as needs grow." },
  {
    q: "Does Tirunex provide manpower services?",
    a: "Yes. Skilled and trained manpower, temporary and contract staffing, permanent recruitment, payroll support, outsourcing and workforce solutions are included.",
  },
  { q: "Who can use Tirunex solutions?", a: "Particularly SMBs across retail, manufacturing, professional services, logistics, healthcare, financial services and other industries." },
];

export default function FAQPage() {
  return (
    <Page>
      <PageHero compact
        crumb="FAQ"
        eyebrow="Clear answers"
        title={
          <>
            Frequently Asked <span className="text-gradient">Questions</span>
          </>
        }
        text="What to know about Tirunex technology, AI, automation and workforce solutions."
        scene={{ shape: "knot", core: 0, x: 2.6, zoom: 8, tint: "cyan" }}
      />
      <Scene scene={{ shape: "cloud", core: 0, x: 0, zoom: 9, tint: "indigo" }} className="relative pb-24">
        <Container className="max-w-[1100px]">
          <Accordion items={faqs} />
        </Container>
      </Scene>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
    </Page>
  );
}
