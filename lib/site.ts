/**
 * The single source of truth for this site.
 *
 * The nav, the footer, the landing page, the sitemap, robots.txt and the
 * JSON-LD all read from here. Nothing is typed twice, so nothing can drift.
 * This is the studio site's `lib/site.ts` + `lib/products.ts` pattern collapsed
 * into one file, which is all a single-app site needs.
 *
 * EVERY FACT BELOW IS TRACEABLE TO THE APP. Where a value mirrors something in
 * the Xcode project, the source file is named in a comment. If you change one
 * side, change the other. A number here that disagrees with the app is worse
 * than no number at all, because nothing will fail to tell you.
 *
 * App source root:
 *   MyWorld/4. MyElleLab/3. Projects/MyDailySuccess/MyPersonal/MyPersonal - Xcode/
 */

export const SITE_URL = "https://ego.myellelab.com";

/**
 * The product's name, in two parts, because the wordmark needs the second part
 * on its own and the prose needs both.
 *
 * The on-device home screen label is "go" (INFOPLIST_KEY_CFBundleDisplayName in
 * project.pbxproj) because the icon supplies the E. That is a nice piece of
 * work on a home screen and a typo in a sentence, so it is never reproduced in
 * body copy. Written out, the name is always the full string below.
 *
 * WHY THIS IS SPLIT, and why the split is here rather than in the component.
 *
 * components/Wordmark.tsx renders the icon plus "go" and takes everything after
 * it as a prop. That tail used to be a hardcoded literal at the hero and the
 * footer while the lockup's ACCESSIBLE NAME read APP_NAME, so the pixels and
 * the announcement were two independent copies of one string. They could drift,
 * and a rename that touched only APP_NAME would have shipped a mark that said
 * one name and announced another, with nothing failing to report it.
 *
 * The fix is NOT to have Wordmark slice APP_NAME at its colon. That would make
 * the component depend on the name containing one, and a name that did not
 * would render the whole string after the icon: "Ego(E)go: Whatever". Silent,
 * and invisible to a grep. So the tail is its own literal and the full name is
 * COMPOSED from it. The two cannot disagree, because only one of them is typed.
 */

/** The name's head, and a name in its own right: for places that want it inside
    a longer sentence without the colon clause dragging behind it. The nav's
    home link is one. Still never bare "go". */
export const APP_SHORT_NAME = "(E)go";

/** Everything after the wordmark, colon and leading space included. The only
    place this string is typed. components/Wordmark.tsx defaults to it. */
export const APP_NAME_TAIL = ": MySuccess";

/**
 * The product's name in prose, everywhere, without exception.
 *
 * Reads "(E)go: MySuccess". Stated here because this file exists to be read
 * rather than evaluated, and a composed value you have to assemble in your head
 * is worse than a literal you can just look at. If the two ever disagree, the
 * parts above are right and this line is stale.
 */
export const APP_NAME = `${APP_SHORT_NAME}${APP_NAME_TAIL}`;

export const SITE_NAME = APP_NAME;

/* ---------------------------------------------------------------------------
   Positioning
   --------------------------------------------------------------------------- */

/**
 * The one sentence the site is making. Everything else supports it.
 *
 * The app's point is WORTH, not discipline: it exists to tell you that what you
 * are does not rise and fall with what you got done. Five of its six categories
 * are about effort and one is not, and the one that is not is the reason the
 * app exists. Copy that leads with mechanics ("a quote when you asked for one")
 * describes the product accurately and sells the wrong thing.
 *
 * ONE CONSTANT, FIVE CONSUMERS, and that is the point of it existing. This
 * string previously appeared as five separate literals: the hero, the footer,
 * `metadata.description`, `openGraph.description` and `twitter.description` in
 * app/layout.tsx, and the schema.org description in lib/schema.ts. Five copies
 * is how a positioning line goes stale in four places and nobody notices,
 * because the four that are wrong are the ones nobody looks at: the search
 * snippet, the link preview and the structured data.
 */
export const TAGLINE = "Remind yourself that you are the best.";

/**
 * The search snippet. Longer than the tagline on purpose.
 *
 * "Everything stays on your iPhone" was cut from the hero, where the tagline
 * now stands alone, but it is a real selling point and a search result has
 * room for it. So it survives HERE and in the Privacy section, rather than
 * disappearing from the site because it left one heading.
 *
 * Derived from TAGLINE rather than retyped, so the two cannot disagree about
 * what the product is.
 */
export const META_DESCRIPTION =
  `${TAGLINE} Everything stays on your iPhone. No account, no analytics.`;

export const STUDIO_NAME = "MyElleLab";
export const STUDIO_URL = "https://myellelab.com";

/** Utilities/AppLinks.swift holds the same address. The app's support link and
    this one must resolve to the same inbox. */
