import {
  QUOTES_ROW_A,
  QUOTES_ROW_B,
  MARQUEE_WORTH,
  type MarqueeQuote,
  type WorthSample,
} from "@/lib/quotes";

/**
 * Two rows of quote cards drifting in opposite directions.
 *
 * NO JAVASCRIPT. This is a server component and the motion is a CSS keyframe
 * animation. Everything visual, the speed, the edge mask, the hover pause and
 * the reduced-motion stop, lives in the .marquee rules in app/globals.css, and
 * the speed rationale is documented there rather than here.
 *
 * WHY THE SET IS RENDERED TWICE
 *
 * The track animates from translateX(0) to translateX(-50%). Because the cards
 * appear twice, at -50% the second copy occupies exactly the pixels the first
 * copy started in, so the jump back to 0 is invisible. This is the reason the
 * duplicate cannot be dropped, and the reason the two copies must be identical.
 * The duplicate is aria-hidden so the quotes are not announced twice.
 *
 * TWO KINDS OF CARD
 *
 * Attributed quotes and Worth lines. The Worth cards invert and put a delivery
 * time where the author goes, which is what stops an unsigned second-person
 * line reading as a quotation whose author went missing. The reasoning is in
 * lib/quotes.ts on MARQUEE_WORTH.
 *
 * CARD COUNT IS LOAD BEARING. Twelve per row, not ten. If you add or remove a
 * card you MUST update --marquee-duration in globals.css, or the row silently
 * runs at the wrong speed: the duration is derived from the track width to hold
 * 32 px/s, and the track width is the card count times (card width + gap).
 */

/** An attributed card: hairline border, barely offset fill, author underneath. */
function QuoteCard({
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
      <blockquote className="font-serif text-[15px] md:text-base leading-[1.45] text-ink">
        {quote.text}
      </blockquote>
      <figcaption className="mt-4 font-sans text-xs text-faint">
        {quote.author}
      </figcaption>
    </figure>
  );
}

/**
 * A Worth card: inverted, with the delivery time where the author sits.
 *
 * `border-ink` rather than `border-rule`, because a hairline at 8 percent black
 * around a near-black fill is invisible and leaves the card looking like it has
 * a different radius from its neighbours. Matching the fill keeps the silhouette
 * identical to the attributed cards; only the value flips.
 */
function WorthCard({
  sample,
  ariaHidden = false,
}: {
  sample: WorthSample;
  ariaHidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={ariaHidden || undefined}
      className="marquee-card flex flex-col justify-between rounded-2xl border border-ink bg-ink px-6 py-5"
    >
      <blockquote className="font-serif text-[15px] md:text-base leading-[1.45] text-on-ink">
        {sample.text}
      </blockquote>
      {/* Tracked and uppercase-scale like an eyebrow, so it reads as a label
          rather than as a name. `tabular-nums` keeps 07.00 and 12.00 the same
          width, which matters when they drift past each other. */}
      <figcaption className="mt-4 font-sans text-xs tracking-eyebrow text-on-ink/60 tabular-nums">
        {sample.time}
      </figcaption>
    </figure>
  );
}

type Slot =
  | { kind: "quote"; quote: MarqueeQuote }
  | { kind: "worth"; sample: WorthSample };

/**
 * Interleave two Worth cards into a row of ten at positions 3 and 9 (1-indexed),
 * so a Worth card passes roughly every sixth card rather than the two arriving
 * together. Returns twelve slots.
 */
function buildRow(quotes: MarqueeQuote[], worth: WorthSample[]): Slot[] {
  const out: Slot[] = quotes.map((q) => ({ kind: "quote", quote: q }));
  out.splice(2, 0, { kind: "worth", sample: worth[0] });
  out.splice(8, 0, { kind: "worth", sample: worth[1] });
  return out;
}

function Row({ slots, reverse = false }: { slots: Slot[]; reverse?: boolean }) {
  const render = (s: Slot, i: number, dup: boolean) =>
    s.kind === "quote" ? (
      <QuoteCard
        key={`${dup ? "dup-" : ""}q${s.quote.id}-${i}`}
        quote={s.quote}
        ariaHidden={dup}
      />
    ) : (
      <WorthCard
        key={`${dup ? "dup-" : ""}w${s.sample.id}-${i}`}
        sample={s.sample}
        ariaHidden={dup}
      />
    );

  return (
    <div className="marquee">
      {/* Both copies are FLAT siblings of the track. Do not wrap the duplicate
          in a container: that makes it a single flex item and the -50%
          translate no longer lands on a card boundary. */}
      <div className={`marquee-track${reverse ? " marquee-track--reverse" : ""}`}>
        {slots.map((s, i) => render(s, i, false))}
        {slots.map((s, i) => render(s, i, true))}
      </div>
    </div>
  );
}

export function QuoteMarquee() {
  const rowA = buildRow(QUOTES_ROW_A, [MARQUEE_WORTH[0], MARQUEE_WORTH[2]]);
  const rowB = buildRow(QUOTES_ROW_B, [MARQUEE_WORTH[1], MARQUEE_WORTH[3]]);

  return (
    <section
      className="space-y-4 py-2"
      aria-label="Quotes from the app's library"
    >
      <Row slots={rowA} />
      <Row slots={rowB} reverse />
    </section>
  );
}
