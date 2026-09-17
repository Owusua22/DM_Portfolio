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
      className="testimonials section light-background"
      style={{
        padding: "60px 0",
        backgroundColor: "#f9fbfb",
        overflow: "hidden"
      }}
    >
      <SectionTitle
        title="Testimonials"
        description="Here is what my clients say about their experience scaling their brands with my marketing strategies."
      />

      {/* CSS Layout Engine for Responsive Performance */}
      <style>{`
        .compact-testimonial-card {
          background: #ffffff;
          border: 1px solid rgba(26, 120, 100, 0.08);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(20, 58, 52, 0.04);
          position: relative;
          transition: all 0.3s ease;
        }
        .swiper-button-disabled {
          opacity: 0.3;
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .compact-testimonial-card {
            padding: 24px 20px;
            margin: 0 10px;
          }
        }
      `}</style>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        
        {/* Constrained Centered Outer Container */}
        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
          
          <div className="testimonials-slider swiper" ref={sliderRef} style={{ overflow: "visible" }}>
            <div className="swiper-wrapper">
              {TESTIMONIALS.map((testimonial) => (
                <div 
                  className="swiper-slide" 
                  key={testimonial.name}
                  itemScope 
                  itemType="https://schema.org/Review"
                >
                  <div className="compact-testimonial-card">
                    
                    {/* Centered Top Quotation Mark */}
                    <div 
                      style={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        marginBottom: "16px",
                        color: "rgba(26, 120, 100, 0.15)"
                      }}
                      aria-hidden="true"
                    >
                      <svg width="45" height="45" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      
                      {/* Interactive Headline */}
                      <h3 
                        style={{ 
                          fontSize: "clamp(1.15rem, 3vw, 1.4rem)", 
                          fontWeight: "850", 
                          color: "#111827", 
                          marginBottom: "14px",
                          lineHeight: "1.3"
                        }}
                        itemProp="name"
                      >
                        &ldquo;{testimonial.title}&rdquo;
                      </h3>
                      
                      {/* Compact Copy */}
                      <blockquote 
                        style={{ 
                          fontSize: "clamp(0.95rem, 2vw, 1.05rem)", 
                          lineHeight: "1.7", 
                          color: "#4b5563", 
                          margin: "0 auto 24px auto",
                          maxWidth: "650px",
                          fontWeight: "500"
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
                          gap: "14px",
                          textAlign: "left"
                        }}
                        itemProp="author" 
                        itemScope 
                        itemType="https://schema.org/Person"
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          itemProp="image"
                          style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: `2px solid ${ACCENT_EMERALD}`,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                          }}
                        />
                        <div>
                          <cite 
                            style={{ 
                              display: "block", 
                              fontStyle: "normal", 
                              fontWeight: "750", 
                              fontSize: "15px", 
                              color: "#111827" 
                            }}
                            itemProp="name"
                          >
                            {testimonial.name}
                          </cite>
                          <span 
                            style={{ 
                              display: "block", 
                              fontSize: "12.5px", 
                              color: ACCENT_ORANGE,
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px"
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

          {/* Minimal Symmetrical Navigation Controls */}
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              gap: "20px", 
              marginTop: "24px" 
            }}
          >
            {/* Left Button */}
            <button
              className="compact-nav-prev"
              aria-label="Previous Testimonial"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: `1.5px solid ${ACCENT_EMERALD}`,
                backgroundColor: "#ffffff",
                color: ACCENT_EMERALD,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT_EMERALD;
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = ACCENT_EMERALD;
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Pagination Indicators */}
            <div style={{ display: "flex", gap: "6px" }}>
              {TESTIMONIALS.map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: idx === activeIndex ? ACCENT_ORANGE : "rgba(230, 127, 31, 0.25)",
                    transition: "all 0.3s ease",
                    display: "inline-block"
                  }}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              className="compact-nav-next"
              aria-label="Next Testimonial"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: `1.5px solid ${ACCENT_EMERALD}`,
                backgroundColor: "#ffffff",
                color: ACCENT_EMERALD,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT_EMERALD;
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = ACCENT_EMERALD;
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
    </section>
  );
}