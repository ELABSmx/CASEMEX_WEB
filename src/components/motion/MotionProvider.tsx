"use client";

import { useEffect } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap/register";

/**
 * Registers GSAP once on the client and refreshes ScrollTrigger after web fonts
 * settle (font swap shifts layout and would otherwise leave triggers misaligned).
 * Also disables the browser's scroll restoration so a refresh always starts at
 * the top (cleaner with the pinned hero/process sequences), while still honoring
 * deep links to an anchor (#section).
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    ensureGsap();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, []);

  return <>{children}</>;
}
