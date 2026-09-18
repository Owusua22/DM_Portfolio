import type { Metadata } from "next";
import BodyClass from "@/components/BodyClass";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Resume from "@/components/sections/Resume";

import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";

// ------------------------------------------------------------------
//  Metadata Configuration (Next.js App Router SEO Engine)
// ------------------------------------------------------------------
const siteUrl = "https://sarahnkansah.com"; // Replace with your live production domain

export const metadata: Metadata = {
  title: "Sarah Nkansah | Certified Digital Marketing Consultant & SEO Specialist",
  description: "Boost your organic reach, search visibility, and conversion pipelines. Partner with Sarah Nkansah for premium SEO, PPC campaigns, HubSpot workflows, and custom UGC video strategy.",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sarah Nkansah | Certified Digital Marketing Consultant & SEO Specialist",
    description: "Partner with Sarah Nkansah to execute data-backed SEO tactics, conversion optimizations, CRM automation, and high-performance brand campaigns.",
    url: siteUrl,
    siteName: "Sarah Nkansah Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/img/profile/sarah.jpeg`,
        width: 1200,
        height: 630,
        alt: "Sarah Nkansah - Digital Marketing Consultant & SEO Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarah Nkansah | Certified Digital Marketing Consultant",
    description: "Scale organic customer acquisition channels and conversion rates with data-driven marketing architecture.",
    images: [`${siteUrl}/assets/img/profile/sarah.jpeg`],
  },
};

// ------------------------------------------------------------------
//  Structured Schema Markup (JSON-LD)
// ------------------------------------------------------------------
const structuralSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Sarah Nkansah",
      "jobTitle": "Digital Marketing Consultant",
      "image": `${siteUrl}/assets/img/profile/sarah.jpeg`,
      "description": "Certified Digital Marketing Consultant specializing in Search Engine Optimization, conversion rate tuning, paid traffic, and UGC production.",
      "url": siteUrl,
      "sameAs": [
        "https://www.linkedin.com/in/your-handle", // Replace with your actual LinkedIn profile
        "https://www.instagram.com/your-handle",   // Replace with your actual Instagram profile
        "https://www.tiktok.com/@your-handle"       // Replace with your actual TikTok profile
      ],
      "knowsAbout": [
        "Search Engine Optimization (SEO)",
        "PPC & Paid Acquisition",
        "Conversion Rate Optimization (CRO)",
        "HubSpot CRM Workflows",
        "Social Media Management",
        "UGC Video Creation"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      "name": "Sarah Nkansah - Digital Marketing Services",
      "image": `${siteUrl}/assets/img/profile/sarah.jpeg`,
      "url": siteUrl,
      "telephone": "", // Add contact phone number if desired
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Accra",
        "addressCountry": "GH"
      },
      "priceRange": "$$",
      "provider": {
        "@id": `${siteUrl}/#person`
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      {/* On-Page Master Schema Graph injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuralSchema) }}
      />

      <BodyClass className="index-page" />
      
      {/* Semantic Sections Structuring */}
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Portfolio />
        <Testimonials />
      
        <Contact />
      </main>
    </>
  );
}