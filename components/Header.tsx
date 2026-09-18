"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useScrollspy from "@/hooks/useScrollspy";

/* ------------------------------------------------------------------ */
/*  Tokens & data                                                      */
/* ------------------------------------------------------------------ */
const ACCENT = "#f97316";
const ACCENT_DARK = "#ea580c";
const INK = "#0f2f2a";
const MUTED = "#4b625d";

const CV_URL =
  "https://docs.google.com/document/d/1Pmcbvd40JZOOOif5ZDMEN1pvnzQQ4RLF/edit?usp=sharing&ouid=107535406430937442471&rtpof=true&sd=true";
const LINKEDIN_URL = "https://www.linkedin.com/in/sarah-nkansah";

const SECTION_LINKS = [
  { href: "#hero",      label: "Home",     icon: "bi-house-door" },
  { href: "#about",     label: "About",    icon: "bi-person" },
  { href: "#resume",    label: "Resume",   icon: "bi-file-earmark-text" },
  { href: "#portfolio", label: "Projects", icon: "bi-grid" },
  { href: "#contact",   label: "Contact",  icon: "bi-chat-dots" },
];

/* ------------------------------------------------------------------ */
/*  Layout CSS – media queries decide layout on the FIRST paint,       */
/*  so there is no desktop→mobile flash. Everything else is inline.    */
/* ------------------------------------------------------------------ */
const LAYOUT_CSS = `
  :root { --hdr-h: 72px; }
  .hdr-nav, .hdr-cta, .hdr-tagline { display: flex; }
  .hdr-burger, .hdr-drawer, .hdr-backdrop { display: none; }
  .hdr-cta-long { display: inline; }
  .hdr-cta-short { display: none; }

  @media (max-width: 1199.98px) {
    .hdr-cta-long { display: none; }
    .hdr-cta-short { display: inline; }
  }
  @media (max-width: 991.98px) {
    .hdr-nav { display: none; }
    .hdr-burger { display: grid; }
    .hdr-drawer { display: flex; }
    .hdr-backdrop { display: block; }
    .hdr-cta-long { display: inline; }
    .hdr-cta-short { display: none; }
  }
  @media (max-width: 575.98px) {
    :root { --hdr-h: 64px; }
    .hdr-cta, .hdr-tagline { display: none; }
    .hdr-logo { width: 38px !important; height: 38px !important; }
    .hdr-name { font-size: 15px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .hdr-anim { transition: none !important; animation: none !important; }
  }
`;

