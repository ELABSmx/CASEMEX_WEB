"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap/register";

type Step = { n: string; title: string; caption: string };

// Vertical scroll → horizontal travel ratio. >1 slows the horizontal movement
// per unit of scroll (smoother, more deliberate) independent of card size.
const SCROLL_SPEED = 1.4;

// Fraction of the pinned scroll that moves the cards; the remainder holds the
// last card centred so it gets a beat in the spotlight before the page advances.
const MOVE_FRACTION = 0.82;

// Centring gutter so the first card starts centred and the last ends centred.
const CARD_W = "clamp(15rem, 34vw, 28rem)";
const SIDE_PAD = `calc((100vw - ${CARD_W}) / 2)`;
// Trailing spacer subtracts one track gap (gap-6 = 1.5rem) so the last card
// lands dead-centre instead of one gap past it.
const SPACER_W = `calc((100vw - ${CARD_W}) / 2 - 1.5rem)`;

/**
 * "De la montaña al mundo" — 5 process steps. On desktop with motion the section
 * pins (header + cards together in one viewport) and normal vertical scroll
 * moves the cards HORIZONTALLY — smooth and continuous (no snap). The card in
 * the focus zone scales up and brightens; the others dim, so each step gets the
 * spotlight without huge cards. Mobile / reduced-motion → clean vertical stack.
 */
export default function Proceso() {
  const t = useTranslations("proceso");
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"stacked" | "horizontal">("stacked");
  const steps = t.raw("steps") as Step[];

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setMode(desktop.matches && !reduce.matches ? "horizontal" : "stacked");
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
      if (mode !== "horizontal" || !root.current) return;
      const pin = root.current.querySelector<HTMLElement>("[data-pin]");
      const track = root.current.querySelector<HTMLElement>("[data-track]");
      if (!pin || !track) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", track);

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Focus spotlight — the card nearest the viewport centre is biggest/brightest.
      const emphasize = () => {
        const focus = window.innerWidth * 0.5;
        cards.forEach((c) => {
          const r = c.getBoundingClientRect();
          const center = r.left + r.width / 2;
          const near = gsap.utils.clamp(0, 1, 1 - Math.abs(center - focus) / (r.width * 1.15));
          gsap.set(c, { opacity: 0.4 + 0.6 * near, scale: 0.9 + 0.1 * near });
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => "+=" + (distance() * SCROLL_SPEED) / MOVE_FRACTION,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: emphasize,
          onRefresh: emphasize,
        },
      });
      // Move the cards across, then hold on the last card centred.
      tl.to(track, { x: () => -distance(), ease: "none", duration: MOVE_FRACTION });
      tl.to({}, { duration: 1 - MOVE_FRACTION });
      emphasize();
    },
    { scope: root, dependencies: [mode] },
  );

  const horizontal = mode === "horizontal";

  return (
    <section ref={root} id="proceso" aria-labelledby="proceso-title" className="bg-neutral-950">
      <div
        data-pin
        className={cn(
          "overflow-hidden",
          horizontal ? "flex h-[100svh] flex-col justify-center gap-6" : "py-20 sm:py-28",
        )}
      >
        <div className="mx-auto w-full max-w-6xl shrink-0 px-6 sm:px-8">
          <h2 id="proceso-title" className="max-w-2xl font-display text-h2">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-xl text-lead text-sage">{t("lead")}</p>
        </div>

        <div
          data-track
          className={cn(
            "flex",
            horizontal ? "gap-6 will-change-transform" : "flex-col gap-6 px-6 sm:px-8",
          )}
          style={horizontal ? { paddingLeft: SIDE_PAD } : undefined}
        >
          {steps.map((step, i) => (
            <figure
              key={step.n}
              data-card
              className={cn(
                "relative shrink-0 overflow-hidden rounded-lg border border-hairline",
                horizontal
                  ? "h-[clamp(18rem,46vh,30rem)] w-[clamp(15rem,34vw,28rem)]"
                  : "aspect-[16/10] w-full",
              )}
            >
              <Image
                src={`/images/M${i + 1}.png`}
                alt={`${step.title} — ${step.caption}`}
                fill
                sizes="(min-width: 768px) 34vw, 100vw"
                priority={i === 0}
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-neutral-950/92 via-neutral-950/25 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="font-display text-h3 text-gold">{step.n}</span>
                <h3 className="mt-1 font-display text-h2 text-text">{step.title}</h3>
                <p className="mt-2 max-w-xs text-neutral-200">{step.caption}</p>
              </figcaption>
            </figure>
          ))}
          {/* Trailing spacer so the last card can reach centre (flex scrollWidth
              ignores trailing padding, so this must be a real element). */}
          {horizontal && <div aria-hidden="true" className="shrink-0" style={{ width: SPACER_W }} />}
        </div>
      </div>
    </section>
  );
}
