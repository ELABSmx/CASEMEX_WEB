---
name: CASEMEX — Bodega
mode: dark
color:
  brand:
    espresso-950: "oklch(0.182 0.014 72)"   # #16110B
    espresso-900: "oklch(0.200 0.014 72)"   # #1A150F  page bg
    espresso-800: "oklch(0.236 0.020 74)"   # #241D14  surface
    bark-700:     "oklch(0.270 0.024 73)"   # raised
    bark-600:     "oklch(0.310 0.031 73)"   # #3A2E1F
    bark-500:     "oklch(0.422 0.043 73)"   # #5C4A33  border
    forest:       "oklch(0.441 0.065 142)"  # #3E5C3A  brand green
    sage:         "oklch(0.761 0.043 128)"  # #A9B79A  text-accent
    gold:         "oklch(0.730 0.112 85)"   # #C8A24E  accent (10%)
    cherry:       "oklch(0.470 0.143 37)"   # #9A3412  rare warm spark
  neutral:        # warm-tinted ramp, hue ~75-88, chroma >= 0.014 (never pure gray)
    "50":  "oklch(0.953 0.017 88)"   # #F4EFE3
    "100": "oklch(0.926 0.023 87)"   # #EDE6D6  primary text
    "200": "oklch(0.853 0.034 84)"   # #DDD2BC
    "300": "oklch(0.789 0.044 81)"   # #C9B89B
    "400": "oklch(0.683 0.045 77)"   # #A9967A  muted text
    "500": "oklch(0.560 0.046 75)"   # #7D6A4F
    "600": "oklch(0.422 0.043 73)"   # #5C4A33
    "700": "oklch(0.310 0.031 73)"   # #3A2E1F
    "800": "oklch(0.236 0.020 74)"   # #241D14
    "900": "oklch(0.200 0.014 72)"   # #1A150F
    "950": "oklch(0.182 0.014 72)"   # #16110B
  surface:
    bg:      "oklch(0.200 0.014 72)"
    surface: "oklch(0.236 0.020 74)"
    raised:  "oklch(0.270 0.024 73)"
    invert:  "oklch(0.953 0.017 88)"  # bone panel for long-form reading
  text:
    primary:   "oklch(0.926 0.023 87)"   # bone-100 (never pure white)
    secondary: "oklch(0.761 0.043 128)"  # sage
    muted:     "oklch(0.683 0.045 77)"   # sand-400
    on-invert: "oklch(0.244 0.027 153)"  # forest ink on bone panels
  semantic:
    success: "oklch(0.74 0.10 150)"  # #7FB069
    warning: "oklch(0.78 0.11 78)"   # #D9A441
    danger:  "oklch(0.66 0.12 38)"   # #D2785A
    info:    "oklch(0.72 0.05 232)"  # #7FA8B8
typography:
  display: { fontFamily: "Bitter, Georgia, serif", weights: [500, 600], tracking: "-0.01em" }
  text:    { fontFamily: "Mulish, system-ui, sans-serif", weights: [400, 600] }
  scale:
    caption: { fontSize: "0.833rem", lineHeight: 1.4, tracking: "0.02em" }
    body:    { fontSize: "1rem", lineHeight: 1.6 }
    lead:    { fontSize: "1.125rem", lineHeight: 1.6, measure: "52ch" }
    h3:      { fontSize: "clamp(1.5rem,1.25rem+1.1vw,2rem)", lineHeight: 1.25 }
    h2:      { fontSize: "clamp(1.95rem,1.5rem+2vw,2.75rem)", lineHeight: 1.2 }
    h1:      { fontSize: "clamp(2.5rem,1.8rem+3.2vw,3.75rem)", lineHeight: 1.12 }
    hero:    { fontSize: "clamp(3.25rem,2rem+5.5vw,5rem)", lineHeight: 1.08, tracking: "-0.015em" }
  measure: "65ch"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"
spacing:
  base: 4
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128]
shadow:
  sm: "0 1px 2px oklch(0.20 0.02 73 / 0.10)"
  md: "0 4px 12px oklch(0.20 0.02 73 / 0.12)"
  lg: "0 12px 32px oklch(0.18 0.02 72 / 0.18)"
  ring-focus: "0 0 0 3px oklch(0.730 0.112 85 / 0.55)"
