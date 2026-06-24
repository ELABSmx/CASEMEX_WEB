import { existsSync } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import SmartImage from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";

function pdfExists(file: string) {
  return existsSync(path.join(process.cwd(), "public", "docs", file));
}

function GradeList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-2.5">
      {items.map((g) => (
        <li key={g} className="flex items-start gap-3 text-text-muted">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
            aria-hidden="true"
          />
          <span>{g}</span>
        </li>
      ))}
    </ul>
  );
}

function DownloadCta({ label, file }: { label: string; file: string }) {
  const available = pdfExists(file);
  const classes =
    "mt-7 inline-flex min-h-11 items-center gap-2 rounded-md px-5 py-2.5 font-semibold transition-colors duration-200";
  const icon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" />
    </svg>
  );

  if (!available) {
    // PDF not provided yet — keep the feature visible but inert, no dead 404 click.
    return (
      <span
        className={cn(classes, "cursor-not-allowed border border-hairline text-text-muted opacity-70")}
        aria-disabled="true"
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a className={cn(classes, "border border-border text-text hover:border-gold hover:text-gold")} href={`/docs/${file}`} download>
      {icon}
      {label}
    </a>
  );
}

export default function Productos() {
  const t = useTranslations("productos");
  const m = useTranslations("media");

  return (
    <Section id="productos" aria-labelledby="productos-title">
      <Reveal>
        <div className="max-w-2xl">
          <h2 id="productos-title" className="font-display text-h1">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead text-sage">{t("lead")}</p>
        </div>

        <div
          data-reveal-group
          className="mt-12 grid gap-6 lg:grid-cols-5"
        >
          {/* Arábica — featured, wider */}
          <article
            data-reveal-item
            className="flex flex-col overflow-hidden rounded-lg border border-hairline bg-surface lg:col-span-3"
          >
            <SmartImage
              src="/images/productos/arabica.jpg"
              alt={m("imagineAlt.arabica")}
              aspect="16 / 9"
              rounded={false}
              sizes="(min-width: 1024px) 44vw, 100vw"
              placeholderLabel={m("placeholderLabel")}
            />
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <h3 className="font-display text-h2 text-text">{t("arabica.name")}</h3>
              <p className="mt-3 text-text-muted">{t("arabica.intro")}</p>
              <GradeList items={t.raw("arabica.grades") as string[]} />
              <div className="mt-auto">
                <DownloadCta label={t("arabica.cta")} file="casemex-arabica-shg.pdf" />
              </div>
            </div>
          </article>

          {/* Robusta — secondary */}
          <article
            data-reveal-item
            className="flex flex-col overflow-hidden rounded-lg border border-hairline bg-surface lg:col-span-2"
          >
            <SmartImage
              src="/images/productos/robusta.jpg"
              alt={m("imagineAlt.robusta")}
              aspect="16 / 9"
              rounded={false}
              sizes="(min-width: 1024px) 30vw, 100vw"
              placeholderLabel={m("placeholderLabel")}
            />
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <h3 className="font-display text-h2 text-text">{t("robusta.name")}</h3>
              <p className="mt-3 text-text-muted">{t("robusta.intro")}</p>
              <GradeList items={t.raw("robusta.grades") as string[]} />
              <div className="mt-auto">
                <DownloadCta label={t("robusta.cta")} file="casemex-robusta.pdf" />
              </div>
            </div>
          </article>
        </div>

        <p className="mt-6 max-w-md text-caption text-text-muted">{t("note")}</p>
      </Reveal>
    </Section>
  );
}
