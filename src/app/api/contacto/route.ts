import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { sendQuoteEmail } from "@/lib/email";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled → almost certainly a bot. Accept silently, send nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { ok } = await sendQuoteEmail(parsed.data);
  if (!ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
