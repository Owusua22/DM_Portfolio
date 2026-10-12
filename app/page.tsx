import type { Metadata } from "next";
import BodyClass from "@/components/BodyClass";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Resume from "@/components/sections/Resume";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";

// ------------------------------------------------------------------
//  Static Metadata — generated at build time, no server runtime
//  (For 100% CSR you could also move this into <head> statically,
//   but Next.js `output: export` bakes it into static HTML.)
// ------------------------------------------------------------------
const siteUrl = "https://sarahnkansah.com";

export const metadata: Metadata = {
  title: "Sarah Nkansah | Digital Marketing & Full-Stack Developer",
  description:
    "Digital marketing & full-stack portfolio of Sarah Nkansah — SEO, PPC, HubSpot, React/Next.js, Node.js and data-driven growth. 100% static front-end, no SSR.",
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: { index: true, follow: true, noimageindex: false, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Sarah Nkansah | Digital Marketing & Full-Stack Developer",
    description: "SEO, PPC, HubSpot + React/Next.js, Node, Supabase. Explore case studies and full-stack projects — static, fast, no server.",
    url: siteUrl,
    siteName: "Sarah Nkansah Portfolio",
    locale: "en_GH",
    type: "website",
    images: [{ url: `${siteUrl}/assets/img/profile/sarah.jpeg`, width: 1200, height: 630, alt: "Sarah Nkansah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarah Nkansah | Digital Marketer & Developer",
    description: "Marketing + engineering: SEO, content, paid, CRM, and full-stack web apps.",
    images: [`${siteUrl}/assets/img/profile/sarah.jpeg`],
  },
};

// ------------------------------------------------------------------
//  Structured Schema Markup (JSON-LD) — static, client-parsed
// ------------------------------------------------------------------
const structuralSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Sarah Nkansah",
      jobTitle: "Digital Marketing Consultant & Full-Stack Developer",
      image: `${siteUrl}/assets/img/profile/sarah.jpeg`,
      description:
        "Digital marketing consultant and full-stack developer (React, Next.js, Node, Supabase) specializing in SEO, conversion optimization, paid acquisition and marketing-tech builds.",
      url: siteUrl,
      sameAs: [
        "https://www.linkedin.com/in/sarah-nkansah",
        "https://www.instagram.com/your-handle",
        "https://www.tiktok.com/@your-handle",
      ],
      knowsAbout: [
        "Search Engine Optimization (SEO)",
        "PPC & Paid Acquisition",
        "Conversion Rate Optimization (CRO)",
        "HubSpot CRM Workflows",
        "React / Next.js / TypeScript",
        "Node.js & Supabase",
        "Social Media Management",
        "UGC Video Creation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Sarah Nkansah — Digital Marketing & Web Development",
      image: `${siteUrl}/assets/img/profile/sarah.jpeg`,
      url: siteUrl,
      address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
      priceRange: "$$",
      provider: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }} />
      <BodyClass className="index-page" />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Services />
        <Resume />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
