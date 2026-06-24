/** Motion constants shared across sections. Durations in seconds (GSAP). */
export const DUR = { fast: 0.2, base: 0.4, slow: 0.5, hero: 0.5 } as const;

export const EASE = {
  out: "power2.out",
  soft: "power1.out",
  linear: "none",
} as const;

/** Stagger: `each` is the per-item floor, `amount` caps the TOTAL run. */
export const STAGGER = { each: 0.08, amount: 0.4 } as const;

/** matchMedia queries — one place so every section branches identically. */
export const MM = {
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  reduce: "(prefers-reduced-motion: reduce)",
  motionOk: "(prefers-reduced-motion: no-preference)",
} as const;
