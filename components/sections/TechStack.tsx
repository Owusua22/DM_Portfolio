"use client";

import { useEffect, useState } from "react";

const ACCENT = "#f97316";
const EMERALD = "rgb(26, 120, 100)";
const INK = "#0f2f2a";
const MUTED = "#4b625d";

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */
const STACK_GROUPS: {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  items: { name: string; level: string; icon: string }[];
}[] = [
  {
    title: "Front-End Development",
    subtitle: "Pixel-perfect, accessible, and blitz-fast",
    icon: "bi-code-slash",
    color: "#2563eb",
    items: [
      { name: "React / Next.js 14", level: "Advanced", icon: "bi-lightning-charge" },
      { name: "TypeScript", level: "Advanced", icon: "bi-braces" },
      { name: "Tailwind / Bootstrap 5", level: "Advanced", icon: "bi-palette" },
      { name: "Figma → Code", level: "Proficient", icon: "bi-bezier2" },
    ],
  },
  {
    title: "Back-End & APIs",
    subtitle: "Data, auth, and business logic that scales",
    icon: "bi-hdd-stack",
    color: "#0ea5e9",
    items: [
      { name: "Node.js / Express", level: "Proficient", icon: "bi-server" },
      { name: "Supabase / PostgreSQL", level: "Proficient", icon: "bi-database" },
      { name: "REST APIs & Auth", level: "Proficient", icon: "bi-shield-lock" },
      { name: "Vercel / Git / CI", level: "Proficient", icon: "bi-git" },
    ],
  },
  {
    title: "Marketing Tech",
    subtitle: "Where code meets growth",
    icon: "bi-graph-up-arrow",
    color: EMERALD,
    items: [
      { name: "SEO & Technical Audits", level: "Expert", icon: "bi-search" },
      { name: "GA4 / Looker Studio", level: "Expert", icon: "bi-bar-chart-line" },
      { name: "HubSpot / Mailchimp", level: "Advanced", icon: "bi-envelope-paper" },
      { name: "Semrush / Ahrefs / GSC", level: "Advanced", icon: "bi-bullseye" },
    ],
  },
];

const HIGHLIGHTS = [
  { k: "100%", v: "Client-Side", d: "No servers, no env keys — deploys as static files anywhere." },
  { k: "98", v: "Lighthouse", d: "Performance-first: static export, unoptimized images, AOS lazy." },
  { k: "<1s", v: "Mock Loads", d: "Portfolio data from local JSON, instant & offline-friendly." },
];

function useViewport() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const u = () => setW(window.innerWidth);
    u();
    window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
  }, []);
  return w;
}

