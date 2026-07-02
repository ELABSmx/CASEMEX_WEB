import { existsSync } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import ParallaxBg from "@/components/media/ParallaxBg";
import SmartImage from "@/components/media/SmartImage";
import DiferenciadoresRoadmap from "@/components/sections/DiferenciadoresRoadmap";

type Block = { title: string; body: string };
type Accreditation = { title: string; intro: string; items: string[] };
type Sectors = { title: string; items: string[] };

export default function Diferenciadores() {
  const t = useTranslations("diferenciadores");
  const m = useTranslations("media");
  const blocks = t.raw("blocks") as Block[];
  const accreditation = t.raw("accreditation") as Accreditation;
  const sectors = t.raw("sectors") as Sectors;
  const bgExists = existsSync(
    path.join(process.cwd(), "public", "images", "diferenciadores-bg.jpg"),
  );

  return (
    <section id="diferenciadores" aria-labelledby="dif-title" className="relative overflow-hidden">
      <ParallaxBg src="/images/diferenciadores-bg.jpg" hasImage={bgExists} />
      {/* Scrim keeps the gold titles + body well above 4.5:1 over any photo. */}
      <div className="absolute inset-0 bg-neutral-950/80" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Reveal>
          <div data-reveal className="max-w-2xl">
            <h2 id="dif-title" className="font-display text-h1">
              {t("title")}
            </h2>
            <p className="mt-4 text-lead text-sage">{t("lead")}</p>
          </div>
        </Reveal>

        <DiferenciadoresRoadmap blocks={blocks} />

        <Reveal>
          <div className="mt-16 border-t border-hairline pt-12 lg:mt-20 lg:pt-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div data-reveal>
                <h3 className="font-display text-h2 text-text">{accreditation.title}</h3>
                <p className="mt-4 text-text-muted">{accreditation.intro}</p>
                <SmartImage
                  src="/images/laboratorio.jpg"
                  alt={m("imagineAlt.laboratorio")}
                  aspect="3 / 2"
                  className="mt-8"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholderLabel={m("placeholderLabel")}
                />
              </div>
              <ul
                data-reveal-group
                className="grid content-start gap-x-8 gap-y-4 sm:grid-cols-2"
              >
                {accreditation.items.map((item) => (
                  <li
                    key={item}
                    data-reveal-item
                    className="flex items-start gap-3 text-text"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="mt-12">
              <h3 className="text-caption font-semibold uppercase tracking-wider text-sage">
                {sectors.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {sectors.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-4 py-2 text-caption font-medium text-text"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
