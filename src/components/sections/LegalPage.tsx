import type { ReactNode } from "react";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Container, PageHero } from "@/components/ui/Section";
import { ScrollSpy } from "@/components/sections/ScrollSpy";
import { site } from "@/lib/site";
import type { SceneShape } from "@/lib/store";

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({
  crumb,
  title,
  text,
  notice,
  sections,
  contactIntro,
  shape,
}: {
  crumb: string;
  title: string;
  text: string;
  notice: ReactNode;
  sections: LegalSection[];
  contactIntro: string;
  shape: SceneShape;
}) {
  const all = [...sections, { id: "contact-us", title: "Contact Us", body: null }];
  return (
    <Page>
      <PageHero crumb={crumb} eyebrow="Legal" title={title} text={text} scene={{ shape, core: 0, x: 2.8, zoom: 9, tint: "indigo" }} />
      <Scene scene={{ shape: "cloud", core: 0, x: 0, zoom: 10, tint: "blue" }} className="relative pb-24">
        <Container className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <ScrollSpy items={all.map((s) => ({ id: s.id, label: s.title }))} />
          </aside>
          <div className="max-w-3xl">
            <div data-reveal className="rounded-card border border-cyan/40 bg-cyan/10 p-6 text-fg-soft">
              {notice}
            </div>
            <div className="mt-12 space-y-14">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-32">
                  <p data-reveal className="font-mono text-label text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 data-split className="mt-2 text-h2">
                    {s.title}
                  </h2>
                  <p data-reveal className="mt-4 text-lead text-fg-soft">
                    {s.body}
                  </p>
                </section>
              ))}
              <section id="contact-us" className="scroll-mt-32">
                <p data-reveal className="font-mono text-label text-cyan">
                  {String(sections.length + 1).padStart(2, "0")}
                </p>
                <h2 data-split className="mt-2 text-h2">
                  Contact Us
                </h2>
                <p data-reveal className="mt-4 text-lead text-fg-soft">
                  {contactIntro}
                </p>
                <div data-reveal className="mt-6 rounded-card glass p-6 text-fg-soft">
                  <p className="font-semibold text-fg">{site.legalName}</p>
                  <p className="mt-3">
                    Email:{" "}
                    <a href={`mailto:${site.email}`} className="text-cyan hover:underline">
                      {site.email}
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a href={site.phoneHref} className="text-cyan hover:underline">
                      {site.phone}
                    </a>
                  </p>
                  <p>Address: Porur, Chennai, Tamil Nadu - 600 116, India</p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Scene>
    </Page>
  );
}
