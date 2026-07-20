"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { MM } from "@/lib/gsap/motionTokens";
import { cn } from "@/lib/utils";

type Block = { title: string; body: string };

const GOLD = "#c8a24e";
const DARK = "#16110b";
const GOLD_DIM = "rgba(200,162,78,0.45)";

const ICONS: React.ReactNode[] = [
  <>
    <rect x="4" y="14" width="16" height="5.2" rx="1.6" />
    <rect x="5.6" y="8.6" width="12.8" height="5.2" rx="1.6" />
    <rect x="7.2" y="3.2" width="9.6" height="5.2" rx="1.6" />
  </>,
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8 12.4l2.6 2.6L16.2 9.2" />
  </>,
  <>
    <path d="M12 21c4-4.2 6-7.4 6-10a6 6 0 1 0-12 0c0 2.6 2 5.8 6 10z" />
    <circle cx="12" cy="11" r="2.4" />
  </>,
  <>
    <circle cx="12" cy="12" r="3" />
    <circle cx="5" cy="6" r="1.5" />
    <circle cx="19" cy="6" r="1.5" />
    <circle cx="5" cy="18" r="1.5" />
    <circle cx="19" cy="18" r="1.5" />
    <path d="M9.5 10.2 6.2 7.2M14.5 10.2 17.8 7.2M9.5 13.8 6.2 16.8M14.5 13.8 17.8 16.8" />
  </>,
];

// Node screen positions (%) and the matching path in a 1200×1000 viewBox.
const NODES = [
  { x: 34, y: 12, side: "left" as const },
  { x: 66, y: 38, side: "right" as const },
  { x: 34, y: 64, side: "left" as const },
  { x: 66, y: 90, side: "right" as const },
];
const PATH = "M408 120 C408 250 792 250 792 380 C792 510 408 510 408 640 C408 770 792 770 792 900";
// Draw-progress (0-1) at which the line head reaches each node → fills its badge.
const NODE_AT = [0.04, 0.37, 0.69, 0.97];

