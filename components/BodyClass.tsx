"use client";

import { useEffect } from "react";

/**
 * The original template sets a per-page class on <body> (index-page,
 * portfolio-details-page, ...). Only the root layout can render <body> in the
 * App Router, so each page applies its class here instead.
 */
export default function BodyClass({ className }: { className: string }) {
  useEffect(() => {
    document.body.classList.add(className);
    return () => document.body.classList.remove(className);
  }, [className]);

  return null;
}
