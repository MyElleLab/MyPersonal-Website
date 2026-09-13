/**
 * The E mark, as type rather than as an image.
 *
 * The app icon is a capital E set in New York and centred on its own ink box
 * (MyPersonal - Design/Icon/make_icon.py, which loads
 * /System/Library/Fonts/NewYork.ttf). `font-serif` in this project resolves to
 * `ui-serif`, which IS New York on Apple platforms, so rendering the letter
 * reproduces the mark rather than approximating it.
 *
 * Type beats a PNG here for three reasons and they all matter:
 *
 *   1. It inherits `currentColor`, so the mark flips with the colour scheme
 *      for free. A raster would need two files and a `<picture>`.
 *   2. It is scale-free. The nav wants 20px and the hero wants 96px.
 *   3. It weighs nothing and cannot arrive late, so the nav never reflows.
 *
 * The real 1024px artwork is still shipped, at public/app-icon-light.png and
 * public/app-icon-dark.png, and it is used where the point is to show the icon
 * as it appears on a home screen, not to letter a wordmark. See AppIcon.tsx.
 *
 * `optical` nudges the glyph up by a hair. A capital E centred on its bounding
 * box sits visibly low next to lowercase text because the box has no descender
 * to balance the cap. This is the same correction make_icon.py applies by
 * centring on the ink box instead of the line metrics.
 */
export function Mark({
  size = 24,
  className = "",
}: {
  /** Cap height target in px. The glyph is set at this size. */
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`font-serif inline-block select-none leading-none ${className}`}
      style={{
        fontSize: `${size}px`,
        /* New York's E is not bold in the icon; the weight comes from the
           face itself at display size. 400 keeps it identical. */
        fontWeight: 400,
        transform: "translateY(-0.02em)",
      }}
    >
      E
    </span>
  );
}
