import { existsSync } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Row = {
  calidad: string;
  mancha: string;
  especie: string;
  altitud: string;
  taza: string;
  uso: string;
};

// The single reference sheet covers every grade (Arábica + Robusta).
const PDF_FILE = "casemex-calidades-cafe.pdf";

/**
 * Grades reference table — the "hard data" an industrial buyer scans first.
 * Wide by nature: the wrapper scrolls horizontally on narrow screens so the
 * page body never overflows.
 */
export default function Calidades() {
  const t = useTranslations("calidades");
  const columns = t.raw("columns") as string[];
  const rows = t.raw("rows") as Row[];
  const pdfAvailable = existsSync(
    path.join(process.cwd(), "public", "docs", PDF_FILE),
  );

  return (
    <Section id="calidades" aria-labelledby="calidades-title">
      <Reveal>
        <div className="max-w-2xl">
          <h2 id="calidades-title" className="font-display text-h1">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead text-sage">{t("lead")}</p>
        </div>

        {/* Mobile / tablet: the 6-column table only showed ~2 columns in a
            scroller, so below lg each grade becomes a stacked spec block. */}
        <div data-reveal className="mt-10 rounded-lg border border-hairline lg:hidden">
          <ul>
            {rows.map((row, i) => (
              <li
                key={row.calidad}
                className={cn(
                  "border-b border-hairline p-5 last:border-b-0 sm:p-6",
                  i % 2 === 1 && "bg-surface/40",
                )}
              >
                <h3 className="font-display text-h3 text-text">{row.calidad}</h3>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
                  {(
                    [
                      [columns[1], row.mancha, true],
                      [columns[2], row.especie, false],
                      [columns[3], row.altitud, true],
                      [columns[4], row.taza, false],
                    ] as const
                  ).map(([label, value, nums]) => (
                    <div key={label}>
                      <dt className="text-caption font-semibold uppercase tracking-wider text-sage">
                        {label}
                      </dt>
                      <dd className={cn("mt-0.5 text-text", nums && "tabular-nums")}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-text-muted">{row.uso}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          className="mt-10 hidden overflow-x-auto rounded-lg border border-hairline lg:block"
        >
          <table className="w-full min-w-[760px] border-collapse text-left text-base">
            <thead>
              <tr className="border-b border-border bg-surface">
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-5 py-4 text-caption font-semibold uppercase tracking-wider text-sage"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.calidad}
                  className={cn(
                    "border-b border-hairline align-top last:border-b-0",
                    i % 2 === 1 && "bg-surface/40",
                  )}
                >
                  <th scope="row" className="px-5 py-4 font-display font-medium text-text">
                    {row.calidad}
                  </th>
                  <td className="px-5 py-4 tabular-nums text-text-muted">{row.mancha}</td>
                  <td className="px-5 py-4 text-text-muted">{row.especie}</td>
                  <td className="px-5 py-4 text-text-muted">{row.altitud}</td>
                  <td className="px-5 py-4 text-text">{row.taza}</td>
                  <td className="min-w-[240px] px-5 py-4 text-text-muted">{row.uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-3xl text-caption text-text-muted">{t("note")}</p>

        {pdfAvailable && (
          <a
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-5 py-2.5 font-semibold text-text transition-colors duration-200 hover:border-gold hover:text-gold"
            href={`/docs/${PDF_FILE}`}
            download
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" />
            </svg>
            {t("cta")}
          </a>
        )}
      </Reveal>
    </Section>
  );
}
