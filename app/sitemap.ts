import type { MetadataRoute } from "next";
import { books, news, series, site } from "../lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = [
    "",
    "books",
    "series",
    "231-gates",
    "projects",
    "about",
    "news",
    "press",
    "contact",
    "privacy",
    "terms",
    "search",
  ];
  return [
    ...fixed.map((p) => ({
      url: `${site.domain}/${p}`,
      changeFrequency:
        p === "news" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : p === "books" ? 0.9 : 0.6,
    })),
    ...books.map((b) => ({
      url: `${site.domain}/books/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...series.map((s) => ({
      url: `${site.domain}/series/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...news.map((n) => ({
      url: `${site.domain}/news/${n.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
