import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * /sitemap.xml
 *
 * Three routes, all indexable, all listed. Nothing on this site carries a
 * noindex, so there is no page that the sitemap and the page itself could
 * disagree about. If a page is ever noindexed, remove it from here in the same
 * commit: a sitemap entry means "index this" and a noindex means "do not", and
 * sending both is a contradiction a crawler resolves however it likes.
 *
 * The legal pages carry a real priority rather than being buried at 0.1. They
 * are the reason this site exists before the app ships, and App Review reaches
 * them by following a link from the app.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  /* Build time. Every page here changes only when the site is rebuilt, so
     there is nothing more precise to report. */
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
