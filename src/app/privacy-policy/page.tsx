import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Tirunex",
  description: "Privacy policy information for the Tirunex website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      crumb="Privacy Policy"
      title="Privacy Policy"
      text="How information submitted through this website is intended to be handled."
      shape="shield"
      notice={
        <>
          <strong className="text-fg">Privacy Notice:</strong> This privacy policy explains how Tirunex Systems Private Limited collects, uses, and protects information submitted
          through our website. Effective date: September 2026.
        </>
      }
      sections={[
        {
          id: "information-you-provide",
          title: "Information you provide",
          body: "The website enquiry form may collect your name, company, email, contact number, industry, requirement and preferred contact method when you choose to submit them.",
        },
        {
          id: "how-information-may-be-used",
          title: "How information may be used",
          body: "Submitted information is intended to be used to respond to enquiries, understand service requirements and communicate about relevant Tirunex products or services.",
        },
        {
          id: "form-and-communication-services",
          title: "Form and communication services",
          body: "The website may be configured before launch to use a form-to-email service, third-party form API, email redirect or WhatsApp. The final policy must identify any providers that receive personal information.",
        },
        {
          id: "cookies-and-analytics",
          title: "Cookies and analytics",
          body: "No analytics or advertising scripts are included in this initial static build. If analytics, conversion tracking or other technologies are added, this policy and any consent controls must be updated as required.",
        },
        {
          id: "security-and-retention",
          title: "Security and retention",
          body: "Appropriate technical and organizational measures should be defined for the final enquiry service. Retention periods and deletion procedures must be documented before launch.",
        },
        {
          id: "your-choices-and-rights",
          title: "Your choices and rights",
          body: "The final policy should explain applicable privacy rights and how to exercise them under the laws relevant to Tirunex and its website visitors.",
        },
      ]}
      contactIntro="For any questions, requests, or concerns regarding your privacy and personal data, please contact:"
    />
  );
}
