"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "./register";
import { DUR, EASE, STAGGER, MM } from "./motionTokens";

/**
 * Scoped scroll-reveal for a section. Mark elements with:
 *   data-reveal              → single fade/translate-up on enter
 *   data-reveal-group        → container whose [data-reveal-item] children stagger in
 * Honors prefers-reduced-motion by showing everything immediately (no ScrollTrigger).
 * Returns a ref to attach to the section root.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const root = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MM.motionOk, () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 24,
            duration: DUR.slow,
            ease: EASE.out,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (!items.length) return;
          gsap.from(items, {
            autoAlpha: 0,
            y: 20,
            duration: DUR.base,
            ease: EASE.out,
            stagger: { each: STAGGER.each, amount: STAGGER.amount },
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              once: true,
            },
          });
        });
      });

      mm.add(MM.reduce, () => {
        gsap.set("[data-reveal], [data-reveal-item]", { autoAlpha: 1, y: 0 });
      });
    },
    { scope: root },
  );

  return root;
}
