"use client";

import AOS from "aos";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  // Re-scan the DOM after a client-side navigation.
  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}
