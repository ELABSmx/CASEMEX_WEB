"use client";

import { useState } from "react";
import ChiapasMap from "@/components/maps/ChiapasMap";
import { cn } from "@/lib/utils";

type Region = { name: string; note: string };

/**
 * Links the region list and the Chiapas map: hovering or focusing a region
 * highlights its pin on the map (and the row), and vice versa. Keyboard-
 * accessible (each region is a focusable button). The highlight is interaction,
 * not entrance animation, so it works regardless of prefers-reduced-motion.
 */
export default function RegionsExplorer({
  regions,
  mapTitle,
}: {
  regions: Region[];
  mapTitle: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <figure className="rounded-lg border border-hairline bg-neutral-950/40 p-4 sm:p-6">
        <ChiapasMap regions={regions} title={mapTitle} activeIndex={active} />
        <figcaption className="sr-only">{mapTitle}</figcaption>
      </figure>

      <ul className="flex flex-col">
        {regions.map((region, i) => {
          const isActive = active === i;
          return (
            <li key={region.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  "w-full rounded-md border-b border-hairline py-5 pl-3 pr-2 text-left transition-colors first:border-t",
                  isActive && "bg-gold/5",
                )}
              >
                <span className="flex items-center gap-3 text-h3 text-text">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-200",
                      isActive ? "scale-125 bg-gold ring-4 ring-gold/20" : "bg-gold/60",
                    )}
                    aria-hidden="true"
                  />
                  <span className={cn("transition-colors duration-200", isActive && "text-gold")}>
                    {region.name}
                  </span>
                </span>
                <span className="mt-1.5 block pl-[1.4rem] text-text-muted">{region.note}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
