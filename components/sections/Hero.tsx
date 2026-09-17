"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data & Brand Color Constants                                      */
/* ------------------------------------------------------------------ */
const ACCENT = "rgb(230, 127, 31)";
const EMERALD = "rgb(26, 120, 100)";

const STATS = [
  { number: "2+", label: "Years Experience" },
  { number: "10+", label: "Projects Delivered" },
  { number: "5+", label: "Happy Clients" },
];

type Tip = "top" | "bottom";
const MARKETING_TOOLS: {
  name: string;
  type: string;
  tip: Tip;
  delay: string;
  position: React.CSSProperties;
  centered?: boolean;
}[] = [
  { name: "Google Analytics", type: "analytics", tip: "bottom", delay: "0s",    position: { top: "-6%", left: "50%" }, centered: true },
  { name: "Semrush",          type: "semrush",   tip: "bottom", delay: "0.4s",  position: { top: "8%", right: "10%" } },
  { name: "HubSpot",          type: "hubspot",   tip: "top",    delay: "0.8s",  position: { top: "32%", right: "-6%" } },
  { name: "Ahrefs",           type: "ahrefs",    tip: "top",    delay: "1.2s",  position: { bottom: "16%", right: "4%" } },
  { name: "Facebook",         type: "facebook",  tip: "top",    delay: "1.6s",  position: { bottom: "-6%", right: "26%" } },
  { name: "Instagram",        type: "instagram", tip: "top",    delay: "2.0s",  position: { bottom: "-6%", left: "26%" } },
  { name: "TikTok",           type: "tiktok",    tip: "top",    delay: "2.4s",  position: { bottom: "16%", left: "4%" } },
  { name: "Google Ads",       type: "googleAds", tip: "top",    delay: "2.8s",  position: { top: "32%", left: "-6%" } },
  { name: "Mailchimp",        type: "mailchimp", tip: "bottom", delay: "3.2s",  position: { top: "8%", left: "10%" } },
];

