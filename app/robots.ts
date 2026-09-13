import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Crawlers named explicitly. The blanket `User-agent: *` already allows every
 * one of them. They are listed so that a future edit narrowing the blanket
 * rule has to look at this split and decide deliberately, rather than
 * sweeping both groups away in one line.
 *
 * The two groups are not interchangeable.
 */

/**
 * Search and citation agents. These fetch a page live to answer a question
 * someone is asking right now, and they are what makes the site eligible to be
 * CITED in an AI answer. Blocking these is the most common way a site makes
 * itself invisible to AI search: it removes the citation, not the training. If
 * there is ever a reason to block training, it is not a reason to touch this
 * list.
 */
const SEARCH_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

/**
 * Training agents. These collect pages that may end up in training data. For
 * an unlaunched app that is upside: being known by a model at all beats being
 * absent from it. Allowed on purpose.
 */
const TRAINING_AGENTS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
];

/**
 * /robots.txt
 *
 * CRITICAL, and this is the one rule in this file that is easy to get
 * backwards: do NOT add Disallow rules for pages you also want deindexed.
 * robots.txt and noindex are not two ways of saying the same thing.
 *
 *   robots.txt stops the FETCH. noindex is a tag INSIDE the response.
 *
 * A crawler blocked in robots.txt never fetches the page, so it never reads
 * the noindex, and the URL can still surface in results ranked on inbound
 * links alone, as a bare title with no description. Disallowing a noindexed
 * page defeats the noindex.
 *
 * Nothing on this site is noindexed today. Both legal pages are real content
 * and are meant to be found: App Review follows them from the app, and a
 * privacy policy that search engines cannot see is a privacy policy nobody
 * can check.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...[...SEARCH_AGENTS, ...TRAINING_AGENTS].map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
