import { QUOTES_ROW_A, QUOTES_ROW_B, type MarqueeQuote } from "@/lib/quotes";

/**
 * Two rows of quote cards drifting in opposite directions.
 *
 * NO JAVASCRIPT. This is a server component and the motion is a CSS keyframe
 * animation. The site has exactly one JS animation mechanism already, the
 * IntersectionObserver in Reveal, and a marquee does not need a second one: it
 * runs unconditionally from load and has no state. Everything visual, the
 * speed, the edge mask, the hover pause and the reduced-motion stop, lives in
 * the .marquee rules in app/globals.css, and the speed rationale is documented
 * there rather than here.
 *
 * WHY THE SET IS RENDERED TWICE
 *
 * The track animates from translateX(0) to translateX(-50%). Because the cards
 * appear twice, at -50% the second copy occupies exactly the pixels the first
 * copy started in, so the jump back to 0 is invisible and the loop is seamless.
 * This is the reason the duplicate cannot be dropped, and the reason the two
 * copies must be identical.
 *
 * The duplicate is aria-hidden. It is the same sentences a second time, and a
 * screen reader announcing all twenty quotes twice is worse than useless.
 *
 * ACCESSIBILITY OF THE MOTION ITSELF
 *
 * The rows are decorative in the sense that nothing here is an action and no
 * information is lost if they are never read; the same quotes are the app's
 * content, not the site's argument. They are still real text in the DOM rather
 * than an image, so they are selectable, searchable and translatable.
 */

function Card({
  quote,
  ariaHidden = false,
}: {
  quote: MarqueeQuote;
  ariaHidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={ariaHidden || undefined}
      className="marquee-card flex flex-col justify-between rounded-2xl border border-rule bg-surface px-6 py-5"
    >
      {/* Serif for the quote, matching the pull quote further down the page
          and the app, which sets quote prose in New York and nothing else in
          it. Not balanced: text-wrap:balance on three lines inside a fixed
          260px card produces a ragged short last line more often than it
          helps. */}
      <blockquote className="font-serif text-[15px] md:text-base leading-[1.45] text-ink">
        {quote.text}
      </blockquote>
      {/* Sans, smaller, no leading punctuation. The app's
          Typography+Theme.swift specifies the author line as "the plain name
          with no leading punctuation of any kind", so no dash and no quote
          marks are added here either. */}
      <figcaption className="mt-4 font-sans text-xs text-faint">
        {quote.author}
      </figcaption>
    </figure>
  );
}

function Row({
  quotes,
  reverse = false,
}: {
  quotes: MarqueeQuote[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee">
      {/* Both copies are FLAT siblings of the track. Do not wrap the duplicate
          in a container: that makes it a single flex item and the -50%
          translate no longer lands on a card boundary. */}
      <div className={`marquee-track${reverse ? " marquee-track--reverse" : ""}`}>
        {quotes.map((q) => (
          <Card key={q.id} quote={q} />
        ))}
        {/* The seamless half. Same cards, hidden from assistive tech so the
            twenty quotes are not announced twice. */}
        {quotes.map((q) => (
          <Card key={`dup-${q.id}`} quote={q} ariaHidden />
        ))}
      </div>
    </div>
  );
}

export function QuoteMarquee() {
  return (
    /* Full bleed, outside the page's max-w-7xl container, so the cards run to
       both screen edges and the mask has room to do its work. Safe for the
       horizontal-overflow check because .marquee clips with overflow:hidden,
       so the track's real width never reaches the document. */
    <section
      className="space-y-4 py-2"
      aria-label="Quotes from the app's library"
    >
      <Row quotes={QUOTES_ROW_A} />
      <Row quotes={QUOTES_ROW_B} reverse />
    </section>
  );
}
