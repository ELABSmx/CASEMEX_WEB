import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";

type Block = { title: string; body: string };

export default function Diferenciadores() {
  const t = useTranslations("diferenciadores");
  const blocks = t.raw("blocks") as Block[];
  const bgExists = existsSync(
    path.join(process.cwd(), "public", "images", "diferenciadores-bg.jpg"),
  );

  return (
    <section id="diferenciadores" aria-labelledby="dif-title" className="relative overflow-hidden">
      {bgExists && (
        <Image
          src="/images/diferenciadores-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
      )}
      {/* Layered scrim keeps body text well above 4.5:1 regardless of the photo. */}
      <div
        className="absolute inset-0 bg-neutral-950/85"
        aria-hidden="true"
      />
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

          <div
            data-reveal-group
            className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2"
          >
            {blocks.map((block) => (
              <div key={block.title} data-reveal-item className="border-t-2 border-gold/70 pt-6">
                <h3 className="text-h3 text-text">{block.title}</h3>
                <p className="mt-3 text-neutral-200">{block.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
