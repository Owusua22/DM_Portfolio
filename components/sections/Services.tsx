"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

/* ------------------------------------------------------------------ */
/*  Tokens & data                                                      */
/* ------------------------------------------------------------------ */
const ACCENT = "#f97316";
const INK = "#0f2f2a";
const MUTED = "#4b625d";

const SERVICES = [
  { icon: "bi-search",          title: "SEO",                    desc: "Keyword research, on-page & technical fixes that rank and bring qualified traffic.", from: "#1a7864", to: "#2fb38f" },
  { icon: "bi-bullseye",        title: "Google Ads (PPC)",       desc: "Search & display campaigns structured to cut cost-per-lead and lift ROAS.",        from: "#4285F4", to: "#60a5fa" },
  { icon: "bi-share",           title: "Social Media Marketing", desc: "Platform strategy, content calendars & community growth for IG, TikTok, FB & LinkedIn.", from: "#ec4899", to: "#f472b6" },
  { icon: "bi-pencil-square",   title: "Content Strategy",       desc: "Audience-led content plans and copy that educate, engage and convert.",             from: "#f97316", to: "#fb923c" },
  { icon: "bi-envelope-paper",  title: "Email Marketing",        desc: "Mailchimp & HubSpot flows, newsletters and automations that nurture leads.",        from: "#eab308", to: "#facc15" },
  { icon: "bi-graph-up-arrow",  title: "Analytics & Reporting",  desc: "GA4 dashboards and clear reports that turn data into decisions.",                    from: "#8b5cf6", to: "#a78bfa" },
  { icon: "bi-people",          title: "Audience Research",      desc: "Personas, competitor audits and insights that sharpen every campaign.",             from: "#0ea5e9", to: "#38bdf8" },
  { icon: "bi-megaphone",       title: "Campaign Strategy",      desc: "End-to-end digital campaigns planned, launched and optimised for results.",          from: "#ef4444", to: "#f87171" },
];

