
import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "swiper/css/bundle";
import "@/styles/main.css";

import AosInit from "@/components/AosInit";
import Header from "@/components/Header";
import ScrollTop from "@/components/ScrollTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://sarahnkansah.com"),

  title: "Sarah Nkansah | Digital Marketing & SEO Specialist in Ghana",

  description:
    "Sarah Nkansah is a digital marketing and SEO specialist in Ghana focused on SEO, content strategy, social media, web development and strategic digital solutions.",

  authors: [
    {
      name: "Sarah Nkansah",
      url: "https://sarahnkansah.com",
    },
  ],

  creator: "Sarah Nkansah",
  publisher: "Sarah Nkansah",

  alternates: {
    canonical: "https://sarahnkansah.com/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/sn_logo.png",
    apple: "/sn_logo.png",
  },

  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://sarahnkansah.com/",
    siteName: "Sarah Nkansah",
    title: "Sarah Nkansah | Digital Marketing & SEO Specialist in Ghana",
    description:
      "Explore Sarah Nkansah's portfolio featuring SEO, digital marketing, content strategy, social media, web development and strategic digital projects.",
    images: [
      {
        url: "/sn_logo.png",
        width: 512,
        height: 512,
        alt: "Sarah Nkansah - Digital Marketing and SEO Specialist",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sarah Nkansah | Digital Marketing & SEO Specialist in Ghana",
    description:
      "Digital marketing, SEO, content strategy, social media and web development portfolio of Sarah Nkansah.",
    images: ["/sn_logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GH">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Noto+Sans:wght@300;400;500;600;700;800;900&family=Questrial&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <AosInit />

        <Header />

        <main className="main">{children}</main>

        <ScrollTop />
      </body>
    </html>
  );
}

