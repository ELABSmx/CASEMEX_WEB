"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Register GSAP plugins exactly once, client-side only. */
export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Global defaults so no stray tween sneaks in a bouncy, slow animation.
  gsap.defaults({ ease: "power2.out", duration: 0.5 });
  registered = true;
}

export { gsap, ScrollTrigger, useGSAP };
