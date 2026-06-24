import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";

type Cert = { code: string; name: string; blurb: string };

export default function Certificaciones() {
  const t = useTranslations("certificaciones");
  const items = t.raw("items") as Cert[];

  return (
    <Section id="certificaciones" aria-labelledby="cert-title" className="bg-neutral-950">
      <Reveal>
        <div className="max-w-2xl">
          <h2 id="cert-title" className="font-display text-h1">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead text-sage">{t("lead")}</p>
        </div>

        <ul
          data-reveal-group
          className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2"
        >
          {items.map((cert) => (
            <li
              key={cert.code}
              data-reveal-item
              className="flex gap-5 border-t border-hairline pt-6"
            >
              {/* Code chip stands in for the official seal until the real logo is supplied. */}
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-raised font-display text-base font-semibold text-gold ring-1 ring-hairline"
                aria-hidden="true"
              >
                {cert.code}
              </span>
              <div>
                <h3 className="text-h3 text-text">{cert.name}</h3>
                <p className="mt-2 text-text-muted">{cert.blurb}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-md text-caption text-text-muted">{t("note")}</p>
      </Reveal>
    </Section>
  );
}
