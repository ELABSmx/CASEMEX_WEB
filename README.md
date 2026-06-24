# CASEMEX — Sitio web

Sitio web bilingüe (ES/EN) de **CASEMEX** (Cafés y Semillas de México S.A. de C.V.), comercializadora y exportadora de **café verde mexicano** de Chiapas, desde 1996. One-pager B2B orientado a generar confianza y solicitudes de cotización.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** (tokens OKLCH en `@theme`)
- **next-intl** (ES en `/`, EN en `/en`)
- **GSAP** + `@gsap/react` (secuencia blackout del hero, carrusel horizontal del proceso)
- **Resend** para el formulario de cotización
- Deploy: **Vercel**

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

> Nota: no ejecutes `npm run build` mientras `npm run dev` está activo (corrompe `.next/`).

## Variables de entorno

Copia `.env.example` a `.env.local` y complétalas:

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | API key de Resend para el formulario. |
| `CONTACT_FROM` | Remitente verificado. Sandbox: `CASEMEX <onboarding@resend.dev>`. |
| `CONTACT_TO` | Destino de las cotizaciones (`eduardo.casemex@gmail.com`). |
| `NEXT_PUBLIC_SITE_URL` | URL pública (metadata, OG, sitemap). |
| `NEXT_PUBLIC_WHATSAPP` | Número WhatsApp internacional (solo dígitos). Vacío oculta los botones. |

## Diseño

El sistema visual ("Bodega" — oscuro, cálido, café verde) está documentado en
[`DESIGN.md`](./DESIGN.md) y la estrategia en [`PRODUCT.md`](./PRODUCT.md).

## Pendientes ({{TODO}} del cliente)

- Número de WhatsApp · logos reales de certificaciones (`public/images/certs/`)
- Fichas técnicas PDF (`public/docs/`) · imágenes de marca (historia, productos, etc.)
- Headline final del hero · regiones exactas de Chiapas · aviso de privacidad
- Dominio verificado en Resend para producción
