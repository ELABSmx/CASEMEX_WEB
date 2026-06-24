import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import QuoteForm from "@/components/form/QuoteForm";
import WhatsAppButton from "@/components/form/WhatsAppButton";
import { SITE } from "@/lib/site";

export default function Contacto() {
  const t = useTranslations("contacto");

  return (
    <Section id="contacto" aria-labelledby="contacto-title" className="bg-neutral-950">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div data-reveal>
            <h2 id="contacto-title" className="font-display text-h1">
              {t("title")}
            </h2>
            <p className="mt-4 text-lead text-sage">{t("lead")}</p>

            <dl className="mt-10 flex flex-col gap-6">
              <div>
                <dt className="text-caption uppercase tracking-wider text-text-muted">
                  {t("locationLabel")}
                </dt>
                <dd className="mt-1 text-text">{t("location")}</dd>
              </div>
              <div>
                <dt className="text-caption uppercase tracking-wider text-text-muted">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-text transition-colors hover:text-gold"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>

            <WhatsAppButton label={t("whatsapp")} className="mt-8" />
            <p className="mt-6 text-caption text-text-muted">{t("hours")}</p>
          </div>

          <div data-reveal className="rounded-lg border border-hairline bg-surface p-6 sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