export default function TechStack() {
  const width = useViewport();
  const isMobile = width < 576;
  const isTablet = width < 992;

  return (
    <section id="techstack" className="section" aria-labelledby="techstack-title" style={{ background: "#f6f8f7" }}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 40px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(249,115,22,0.10)",
              border: "1px solid rgba(249,115,22,0.22)",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 12,
            }}
          >
            Full-Stack + Marketing
          </span>
          <h2
            id="techstack-title"
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: INK,
              lineHeight: 1.1,
            }}
          >
            Built Like a Marketer. <span style={{ color: ACCENT }}>Engineered Like a Developer.</span>
          </h2>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: MUTED }}>
            I bridge both worlds — I don’t just plan campaigns, I ship the tools that power them. This portfolio
            itself was refactored from a server-rendered Next.js + Supabase app into a <strong>100% static,
            no-SSR</strong> front-end you can host on any static file host.
          </p>
        </div>

        {/* Highlight strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 12,
            maxWidth: 960,
            margin: "0 auto 36px",
          }}
        >
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.v}
              style={{
                background: "#fff",
                border: "1px solid rgba(15,47,42,0.08)",
                borderRadius: 16,
                padding: "18px 16px",
                textAlign: "center",
                boxShadow: "0 8px 22px rgba(20,58,52,0.06)",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: EMERALD, lineHeight: 1 }}>{h.k}</div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: INK, margin: "6px 0 6px" }}>
                {h.v}
              </div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{h.d}</div>
            </div>
          ))}
        </div>

        {/* Stack groups */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
            maxWidth: 1180,
            margin: "0 auto",
          }}
        >
          {STACK_GROUPS.map((group, idx) => (
            <div
              key={group.title}
              data-aos="fade-up"
              data-aos-delay={150 + idx * 80}
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid rgba(15,47,42,0.08)",
                boxShadow: "0 12px 32px rgba(20,58,52,0.07)",
                padding: isMobile ? "20px 18px" : "24px 22px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${group.color}18, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 12,
                    background: group.color,
                    color: "#fff",
                    fontSize: 20,
                    boxShadow: `0 8px 18px ${group.color}40`,
                    flexShrink: 0,
                  }}
                >
                  <i className={`bi ${group.icon}`} aria-hidden="true" />
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: INK, lineHeight: 1.2 }}>{group.title}</h3>
                  <div style={{ fontSize: 12.5, color: MUTED }}>{group.subtitle}</div>
                </div>
              </div>

              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {group.items.map((it) => (
                  <li
                    key={it.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 12,
                      background: "#f6f8f7",
                      border: "1px solid rgba(15,47,42,0.06)",
                    }}
                  >
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 9,
                        background: "#fff",
                        border: "1px solid rgba(15,47,42,0.08)",
                        color: group.color,
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      <i className={`bi ${it.icon}`} aria-hidden="true" />
                    </span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700, color: INK, lineHeight: 1.2 }}>{it.name}</span>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: group.color,
                        background: "#fff",
                        border: `1px solid ${group.color}30`,
                        padding: "4px 8px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {it.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Callout — how to deploy / what was removed */}
        <div
          data-aos="fade-up"
          data-aos-delay="420"
          style={{
            maxWidth: 960,
            margin: "28px auto 0",
            background: INK,
            color: "#fff",
            borderRadius: 20,
            padding: isMobile ? "20px 18px" : "22px 24px",
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            alignItems: isTablet ? "stretch" : "center",
            gap: 16,
            boxShadow: "0 18px 40px rgba(15,47,42,0.25)",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fb923c", marginBottom: 6 }}>
              Zero-Server Deployment
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3, marginBottom: 6 }}>
              Host this portfolio anywhere — GitHub Pages, Netlify, Cloudflare Pages, or any static file host.
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>
              No <code style={{ background: "rgba(255,255,255,0.10)", padding: "2px 6px", borderRadius: 6 }}>NEXT_PUBLIC_SUPABASE_*</code>, no{" "}
              <code style={{ background: "rgba(255,255,255,0.10)", padding: "2px 6px", borderRadius: 6 }}>RESEND_API_KEY</code>, no cookies,
              no <code style={{ background: "rgba(255,255,255,0.10)", padding: "2px 6px", borderRadius: 6 }}>middleware.ts</code>.
              Build with <code style={{ background: "rgba(255,255,255,0.10)", padding: "2px 6px", borderRadius: 6 }}>npm run build</code> → upload the{" "}
              <code style={{ background: "rgba(255,255,255,0.10)", padding: "2px 6px", borderRadius: 6 }}>out/</code> folder.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10, flexShrink: 0 }}>
            <a
              href="#portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 44,
                padding: "0 20px",
                borderRadius: 999,
                background: ACCENT,
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View Live Projects <i className="bi bi-arrow-right" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 44,
                padding: "0 20px",
                borderRadius: 999,
                background: "#fff",
                color: INK,
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Hire Me <i className="bi bi-chat-dots" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Tech badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 18 }}>
          {[
            "React",
            "Next.js Static Export",
            "TypeScript",
            "Tailwind",
            "Supabase (archived)",
            "Node.js",
            "GA4",
            "HubSpot",
            "Figma",
            "Vercel",
          ].map((t) => (
            <span
              key={t}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: "#fff",
                border: "1px solid rgba(15,47,42,0.08)",
                fontSize: 11.5,
                fontWeight: 700,
                color: MUTED,
                boxShadow: "0 4px 12px rgba(20,58,52,0.04)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
