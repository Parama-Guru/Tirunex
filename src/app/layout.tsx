import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Geist, Geist_Mono } from "next/font/google";
import { Experience } from "@/components/layout/Experience";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { site } from "@/lib/site";
import "./globals.css";

const display = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const sans = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tirunex | Technology, AI, Automation & Talent",
    template: "%s",
  },
  description: "Unified technology, AI, automation and talent solutions that help growing businesses run better and scale confidently.",
  openGraph: {
    title: "Tirunex - Build a Smarter, More Scalable Business",
    description: "Unified technology, AI, automation and talent solutions that help growing businesses run better and scale confidently.",
    siteName: site.legalName,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#040a14" },
    { media: "(prefers-color-scheme: light)", color: "#f3f6fb" },
  ],
};

// Applies the saved theme before first paint to avoid a flash of the wrong palette.
const themeScript = `(function(){try{var t=localStorage.getItem('tirunex-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only z-[300] rounded-full bg-blue px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Experience>
          <Header />
          <main>{children}</main>
          <Footer />
        </Experience>
        <WhatsAppWidget />
        <Cursor />
        <Preloader />
      </body>
    </html>
  );
}
