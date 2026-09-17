"use client";

import { useEffect, useRef, useState } from "react";

type SkillIconName =
  | "seo"
  | "content"
  | "social"
  | "analytics"
  | "campaign"
  | "audience"
  | "conversion"
  | "strategy";

const SKILLS: {
  name: string;
  description: string;
  value: number;
  icon: SkillIconName;
  color: string;
  delay: number;
}[] = [
  {
    name: "SEO",
    description:
      "Keyword research, technical SEO, on-page optimization, and search visibility.",
    value: 90,
    icon: "seo",
    color: "#f97316",
    delay: 0,
  },
  {
    name: "Content Strategy",
    description:
      "Content plans aligned with audience needs, search intent, and business goals.",
    value: 90,
    icon: "content",
    color: "#8b5cf6",
    delay: 100,
  },
  {
    name: "Social Media",
    description:
      "Audience-focused strategies that build reach, engagement, and brand trust.",
    value: 85,
    icon: "social",
    color: "#ec4899",
    delay: 200,
  },
  {
    name: "Analytics",
    description:
      "Turning campaign data into clear insights, decisions, and opportunities.",
    value: 85,
    icon: "analytics",
    color: "#0ea5e9",
    delay: 300,
  },
  {
    name: "Campaign Strategy",
    description:
      "Targeted campaigns built around clear audiences and measurable outcomes.",
    value: 85,
    icon: "campaign",
    color: "#14b8a6",
    delay: 400,
  },
  {
    name: "Audience Research",
    description:
      "Understanding audience behaviour, interests, needs, and pain points.",
    value: 90,
    icon: "audience",
    color: "#eab308",
    delay: 500,
  },
  {
    name: "Conversion Strategy",
    description:
      "Improving customer journeys to turn attention and interest into action.",
    value: 80,
    icon: "conversion",
    color: "#ef4444",
    delay: 600,
  },
  {
    name: "Digital Strategy",
    description:
      "Connecting channels, content, and business goals into growth strategies.",
    value: 90,
    icon: "strategy",
    color: "#2563eb",
    delay: 700,
  },
];

function SkillIcon({ name }: { name: SkillIconName }) {
  const svgProps = {
    width: 34,
    height: 34,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
  };

  switch (name) {
    case "seo":
      return (
        <svg {...svgProps}>
          <circle
            cx="21"
            cy="21"
            r="11"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M29 29L39 39"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M17 21H25M21 17V25"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "content":
      return (
        <svg {...svgProps}>
          <rect
            x="9"
            y="7"
            width="30"
            height="34"
            rx="4"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M16 16H32M16 23H32M16 30H27"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case "social":
      return (
        <svg {...svgProps}>
          <circle
            cx="24"
            cy="13"
            r="5"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle
            cx="12"
            cy="34"
            r="5"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle
            cx="36"
            cy="34"
            r="5"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M20 17L15 30M28 17L33 30M17 34H31"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case "analytics":
      return (
        <svg {...svgProps}>
          <path
            d="M9 39V9M9 39H41"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="15" y="27" width="5" height="8" rx="2" fill="currentColor" />
          <rect x="23" y="21" width="5" height="14" rx="2" fill="currentColor" />
          <rect x="31" y="13" width="5" height="22" rx="2" fill="currentColor" />
        </svg>
      );

    case "campaign":
      return (
        <svg {...svgProps}>
          <circle
            cx="22"
            cy="22"
            r="14"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle
            cx="22"
            cy="22"
            r="6"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M32 32L40 40M35 40H40V35"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "audience":
      return (
        <svg {...svgProps}>
          <circle
            cx="24"
            cy="16"
            r="6"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M12 39C12 32.4 17.4 27 24 27C30.6 27 36 32.4 36 39"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M12 22C8.7 22 6 24.7 6 28M36 22C39.3 22 42 24.7 42 28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case "conversion":
      return (
        <svg {...svgProps}>
          <path
            d="M7 9H41L34 18H14L7 9Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M14 18H34L29 27H19L14 18Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M19 27H29L24 39L19 27Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "strategy":
      return (
        <svg {...svgProps}>
          <circle
            cx="24"
            cy="24"
            r="16"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M24 12L28 24L24 28L20 24L24 12Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M24 28V36M12 24H8M36 24H40"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section id="skills" className="skills section">
      <div className="container">
        {/* Section Heading */}
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto 42px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginBottom: "10px",
              color: "#f97316",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            My Expertise
          </span>

          <h2
            style={{
              marginBottom: "12px",
              fontWeight: 700,
            }}
          >
            Skills That Turn Strategy Into Growth
          </h2>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              lineHeight: 1.7,
            }}
          >
            A combination of creative thinking, audience insight, and
            data-driven strategy.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={containerRef} className="row g-4">
          {SKILLS.map((skill, index) => {
            const isHovered = hoveredSkill === index;

            return (
              <div
                className="col-12 col-sm-6 col-lg-3"
                key={skill.name}
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed
                    ? isHovered
                      ? "translateY(-8px)"
                      : "translateY(0)"
                    : "translateY(28px)",
                  transition:
                    "opacity 650ms ease, transform 350ms ease, box-shadow 350ms ease",
                  transitionDelay:
                    revealed && !isHovered ? `${skill.delay}ms` : "0ms",
                }}
              >
                <div
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    position: "relative",
                    height: "100%",
                    minHeight: "265px",
                    padding: "24px 20px 20px",
                    overflow: "hidden",
                    border: `1px solid ${
                      isHovered ? `${skill.color}55` : "#edf0f2"
                    }`,
                    borderRadius: "20px",
                    backgroundColor: "#ffffff",
                    boxShadow: isHovered
                      ? `0 18px 38px ${skill.color}22`
                      : "0 8px 24px rgba(25, 55, 50, 0.06)",
                    transition:
                      "border-color 300ms ease, box-shadow 300ms ease",
                  }}
                >
                  {/* Decorative top line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: isHovered ? "100%" : "35%",
                      height: "4px",
                      backgroundColor: skill.color,
                      borderRadius: "0 0 8px 0",
                      transition: "width 350ms ease",
                    }}
                  />

                  {/* Icon and percentage */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: "58px",
                        height: "58px",
                        borderRadius: "17px",
                        backgroundColor: `${skill.color}16`,
                        color: skill.color,
                        transform: isHovered
                          ? "scale(1.08) rotate(5deg)"
                          : "scale(1) rotate(0deg)",
                        transition: "transform 350ms ease",
                      }}
                    >
                      <SkillIcon name={skill.icon} />
                    </div>

                  
                  </div>

                  <h3
                    style={{
                      marginBottom: "10px",
                      color: "#17212b",
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    {skill.name}
                  </h3>

                  <p
                    style={{
                      display: "-webkit-box",
                      minHeight: "48px",
                      marginBottom: "22px",
                      overflow: "hidden",
                      color: "#6b7280",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {skill.description}
                  </p>

              
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}