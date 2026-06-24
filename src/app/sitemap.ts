import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "es-MX": SITE.url,
          en: `${SITE.url}/en`,
        },
      },
    },
    {
      url: `${SITE.url}/en`,
      lastModified: new Date("2026-06-23"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
