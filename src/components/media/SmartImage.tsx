import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import Isotipo from "@/components/brand/Isotipo";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  /** Public path, e.g. "/images/historia.jpg". */
  src: string;
  alt: string;
  /** CSS aspect-ratio for the reserved box (prevents layout shift). */
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  /** Caption shown on the placeholder when the asset is missing. */
  placeholderLabel?: string;
};

/**
 * Renders the real image when the file exists in /public; otherwise a calm,
 * on-brand placeholder (tinted panel + faint isotipo + caption). The reserved
 * aspect-ratio box keeps layout stable when the real asset is dropped in later.
 * Server component — file existence is resolved at build time (SSG).
 */
export default function SmartImage({
  src,
  alt,
  aspect = "4 / 3",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  rounded = true,
  placeholderLabel,
}: SmartImageProps) {
  const exists = existsSync(path.join(process.cwd(), "public", src));

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-surface",
        rounded && "rounded-lg",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {exists ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-raised"
          aria-hidden="true"
        >
          <span className="h-12 w-12 text-border opacity-60">
            <Isotipo />
          </span>
          {placeholderLabel ? (
            <span className="text-caption font-medium uppercase tracking-wider text-text-muted">
              {placeholderLabel}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
