import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Container, PageHero } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Tirunex | Start a Conversation",
  description: "Talk with Tirunex about business software, AI Agents, automation, technology services or workforce support.",
};

const direct: { label: string; value: string; href: string; icon: IconName; external?: boolean }[] = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "mail" },
  { label: "Phone", value: site.phone, href: site.phoneHref, icon: "phone" },
  { label: "LinkedIn", value: "linkedin.com/company/tirunex", href: site.linkedin, icon: "linkedin", external: true },
  { label: "Address", value: "Porur, Chennai, Tamil Nadu - 600 116, India", href: "https://maps.google.com/?q=Porur,+Chennai,+Tamil+Nadu+600116", icon: "pin", external: true },
];

export default function ContactPage() {
  return (
    <Page>
      <PageHero compact
        crumb="Contact"
        eyebrow="Start a conversation"
        title={
          <>
            Let&apos;s Build What&apos;s <span className="text-gradient">Next</span>
          </>
        }
        text="Enquire about business software, AI integration, AI Agents, automation, digital transformation, technology services or workforce support."
        actions={
          <>
            <Button href="#contact-form" hero>
              Request a Consultation
            </Button>
            <Button href="/ai-agents" variant="ghost" hero>
              Talk to an AI Expert
            </Button>
          </>
        }
        scene={{ shape: "galaxy", core: 0.9, x: 2.4, zoom: 7.5, tint: "blue" }}
      />

      <Scene id="contact-form" scene={{ shape: "wave", core: 0, x: 0, zoom: 8, tint: "indigo" }} className="relative scroll-mt-24 py-16 sm:py-24">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="min-w-0">
            <p data-reveal className="eyebrow">
              Tell us what you need
            </p>
            <h2 data-split className="mt-5 max-w-[20ch] text-h2">
              A useful conversation starts with context.
            </h2>
            <p data-reveal className="mt-6 text-lead text-fg-soft">
              Share your challenge, opportunity or requirement. We’ll use it to understand the right starting point.
            </p>
            <div className="mt-12">
              <p data-reveal className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                Direct Inquiries:
              </p>
              <ul data-reveal="stagger" className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3">
                {direct.map((d) => (
                  <li key={d.label}>
                    <a
                      href={d.href}
                      target={d.external ? "_blank" : undefined}
                      rel={d.external ? "noopener noreferrer" : undefined}
                      data-cursor="Open"
                      className="group flex items-center gap-4 rounded-2xl glass p-4 transition-all duration-500 hover:translate-x-2 hover:border-cyan/50"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue/25 to-cyan/10 text-cyan ring-1 ring-cyan/30">
                        <Icon name={d.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-label uppercase tracking-[0.12em] text-muted">{d.label}</span>
                        <span className="block truncate font-medium">{d.value}</span>
                      </span>
                      <span className="ml-auto text-muted transition-all group-hover:translate-x-1 group-hover:text-cyan">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal="up" className="min-w-0">
            <ContactForm />
          </div>
        </Container>
      </Scene>
    </Page>
  );
}
