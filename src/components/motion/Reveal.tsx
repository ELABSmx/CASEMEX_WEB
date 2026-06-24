"use client";

import { useReveal } from "@/lib/gsap/useReveal";
import { cn } from "@/lib/utils";

/**
 * Client boundary that animates any [data-reveal] / [data-reveal-group] inside
 * it on scroll. Server-rendered section content is passed as children, so copy
 * stays server-rendered while reveals share the single GSAP chunk.
 */
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
