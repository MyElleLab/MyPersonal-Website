import {
  APP_NAME,
  SITE_URL,
  TAGLINE,
  STUDIO_NAME,
  STUDIO_URL,
  appStoreUrl,
  absoluteUrl,
} from "./site";

/**
 * schema.org for the app.
 *
 * DELIBERATELY ABSENT, and each omission is a decision rather than a gap:
 *
 *   aggregateRating, ratingValue, reviewCount
 *     The app has not shipped. There are no ratings. Structured data claiming
 *     otherwise is a fabricated review, and Google treats it as one.
 *
 *   offers.price
 *     Prices are set per storefront in App Store Connect and are localised at
 *     point of sale. A single hardcoded number would be wrong in most
 *     countries the app ships to, and it would go stale silently.
 *
 *   downloadUrl, sameAs
 *     Added when the App Store listing exists. `appStoreUrl` is null until
 *     then, so the field is omitted rather than pointed somewhere plausible.
 *
 * Omitting a property is always valid. Guessing one is not. This is the rule
 * the studio site's lib/schema.ts states and it is worth keeping.
 */
export function appSchema(): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: APP_NAME,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    url: SITE_URL,
    image: absoluteUrl("/ego-icon-I.png"),
    /* Shared with the hero, the footer and the page metadata. See TAGLINE. */
    description: TAGLINE,
    publisher: {
      "@type": "Organization",
      name: STUDIO_NAME,
      url: STUDIO_URL,
    },
    /* The app is free to install with an optional purchase. Stating the
       install price as 0 is accurate and is not the same claim as stating a
       subscription price. */
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    privacyPolicy: absoluteUrl("/privacy"),
    termsOfService: absoluteUrl("/terms"),
  };

  if (appStoreUrl) schema.downloadUrl = appStoreUrl;

  return schema;
}
