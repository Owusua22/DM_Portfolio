"use client";

import { useEffect, useRef, useState } from "react";
import Swiper from "swiper/bundle";
import SectionTitle from "@/components/SectionTitle";

const ACCENT_ORANGE = "rgb(230, 127, 31)";
const ACCENT_EMERALD = "rgb(26, 120, 100)";

const TESTIMONIALS = [
  {
    title: "Creative, Professional, and Easy to Work With",
    text: "Working with Sarah was an exceptional experience. She took the time to understand our brand, target audience, and business goals to deliver data-backed digital campaigns that fit our needs perfectly. Her attention to detail and clear communication made the entire process seamless and highly profitable.",
    image: "/assets/img/person/peron5.jpg",
    name: "Mary Dickson",
    role: "CEO, Wemomprenuers",
  },
  {
    title: "Talented, Reliable, and Full of Great Ideas",
    text: "I highly recommend Sarah for any performance marketing campaign. She brought our digital ideas to life while contributing invaluable analytical insights to optimize our search rankings and client acquisition pathways. She is incredibly responsive, creative, and results-driven.",
    image: "/assets/img/person/josh.png",
    name: "Joshua Fordjour",
    role: "CEO, Cell7 A.I",
  },
];

/* 5-Star Rating SVG Component */
function StarRating() {
  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "16px", color: ACCENT_ORANGE }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sliderRef.current) return;

    const swiper = new Swiper(sliderRef.current, {
      slidesPerView: 1,
      loop: true,
      speed: 600,
      autoplay: { delay: 6000, disableOnInteraction: false },
      navigation: {
        nextEl: ".compact-nav-next",
        prevEl: ".compact-nav-prev",
      },
      on: {
        slideChange: (s) => {
          setActiveIndex(s.realIndex);
        },
      },
    });

    return () => swiper.destroy(true, true);
  }, []);

  return (
    <section 
      id="testimonials" 
      className="testimonials section"
      style={{
        padding: "100px 0",
        backgroundColor: "#f4f8f7",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative Atmospheric Glowing Mesh Orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26, 120, 100, 0.08), transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none"
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230, 127, 31, 0.06), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />

      <SectionTitle
        title="Testimonials"
        description="Hear directly from the founders, operators, and brands scaling their conversion channels with my digital strategy."
      />

      {/* Styled Responsive CSS Layout Overrides */}
      <style>{`
        .premium-testimonial-card {
          background: #ffffff;
          border: 1.5px solid rgba(26, 120, 100, 0.06);
          border-radius: 28px;
          padding: 60px;
          box-shadow: 0 25px 55px rgba(20, 58, 52, 0.04), 0 4px 15px rgba(0, 0, 0, 0.01);
          position: relative;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          overflow: hidden;
        }
        .premium-testimonial-card:hover {
          transform: translateY(-4px);
          border-color: rgba(230, 127, 31, 0.15);
          box-shadow: 0 35px 70px rgba(20, 58, 52, 0.08);
        }
        .testimonial-watermark-quote {
          position: absolute;
          right: 40px;
          bottom: 20px;
          color: rgba(26, 120, 100, 0.03);
          font-family: Georgia, serif;
          font-size: 160px;
          line-height: 1;
          font-weight: 900;
          pointer-events: none;
          user-select: none;
          transition: color 0.3s ease;
        }
        .premium-testimonial-card:hover .testimonial-watermark-quote {
          color: rgba(230, 127, 31, 0.05);
        }
        @media (max-width: 767px) {
          .premium-testimonial-card {
            padding: 35px 24px;
            margin: 0 8px;
          }
          .testimonial-watermark-quote {
            font-size: 100px;
            right: 20px;
            bottom: 10px;
          }
        }
      `}</style>

      <div className="container" data-aos="fade-up" data-aos-delay="100" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Constrained Centered Outer Grid Container */}
        <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative" }}>
          
          <div className="testimonials-slider swiper" ref={sliderRef} style={{ overflow: "visible" }}>
            <div className="swiper-wrapper">
              {TESTIMONIALS.map((testimonial) => (
                <div 
                  className="swiper-slide" 
                  key={testimonial.name}
                  itemScope 
                  itemType="https://schema.org/Review"
                >
                  <div className="premium-testimonial-card">
                    
                    {/* Quotation Watermark */}
                    <span className="testimonial-watermark-quote" aria-hidden="true">&rdquo;</span>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
                      
                      {/* Interactive Trust Metric stars */}
                      <StarRating />

                      {/* Client Review Headline */}
                      <h3 
                        style={{ 
                          fontSize: "clamp(1.25rem, 3.5vw, 1.6rem)", 
                          fontWeight: "900", 
                          color: "#111827", 
                          marginBottom: "16px",
                          lineHeight: "1.3",
                          letterSpacing: "-0.5px"
                        }}
                        itemProp="name"
                      >
                        &ldquo;{testimonial.title}&rdquo;
                      </h3>
                      
                      {/* Compact High-Hierarchy Copy */}
                      <blockquote 
                        style={{ 
                          fontSize: "clamp(0.95rem, 2.5vw, 1.08rem)", 
                          lineHeight: "1.8", 
                          color: "#4b5563", 
                          margin: "0 0 30px 0",
                          fontWeight: "500",
                          position: "relative",
                          zIndex: 1
                        }}
                        itemProp="reviewBody"
                      >
                        {testimonial.text}
                      </blockquote>

                      {/* Author Profile Information */}
                      <div 
                        style={{ 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: "18px",
                        }}
                        itemProp="author" 
                        itemScope 
                        itemType="https://schema.org/Person"
                      >
                        {/* Profile Image container with dynamic visual offsets */}
                        <div style={{ position: "relative" }}>
                          <span 
                            style={{
                              position: "absolute",
                              inset: "-4px",
                              borderRadius: "50%",
                              border: `1.5px dashed ${ACCENT_ORANGE}`,
                              opacity: 0.5,
                              transform: "rotate(-15deg)"
                            }}
                            aria-hidden="true"
                          />
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            itemProp="image"
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: `3px solid #ffffff`,
                              boxShadow: "0 8px 20px rgba(20,58,52,0.12)",
                              display: "block",
                              position: "relative",
                              zIndex: 1
                            }}
                          />
                        </div>

                        <div>
                          <cite 
                            style={{ 
                              display: "block", 
                              fontStyle: "normal", 
                              fontWeight: "900", 
                              fontSize: "16px", 
                              color: "#111827",
                              letterSpacing: "-0.2px"
                            }}
                            itemProp="name"
                          >
                            {testimonial.name}
                          </cite>
                          <span 
                            style={{ 
                              display: "block", 
                              fontSize: "12px", 
                              color: ACCENT_EMERALD,
                              fontWeight: "800",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              marginTop: "2px"
                            }}
                          >
                            {testimonial.role}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav Controls */}
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginTop: "35px" 
            }}
          >
            {/* Pagination Indicators */}
            <div style={{ display: "flex", gap: "8px" }}>
              {TESTIMONIALS.map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    width: idx === activeIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "50px",
                    backgroundColor: idx === activeIndex ? ACCENT_ORANGE : "rgba(230, 127, 31, 0.25)",
                    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    display: "inline-block"
                  }}
                />
              ))}
            </div>

            {/* Symmetrical Arrow Controls */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                className="compact-nav-prev"
                aria-label="Previous Testimonial"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  border: `1.5px solid rgba(26, 120, 100, 0.15)`,
                  backgroundColor: "#ffffff",
                  color: "rgb(20, 58, 52)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(20, 58, 52, 0.03)",
                  transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT_ORANGE;
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.backgroundColor = ACCENT_ORANGE;
                  e.currentTarget.style.transform = "translateX(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(26, 120, 100, 0.15)";
                  e.currentTarget.style.color = "rgb(20, 58, 52)";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>

              <button
                className="compact-nav-next"
                aria-label="Next Testimonial"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  border: `1.5px solid rgba(26, 120, 100, 0.15)`,
                  backgroundColor: "#ffffff",
                  color: "rgb(20, 58, 52)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(20, 58, 52, 0.03)",
                  transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT_ORANGE;
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.backgroundColor = ACCENT_ORANGE;
                  e.currentTarget.style.transform = "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(26, 120, 100, 0.15)";
                  e.currentTarget.style.color = "rgb(20, 58, 52)";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}