/* ------------------------------------------------------------------ */
/*  Viewport Hook for Full Inline Responsiveness                      */
/* ------------------------------------------------------------------ */
function useViewport() {
  const [vp, setVp] = useState({ width: 1200, reducedMotion: false, touch: false });

  useEffect(() => {
    const update = () =>
      setVp({
        width: window.innerWidth,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        touch: window.matchMedia("(hover: none)").matches,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return vp;
}

/* ------------------------------------------------------------------ */
/*  Responsive SVG Tool Icons                                         */
/* ------------------------------------------------------------------ */
function ToolLogo({ type, size }: { type: string; size: number }) {
  const s: React.CSSProperties = { width: size, height: size, display: "block" };

  switch (type) {
    case "analytics":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <rect x="10" y="29" width="12" height="25" rx="6" fill="#F9AB00" />
          <rect x="27" y="18" width="12" height="36" rx="6" fill="#F9AB00" />
          <circle cx="50" cy="13" r="7" fill="#F9AB00" />
          <rect x="44" y="29" width="12" height="25" rx="6" fill="#E37400" />
        </svg>
      );
    case "semrush":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <circle cx="31" cy="32" r="18" fill="#FF642D" />
          <path d="M16 36c8-8 18-11 32-7l8 3-8 6c-10 5-22 4-32-2Z" fill="#FF642D" />
          <circle cx="29" cy="29" r="5" fill="#fff" />
          <circle cx="29" cy="29" r="2.5" fill="#FF642D" />
        </svg>
      );
    case "hubspot":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <circle cx="32" cy="32" r="8" fill="#FF7A59" />
          <circle cx="17" cy="18" r="6" fill="#FF7A59" />
          <circle cx="49" cy="19" r="6" fill="#FF7A59" />
          <circle cx="49" cy="47" r="6" fill="#FF7A59" />
          <path d="M26 26 20 21m18 5 7-5M38 37l7 7" stroke="#FF7A59" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "ahrefs":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <path d="M14 48 27 16h10l13 32h-9l-3-8H25l-3 8h-9Zm14-15h7l-3.5-10L28 33Z" fill="#1F8ACB" />
          <rect x="43" y="16" width="8" height="8" rx="2" fill="#F58220" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <circle cx="32" cy="32" r="27" fill="#1877F2" />
          <path d="M36 52V34h6l1-7h-7v-4c0-2 1-4 4-4h4v-6c-1 0-3-1-6-1-7 0-11 4-11 11v4h-6v7h6v18h9Z" fill="#fff" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <defs>
            <linearGradient id="instagramGradient" x1="0" y1="64" x2="64" y2="0">
              <stop stopColor="#FFD600" />
              <stop offset="0.5" stopColor="#E4405F" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <rect x="7" y="7" width="50" height="50" rx="15" fill="url(#instagramGradient)" />
          <rect x="18" y="18" width="28" height="28" rx="9" fill="none" stroke="#fff" strokeWidth="4" />
          <circle cx="32" cy="32" r="7" fill="none" stroke="#fff" strokeWidth="4" />
          <circle cx="43" cy="21" r="2.5" fill="#fff" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <path d="M37 10v29c0 7-5 12-12 12s-12-5-12-12 5-12 12-12c2 0 4 0 5 1v8c-1-1-2-1-4-1-3 0-5 2-5 5s2 5 5 5 5-2 5-5V10h7c1 6 5 10 11 11v8c-5 0-9-2-11-5v-14Z" fill="#111" />
          <path d="M34 11v29c0 7-5 12-12 12-2 0-4-1-6-2 2 3 5 5 10 5 7 0 12-5 12-12V15c3 4 7 6 12 6v-3c-7-1-11-4-13-7h-3Z" fill="#25F4EE" opacity="0.9" />
          <path d="M30 28c-2-1-4-1-5-1-7 0-12 5-12 12 0 2 1 4 2 6-1-2-1-3-1-5 0-7 5-12 12-12 2 0 3 0 4 1v-1Z" fill="#FE2C55" />
        </svg>
      );
    case "googleAds":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <path d="M27 11c4-2 9 0 11 4l18 32c2 4 1 9-4 11-4 2-9 0-11-4L23 22c-2-4 0-9 4-11Z" fill="#4285F4" />
          <path d="M23 22 8 48c-2 4-1 9 4 11 4 2 9 0 11-4l12-21-12-12Z" fill="#34A853" />
          <circle cx="15" cy="49" r="9" fill="#FBBC04" />
        </svg>
      );
    case "mailchimp":
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden="true">
          <circle cx="32" cy="32" r="25" fill="#FFE01B" />
          <circle cx="24" cy="29" r="3" fill="#222" />
          <circle cx="40" cy="29" r="3" fill="#222" />
          <path d="M22 39c6 6 14 6 20 0" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
          <path d="M19 21c2-7 8-10 13-10s11 3 13 10" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Main Hero Section                                                 */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const { width, reducedMotion, touch } = useViewport();
  const isMobile = width < 576;
  const isTablet = width < 992;

  /* Custom Hover States for CTA Buttons */
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  /* Responsive Positioning Sizing Engine */
  const orbitMax = isMobile ? 290 : isTablet ? 400 : 520;
  const icon     = isMobile ? 38 : isTablet ? 48 : 58;
  const logo     = Math.round(icon * 0.48);
  const overhang = Math.round(orbitMax * 0.06) + 8;
  const photoBorder = isMobile ? 6 : isTablet ? 8 : 10;

  /* Tooltip Dynamic Display State */
  const [active, setActive] = useState<string | null>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const close = (e: PointerEvent) => {
      if (!orbitRef.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [active]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sarah Nkansah - Certified Digital Marketing Consultant",
    image: "https://yourdomain.com/assets/img/profile/sarah.jpeg",
    jobTitle: "Digital Marketing Consultant",
    description:
      "High-impact search engine optimization (SEO), Google Ads PPC, HubSpot CRM pipelines, and strategic campaigns engineered for scalable growth.",
    knowsAbout: [
      "Search Engine Optimization (SEO)",
      "PPC Paid Advertising Campaigns",
      "HubSpot CRM Automation",
      "Conversion Rate Optimization (CRO)",
      "Digital Marketing Strategy",
    ],
  };

  return (
    <section
      id="hero"
      className="hero section"
      aria-labelledby="hero-title"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "48px 0 40px" : isTablet ? "72px 0 64px" : "96px 0 80px",
      }}
    >
      {/* On-Page SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes heroFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
        @keyframes heroPulse { 0% { box-shadow: 0 0 0 0 rgba(230,127,31,0.5); } 70% { box-shadow: 0 0 0 8px rgba(230,127,31,0); } 100% { box-shadow: 0 0 0 0 rgba(230,127,31,0); } }
      `}</style>

      {/* Atmospheric Radial Gradients */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "min(45vw, 620px)",
          height: "min(45vw, 620px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(26,120,100,0.18), transparent 65%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-12%",
          width: "min(38vw, 520px)",
          height: "min(38vw, 520px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(230,127,31,0.14), transparent 65%)`,
          filter: "blur(65px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" data-aos="fade-up" data-aos-delay="100" style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 32 : isTablet ? 48 : 56,
          }}
        >
          {/* ======================= COPY COLUMN ======================= */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            style={{
              flex: "1 1 0",
              width: "100%",
              order: isTablet ? 2 : 1,
              textAlign: isTablet ? "center" : "left",
              display: "flex",
              flexDirection: "column",
              alignItems: isTablet ? "center" : "flex-start",
            }}
          >
            {/* Availability Badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px 6px 10px",
                borderRadius: 999,
                background: "#ffffff",
                border: `1px solid rgba(26,120,100,0.18)`,
                boxShadow: "0 6px 18px rgba(20,58,52,0.06)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 18,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: ACCENT,
                  animation: reducedMotion ? "none" : "heroPulse 2s infinite",
                }}
              />
              Available for new projects
            </span>

            <p
              style={{
                margin: "0 0 10px",
                fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: ACCENT,
              }}
            >
              Hi, I&apos;m Sarah Nkansah
            </p>

            {/* Ultra Bold Typography */}
            <h1
              id="hero-title"
              className="text-dark"
              style={{
                margin: "0 0 20px",
                fontSize: "clamp(2.3rem, 6vw, 4.3rem)",
                fontWeight: 950,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                textWrap: "balance",
                maxWidth: isTablet ? "18ch" : "none",
              }}
            >
              A Certified{" "}
              <span style={{ color: ACCENT, position: "relative", display: "inline-block" }}>
                Digital Marketing
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: "-0.1em",
                    width: "100%",
                    height: "0.26em",
                    color: "rgba(230,127,31,0.25)",
                    pointerEvents: "none",
                  }}
                >
                  <path d="M2 9c40-6 120-8 196-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Consultant
            </h1>

            <p
              className="text-muted"
              style={{
                margin: "0 0 32px",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                lineHeight: 1.8,
                maxWidth: "54ch",
              }}
            >
              I provide proven, data-driven strategies that turn digital challenges into
              results maximizing search visibility, acquiring high-quality leads, and
              boosting revenue for your business.
            </p>

            {/* Orange CTA Buttons with Icons */}
            <div 
              className="cta-buttons" 
              style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "16px", 
                marginBottom: "40px",
                justifyContent: isTablet ? "center" : "flex-start",
                width: "100%"
              }}
            >
              <a
                href="#portfolio"
                onMouseEnter={() => setHoverPrimary(true)}
                onMouseLeave={() => setHoverPrimary(false)}
                aria-label="View Sarah Nkansah's Marketing Portfolio"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: ACCENT,
                  color: "#ffffff",
                  border: `2px solid ${ACCENT}`,
                  borderRadius: "50px",
                  padding: "12px 30px",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: hoverPrimary ? "0 12px 28px rgba(230, 127, 31, 0.35)" : "0 8px 24px rgba(230, 127, 31, 0.25)",
                  transform: hoverPrimary ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
              >
                View My Work
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ 
                    transition: "transform 0.3s ease", 
                    transform: hoverPrimary ? "translateX(4px)" : "none" 
                  }}
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <a
                href="#contact"
                onMouseEnter={() => setHoverSecondary(true)}
                onMouseLeave={() => setHoverSecondary(false)}
                aria-label="Hire Sarah Nkansah as your marketing consultant"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: hoverSecondary ? "rgba(230, 127, 31, 0.08)" : "transparent",
                  color: ACCENT,
                  border: `2px solid ${ACCENT}`,
                  borderRadius: "50px",
                  padding: "11px 29px",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: hoverSecondary ? "0 8px 20px rgba(230, 127, 31, 0.15)" : "none",
                  transform: hoverSecondary ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
              >
                Hire Me
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </a>
            </div>

            {/* Accessibly Rendered Metrics Summary */}
            <dl
              data-aos="fade-up"
              data-aos-delay="400"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: isMobile ? 10 : 16,
                width: "100%",
                maxWidth: 530,
                margin: 0,
                paddingTop: 28,
                borderTop: `1px solid rgba(26,120,100,0.15)`,
              }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    padding: isMobile ? "10px 4px" : "14px 16px",
                    borderRadius: 16,
                    background: "rgba(255, 255, 255, 0.75)",
                    border: `1px solid rgba(26,120,100,0.12)`,
                    boxShadow: "0 10px 30px rgba(20,58,52,0.06)",
                    textAlign: "center",
                  }}
                >
                  <dt
                    className="text-muted"
                    style={{
                      fontSize: isMobile ? 9 : 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      lineHeight: 1.3,
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontSize: "clamp(1.5rem, 4vw, 2.3rem)",
                      fontWeight: 900,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: ACCENT,
                    }}
                  >
                    {stat.number}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ======================= VISUAL ORBIT COLUMN ======================= */}
          <div
            style={{
              flex: "1 1 0",
              width: "100%",
              order: isTablet ? 1 : 2,
              display: "flex",
              justifyContent: "center",
              padding: `${overhang + (isTablet ? 8 : 0)}px ${overhang}px ${overhang}px`,
            }}
          >
            <div
              ref={orbitRef}
              data-aos="zoom-out"
              data-aos-delay="300"
              style={{
                position: "relative",
                width: `min(100%, ${orbitMax}px)`,
                aspectRatio: "1 / 1",
                display: "grid",
                placeItems: "center",
              }}
            >
              {/* Radial Blur Backdrop */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "78%",
                  height: "78%",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(26,120,100,0.22), transparent 70%)`,
                  filter: "blur(28px)",
                }}
              />

              {/* Orbiting Ring Outlines */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "98%",
                  height: "98%",
                  border: `1.5px dashed rgba(26,120,100,0.18)`,
                  borderRadius: "50%",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "80%",
                  height: "80%",
                  border: `1.5px dashed rgba(26,120,100,0.35)`,
                  borderRadius: "50%",
                }}
              />

              {/* Scaled Profile Image Container (74% Aspect Width) */}
              <figure
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: "74%",
                  aspectRatio: "1 / 1",
                  margin: 0,
                  overflow: "hidden",
                  borderRadius: "50%",
                  border: `${photoBorder}px solid #ffffff`,
                  background: "#e9f5f2",
                  boxShadow: "0 22px 60px rgba(20,58,52,0.22), 0 0 0 1px rgba(26,120,100,0.08)",
                }}
              >
                <img
                  src="/assets/img/profile/sarah.jpeg"
                  alt="Sarah Nkansah - Digital Marketing Consultant & Strategic Marketer"
                  width={400}
                  height={400}
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
              </figure>

              {/* Floating Tool Integration System */}
              <ul
                aria-label="Digital Marketing Integrations Suite"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {MARKETING_TOOLS.map((tool) => {
                  const isActive = active === tool.name;
                  const tipBelow = tool.tip === "bottom";

                  return (
                    <li
                      key={tool.name}
                      style={{
                        position: "absolute",
                        ...tool.position,
                        width: icon,
                        height: icon,
                        transform: tool.centered ? "translateX(-50%)" : undefined,
                        zIndex: isActive ? 10 : 3,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          animation: reducedMotion
                            ? "none"
                            : `heroFloat 5.5s ease-in-out ${tool.delay} infinite alternate`,
                        }}
                      >
                        <button
                          type="button"
                          aria-label={`${tool.name} integration capability`}
                          onMouseEnter={() => !touch && setActive(tool.name)}
                          onMouseLeave={() => !touch && setActive(null)}
                          onFocus={() => setActive(tool.name)}
                          onBlur={() => setActive(null)}
                          onClick={() => touch && setActive((a) => (a === tool.name ? null : tool.name))}
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            padding: 0,
                            border: 0,
                            borderRadius: "50%",
                            background: "#ffffff",
                            cursor: "pointer",
                            outline: "none",
                            transform: isActive ? "scale(1.18)" : "scale(1)",
                            boxShadow: isActive
                              ? `0 15px 35px rgba(26,120,100,0.30), 0 0 0 3px rgba(230,127,31,0.35)`
                              : "0 10px 25px rgba(25,55,50,0.16)",
                            transition: reducedMotion
                              ? "none"
                              : "transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.3s ease",
                          }}
                        >
                          <ToolLogo type={tool.type} size={logo} />

                          {/* Dynamic Action Tooltips */}
                          <span
                            role="tooltip"
                            aria-hidden={!isActive}
                            style={{
                              position: "absolute",
                              left: "50%",
                              ...(tipBelow
                                ? { top: "calc(100% + 10px)" }
                                : { bottom: "calc(100% + 10px)" }),
                              transform: `translate(-50%, ${isActive ? 0 : tipBelow ? -6 : 6}px)`,
                              opacity: isActive ? 1 : 0,
                              background: "#111827",
                              color: "#ffffff",
                              padding: "6px 12px",
                              borderRadius: 6,
                              fontSize: isMobile ? 10 : 11,
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              pointerEvents: "none",
                              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
                              transition: reducedMotion ? "none" : "opacity .25s ease, transform .25s ease",
                              zIndex: 20,
                            }}
                          >
                            {tool.name}
                            <span
                              aria-hidden="true"
                              style={{
                                position: "absolute",
                                left: "50%",
                                ...(tipBelow ? { top: -4 } : { bottom: -4 }),
                                width: 8,
                                height: 8,
                                background: "#111827",
                                transform: "translateX(-50%) rotate(45deg)",
                              }}
                            />
                          </span>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}