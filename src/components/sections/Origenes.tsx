import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import RegionsExplorer from "@/components/sections/RegionsExplorer";

type Region = { name: string; note: string };

export default function Origenes() {
  const t = useTranslations("origenes");
  const regions = t.raw("regions") as Region[];
  const bgExists = existsSync(
    path.join(process.cwd(), "public", "images", "regiones-bg.jpg"),
  );

  return (
    <section id="regiones" aria-labelledby="origenes-title" className="relative overflow-hidden">
      {bgExists && (
        <Image
          src="/images/regiones-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
      )}
      {/* Scrim for depth + legibility over the (Chiapas mountain) background. */}
      <div className="absolute inset-0 bg-neutral-950/85" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Reveal>
          <div data-reveal className="max-w-2xl">
            <h2 id="origenes-title" className="font-display text-h1">
              {t("title")}
            </h2>
            <p className="mt-4 text-lead text-sage">{t("lead")}</p>
          </div>
        </Reveal>

        <div className="mt-12">
          <RegionsExplorer regions={regions} mapTitle={t("mapTitle")} />
        </div>

        <p className="mt-8 max-w-md text-caption text-text-muted">{t("note")}</p>
      </div>
    </section>
  );
}
