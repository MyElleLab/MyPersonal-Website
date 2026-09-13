import Image from "next/image";

/**
 * The real app icon, as it appears on a home screen.
 *
 * ONE FILE, FIXED IN BOTH SCHEMES, and that is the point rather than an
 * oversight. This used to ship two rasters swapped by `prefers-color-scheme`,
 * so a visitor in dark mode saw the inverse mark, white E on black. That was
 * wrong: this is the App Store artwork. It is what will sit on the visitor's
 * home screen and what they will scan for in a search result, and an icon that
 * changes with the page's theme is not the icon. Everything else on the site
 * still follows the system.
 *
 * The app does ship an alternate inverse icon, Pro gated, and this is not it.
 * `RCConfig.AppIcon.primaryName` is nil, meaning black E on white, and its
 * comment says that is "what ships in the App Store listing".
 *
 * A raster is correct here, unlike everywhere else on the site, because the
 * icon's white ground is part of the artwork. The Mark component renders the
 * letter as type for the nav and footer lockups, where the mark is a wordmark
 * rather than a depiction of the product and should inherit the page's colour.
 *
 * `rounded-[22.37%]` is the iOS superellipse corner as a percentage of the
 * icon's width, which is how Apple specifies it. A fixed px radius would be
 * right at exactly one size and visibly wrong at every other.
 *
 * The hairline border is what stops a white icon dissolving into a white page
 * in light mode. In dark mode it does nothing visible and costs nothing.
 */
export function AppIcon({
  size = 96,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/app-icon.png"
      alt="The (E)go app icon"
      width={size}
      height={size}
      priority
      className={`shrink-0 rounded-[22.37%] border border-rule object-cover ${className}`}
    />
  );
}
