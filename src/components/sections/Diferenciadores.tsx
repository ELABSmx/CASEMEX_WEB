import { existsSync } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import ParallaxBg from "@/components/media/ParallaxBg";

type Block = { title: string; body: string };

export default function Diferenciadores() {
  const t = useTranslations("diferenciadores");
  const blocks = t.raw("blocks") as Block[];
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
          <div className="max-w-2xl">
            <h2 id="dif-title" className="font-display text-h1">
              {t("title")}
            </h2>
            <p className="mt-4 text-lead text-sage">{t("lead")}</p>
          </div>

          <div data-reveal-group className="mt-16 grid gap-x-14 gap-y-14 sm:grid-cols-2">
            {blocks.map((block, i) => (
              <div key={block.title} data-reveal-item>
                <span
                  className="font-display text-h1 leading-none text-gold/20"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-h2 text-gold">{block.title}</h3>
                <p className="mt-3 max-w-md text-lead text-neutral-200">{block.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
