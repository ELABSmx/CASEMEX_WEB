import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import HeroIntroSequence from "@/components/sections/HeroIntroSequence";
import HeroContent from "@/components/sections/HeroContent";
import HistoriaContent from "@/components/sections/HistoriaContent";
import Proceso from "@/components/sections/Proceso";
import Productos from "@/components/sections/Productos";
import Certificaciones from "@/components/sections/Certificaciones";
import Diferenciadores from "@/components/sections/Diferenciadores";
import Origenes from "@/components/sections/Origenes";
import Contacto from "@/components/sections/Contacto";
import { SITE } from "@/lib/site";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: "CASEMEX",
    url: SITE.url,
    email: SITE.email,
    foundingDate: "1996",
    founder: { "@type": "Person", name: "Eduardo Coutiño Armienta" },
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Chiapas",
      addressCountry: "MX",
    },
    description: t("description"),
    knowsAbout: [
      "Green coffee",
      "Café verde",
      "Arabica",
      "Robusta",
      "Coffee export",
      "Specialty coffee",
    ],
  };

  return (
    <>
      <HeroIntroSequence hero={<HeroContent />} historia={<HistoriaContent />} />
      <Proceso />
      <Productos />
      <Certificaciones />
      <Diferenciadores />
      <Origenes />
      <Contacto />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
