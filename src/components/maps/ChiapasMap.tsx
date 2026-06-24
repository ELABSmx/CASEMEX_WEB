"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { MM } from "@/lib/gsap/motionTokens";
import { cn } from "@/lib/utils";

/**
 * Designed map of Chiapas with labeled coffee zones. The outline is REAL
 * geometry — Chiapas state polygon from a public Mexico GeoJSON (angelnmara/
 * geojson, derived from INEGI), projected (equirectangular, cos-lat corrected)
 * to this viewBox. Region markers are placed at their true lat/lng.
 * Interactive: highlights the pin matching `activeIndex` and staggers the pins
 * in when the map enters the viewport. {{TODO}}: confirm exact zones with client.
 */

type Region = { name: string; note?: string };

// Projected marker positions, in catalog order. Each is the region's real seat
// town, projected with the same transform as the outline:
//   Soconusco    → Tapachula            (SE Pacific coast)
//   Sierra Madre → Ángel Albino Corzo / Jaltenango (El Triunfo, central-south sierra)
//   Frailesca    → Villaflores          (central depression)
//   Norte / Selva→ Tila                 (northern coffee zone)
const MARKERS: { x: number; y: number; anchor: "start" | "middle" | "end"; dx: number; dy: number }[] = [{"x":501.9,"y":847.6,"anchor":"middle","dx":0,"dy":46},{"x":379.1,"y":581.7,"anchor":"start","dx":30,"dy":9},{"x":235.9,"y":481.5,"anchor":"start","dx":30,"dy":9},{"x":459.9,"y":186.8,"anchor":"middle","dx":0,"dy":40}];

const OUTLINE =
  "M13 531.4 L14.9 524.6 L18.5 520.3 L25.2 526.7 L26.6 532.6 L13 531.4ZM9.2 484.9 L7.7 457.6 L13.2 442.1 L10.5 431.7 L0 410.8 L0.9 401.8 L18.5 350.9 L20.2 343.6 L25.8 332.1 L47 316 L55.3 306.8 L58.6 297.2 L63.8 269.7 L71.9 258.8 L72.7 247.2 L71.6 237.6 L75.2 227.5 L80 219.7 L85.2 215.5 L105.9 206.4 L122.6 190.5 L140.5 180.5 L145.4 175.7 L150.1 171.7 L172.3 142 L172.9 124.9 L182.9 114.7 L187.7 105.1 L200.4 96.7 L206.7 84.4 L210.4 65.4 L209.9 40.4 L213.9 29.7 L212.7 14.4 L214.6 9.4 L224 5.5 L232.2 6.4 L238 0 L252.7 8.2 L260.7 8.9 L266.5 13.8 L275.5 26.9 L283.7 30.6 L294.8 31 L308.8 28.2 L313.6 35.1 L309.6 47.6 L300.2 63.5 L294.6 70 L293 76.2 L297 86.1 L302.7 93.5 L313.1 99.7 L319 109.2 L318.2 121 L315.7 129 L332.8 131.8 L337.5 128.1 L347.7 135.3 L352.3 147.2 L356 150.8 L356.4 157.7 L363.5 167 L372.1 170.3 L379.2 169.5 L392.4 161.3 L418.1 137.4 L439.4 124.3 L457.3 110.6 L479.9 92.1 L485.9 83.3 L496.7 77.5 L520.9 70.7 L525 62.4 L524.3 55.1 L520.6 43.8 L526.1 36.1 L530.1 35.7 L544.9 41.2 L565.5 40.9 L568.2 36.8 L573.1 21.4 L588.5 25.3 L587.2 31.5 L593.1 34.8 L599.4 30.1 L612 31.9 L624.8 29 L631 34.8 L636.1 43.4 L638.3 54.7 L636.6 64.7 L648.1 72.1 L655.8 71.9 L663.8 78.1 L670.1 100 L677.3 113.1 L675.1 124.9 L669.6 135.3 L669.4 141.3 L674.1 145 L687.2 147.5 L697 146.8 L715.4 154 L717.5 162.8 L731.4 166.7 L743.1 185.7 L734.9 188.6 L729.3 199.6 L722.4 200.3 L728.4 210.7 L736.5 210.3 L742.7 214.3 L746.9 222.2 L755.8 218.5 L765.6 221.8 L765.4 230.6 L771 238.5 L777.7 241.3 L781.2 251.5 L793.1 263.8 L804.3 266.2 L807.5 277.1 L822.1 291.7 L823.2 298.5 L837.5 302.8 L843.1 309.4 L857.6 311 L860.2 320.1 L871.1 320.1 L880.5 327.7 L892.4 326.9 L892.8 332.8 L903.5 336.8 L905.8 340.5 L915.5 346.1 L918.8 353.6 L924 356.6 L926 364.8 L930.2 369.4 L931.3 382.1 L929.8 387.7 L933.3 392.8 L933.9 403.8 L942.6 402.7 L943.8 408.6 L951.1 417.1 L960.1 416.3 L966.5 420.5 L972.5 417.5 L978.2 424.6 L976.6 429.8 L994.7 429.8 L1000 442.2 L996.1 446 L999.7 451.6 L990.5 461.4 L988.6 468.2 L992.4 471.9 L990 482.2 L984.2 489.2 L986.5 496.1 L992.7 500.6 L985.6 505.2 L983.7 517.1 L987.3 526.7 L845.3 525.8 L823.1 526.2 L726.5 524.6 L646.1 523.8 L610.4 586.4 L579.5 641.3 L552.4 688.5 L541.2 706.8 L516.1 749.5 L557.2 803.2 L552.4 812.7 L546.5 820.5 L537.6 819.5 L533.8 827.3 L533.6 838.7 L535.2 854.1 L524.1 868.9 L529.8 887.9 L527.5 891.4 L533.6 903 L533.8 915 L526.1 927.6 L526.3 933.9 L522.1 944.1 L513 951.8 L504.9 945.1 L480.7 920.8 L465.6 908 L459.4 898.2 L444.9 883.6 L442.7 883.1 L375.8 811.8 L372.9 807.9 L349 783.6 L348 774.5 L339.5 772.5 L307.7 741.6 L295.2 728.8 L266.1 702 L221 659.7 L175.6 623.8 L163.3 613.6 L123.5 584.8 L98.7 568.5 L86.5 561.3 L68 552.1 L58.2 548.8 L61.1 544.5 L69.1 543.9 L72.2 550.4 L78.8 547.5 L80.4 542.4 L76 532.6 L68.4 522.8 L58.4 520.2 L45.6 520.1 L39.5 516.2 L32.8 516.7 L19 511.9 L11.3 502.2 L9.2 484.9Z";

