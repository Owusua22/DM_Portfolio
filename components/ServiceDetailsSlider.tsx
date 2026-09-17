"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";

const SLIDES = [
  "/assets/img/services/services-1.webp",
  "/assets/img/services/services-2.webp",
  "/assets/img/services/services-3.webp",
];

export default function ServiceDetailsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    // Same configuration the template kept in its .swiper-config JSON block.
    const swiper = new Swiper(sliderRef.current, {
      loop: true,
      speed: 600,
      autoplay: { delay: 5000 },
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });

    return () => swiper.destroy(true, true);
  }, []);

  return (
    <div className="service-details-slider swiper init-swiper" ref={sliderRef}>
      <div className="swiper-wrapper align-items-center">
        {SLIDES.map((slide) => (
          <div className="swiper-slide" key={slide}>
            <img src={slide} alt="" className="img-fluid" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="swiper-pagination" />
    </div>
  );
}
