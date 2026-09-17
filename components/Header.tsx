"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useScrollspy from "@/hooks/useScrollspy";

/* ------------------------------------------------------------------ */
/*  Design & SEO Color Constants                                      */
/* ------------------------------------------------------------------ */
const ACCENT = "#f97316";
const ACCENT_DARK = "#ea580c";
const INK = "#0f2f2a";
const MUTED = "#4b625d";

const CV_URL = "https://docs.google.com/document/d/1Pmcbvd40JZOOOif5ZDMEN1pvnzQQ4RLF/edit?usp=sharing&ouid=107535406430937442471&rtpof=true&sd=true";

const SECTION_LINKS = [
  { href: "#hero",      label: "Home",      icon: "bi-house-door" },
  { href: "#about",     label: "About",     icon: "bi-person" },
  { href: "#resume",    label: "Resume",    icon: "bi-file-earmark-text" },
  { href: "#portfolio", label: "Portfolio", icon: "bi-grid" },
  { href: "#services",  label: "Services",  icon: "bi-lightning-charge" },
  { href: "#contact",   label: "Contact",   icon: "bi-chat-dots" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/sarah-nkansah", icon: "bi-linkedin", }
];

/* ------------------------------------------------------------------ */
/*  Viewport listener hook                                             */
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
/*  Desktop nav pill                                                   */
/* ------------------------------------------------------------------ */
function NavPill({
  href, label, active, reducedMotion, onClick,
}: { href: string; label: string; active: boolean; reducedMotion: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "9px 16px",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: active ? 700 : 600,
          letterSpacing: "0.01em",
          color: active ? "#fff" : hover ? ACCENT : INK,
          background: active
            ? `linear-gradient(135deg, ${ACCENT}, #fb923c)`
            : hover
            ? "rgba(249,115,22,0.10)"
            : "transparent",
          boxShadow: active ? "0 8px 18px rgba(249,115,22,0.30)" : "none",
          textDecoration: "none",
          whiteSpace: "nowrap",
          outline: "none",
          transition: reducedMotion ? "none" : "all .25s ease",
        }}
      >
        {label}
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact, Non-Generic Mobile Drawer Link                          */
/* ------------------------------------------------------------------ */
function DrawerLink({
  href, label, icon, index, active, open, reducedMotion, onClick,
}: {
  href: string; label: string; icon: string; index: number;
  active: boolean; open: boolean; reducedMotion: boolean; onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const lit = active || hover;
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          borderRadius: 14,
          background: active ? "rgba(249,115,22,0.08)" : hover ? "rgba(15,47,42,0.04)" : "transparent",
          border: `1px solid ${active ? "rgba(249,115,22,0.20)" : "transparent"}`,
          color: INK,
          textDecoration: "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(20px)",
          transition: reducedMotion
            ? "none"
            : `opacity .25s ease ${open ? 50 + index * 30 : 0}ms, transform .25s ease ${open ? 50 + index * 30 : 0}ms, background .2s ease`,
        }}
      >
        {/* Custom Tint Icon Sphere */}
        <span
          aria-hidden="true"
          style={{
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            borderRadius: 10,
            fontSize: 15,
            color: lit ? "#fff" : INK,
            background: lit ? `linear-gradient(135deg, ${ACCENT}, #fb923c)` : "rgba(15, 47, 42, 0.05)",
            boxShadow: lit ? "0 6px 14px rgba(249,115,22,0.20)" : "none",
            transition: reducedMotion ? "none" : "all .25s ease",
            flexShrink: 0,
          }}
        >
          <i className={`bi ${icon}`} />
        </span>

        {/* Clean, Non-Generic Typographic Content */}
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 14.5, fontWeight: active ? 800 : 600, color: active ? ACCENT : INK, lineHeight: 1.2 }}>
            {label}
          </span>
        </span>

        <i className="bi bi-chevron-right" aria-hidden="true" style={{ fontSize: 11, color: active ? ACCENT : MUTED }} />
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { width, reducedMotion } = useViewport();
  const isMobile = width < 576;
  const isCompact = width < 992;   // Drawer layout breakpoint
  const isNarrowDesktop = width < 1200;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ctaHover, setCtaHover] = useState(false);
  const [burgerHover, setBurgerHover] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeSection = useScrollspy(isHome ? SECTION_LINKS.map((l) => l.href) : []);
  const active = activeSection || "#hero";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const close = useCallback(() => setOpen(false), []);

  /* Scroll position listener */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Accessibility and page scroll-lock controller */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Track navigation changes */
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { if (!isCompact) setOpen(false); }, [isCompact]);

  const barHeight = isMobile ? 64 : 72;

  return (
    <>
      <header
        id="header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: barHeight,
          background: scrolled || open ? "rgba(255, 255, 255, 0.88)" : "rgba(255, 255, 255, 0.62)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderBottom: `1px solid rgba(15, 47, 42, ${scrolled ? 0.12 : 0.05})`,
          boxShadow: scrolled ? "0 10px 30px rgba(15, 47, 42, 0.05)" : "none",
          transition: reducedMotion ? "none" : "background .3s ease, box-shadow .3s ease, border-color .3s ease",
        }}
      >
        <div
          className="container-fluid container-xl"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* ---------- Brand / Logo ---------- */}
          <Link
            href="/"
            onClick={close}
            aria-label="Sarah Nkansah – home"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minWidth: 0 }}
          >
            <span
              style={{
                width: isMobile ? 38 : 42,
                height: isMobile ? 38 : 42,
                borderRadius: 12,
                padding: 2,
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`,
               
                flexShrink: 0,
              }}
            >
              <img
                src="/sn_logo.png"
                alt="Sarah Nkansah"
                width={38}
                height={38}
                style={{ width: "100%", height: "100%", borderRadius: 10, objectFit: "cover", background: "#fff", display: "block" }}
              />
            </span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1, minWidth: 0 }}>
              <span style={{ fontSize: isMobile ? 15 : 17, fontWeight: 900, letterSpacing: "-0.02em", color: INK, whiteSpace: "nowrap" }}>
                Sarah Nkansah
              </span>
              {!isMobile && (
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: ACCENT, marginTop: 3 }}>
                  Digital Marketer
                </span>
              )}
            </span>
          </Link>

          {/* ---------- Desktop Navigation menu ---------- */}
          {!isCompact && (
            <nav aria-label="Primary">
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  margin: 0,
                  padding: 4,
                  listStyle: "none",
                  borderRadius: 999,
                  background: "rgba(15, 47, 42, 0.04)",
                  border: "1px solid rgba(15, 47, 42, 0.08)",
                }}
              >
                {SECTION_LINKS.map((l) => (
                  <NavPill
                    key={l.href}
                    href={sectionHref(l.href)}
                    label={l.label}
                    active={active === l.href}
                    reducedMotion={reducedMotion}
                    onClick={close}
                  />
                ))}
              </ul>
            </nav>
          )}

          {/* ---------- Right Controls: Button + Hamburger menu ---------- */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {!isMobile && (
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Sarah Nkansah's CV"
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
                onFocus={() => setCtaHover(true)}
                onBlur={() => setCtaHover(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  height: 44,
                  padding: isNarrowDesktop ? "0 16px" : "0 20px",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  background: ctaHover
                    ? `linear-gradient(135deg, ${ACCENT_DARK}, ${ACCENT})`
                    : `linear-gradient(135deg, ${ACCENT}, #fb923c)`,
                  boxShadow: ctaHover ? "0 14px 28px rgba(249, 115, 22, 0.38)" : "0 8px 20px rgba(249, 115, 22, 0.28)",
                  transform: ctaHover ? "translateY(-2px)" : "none",
                  transition: reducedMotion ? "none" : "all .25s ease",
                  outline: "none",
                }}
              >
                <i className="bi bi-download" aria-hidden="true" style={{ fontSize: 15 }} />
                {isNarrowDesktop && !isCompact ? "CV" : "Download CV"}
              </a>
            )}

            {isCompact && (
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen((o) => !o)}
                onMouseEnter={() => setBurgerHover(true)}
                onMouseLeave={() => setBurgerHover(false)}
                style={{
                  position: "relative",
                  width: 44,
                  height: 44,
                  display: "grid",
                  placeItems: "center",
                  padding: 0,
                  borderRadius: 14,
                  border: `1px solid ${open ? ACCENT : "rgba(15, 47, 42, 0.12)"}`,
                  background: open ? "rgba(249, 115, 22, 0.08)" : burgerHover ? "rgba(15, 47, 42, 0.05)" : "#fff",
                  cursor: "pointer",
                  zIndex: 1102,
                  transition: reducedMotion ? "none" : "all .25s ease",
                }}
              >
                <span style={{ position: "relative", width: 20, height: 14, display: "block" }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: i === 0 ? 0 : i === 1 ? 6 : 12,
                        width: i === 1 && !open ? 14 : 20,
                        height: 2.2,
                        borderRadius: 2,
                        background: open ? ACCENT : INK,
                        transformOrigin: "center",
                        opacity: i === 1 && open ? 0 : 1,
                        transform: open
                          ? i === 0 ? "translateY(6px) rotate(45deg)"
                          : i === 2 ? "translateY(-6px) rotate(-45deg)"
                          : "none"
                          : "none",
                        transition: reducedMotion ? "none" : "all .3s cubic-bezier(.4,0,.2,1)",
                      }}
                    />
                  ))}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ---------- Progress bar ---------- */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            bottom: -1,
            height: 3,
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${ACCENT}, #fb923c 60%, ${ACCENT_DARK})`,
            borderRadius: "0 3px 3px 0",
            boxShadow: progress > 0 ? "0 0 10px rgba(249,115,22,0.4)" : "none",
            transition: reducedMotion ? "none" : "width .1s linear",
          }}
        />
      </header>

      {/* ---------- Mobile slide-out drawer ---------- */}
      {isCompact && (
        <>
          {/* Backdrop screen mask */}
          <div
            onClick={close}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1100,
              background: "rgba(15, 47, 42, 0.4)",
              backdropFilter: "blur(4px)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: reducedMotion ? "none" : "opacity .3s ease",
            }}
          />

          {/* Visual Drawer panel */}
          <div
            id="mobile-drawer"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 1101,
              width: "min(82vw, 320px)",
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
              boxShadow: "-15px 0 50px rgba(15, 47, 42, 0.15)",
              transform: open ? "translateX(0)" : "translateX(105%)",
              transition: reducedMotion ? "none" : "transform .35s cubic-bezier(.4,0,.2,1)",
              outline: "none",
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            {/* Drawer Header & Custom Exit Button */}
            <div
              style={{
                height: barHeight,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 14px 0 18px",
                borderBottom: "1px solid rgba(15, 47, 42, 0.08)",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: INK }}>
                Menu Panel
              </span>

              {/* Functional Close Toggle */}
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                style={{
                  width: 32,
                  height: 32,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  border: "1px solid rgba(15, 47, 42, 0.1)",
                  background: "rgba(15, 47, 42, 0.03)",
                  color: INK,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(249, 115, 22, 0.08)";
                  e.currentTarget.style.color = ACCENT;
                  e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15, 47, 42, 0.03)";
                  e.currentTarget.style.color = INK;
                  e.currentTarget.style.borderColor = "rgba(15, 47, 42, 0.1)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Compact links array */}
            <nav aria-label="Mobile primary" style={{ padding: "10px 10px 4px", flex: 1 }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                {SECTION_LINKS.map((l, i) => (
                  <DrawerLink
                    key={l.href}
                    href={sectionHref(l.href)}
                    label={l.label}
                    icon={l.icon}
                    index={i}
                    active={active === l.href}
                    open={open}
                    reducedMotion={reducedMotion}
                    onClick={close}
                  />
                ))}
              </ul>
            </nav>

            {/* Compact Drawer Footer */}
            <div
              style={{
                padding: "12px 14px calc(14px + env(safe-area-inset-bottom))",
                borderTop: "1px solid rgba(15, 47, 42, 0.08)",
                background: "linear-gradient(180deg, #ffffff, #f9fbfb)",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: reducedMotion ? "none" : `all .35s ease ${open ? 300 : 0}ms`,
              }}
            >
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                aria-label="Download Sarah Nkansah's CV"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  height: 44,
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  textDecoration: "none",
                  background: `linear-gradient(135deg, ${ACCENT}, #fb923c)`,
                  boxShadow: "0 8px 20px rgba(249, 115, 22, 0.25)",
                  marginBottom: 12,
                }}
              >
                <i className="bi bi-download" aria-hidden="true" />
                Download CV
              </a>

              {/* Simplified LinkedIn Only Social Row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span style={{ fontSize: 11, color: MUTED, fontWeight: 700 }}>Let&apos;s connect</span>
                <div>
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: "#fff",
                        border: "1px solid rgba(15, 47, 42, 0.1)",
                        color: INK,
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: "none",
                        boxShadow: "0 2px 6px rgba(15, 47, 42, 0.04)",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = ACCENT;
                        e.currentTarget.style.color = ACCENT;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(15, 47, 42, 0.1)";
                        e.currentTarget.style.color = INK;
                      }}
                    >
                      <i className={`bi ${s.icon}`} aria-hidden="true" />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}