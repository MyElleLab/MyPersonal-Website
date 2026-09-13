import Image from "next/image";

/**
 * The real app icon, as it appears on a home screen.
 *
 * Two files rather than one, swapped by `prefers-color-scheme`. This is the
 * one place on the site where a raster is correct: the point is to show the
 * artwork the user will tap, and the icon's ground is part of that artwork.
 * The Mark component renders the letter as type for every other use.
 *
 * The swap is CSS rather than JS. A `<picture>` with a media source would also
 * work, but next/image does not emit one, and doing it in JS would mean the
 * wrong icon on first paint. Both images are in the DOM and one is hidden,
 * which costs a second 12KB request and buys a scheme change with no flash.
 *
 * `rounded-[22.37%]` is the iOS superellipse corner as a percentage of the
 * icon's width, which is how Apple specifies it. A fixed px radius would be
 * right at exactly one size and visibly wrong at every other.
 */
export function AppIcon({
  size = 96,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const shared =
    "rounded-[22.37%] border border-rule object-cover";

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/app-icon-light.png"
        alt="The (E)go app icon"
        width={size}
        height={size}
        priority
        className={`${shared} block dark:hidden`}
      />
      <Image
        src="/app-icon-dark.png"
        alt=""
        aria-hidden
        width={size}
        height={size}
        priority
        className={`${shared} hidden dark:block`}
      />
    </div>
  );
}
