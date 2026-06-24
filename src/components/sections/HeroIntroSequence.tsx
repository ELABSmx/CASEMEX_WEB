"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap/register";

/**
 * Hero → Historia as a cinematic "blackout" sequence: the hero stays pinned
 * (sticky) in the viewport, the lights fade OFF to black on scroll, then fade
 * ON to reveal Historia in the same spot — no physical slide between them.
 * Desktop + motion only. Mobile / reduced-motion fall back to normal stacked
 * sections (decided client-side, SSR-safe default = stacked).
 */
export default function HeroIntroSequence({
  hero,
  historia,
}: {
  hero: React.ReactNode;
  historia: React.ReactNode;
}) {
  const [mode, setMode] = useState<"stacked" | "blackout">("stacked");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setMode(desktop.matches && !reduce.matches ? "blackout" : "stacked");
    decide();
    desktop.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      desktop.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  useGSAP(
    () => {
      if (mode !== "blackout" || !root.current) return;
      const hero = root.current.querySelector('[data-layer="hero"]');
      const hist = root.current.querySelector('[data-layer="historia"]');
      const black = root.current.querySelector("[data-blackout]");
      if (!hero || !hist || !black) return;

      gsap.set(hist, { autoAlpha: 0 });
      gsap.set(black, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      // Lights OFF — hero fades to black.
      tl.to(black, { autoAlpha: 1, ease: "power2.in", duration: 0.3 }, 0.12);
      // Swap layers while the screen is fully black (invisible crossfade).
      tl.to(hero, { autoAlpha: 0, duration: 0.02 }, 0.43);
      tl.to(hist, { autoAlpha: 1, duration: 0.02 }, 0.5);
      // Lights ON — Historia emerges from black.
      tl.to(black, { autoAlpha: 0, ease: "power2.out", duration: 0.38 }, 0.57);
    },
    { scope: root, dependencies: [mode] },
  );

  const blackout = mode === "blackout";

  return (
    <section
      ref={root}
      id="inicio"
      className={cn("relative", blackout && "h-[220vh]")}
    >
      {/* Anchor target for "Empresa" — lands where Historia is lit. */}
      <span
        id="empresa"
        aria-hidden="true"
        className="pointer-events-none absolute left-0"
        style={{ top: blackout ? "60%" : "100vh" }}
      />

      <div className={cn(blackout && "sticky top-0 h-screen overflow-hidden")}>
        <div
          data-layer="hero"
          className={blackout ? "absolute inset-0" : "relative"}
        >
          {hero}
        </div>
        <div
          data-layer="historia"
          className={blackout ? "absolute inset-0 opacity-0" : "relative"}
        >
          {historia}
        </div>
        <div
          data-blackout
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black opacity-0"
        />
      </div>
    </section>
  );
}