function IconBubble({ i }: { i: number }) {
  return (
    <span
      data-badge={i}
      className="flex h-16 w-16 items-center justify-center rounded-full border-2"
      style={{ borderColor: GOLD_DIM, backgroundColor: DARK, color: GOLD }}
    >
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
      <p className={cn("mt-2 text-neutral-200", align === "right" && "ml-auto")} style={{ maxWidth: "30ch" }}>
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
      const path = root.current.querySelector<SVGPathElement>("[data-road]");
      const vline = root.current.querySelector("[data-road-fallback]");
      // querySelectorAll: the stacked fallback splits one node's text into two
      // siblings (heading row + body) sharing the same data-content index.
      const groups = blocks.map((_, i) => ({
        content: root.current!.querySelectorAll(`[data-content="${i}"]`),
        badge: root.current!.querySelector(`[data-badge="${i}"]`),
      }));
      const mm = gsap.matchMedia();

      const fillBadge = { backgroundColor: GOLD, color: DARK, borderColor: GOLD, scale: 1.06 };
      const dimBadge = { backgroundColor: DARK, color: GOLD, borderColor: GOLD_DIM, scale: 0.92 };

      // The stacked fallback line must span exactly from the FIRST badge's
      // centre to the LAST badge's centre (the desktop SVG route starts and
      // ends at its nodes too). Returns each badge's arrival fraction.
      const sizeFallbackLine = (): number[] => {
        if (!(vline instanceof HTMLElement)) return [...NODE_AT];
        const baseline = root.current!.querySelector("[data-road-base]");
        const listTop = vline.parentElement!.getBoundingClientRect().top;
        const centers = groups.map((g) => {
          if (!(g.badge instanceof HTMLElement)) return 0;
          const r = g.badge.getBoundingClientRect();
          return r.top + r.height / 2 - listTop;
        });
        const first = centers[0] ?? 0;
        const lineHeight = Math.max(1, (centers[centers.length - 1] ?? first) - first);
        gsap.set([baseline, vline].filter(Boolean), { top: first, height: lineHeight });
        return centers.map((c) =>
          gsap.utils.clamp(0, 1, (c - first) / lineHeight),
        );
      };

      mm.add(MM.motionOk, () => {
        // Arrival fractions along the drawn line. Desktop MEASURES where the
        // SVG path actually passes each node (the nodes are the curve's anchor
        // points) instead of trusting hardcoded guesses, so a badge fills
        // exactly when the growing head reaches it. The stacked fallback
        // measures badge positions on the vertical line for the same effect.
        const measurePathFractions = (p: SVGPathElement): number[] => {
          const total = p.getTotalLength();
          const targets = NODES.map((n) => ({
            x: (n.x / 100) * 1200,
            y: (n.y / 100) * 1000,
          }));
          const best = targets.map(() => ({ dist: Infinity, frac: 0 }));
          const STEPS = 500;
          for (let s = 0; s <= STEPS; s++) {
            const l = (s / STEPS) * total;
            const pt = p.getPointAtLength(l);
            targets.forEach((t, i) => {
              const d = (pt.x - t.x) ** 2 + (pt.y - t.y) ** 2;
              if (d < best[i].dist) best[i] = { dist: d, frac: l / total };
            });
          }
          return best.map((b) => b.frac);
        };
        const nodeAt: number[] = path ? measurePathFractions(path) : sizeFallbackLine();

        // Continuous draw via real path length (no dash artifacts).
        if (path) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        }
        if (vline) gsap.set(vline, { scaleY: 0, transformOrigin: "top center" });
        groups.forEach((g) => {
          gsap.set(g.content, { autoAlpha: 0.4 });
          gsap.set(g.badge, dimBadge);
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            // The stacked list is several viewports tall, so its window ends
            // higher — otherwise the last nodes only light up at the footer.
            start: "top 78%",
            end: path ? "bottom 62%" : "bottom 78%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        if (path) tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
        if (vline) tl.to(vline, { scaleY: 1, ease: "none", duration: 1 }, 0);
        groups.forEach((g, i) => {
          const at = nodeAt[i] ?? 0;
          if (path) {
            // Desktop curve: ignite ON contact — a short fill that FINISHES as
            // the head reaches the node (the old 0.16 lit it well before).
            const fillDur = 0.05;
            tl.to(g.content, { autoAlpha: 1, ease: "power1.out", duration: 0.05 }, Math.max(0, at - 0.05));
            tl.to(g.badge, { ...fillBadge, ease: "back.out(1.7)", duration: fillDur }, Math.max(0, at - fillDur));
          } else {
            // Straight line: ignite ON contact — starting earlier reads as
            // "lit before the line arrived" on a tall vertical list.
            tl.to(g.content, { autoAlpha: 1, ease: "power1.out", duration: 0.05 }, Math.max(0, at - 0.03));
            tl.to(g.badge, { ...fillBadge, ease: "back.out(1.7)", duration: 0.07 }, at);
          }
        });
      });

      mm.add(MM.reduce, () => {
        if (path) gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
        if (vline) {
          sizeFallbackLine();
          gsap.set(vline, { scaleY: 1 });
        }
        groups.forEach((g) => {
          gsap.set(g.content, { autoAlpha: 1 });
          gsap.set(g.badge, { ...dimBadge, scale: 1, borderColor: GOLD });
        });
      });
    },
    { scope: root, dependencies: [organic] },
  );

  return (
    <div ref={root} className="mt-14">
      {organic ? (
        <div className="relative aspect-[6/5] text-gold">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 1000" aria-hidden="true">
            {/* Faint planned route */}
            <path d={PATH} fill="none" stroke="currentColor" strokeOpacity={0.13} strokeWidth={3.5} strokeLinecap="round" />
            {/* Bright route that grows with scroll */}
            <path
              data-road
              d={PATH}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.85}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          </svg>

          {NODES.map((n, i) => (
            <Fragment key={blocks[i]?.title ?? i}>
              <div
                data-content={i}
                className={cn(
                  "absolute z-10 -translate-y-1/2",
                  n.side === "left" ? "left-0 right-[66%] pr-16 text-right" : "left-[66%] right-0 pl-16 text-left",
                )}
                style={{ top: `${n.y}%` }}
              >
                <NodeText block={blocks[i]} index={i} align={n.side} />
              </div>
              <div
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <IconBubble i={i} />
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        <ol className="relative max-w-xl">
          {/* Faint planned route + bright route that grows with scroll —
              same pair as the desktop SVG, straightened. GSAP trims both to
              end at the LAST badge's centre (bottom-8 is the no-JS fallback). */}
          <span
            data-road-base
            aria-hidden="true"
            className="absolute bottom-8 left-8 top-8 w-0.5 -translate-x-1/2 bg-gold/15"
          />
          <span
            data-road-fallback
            aria-hidden="true"
            className="absolute bottom-8 left-8 top-8 w-0.5 -translate-x-1/2 bg-gold/85"
          />
          {blocks.map((block, i) => (
            <li key={block.title} className="relative pb-12 last:pb-0">
              {/* Bubble vertically centred against the number + title group,
                  mirroring the desktop layout where text centres on the node. */}
              <div className="flex items-center gap-5">
                <span className="relative z-10 shrink-0">
                  <IconBubble i={i} />
                </span>
                <div data-content={i}>
                  <span className="font-display text-caption font-semibold tracking-wider text-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-0.5 font-display text-h2 text-gold">{block.title}</h3>
                </div>
              </div>
              {/* Body shares the text column (bubble 4rem + gap 1.25rem). */}
              <p data-content={i} className="mt-3 pl-[5.25rem] text-neutral-200">
                {block.body}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
