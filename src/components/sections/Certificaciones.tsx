import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";

type Cert = { code: string; name: string; blurb: string };

// Real official seals (transparent backgrounds). OCIA's SVG is recolored to its
// brand green (#5F9331, sampled from the official OCIA logo).
const LOGOS: Record<string, string> = {
  USDA: "/images/USDA_organic_seal.svg",
  OCIA: "/images/OCIA_Logo.svg",
  "4C": "/images/4C.png",
  FT: "/images/Logo-Fairtrade.png",
};

export default function Certificaciones() {
  const t = useTranslations("certificaciones");
  const items = t.raw("items") as Cert[];

  return (
    // Light "bone" panel — the deliberate break from the dark sections above/below
    // is what wakes the eye up. Contrast stays AA (ink on bone ~12:1).
    <Section id="certificaciones" aria-labelledby="cert-title" className="panel-invert">
      <Reveal>
        <div className="max-w-2xl">
          <h2 id="cert-title" className="font-display text-h1">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead text-brand">{t("lead")}</p>
        </div>

        <ul data-reveal-group className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {items.map((cert) => (
            <li
              key={cert.code}
              data-reveal-item
              className="flex gap-5 border-t-2 border-ink/15 pt-6 transition-colors duration-200 hover:border-gold"
            >
              {/* Official seal placed directly on the panel (no container), larger.
                  Fixed-width slot keeps the text aligned across rows. */}
              <span className="flex h-20 w-28 shrink-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LOGOS[cert.code]}
                  alt=""
                  className="h-full w-auto max-w-full object-contain object-left"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div>
                <h3 className="text-h3">{cert.name}</h3>
                <p className="mt-2 text-ink/70">{cert.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
