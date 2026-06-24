import { Resend } from "resend";
import type { ContactInput } from "./contact-schema";

// HTML email must use a web-safe stack — email clients (Gmail, Outlook) strip
// custom/brand web fonts, so Bitter/Mulish would never render here.
// impeccable-disable-next-line overused-font: email clients require web-safe fonts
const EMAIL_FONT = "Arial, Helvetica, sans-serif";

const PRODUCT_LABELS: Record<ContactInput["product"], string> = {
  arabica: "Arábica",
  robusta: "Robusta",
  both: "Ambos",
  specialty: "Especialidad 80+ SCA",
};

const CERT_LABELS: Record<ContactInput["certification"], string> = {
  none: "Ninguna",
  usda: "USDA Organic",
  ocia: "OCIA",
  fourc: "4C",
  fairtrade: "Fair Trade",
  other: "Otra",
};

function row(label: string, value?: string) {
  if (!value) return "";
  const safe = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<tr><td style="padding:4px 16px 4px 0;color:#7D6A4F;vertical-align:top">${label}</td><td style="padding:4px 0;color:#241D14"><strong>${safe}</strong></td></tr>`;
}

/**
 * Sends a quote request to the CASEMEX inbox.
 * Returns { ok } so the route can map failures to a 502 without leaking details.
 * No-ops gracefully (ok:false) when RESEND_API_KEY is absent so local dev
 * without a key doesn't crash — the form still reports a clean error state.
 */
export async function sendQuoteEmail(data: ContactInput): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[casemex] RESEND_API_KEY missing — quote email not sent.");
    return { ok: false };
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM ?? "CASEMEX <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? "eduardo.casemex@gmail.com";

  const html = `
    <div style="font-family:${EMAIL_FONT};max-width:560px;margin:0 auto">
      <h2 style="color:#241D14;border-bottom:2px solid #C8A24E;padding-bottom:8px">
        Nueva solicitud de cotización
      </h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${row("Nombre", data.name)}
        ${row("Empresa", data.company)}
        ${row("Correo", data.email)}
        ${row("Teléfono", data.phone || undefined)}
        ${row("País de destino", data.country || undefined)}
        ${row("Producto", PRODUCT_LABELS[data.product])}
        ${row("Grado / perfil", data.grade || undefined)}
        ${row("Volumen estimado", data.volume || undefined)}
        ${row("Certificación", CERT_LABELS[data.certification])}
      </table>
      <p style="margin-top:16px;color:#7D6A4F;font-size:14px">Mensaje</p>
      <p style="background:#F4EFE3;border-radius:8px;padding:12px 16px;color:#241D14;white-space:pre-wrap">${data.message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</p>
    </div>`;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Cotización · ${data.company} (${PRODUCT_LABELS[data.product]})`,
      html,
    });
    return { ok: !result.error };
  } catch (err) {
    console.error("[casemex] Resend send failed:", err);
    return { ok: false };
  }
}