export const CONTACT_EMAIL = "support@myellelab.com";

/**
 * The date the legal pages were last substantively changed. Written by hand,
 * not derived from the build, because "last updated" on a privacy policy means
 * "the terms changed", not "the site was redeployed". A rebuild must not move
 * this date.
 */
export const LEGAL_LAST_UPDATED = "12 September 2026";

/**
 * The Apple ID for the listing, or null while there is no listing to point at.
 *
 * The download control reads this: while it is null it renders a
 * non-interactive "Coming to the App Store" state rather than a dead link.
 * With the ID set, the button becomes a real link and turns solid ink, which
 * is also what stops the inverted marquee cards being the loudest thing above
 * the fold.
 *
 * IT IS NULL AGAIN, DELIBERATELY, and this is the case the comment below it
 * used to describe in advance.
 *
 * The ID was set on the bet that the site would ship before anyone arrived,
 * and that the App Store would resolve the URL the moment the app went live.
 * The first half of that bet has now failed: myellelab.com is live, its (E)go
 * card links straight here, and the listing still does not exist. Checked, not
 * assumed: apps.apple.com/app/id6811412550 returns 404 and the iTunes lookup
 * API returns zero results. So a visitor can reach this page and press a
 * primary action that 404s, which is strictly worse than a button that says it
 * is not ready. The studio site already shows "Coming soon" for the same app,
 * so this also brings the two properties back into agreement.
 *
 * TO RELAUNCH: put the ID below back in place of null. That is the whole edit.
 * The button, its aria-label, the schema.org downloadUrl and the solid-ink
 * treatment all follow from it.
 *
 *     APP_STORE_ID = "6811412550"
 *
 * The ID is permanent and correct, which is why it is kept here rather than
 * looked up again. It is the same value the studio site holds in
 * lib/products.ts, and the two must go live together or one will lag: see the
 * launch checklist in MyLab/C4MyLab/ToDo.md.
 */
export const APP_STORE_ID: string | null = null;

export const appStoreUrl = APP_STORE_ID
  ? `https://apps.apple.com/app/id${APP_STORE_ID}`
  : null;

/** Absolute URL for a site-relative path. Sitemaps and schema.org both want
    fully qualified URLs; the app deals in leading-slash paths. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/* ---------------------------------------------------------------------------
   The product
   --------------------------------------------------------------------------- */

/** Resources/quotes.json, counted: 240 entries, 40 in each of six categories. */
export const QUOTE_COUNT = 240;

/**
 * Models/QuoteCategory.swift. Names and one-line descriptions are the app's own
 * `displayName` and `blurb` strings, quoted verbatim.
 *
 * WORTH IS FIRST HERE, and it is LAST in the app's enum. That divergence is
 * deliberate, not drift.
 *
 * The Swift enum's order is load bearing in a way this array's is not: it is
 * `CaseIterable`, so it drives the category picker, and `Worth` was appended
 * last because it was added last. Reordering it there is an app change with
 * real consequences. Here the order is presentational and nothing depends on
 * it, so the site can lead with the category the app is actually for while the
 * app catches up.
 *
 * If the enum is ever reordered to match, delete this comment rather than the
 * ordering.
 */
export const CATEGORIES = [
  { name: "Worth", blurb: "You are already enough to start." },
  { name: "Discipline", blurb: "Doing it when you do not feel like it." },
  { name: "Confidence", blurb: "Acting before the doubt clears." },
  { name: "Focus", blurb: "One thing, all the way down." },
  { name: "Resilience", blurb: "Getting back up faster." },
  { name: "Ambition", blurb: "Refusing a small horizon." },
] as const;

/** Utilities/ProGate.swift. `freeSlotLimit` and `maxSlotLimit`.

    8 is a platform ceiling wearing a product's clothes: iOS holds at most 64
    pending notification requests per app, and the app schedules one per slot
    per day so each delivery can carry a different quote. Pro is therefore
    always described as "up to eight", never "unlimited". If ProGate changes,
    this changes. */
export const FREE_SLOTS = 2;
export const PRO_SLOTS = 8;

/** Localizable.xcstrings, counted: 22 language codes across 300 strings. */
export const LANGUAGE_COUNT = 22;

/**
 * What Pro opens. Taken from Views/Paywall/PaywallCopy.swift `features`, in the
 * app's own order and close to its own words, so a visitor who pays sees the
 * list they were shown.
 */
export const PRO_FEATURES = [
  `Up to ${PRO_SLOTS} daily moments, not ${FREE_SLOTS}`,
  `All ${CATEGORIES.length} categories at once`,
  "Monthly and yearly goals, not only weekly",
  "The full history of every past period",
  "Save the lines that land",
  "Share any quote as an image",
  "Both app icons",
] as const;
