import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import ChiapasMap from "@/components/maps/ChiapasMap";

type Region = { name: string; note: string };

export default function Origenes() {
  const t = useTranslations("origenes");
  const regions = t.raw("regions") as Region[];

  return (
    <Section id="regiones" aria-labelledby="origenes-title">
      <Reveal>
        <div className="max-w-2xl">
          <h2 id="origenes-title" className="font-display text-h1">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead text-sage">{t("lead")}</p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <figure data-reveal className="rounded-lg border border-hairline bg-neutral-950/40 p-4 sm:p-6">
            <ChiapasMap regions={regions} title={t("mapTitle")} />
            <figcaption className="sr-only">{t("mapTitle")}</figcaption>
          </figure>

          <dl data-reveal-group className="flex flex-col">
            {regions.map((region) => (
              <div
                key={region.name}
                data-reveal-item
                className="border-b border-hairline py-5 first:border-t"
              >
                <dt className="flex items-center gap-3 text-h3 text-text">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" aria-hidden="true" />
                  {region.name}
                </dt>
                <dd className="mt-1.5 pl-[1.4rem] text-text-muted">{region.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-8 max-w-md text-caption text-text-muted">{t("note")}</p>
      </Reveal>
    </Section>
  );
}
