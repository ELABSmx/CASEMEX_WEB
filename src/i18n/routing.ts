import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // ES (primary audience) lives at "/" with no prefix; EN at "/en".
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
