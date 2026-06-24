"use client";

import { useRef } from "react";
import Image from "next/image";
import Isotipo from "@/components/brand/Isotipo";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { MM } from "@/lib/gsap/motionTokens";

/**
 * Full-bleed background layer with a subtle (<=8%) parallax on desktop+motion.
 * When the image is missing it renders an intentional branded-dark placeholder
 * (gradient + faint isotipo) so the section never looks empty. The parent adds
 * its own scrim on top for text contrast. Reduced-motion / mobile = static.
 */
export default function ParallaxBg({
  src,
  hasImage,
  alt = "",
}: {
  src: string;
  hasImage: boolean;
  alt?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!hasImage || !root.current) return;
      const layer = root.current.querySelector("[data-parallax]");
      if (!layer) return;
      const mm = gsap.matchMedia();
      mm.add(`${MM.desktop} and ${MM.motionOk}`, () => {
        gsap.fromTo(
          layer,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root, dependencies: [hasImage] },
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {hasImage ? (
        <div data-parallax className="absolute inset-0 scale-110">
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
          <span className="absolute left-1/2 top-1/2 flex h-[44vh] -translate-x-1/2 -translate-y-1/2 items-center text-neutral-800/40">
            <Isotipo />
          </span>
        </div>
      )}
    </div>
  );
}
