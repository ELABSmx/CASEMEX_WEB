import { cn } from "@/lib/utils";

/**
 * CASEMEX isotipo (the mark): two interlocking coffee-cherry halves inside a
 * C-ring. Single-color paths recolored via `currentColor` — set text color on
 * the parent. Never render the raw black outline on the espresso ground.
 * Generated from /SVG/isotipo.svg.
 */
export default function Isotipo({
  className,
  title = "CASEMEX",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 69.38 85.55"
      fill="currentColor"
      role="img"
      aria-label={title}
      className={cn("h-full w-auto", className)}
      dangerouslySetInnerHTML={{ __html: "<g><g><path d=\"M13.86,33.83v17.89c0,11.48,9.34,20.83,20.83,20.83s20.83-9.34,20.83-20.83v-17.89c0-11.48-9.34-20.83-20.83-20.83s-20.83,9.34-20.83,20.83ZM19.17,51.72v-17.89c0-6.44,3.95-11.98,9.55-14.32-4.05,8.16-2.69,18.35,4.1,25.14,6.17,6.17,6.41,16.05.75,22.53-8.03-.58-14.4-7.28-14.4-15.46ZM50.21,33.83v17.89c0,6.44-3.95,11.98-9.55,14.32,4.05-8.17,2.7-18.35-4.1-25.14-6.17-6.17-6.41-16.05-.75-22.53,8.03.58,14.4,7.28,14.4,15.46Z\"/><path d=\"M32,85.55h5.37c17.65,0,32-14.36,32-32,0-1.47-1.19-2.65-2.65-2.65s-2.65,1.19-2.65,2.65c0,14.72-11.98,26.7-26.7,26.7h-5.37c-14.72,0-26.7-11.98-26.7-26.7v-21.54c0-14.72,11.98-26.7,26.7-26.7h5.37c14.72,0,26.7,11.98,26.7,26.7,0,1.47,1.19,2.65,2.65,2.65s2.65-1.19,2.65-2.65C69.38,14.36,55.02,0,37.38,0h-5.37C14.36,0,0,14.36,0,32v21.54c0,17.65,14.36,32,32,32Z\"/></g></g>" }}
    />
  );
}