motion:
  duration: { fast: 120, base: 220, slow: 360, hero: 500 }
  ease: { out: "cubic-bezier(0.22,1,0.36,1)", inout: "cubic-bezier(0.65,0,0.35,1)" }
  reduced-motion: respected
components:
  button-primary:
    backgroundColor: "{color.brand.gold}"
    textColor: "{color.brand.espresso-900}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{color.text.primary}"
    border: "1px solid {color.brand.bark-500}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
a11y: { contrast-body: ">=4.5", contrast-large: ">=3", focus-ring: visible, touch-target: "44px" }
---

# CASEMEX — Visual Design System ("Bodega")

> Token source of truth. Mirrored into `src/app/globals.css` (`@theme`) and the [.impeccable/design.json](./.impeccable/design.json) sidecar. Strategy lives in [PRODUCT.md](./PRODUCT.md).

## North star

A warm, dark, premium identity that reads as one continuous body with the hero film — whose emotional climax is green coffee beans lifted from a jute sack inside a warm, dim warehouse. The page extends that frame: espresso grounds, bone text, sage/forest greens for the green-coffee category signal, a restrained warm gold for 30-year gravitas. Serious, established, and unmistakably _not_ a cold corporate. Grounded in the numerically sampled grade of `hero.mp4` (olive-tinted near-black shadows, warm-amber browns, muted-olive foliage, warm-bone highlights).

## Color character

- **Grounds** are warm espresso, never neutral black — every dark surface carries a small amber/olive chroma.
- **Neutrals are tinted**, hue ~75–88, chroma ≥0.014 — pure gray is banned.
- **Text is bone** (`neutral-100`), never pure white; secondary text is sage; muted is sand.
- **Gold is the 10% accent** — CTAs, the 30-year/certification emphasis, focus ring. Rare, so it stays powerful. Never a fill-everywhere.
- **Forest/sage greens** carry the green-coffee category and trust. **Cherry** is an extremely rare warm spark.
- **Long-form reading** (dense product specs, certification detail) may invert to a bone `surface.invert` panel with forest ink — contrast stays ≥10:1 and fatigue stays low.

## Verified contrast (WCAG AA, all pass)

| Pair | Ratio |
|---|---|
| bone-100 text on espresso-900 | 14.6:1 |
| sage text on espresso-900 | 8.6:1 |
| gold on espresso-900 | 7.5:1 |
| espresso-900 text on gold chip | 7.5:1 |
| forest ink on bone-50 panel | ~11:1 |

## Typography

- **Display: Bitter** (slab serif) — weight, warmth, "solid, backed by 30 years"; strong on dark grounds; full Spanish glyphs.
- **Text: Mulish** (humanist sans) — neutral, highly legible, full Latin-ext.
- Marketing headings use `clamp()`; body is fixed at 1rem/1.6. Headings 1.08–1.25 line-height. Max measure 65ch prose / 52ch lead. Tabular numerals for any volume/spec figures.
- Avoids every banned face (Inter, Roboto, Fraunces, Geist, Plus Jakarta, Space Grotesk).

## Spacing, radius, motion

- 4pt scale (4 → 128). Tight 8–12px within groups, generous 48–96px between sections. 44×44px touch targets. No nested cards; no monotonous identical-card grids.
- Radii restrained (cards/inputs `md`, media `lg`). Warm-tinted low shadows; on dark, prefer borders + faint depth over floaty drop shadows.
- Motion: 120–500ms, ease-out only (no bounce/elastic), transform/opacity only. A single `gsap.matchMedia()` per animated section with a `prefers-reduced-motion` branch that sets final state and creates no ScrollTrigger.

## Rules / do & don't

- **Do** recolor the brand SVGs via `currentColor` to bone/sage; **never** drop the black outline on espresso (it disappears).
- **Do** explain certifications as labeled rows with one-line context; **don't** build a logo grid (anti-ECC, anti "monotonous card grid").
- **Don't** use cream/beige as a default background, purple/violet, gradient-text, gray-on-color, or any roasted-coffee imagery.
- **Don't** state unverifiable claims; mark `{{TODO}}`.