export default function ChiapasMap({
  regions,
  title,
  activeIndex = null,
}: {
  regions: Region[];
  title: string;
  activeIndex?: number | null;
}) {
  const root = useRef<SVGSVGElement>(null);

  // Stagger the pins in when the map enters the viewport (once).
  useGSAP(
    () => {
      const pins = gsap.utils.toArray<SVGGElement>("[data-pin]", root.current);
      const mm = gsap.matchMedia();
      mm.add(MM.motionOk, () => {
        gsap.from(pins, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
      mm.add(MM.reduce, () => gsap.set(pins, { autoAlpha: 1 }));
    },
    { scope: root },
  );

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={root} viewBox="0 0 1000 952" role="img" aria-label={title} className="h-auto w-full">
        <title>{title}</title>

        {/* Real Chiapas outline */}
        <path
          d={OUTLINE}
          className="fill-surface"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinejoin="round"
          style={{ color: "var(--color-border)" }}
        />

        {/* Region markers + labels at true coordinates */}
        {regions.slice(0, MARKERS.length).map((region, i) => {
          const m = MARKERS[i];
          const active = activeIndex === i;
          return (
            <g key={region.name} data-pin>
              {/* Inner group scales on highlight (label stays put). */}
              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transform: active ? "scale(1.35)" : "scale(1)",
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={22}
                  className={cn("transition-all duration-300", active ? "fill-gold/35" : "fill-gold/15")}
                />
                <circle cx={m.x} cy={m.y} r={9} className="fill-gold" />
              </g>
              <text
                x={m.x + m.dx}
                y={m.y + m.dy}
                textAnchor={m.anchor}
                className={cn(
                  "text-[28px] font-semibold transition-colors duration-300",
                  active ? "fill-gold" : "fill-text",
                )}
                style={{ fontFamily: "var(--font-sans)", paintOrder: "stroke", stroke: "var(--color-bg)", strokeWidth: 6, strokeLinejoin: "round" }}
              >
                {region.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
