"use client";

import { useEffect, useState } from "react";

export default function ScrollTop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const toggleScrollTop = () => setActive(window.scrollY > 100);

    toggleScrollTop();
    document.addEventListener("scroll", toggleScrollTop);
    return () => document.removeEventListener("scroll", toggleScrollTop);
  }, []);

  return (
    <a
      href="#"
      id="scroll-top"
      className={`scroll-top d-flex align-items-center justify-content-center${
        active ? " active" : ""
      }`}
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <i className="bi bi-arrow-up-short" />
    </a>
  );
}
