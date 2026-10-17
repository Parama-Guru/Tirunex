import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tirunex",
  description: "Terms and conditions for use of the Tirunex website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms & Conditions"
      title="Terms & Conditions"
      text="Terms intended to govern use of the Tirunex website."
      shape="lattice"
      notice={
        <>
          <strong className="text-fg">Terms of Service:</strong> These Terms &amp; Conditions govern your access to and use of the Tirunex Systems Private Limited website and digital
          properties. Effective date: September 2026.
        </>
      }
      sections={[
        {
          id: "website-use",
          title: "Website use",
          body: "This website presents information about Tirunex products, AI capabilities, technology services, industry solutions and workforce services. Visitors should use the website lawfully and avoid attempts to disrupt or compromise it.",
        },
        {
          id: "informational-content",
          title: "Informational content",
          body: "Website content is general information and does not by itself create a service agreement, employment relationship, warranty or professional advice. Scope, deliverables, responsibilities and commercial terms must be agreed separately.",
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          body: "All Tirunex trademarks, logos, service names, website design, content, and related digital assets are the intellectual property of Tirunex Systems Private Limited.",
        },
        {
          id: "third-party-services-and-links",
          title: "Third-party services and links",
          body: "Configured form, email, WhatsApp, social, hosting or analytics services may have their own terms and privacy practices. External destinations are provided for user convenience.",
        },
        {
          id: "availability",
          title: "Availability",
          body: "The static website may be updated, suspended or changed. Product and service availability should be confirmed directly with Tirunex.",
        },
        {
          id: "liability-and-governing-law",
          title: "Liability and governing law",
          body: "These terms are governed by and construed in accordance with the laws of India, under the jurisdiction of courts in Chennai, Tamil Nadu.",
        },
      ]}
      contactIntro="For questions or notices regarding these Terms & Conditions, please contact:"
    />
  );
}
