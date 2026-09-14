import { APP_NAME } from "@/lib/site";

/**
 * The wordmark: the app icon standing in for the E, followed by "go".
 *
 * ONE COMPONENT FOR ALL THREE PLACES. The hero, the nav and the footer used to
 * be two different implementations, a cropped image inline in the hero and a
 * New York "E" as type in the other two. They are one thing now, so a change to
 * the lockup cannot land in one place and miss the others.
 *
 * NO BRACKETS. The mark reads "Ego", not "(E)go". That is a deliberate change,
 * and the product's NAME is unaffected: it is still "(E)go: MyPersonal Success"
 * in the App Store, in the metadata, in the schema and in the accessible name
 * below. The wordmark is a mark; APP_NAME is the name. See lib/site.ts.
 *
 * THE ICON IS SQUARE. It was cropped to a 0.78em window in the bracketed
 * version, purely to pull its dead side margin out of collision with the "("
 * and ")". With no brackets there is nothing to collide with, so the crop is
 * gone and the artwork renders at its true 1:1 aspect, superellipse corners
 * and all. The page shows the real App Store silhouette again.
 *
 * The consequence is a wide gap before the "go", because the artwork carries
 * 0.28 of its own width as empty margin on that side. It cannot be closed with
 * a negative margin: the tile is opaque and comes first in paint order, so the
 * "g" would render ON TOP of the white ground. In light mode that is merely
 * odd; in dark mode the text is near-white and the tile is white, so the "g"
 * would disappear. The gap is measured and reported rather than fought.
 *
 * ALIGNMENT is in `em` throughout, so one set of numbers serves 19px in the nav
 * and 72px in the hero. Verified: cap and baseline error stay under 0.011px
 * from 16px to 200px. See the .wordmark-* rules in app/globals.css.
 *
 * ACCESSIBILITY. Every instance carries the real name as a visually hidden text
 * node with the visual assembly aria-hidden, so the announced name is always
 * "(E)go: MyPersonal Success" no matter what the mark looks like.
 *
 * A PLAIN <img>, NOT next/image. next/image writes style="color:transparent"
 * inline, which makes alt text invisible; a blocked image then rendered "go"
 * with no E at all. Proven by blocking the request, not reasoned about.
 */

/** The icon, inline, sized to the surrounding cap height. */
function InlineIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ego-icon-I.png"
      alt="E"
      width={1024}
      height={1024}
      fetchPriority="high"
      decoding="sync"
      className="wordmark-icon"
    />
  );
}

/**
 * @param as        heading level for the hero, plain span elsewhere.
 * @param trailing  what follows the icon. "go" in the nav, the full name in
 *                  the hero and footer. Never includes the E: the icon is it.
 */
export function Wordmark({
  as = "span",
  trailing,
  className = "",
  label = APP_NAME,
}: {
  as?: "h1" | "span";
  trailing: string;
  className?: string;
  label?: string;
}) {
  const Tag = as;
  return (
    <Tag className={className}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {/* The icon and the syllable it starts are one unbreakable unit, so a
            wrapping heading can never strand the icon alone on a line. */}
        <span className="whitespace-nowrap">
          <InlineIcon />
          go
        </span>
        {trailing}
      </span>
    </Tag>
  );
}