/* ------------------------------------------------------------------ */
/*  Desktop nav pill                                                   */
/* ------------------------------------------------------------------ */
function NavPill({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick: () => void }) {
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
        className="hdr-anim"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "9px 16px",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: active ? 700 : 600,
          color: active ? "#fff" : hover ? ACCENT : INK,
          background: active ? `linear-gradient(135deg, ${ACCENT}, #fb923c)` : hover ? "rgba(249,115,22,0.10)" : "transparent",
          boxShadow: active ? "0 8px 18px rgba(249,115,22,0.30)" : "none",
          textDecoration: "none",
          whiteSpace: "nowrap",
          outline: "none",
          transition: "all .25s ease",
        }}
      >
        {label}
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer link                                                        */
/* ------------------------------------------------------------------ */
function DrawerLink({
  href, label, icon, index, active, open, onClick,
}: { href: string; label: string; icon: string; index: number; active: boolean; open: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const lit = active || hover;
  const delay = open ? 50 + index * 30 : 0;
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="hdr-anim"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minHeight: 48,
          padding: "0 12px 0 14px",
          borderRadius: 14,
          background: active ? "rgba(249,115,22,0.08)" : hover ? "rgba(15,47,42,0.04)" : "transparent",
          border: `1px solid ${active ? "rgba(249,115,22,0.20)" : "transparent"}`,
          color: INK,
          textDecoration: "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(16px)",
          transition: `opacity .25s ease ${delay}ms, transform .25s ease ${delay}ms, background .2s ease`,
        }}
      >
        <span
          aria-hidden="true"
          className="hdr-anim"
          style={{
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            borderRadius: 10,
            fontSize: 15,
            color: lit ? "#fff" : INK,
            background: lit ? `linear-gradient(135deg, ${ACCENT}, #fb923c)` : "rgba(15,47,42,0.05)",
            boxShadow: lit ? "0 6px 14px rgba(249,115,22,0.20)" : "none",
            transition: "all .25s ease",
            flexShrink: 0,
          }}
        >
          <i className={`bi ${icon}`} />
        </span>
        <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: active ? 800 : 600, color: active ? ACCENT : INK, lineHeight: 1.2 }}>
          {label}
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

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ctaHover, setCtaHover] = useState(false);
  const [burgerHover, setBurgerHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  const [liHover, setLiHover] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const activeSection = useScrollspy(isHome ? SECTION_LINKS.map((l) => l.href) : []);
  const active = activeSection || "#hero";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const close = useCallback(() => setOpen(false), []);

  /* scroll: glass + progress */
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

  /* drawer: body lock, esc, focus, close on desktop resize */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) setTimeout(() => closeBtnRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 992px)");
    const onMq = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LAYOUT_CSS }} />

      <header
        id="header"
        className="hdr-anim"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "var(--hdr-h)",
          background: scrolled || open ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.66)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderBottom: `1px solid rgba(15,47,42,${scrolled ? 0.12 : 0.05})`,
          boxShadow: scrolled ? "0 10px 30px rgba(15,47,42,0.05)" : "none",
          transition: "background .3s ease, box-shadow .3s ease, border-color .3s ease",
        }}
      >
        <div
          className="container-fluid container-xl"
          style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
        >
          {/* ---------- Brand ---------- */}
          <Link href="/" onClick={close} aria-label="Sarah Nkansah – home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minWidth: 0 }}>
            <span
              className="hdr-logo"
              style={{ width: 42, height: 42, borderRadius: 12, padding: 2, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`, flexShrink: 0 }}
            >
              <img src="/sn_logo.png" alt="" width={38} height={38} style={{ width: "100%", height: "100%", borderRadius: 10, objectFit: "cover", background: "#fff", display: "block" }} />
            </span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1, minWidth: 0 }}>
              <span className="hdr-name" style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em", color: INK, whiteSpace: "nowrap" }}>
                Sarah Nkansah
              </span>
              <span className="hdr-tagline" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: ACCENT, marginTop: 3 }}>
                Digital Marketer
              </span>
            </span>
          </Link>

          {/* ---------- Desktop nav (CSS-hidden < 992px) ---------- */}
          <nav aria-label="Primary" className="hdr-nav">
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                margin: 0,
                padding: 4,
                listStyle: "none",
                borderRadius: 999,
                background: "rgba(15,47,42,0.04)",
                border: "1px solid rgba(15,47,42,0.08)",
              }}
            >
              {SECTION_LINKS.map((l) => (
                <NavPill key={l.href} href={sectionHref(l.href)} label={l.label} active={active === l.href} onClick={close} />
              ))}
            </ul>
          </nav>

          {/* ---------- Right controls ---------- */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Sarah Nkansah's CV"
              className="hdr-cta hdr-anim"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              onFocus={() => setCtaHover(true)}
              onBlur={() => setCtaHover(false)}
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 44,
                padding: "0 18px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                background: ctaHover ? `linear-gradient(135deg, ${ACCENT_DARK}, ${ACCENT})` : `linear-gradient(135deg, ${ACCENT}, #fb923c)`,
                boxShadow: ctaHover ? "0 14px 28px rgba(249,115,22,0.38)" : "0 8px 20px rgba(249,115,22,0.28)",
                transform: ctaHover ? "translateY(-2px)" : "none",
                transition: "all .25s ease",
                outline: "none",
              }}
            >
              <i className="bi bi-download" aria-hidden="true" style={{ fontSize: 15 }} />
              <span className="hdr-cta-long">Download CV</span>
              <span className="hdr-cta-short">CV</span>
            </a>

            <button
              type="button"
              className="hdr-burger hdr-anim"
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
                placeItems: "center",
                padding: 0,
                borderRadius: 14,
                border: `1px solid ${open ? ACCENT : "rgba(15,47,42,0.12)"}`,
                background: open ? "rgba(249,115,22,0.08)" : burgerHover ? "rgba(15,47,42,0.05)" : "#fff",
                cursor: "pointer",
                zIndex: 1102,
                transition: "all .25s ease",
              }}
            >
              <span style={{ position: "relative", width: 20, height: 14, display: "block" }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="hdr-anim"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: i === 0 ? 0 : i === 1 ? 6 : 12,
                      width: i === 1 && !open ? 14 : 20,
                      height: 2.2,
                      borderRadius: 2,
                      background: open ? ACCENT : INK,
                      opacity: i === 1 && open ? 0 : 1,
                      transform: open ? (i === 0 ? "translateY(6px) rotate(45deg)" : i === 2 ? "translateY(-6px) rotate(-45deg)" : "none") : "none",
                      transition: "all .3s cubic-bezier(.4,0,.2,1)",
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>

        {/* progress */}
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
          }}
        />
      </header>

      {/* ---------- Backdrop (CSS-hidden ≥ 992px) ---------- */}
      <div
        onClick={close}
        aria-hidden="true"
        className="hdr-backdrop hdr-anim"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1100,
          background: "rgba(15,47,42,0.4)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s ease",
        }}
      />

      {/* ---------- Drawer (CSS-hidden ≥ 992px) ---------- */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        className="hdr-drawer hdr-anim"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1101,
          width: "min(82vw, 320px)",
          flexDirection: "column",
          background: "#fff",
          boxShadow: open ? "-15px 0 50px rgba(15,47,42,0.15)" : "none",
          transform: open ? "translateX(0)" : "translateX(105%)",
          visibility: open ? "visible" : "hidden",
          transition: "transform .35s cubic-bezier(.4,0,.2,1), visibility 0s linear " + (open ? "0s" : ".35s"),
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        {/* drawer header */}
        <div
          style={{
            height: "var(--hdr-h)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px 0 16px",
            borderBottom: "1px solid rgba(15,47,42,0.08)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <img src="/sn_logo.png" alt="" width={32} height={32} style={{ width: 32, height: 32, borderRadius: 9, objectFit: "cover", flexShrink: 0 }} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em", color: INK }}>Sarah Nkansah</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: ACCENT, marginTop: 2 }}>Digital Marketer</span>
            </span>
          </span>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="hdr-anim"
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
            style={{
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
              padding: 0,
              borderRadius: 12,
              border: `1px solid ${closeHover ? ACCENT : "rgba(249,115,22,0.30)"}`,
              background: closeHover ? ACCENT : "rgba(249,115,22,0.08)",
              color: closeHover ? "#fff" : ACCENT,
              fontSize: 15,
              cursor: "pointer",
              transition: "all .2s ease",
            }}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>

        {/* links */}
        <nav aria-label="Mobile primary" style={{ padding: "10px 10px 4px", flex: 1 }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 3 }}>
            {SECTION_LINKS.map((l, i) => (
              <DrawerLink key={l.href} href={sectionHref(l.href)} label={l.label} icon={l.icon} index={i} active={active === l.href} open={open} onClick={close} />
            ))}
          </ul>
        </nav>

        {/* footer */}
        <div
          className="hdr-anim"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px calc(14px + env(safe-area-inset-bottom))",
            borderTop: "1px solid rgba(15,47,42,0.08)",
            background: "linear-gradient(180deg, #ffffff, #fff7f0)",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(12px)",
            transition: `all .35s ease ${open ? 260 : 0}ms`,
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
              height: 46,
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              textDecoration: "none",
              background: `linear-gradient(135deg, ${ACCENT}, #fb923c)`,
              boxShadow: "0 8px 20px rgba(249,115,22,0.25)",
            }}
          >
            <i className="bi bi-download" aria-hidden="true" />
            Download CV
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with Sarah Nkansah on LinkedIn"
            className="hdr-anim"
            onMouseEnter={() => setLiHover(true)}
            onMouseLeave={() => setLiHover(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 44,
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              color: liHover ? "#fff" : INK,
              textDecoration: "none",
              background: liHover ? "#0A66C2" : "#fff",
              border: `1.5px solid ${liHover ? "#0A66C2" : "rgba(15,47,42,0.14)"}`,
              transition: "all .2s ease",
            }}
          >
            <i className="bi bi-linkedin" aria-hidden="true" style={{ fontSize: 17, color: liHover ? "#fff" : "#0A66C2" }} />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}