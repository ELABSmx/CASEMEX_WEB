/** Site-wide constants and small helpers. No secrets here (those live in env). */

export const SITE = {
  name: "CASEMEX",
  legalName: "Cafés y Semillas de México S.A. de C.V.",
  founded: 1996,
  email: "eduardo.casemex@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://casemex.com.mx",
  locationLocality: "Tuxtla Gutiérrez",
  locationRegion: "Chiapas",
  locationCountry: "MX",
} as const;

/** Anchor sections, in document order. `id` is the in-page anchor target. */
export const SECTIONS = [
  { id: "inicio", key: "home" },
  { id: "empresa", key: "company" },
  { id: "proceso", key: "process" },
  { id: "productos", key: "products" },
  { id: "certificaciones", key: "certifications" },
  { id: "regiones", key: "regions" },
  { id: "contacto", key: "contact" },
] as const;

/** Nav links shown in the header/footer (subset of SECTIONS). */
export const NAV_LINKS = [
  { id: "empresa", key: "company" },
  { id: "proceso", key: "process" },
  { id: "productos", key: "products" },
  { id: "certificaciones", key: "certifications" },
  { id: "regiones", key: "regions" },
  { id: "contacto", key: "contact" },
] as const;

/** WhatsApp number in international format, digits only (e.g. 5219621078960). */
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, "");

export function whatsappHref(message?: string): string | null {
  if (!WHATSAPP) return null;
  const base = `https://wa.me/${WHATSAPP}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
