import { useTranslations } from "next-intl";
import HeroMedia from "@/components/media/HeroMedia";
import ImagotipoVertical from "@/components/brand/ImagotipoVertical";

/** Hero inner content (media + scrim + text). Fills its parent layer. */
export default function HeroContent() {
  const t = useTranslations("hero");
  const trust = t.raw("trust") as string[];

  return (
    <div className="relative isolate flex h-full min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center sm:px-8 md:min-h-0">
      <HeroMedia />
      {/* Vignette scrim — focuses darkness behind the centered text. */}
      <div className="absolute inset-0 -z-10 bg-neutral-950/55" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_48%,rgba(22,17,11,0.85),transparent_82%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-neutral-950/70 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <ImagotipoVertical className="h-20 text-neutral-50 sm:h-24 md:h-28" />
        <p className="mt-7 flex items-center gap-2.5 text-caption font-semibold tracking-wide text-neutral-50">
          <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
          {t("kicker")}
        </p>
        <h1 className="mt-5 font-display text-hero font-semibold text-text">
          {t("headline")}
        </h1>
        <p className="mt-6 max-w-xl text-lead text-neutral-200">{t("subhead")}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#contacto"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-7 py-3.5 font-semibold text-neutral-950 transition-colors duration-200 hover:bg-gold-strong"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#empresa"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-neutral-950/30 px-7 py-3.5 font-semibold text-text backdrop-blur-sm transition-colors duration-200 hover:border-gold hover:text-gold"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-caption text-neutral-300">
          {trust.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-border" aria-hidden="true">•</span>}
              <span className="font-medium tracking-wide">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