/* ------------------------------------------------------------------ */
/*  Viewport hook                                                      */
/* ------------------------------------------------------------------ */
function useViewport() {
  const [vp, setVp] = useState({ width: 1200, reducedMotion: false });
  useEffect(() => {
    const update = () =>
      setVp({
        width: window.innerWidth,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vp;
}

/* ------------------------------------------------------------------ */
/*  Service tile                                                       */
/* ------------------------------------------------------------------ */
function ServiceCard({
  s,
  index,
  compact,
  reducedMotion,
}: {
  s: (typeof SERVICES)[number];
  index: number;
  compact: boolean;
  reducedMotion: boolean;
}) {
  const [hover, setHover] = useState(false);
  const badge = compact ? 40 : 48;

  return (
    <Link
      href="#contact"
      aria-label={`${s.title} – enquire about this service`}
      data-aos="fade-up"
      data-aos-delay={150 + index * 50}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: compact ? 10 : 12,
        padding: compact ? "14px 14px 16px" : "18px 18px 20px",
        borderRadius: 18,
        background: "#ffffff",
        border: `1px solid ${hover ? s.from : "rgba(26,120,100,0.12)"}`,
        boxShadow: hover
          ? `0 18px 36px rgba(20,58,52,0.14), 0 0 0 3px ${s.from}22`
          : "0 8px 22px rgba(20,58,52,0.07)",
        transform: hover ? "translateY(-4px)" : "none",
        transition: reducedMotion
          ? "none"
          : "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
        textDecoration: "none",
        color: INK,
        overflow: "hidden",
        outline: "none",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${s.from}33, transparent 68%)`,
          opacity: hover ? 1 : 0.6,
          transition: reducedMotion ? "none" : "opacity .25s ease",
          pointerEvents: "none",
        }}
      />

      <span
        aria-hidden="true"
        style={{
          width: badge,
          height: badge,
          display: "grid",
          placeItems: "center",
          borderRadius: 14,
          background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
          color: "#fff",
          fontSize: compact ? 18 : 22,
          boxShadow: `0 8px 18px ${s.from}55`,
          transform: hover ? "scale(1.08) rotate(-4deg)" : "none",
          transition: reducedMotion ? "none" : "transform .3s cubic-bezier(.175,.885,.32,1.275)",
        }}
      >
        <i className={`bi ${s.icon}`} />
      </span>

      <div style={{ minWidth: 0 }}>
        <h3
          style={{
            margin: "0 0 4px",
            fontSize: compact ? 14 : 15.5,
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: INK,
          }}
        >
          {s.title}
        </h3>
        <p style={{ margin: 0, fontSize: compact ? 12 : 13, lineHeight: 1.55, color: MUTED }}>
          {s.desc}
        </p>
      </div>

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 14,
          bottom: 14,
          width: 26,
          height: 26,
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: hover ? s.from : "rgba(26,120,100,0.08)",
          color: hover ? "#fff" : MUTED,
          opacity: hover ? 1 : 0,
          transform: hover ? "translate(0,0)" : "translate(-6px,6px)",
          transition: reducedMotion ? "none" : "all .25s ease",
        }}
      >
        <svg viewBox="0 0 24 24" width="13" height="13">
          <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
export default function Services() {
  const { width, reducedMotion } = useViewport();
  const isMobile = width < 576;
  const isTablet = width < 992;
  const isDesktopSm = width < 1200;
  const [ctaHover, setCtaHover] = useState(false);

  const columns = isMobile ? 2 : isTablet ? 2 : isDesktopSm ? 2 : 3;

  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <SectionTitle
        title="Services"
        description="Data-driven digital marketing services that grow your visibility, leads and revenue."
      />

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div
          style={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            alignItems: isTablet ? "stretch" : "flex-start",
            gap: isMobile ? 28 : isTablet ? 36 : 48,
          }}
        >
          {/* ---------- Intro ---------- */}
          <div
            style={{
              flex: isTablet ? "0 0 auto" : "0 0 32%",
              position: isTablet ? "relative" : "sticky",
              top: isTablet ? undefined : 110,
              textAlign: isTablet ? "center" : "left",
              maxWidth: isTablet ? 620 : "none",
              margin: isTablet ? "0 auto" : 0,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(249,115,22,0.10)",
                border: "1px solid rgba(249,115,22,0.25)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 14,
              }}
            >
              What I do
            </span>

            <h2
              id="services-title"
              style={{
                margin: "0 0 14px",
                fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: INK,
                textWrap: "balance",
              }}
            >
              Turning <span style={{ color: ACCENT }}>Clicks Into Customers</span> With
              Strategy That Performs
            </h2>

            <p
              style={{
                margin: "0 0 20px",
                fontSize: isMobile ? 14.5 : 15.5,
                lineHeight: 1.7,
                color: MUTED,
              }}
            >
              From SEO and paid ads to social, email and analytics, I plan and run
              digital marketing that reaches the right audience and delivers
              measurable results for your business.
            </p>

            <Link
              href="#contact"
              aria-label="Book a free strategy call with Sarah Nkansah"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              onFocus={() => setCtaHover(true)}
              onBlur={() => setCtaHover(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: isMobile ? "100%" : "auto",
                minHeight: 48,
                padding: "12px 26px",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                background: ctaHover
                  ? "linear-gradient(135deg, #ea6a0a, #f97316)"
                  : "linear-gradient(135deg, #f97316, #fb923c)",
                color: "#fff",
                boxShadow: ctaHover
                  ? "0 16px 32px rgba(249,115,22,0.36)"
                  : "0 10px 24px rgba(249,115,22,0.28)",
                transform: ctaHover ? "translateY(-3px)" : "none",
                transition: reducedMotion ? "none" : "all .25s ease",
                outline: "none",
              }}
            >
              Book a Free Strategy Call
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                aria-hidden="true"
                style={{
                  transform: ctaHover ? "translateX(4px)" : "none",
                  transition: reducedMotion ? "none" : "transform .25s ease",
                }}
              >
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* ---------- Grid ---------- */}
          <div
            style={{
              flex: "1 1 0",
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: isMobile ? 10 : 14,
            }}
          >
            {SERVICES.map((s, i) => (
              <ServiceCard
                key={s.title}
                s={s}
                index={i}
                compact={isMobile}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}