import { APP_NAME } from "@/lib/site";

/**
 * The hero wordmark: the app icon set inline as the E of "(E)go".
 *
 * The point is that the reader assembles "(E)go: MyPersonal Success" with the
 * icon supplying the E, rather than seeing a logo with a title next to it. That
 * is a typographic problem, and every number in `.wordmark-*` in globals.css is
 * measured rather than chosen. The derivations live there.
 *
 * THE OPENING PARENTHESIS STAYS, as a text glyph before the icon.
 *
 * The tile cannot stand in for it. A "(" is a thin curved stroke; the icon is a
 * filled superellipse, and nothing about it reads as a bracket. Rendered
 * without the "(", the line reads "Ego" with an orphan ")" that looks like a
 * typo rather than a device. Checked both ways before deciding.
 *
 * ACCESSIBILITY
 *
 * The h1 carries the real name as a visually hidden text node and the visual
 * assembly is `aria-hidden`, so the heading announces exactly
 * "(E)go: MyPersonal Success" with no image and no stray ")go".
 *
 * A text node rather than `aria-label` on purpose: it survives translation
 * tooling, it stays selectable, and it keeps real text content in the heading.
 *
 * IF THE ICON FAILS TO LOAD
 *
 * `alt="E"` means the browser renders the letter in the inherited serif and the
 * line still reads "(E)go: MyPersonal Success". The alt sits inside the
 * aria-hidden subtree so it never reaches the accessibility tree; it exists
 * only for that failure. It must never be "".
 *
 * A PLAIN <img>, NOT next/image, and this is the reason.
 *
 * next/image writes `style="color:transparent"` inline on the element. That is
 * sensible for a photograph, where a flash of alt text during load is noise,
 * and it is fatal here: a transparent colour makes the alt text invisible, so
 * a blocked image rendered "( )go: MyPersonal Success" with the E simply gone.
 * Caught by actually blocking the request rather than by reasoning about it.
 *
 * An inline style beats a class, so the fix is not a CSS override; it is not
 * using the component. Nothing is lost. The file is a 12KB PNG shown at about
 * 81px, so the optimizer has nothing to do, and the plain tag lets the CSS own
 * the geometry outright.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <h1 className={className}>
      <span className="sr-only">{APP_NAME}</span>

      <span aria-hidden="true">
        {/* One unbreakable unit. Without this the icon can be left alone on a
            line when the heading wraps, which looks broken. The colon is
            inside the group because a colon should not begin a line. */}
        <span className="whitespace-nowrap">
          (
          <span className="wordmark-slot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/app-icon.png"
              alt="E"
              width={1024}
              height={1024}
              fetchPriority="high"
              decoding="sync"
              className="wordmark-icon"
            />
          </span>
          )go:
        </span>{" "}
        MyPersonal Success
      </span>
    </h1>
  );
}
