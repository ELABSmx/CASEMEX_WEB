import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Renders a WhatsApp link only when NEXT_PUBLIC_WHATSAPP is configured.
 * Returns null otherwise — no dead button, no "coming soon" placeholder.
 */
export default function WhatsAppButton({
  label,
  message,
  className,
  variant = "solid",
}: {
  label: string;
  message?: string;
  className?: string;
  variant?: "solid" | "outline";
}) {
  const href = whatsappHref(message);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 font-semibold transition-colors duration-200",
        variant === "solid"
          ? "bg-success/15 text-success hover:bg-success/25"
          : "border border-border text-text hover:border-success hover:text-success",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.69-1.42 1.32-1.95 1.36-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02 0-1.44.76-2.14 1.02-2.43.27-.29.59-.37.79-.37.2 0 .39.002.56.01.18.008.42-.07.66.5.24.59.82 2.03.89 2.18.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.71.81 2 .96.29.15.49.22.56.34.07.12.07.69-.17 1.38Z" />
      </svg>
      {label}
    </a>
  );
}
