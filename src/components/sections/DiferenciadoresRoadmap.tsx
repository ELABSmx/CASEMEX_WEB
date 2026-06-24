"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { MM } from "@/lib/gsap/motionTokens";
import { cn } from "@/lib/utils";

type Block = { title: string; body: string };

// One clean stroke icon per differentiator (inner SVG, stroke = currentColor).
const ICONS: React.ReactNode[] = [
  // Volumen — stacked sacks
  <>
    <rect x="4" y="14" width="16" height="5.2" rx="1.6" />
    <rect x="5.6" y="8.6" width="12.8" height="5.2" rx="1.6" />
    <rect x="7.2" y="3.2" width="9.6" height="5.2" rx="1.6" />
  </>,
  // Calidad — verified check
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8 12.4l2.6 2.6L16.2 9.2" />
  </>,
  // Trazabilidad — origin pin
  <>
    <path d="M12 21c4-4.2 6-7.4 6-10a6 6 0 1 0-12 0c0 2.6 2 5.8 6 10z" />
    <circle cx="12" cy="11" r="2.4" />
  </>,
  // Un solo interlocutor — hub consolidating many
  <>
    <circle cx="12" cy="12" r="3" />
    <circle cx="5" cy="6" r="1.5" />
    <circle cx="19" cy="6" r="1.5" />
    <circle cx="5" cy="18" r="1.5" />
    <circle cx="19" cy="18" r="1.5" />
    <path d="M9.5 10.2 6.2 7.2M14.5 10.2 17.8 7.2M9.5 13.8 6.2 16.8M14.5 13.8 17.8 16.8" />
  </>,
];

// Winding "road" — nodes alternate sides; the path snakes between them.
// Coords are in a 0–100 space (matched by the SVG viewBox + the HTML %s), so the
// path always threads the nodes regardless of container size.
const NODES = [
  { x: 34, y: 12, side: "left" as const },
  { x: 66, y: 38, side: "right" as const },
  { x: 34, y: 64, side: "left" as const },
  { x: 66, y: 90, side: "right" as const },
];
const PATH = "M34 12 C34 24 66 26 66 38 C66 50 34 52 34 64 C34 76 66 78 66 90";

function IconBubble({ i }: { i: number }) {
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-neutral-950 text-gold shadow-[0_0_0_7px_var(--color-bg)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
        aria-hidden="true"
      >
        {ICONS[i] ?? ICONS[0]}
      </svg>
    </span>
  );
}

function NodeText({ block, index, align }: { block: Block; index: number; align: "left" | "right" }) {
  return (
    <>
      <span className="font-display text-caption font-semibold tracking-wider text-gold/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-0.5 font-display text-h2 text-gold">{block.title}</h3>
      <p className={cn("mt-2 text-neutral-200", align === "right" ? "ml-auto" : "")} style={{ maxWidth: "30ch" }}>
        {block.body}
      </p>
    </>
  );
}

export default function DiferenciadoresRoadmap({ blocks }: { blocks: Block[] }) {
  const [organic, setOrganic] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const decide = () => setOrganic(lg.matches);
    decide();
    lg.addEventListener("change", decide);
    return () => lg.removeEventListener("change", decide);
  }, []);

  useGSAP(
    () => {
      if (!root.current) return;
      const path = root.current.querySelector("[data-road]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
      const mm = gsap.matchMedia();

      mm.add(MM.motionOk, () => {
        if (path) gsap.set(path, { strokeDashoffset: 1 });
        gsap.set(nodes, { autoAlpha: 0, y: 22 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        });
        if (path) tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" });
        tl.to(nodes, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.14 }, 0.3);
      });

      mm.add(MM.reduce, () => {
        if (path) gsap.set(path, { strokeDashoffset: 0 });
        gsap.set(nodes, { autoAlpha: 1, y: 0 });
      });
    },
    { scope: root, dependencies: [organic] },
  );

  return (
    <div ref={root} className="mt-14">
      {organic ? (
        /* Organic winding roadmap (desktop) */
        <div className="relative min-h-[880px] text-gold">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              data-road
              d={PATH}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
            />
          </svg>

          {NODES.map((n, i) => (
            <Fragment key={blocks[i]?.title ?? i}>
              <div
                data-node
                className={cn(
                  "absolute z-10 -translate-y-1/2",
                  n.side === "left" ? "left-0 right-[66%] pr-16 text-right" : "left-[66%] right-0 pl-16 text-left",
                )}
                style={{ top: `${n.y}%` }}
              >
                <NodeText block={blocks[i]} index={i} align={n.side} />
              </div>
              <div
                data-node
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <IconBubble i={i} />
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        /* Vertical fallback (tablet / mobile) */
        <ol className="relative max-w-xl">
          <span
            data-road-fallback
            aria-hidden="true"
            className="absolute bottom-8 left-8 top-8 w-0.5 -translate-x-1/2 bg-gold/35"
          />
          {blocks.map((block, i) => (
            <li key={block.title} data-node className="relative flex gap-6 pb-12 last:pb-0">
              <span className="relative z-10 shrink-0">
                <IconBubble i={i} />
              </span>
              <div className="pt-2">
                <NodeText block={block} index={i} align="left" />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
