import { useTranslations } from "next-intl";
import SmartImage from "@/components/media/SmartImage";

type Fact = { value: string; label: string };

/**
 * Historia inner content. Opaque (bg-bg) so it fully covers the hero layer when
 * revealed in the blackout sequence. Vertically centered; fits one viewport on
 * desktop and flows naturally on mobile.
 */
export default function HistoriaContent() {
  const t = useTranslations("historia");
  const m = useTranslations("media");
  const facts = t.raw("facts") as Fact[];

  return (
    <div className="flex h-full min-h-[100svh] items-center bg-bg md:min-h-0">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 md:py-16 lg:py-0">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <h2 className="font-display text-h1">{t("title")}</h2>
            <p className="mt-4 text-lead text-sage">{t("lead")}</p>
            <p className="mt-6 text-text-muted">{t("p1")}</p>
            <p className="mt-4 text-text-muted">{t("p2")}</p>
          </div>

          <div>
            <SmartImage
              src="/images/manos.jpeg"
              alt={m("imagineAlt.historia")}
              aspect="3 / 2"
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholderLabel={m("placeholderLabel")}
            />
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-display text-h2 text-gold">{fact.value}</dt>
              <dd className="mt-1 text-caption uppercase tracking-wider text-text-muted">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
