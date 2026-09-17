"use client";

import { useEffect, useState } from "react";

/**
 * Returns the hash (e.g. "#about") of the section currently in view, matching
 * the navmenu scrollspy behaviour of the original template.
 */
export default function useScrollspy(hashes: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = hashes.join(",");

  useEffect(() => {
    if (!hashes.length) {
      setActive(null);
      return;
    }

    const onScroll = () => {
      const position = window.scrollY + 200;
      let current: string | null = null;

      for (const hash of hashes) {
        const section = document.querySelector<HTMLElement>(hash);
        if (!section) continue;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          current = hash;
        }
      }

      setActive(current);
    };

    onScroll();
    document.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
