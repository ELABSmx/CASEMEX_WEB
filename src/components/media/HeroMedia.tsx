"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background media. Plays the looping ~1.4 MB video on all viewports
 * (including iOS Safari, via muted + playsInline inline autoplay). Shows the
 * static poster only when the user prefers reduced motion. SSR-safe default is
 * the poster, so first paint is instant and there's never a blank hero.
 */
export default function HeroMedia() {
  const [mode, setMode] = useState<"poster" | "video">("poster");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setMode(reduce.matches ? "poster" : "video");
    decide();
    reduce.addEventListener("change", decide);
    return () => reduce.removeEventListener("change", decide);
  }, []);

  // iOS Safari only allows inline autoplay when the element is actually muted.
  // React's `muted` prop is applied unreliably, so set it on the DOM node and
  // kick off playback explicitly (the promise rejects silently if blocked).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [mode]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-neutral-950">
      {mode === "video" ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
          className="h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
