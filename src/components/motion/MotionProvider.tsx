"use client";

import { useEffect } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap/register";

/**
 * Registers GSAP once on the client and refreshes ScrollTrigger after web fonts
 * settle (font swap shifts layout and would otherwise leave triggers misaligned).
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ensureGsap();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, []);

  return <>{children}</>;
}
