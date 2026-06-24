import { useTranslations } from "next-intl";
import Logo from "@/components/brand/Logo";
import WhatsAppButton from "@/components/form/WhatsAppButton";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const c = useTranslations("contacto");

  return (
    <footer className="border-t border-hairline bg-neutral-950">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo className="h-8 text-text" />
          <p className="mt-5 max-w-xs text-text-muted">{t("blurb")}</p>
          <p className="mt-6 font-display text-h3 text-sage">{t("tagline")}</p>
        </div>

        <nav aria-label={t("navTitle")}>
          <h2 className="text-caption font-semibold uppercase tracking-wider text-text-muted">
            {t("navTitle")}
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-text-muted transition-colors hover:text-text"
                >
                  {nav(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-caption font-semibold uppercase tracking-wider text-text-muted">
            {t("contactTitle")}
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-text-muted">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-text"
              >
                {SITE.email}
              </a>
            </li>
            <li>{c("location")}</li>
          </ul>
          <WhatsAppButton
            label={c("whatsapp")}
            variant="outline"
            className="mt-5"
          />
        </div>
      </div>

      <div className="border-t border-hairline/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © 2026 {SITE.name} · {t("legalName")} · {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            {/* TODO: link to the privacy notice document once provided. */}
            <a href="#" className="transition-colors hover:text-text">
              {t("privacy")}
            </a>
            <span aria-hidden="true">·</span>
            <span>{t("madeIn")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
