"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** ES | EN switch. Preserves the current path and in-page hash. */
export default function LocaleToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: next });
  }

  return (
    <div
      className={cn("flex items-center gap-1 text-caption", className)}
      role="group"
      aria-label={t("langToggle")}
    >
      {routing.locales.map((loc, i) => {
        const active = loc === locale;
        return (
          <span key={loc} className="flex items-center">
            {i > 0 && <span className="mx-1 text-border">/</span>}
            <button
              type="button"
              onClick={() => switchTo(loc)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "min-h-11 px-1 uppercase tracking-wide transition-colors",
                active
                  ? "font-bold text-text underline decoration-gold decoration-2 underline-offset-4"
                  : "font-medium text-text-muted hover:text-text",
              )}
            >
              {loc}
            </button>
          </span>
        );
      })}
    </div>
  );
}
