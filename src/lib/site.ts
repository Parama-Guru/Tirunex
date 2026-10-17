export const site = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  name: "Tirunex",
  legalName: "Tirunex Systems Private Limited",
  url: "https://parama-guru.github.io/Tirunex",
  tagline: "Technology + AI + Automation + Talent",
  footerLine: "Empowering Growth through Unified Technology, AI & Talent",
  motto: "Run better. Grow faster. Automate intelligently. Scale confidently.",
  email: "sales@tirunex.com",
  phone: "+91 98841 82037",
  phoneHref: "tel:+919884182037",
  address: "Porur, Chennai, Tamil Nadu - 600 116, India.",
  linkedin: "https://www.linkedin.com/company/tirunex/",
  whatsapp: "https://wa.me/919884182037",
  whatsappHello:
    "https://wa.me/919884182037?text=Hello%20Tirunex%20team%2C%20I%20would%20like%20to%20enquire%20about%20your%20solutions.",
} as const;

/** Prefix for files in /public; next/image does not add basePath to string sources. */
export const asset = (path: string) => `${site.basePath}${path}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Services", href: "/services" },
  { label: "Industry Solutions", href: "/industries" },
  { label: "Manpower", href: "/manpower" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerExplore = [
  { label: "Products", href: "/products" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Services", href: "/services" },
  { label: "Industry Solutions", href: "/industries" },
  { label: "Manpower", href: "/manpower" },
  { label: "About", href: "/about" },
] as const;

export const footerConnect = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;
