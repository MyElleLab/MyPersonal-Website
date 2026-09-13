import { Reveal } from "./Reveal";
import { WORTH_SAMPLES } from "@/lib/quotes";

/**
 * The Worth section. This is the page's argument, so it gets the display type
 * that used to belong to the Marcus Aurelius pull quote.
 *
 * WHY THIS SECTION EXISTS
 *
 * The marquee filters to attributed quotes, which is right, and the
 * consequence is that all forty Worth lines are excluded because none of them
 * has an author. That left the page selling the app without ever showing the
 * thing the app is for. This section is where Worth lives.
 *
 * THE TIME LABEL IS THE WHOLE MECHANISM
 *
 * An unsigned "You are already enough" on a marketing page reads as the site
 * making a claim about the visitor. The same sentence with "08.00" in front of
 * it reads as a notification arriving at a time the user picked. Same words,
 * different speaker. Do not remove the times to tidy the layout; they are not
 * decoration, they are the attribution.
 *
 * The closing note is the other half of that. It states plainly that these
 * carry no author and why, rather than letting the reader wonder whether the
 * site is quoting someone. Handling it head on is what makes an unsigned line
 * legitimate instead of evasive.
 */
export function WorthSection() {
  return (
    <section id="worth" className="section-anchor bg-ground py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="font-sans uppercase tracking-eyebrow text-[11px] font-medium text-muted">
            Worth
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
            Nobody is going to say this to you
          </h2>
          <p className="mt-5 max-w-[34rem] font-sans text-muted leading-relaxed">
            Five of the six categories are about effort. This one is not. You
            pick the times, and these arrive.
          </p>
        </Reveal>

        <Reveal delay={80}>
          {/*
            A description list, because that is what this is: a time paired
            with what arrives at it. `dt` and `dd` give a screen reader the
            association for free, which a span next to a blockquote would not.

            The time column is fixed width so the four lines start on a common
            left edge and the block reads as a schedule rather than as four
            unrelated sentences. At 390px that column is 3.5rem, which fits
            "08.00" at this size with room to spare.
          */}
          <dl className="mt-14 max-w-[46rem] border-t border-rule">
            {WORTH_SAMPLES.map((s) => (
              <div
                key={s.id}
                className="flex items-baseline gap-5 md:gap-8 border-b border-rule py-6 md:py-7"
              >
                <dt className="w-14 md:w-20 shrink-0 font-sans uppercase tracking-eyebrow text-[11px] font-medium text-faint tabular-nums">
                  {s.time}
                </dt>
                {/* Serif, and larger than body copy. These are the product. */}
                <dd className="font-serif text-xl md:text-2xl leading-[1.35] text-ink">
                  {s.text}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-8 max-w-[34rem] font-sans text-sm text-muted leading-relaxed">
            The Worth lines are written for the app rather than quoted, so they
            carry no author. Forty of them, ten for each part of the day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
