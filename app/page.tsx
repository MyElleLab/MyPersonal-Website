import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Download } from "@/components/Download";
import { Wordmark } from "@/components/Wordmark";
import { QuoteMarquee } from "@/components/QuoteMarquee";
import { WorthSection } from "@/components/WorthSection";
import {
  CATEGORIES,
  FREE_SLOTS,
  LANGUAGE_COUNT,
  PRO_FEATURES,
  PRO_SLOTS,
  QUOTE_COUNT,
  TAGLINE,
} from "@/lib/site";

/*
  ---------------------------------------------------------------------------
  The landing page.

  Structure and rhythm are the studio site's: max-w-7xl with px-6 md:px-10,
  sections at py-24 md:py-32, one Reveal per block, headings in serif with
  tracking-wordmark, eyebrows in tracked uppercase sans.

  The palette is not the studio's. There is no accent colour here and there is
  no card fill doing the work a colour would do. Sections are separated by a
  single hairline and by space. If a block needs more emphasis than its
  neighbours, it gets more space or a heavier weight, never a tint.

  THE PAGE ARGUES FOR WORTH, NOT FOR EFFORT. The app's point is that what you
  are does not rise and fall with what you got done, and five of its six
  categories are about effort while the one that matters is not. Copy that
  leads with mechanics describes the product accurately and sells the wrong
  thing.

  Two quote treatments, kept apart on purpose. The marquee under the hero is
  BREADTH: twenty attributed cards drifting past, none demanding to be
  finished. The Worth section is DEPTH: four unsigned lines at display size,
  each behind a delivery time. There used to be a third, a Marcus Aurelius
  pull quote at the largest size on the page, and it was deleted rather than
  moved: it is an effort-and-virtue line, so the biggest type on the page was
  arguing against the positioning.

  Every number on this page comes from lib/site.ts, which sources each one from
  a named file in the Xcode project. There are no round numbers invented to
  look good.
  ---------------------------------------------------------------------------
*/

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans uppercase tracking-eyebrow text-[11px] font-medium text-muted">
      {children}
    </p>
  );
}

function Rule() {
  return <div className="mx-auto max-w-7xl px-6 md:px-10" aria-hidden><div className="hairline" /></div>;
}

export default function HomePage() {
  return (
    <main className="relative z-10">
      <Nav />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative bg-ground pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {/* The icon is no longer a separate block above the title. It is
              the E, set inline. See components/Wordmark.tsx and the
              .wordmark-* rules in globals.css.

              No text-balance here, and under the current name it could not
              help even if it were on. Measured, not assumed: the heading is a
              single line at every width from 403px up. Below that it breaks
              once, as "Ego:" then "MySuccess", and that break is FORCED: the
              icon and "go" are one nowrap unit and "MySuccess" is one word, so
              the space after the colon is the only break opportunity in the
              string. Setting text-wrap: balance at 320, 360, 390 and 402px
              produces byte-identical lines. It is off because it is a no-op.

              It was off for a real reason under the old name, which had two
              words after the colon and three lines at 390px: balancing could
              strand the second word and leave the nowrap group alone on line
              one. Keep it off. If the name ever grows a second word back, that
              hazard returns with it and this comment stops being history. */}
          <Wordmark as="h1" className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-wordmark leading-[1.03] text-ink animate-fade-up" />

          {/* The positioning, and the only place on the page it is stated
              outright. Read from lib/site.ts so the hero, the footer, the
              search snippet, the link preview and the structured data cannot
              drift apart. */}
          <p className="mt-6 max-w-[34rem] font-sans text-lg text-muted leading-relaxed animate-fade-up">
            {TAGLINE}
          </p>

          {/* One action, not two. The secondary "How it handles your data"
              link was removed: the nav already carries Privacy on every page,
              and a hero with a single button states the one thing it wants
              rather than offering a choice between downloading and reading a
              policy. */}
          <div className="mt-10 animate-fade-up">
            <Download />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Marquee

          Full bleed, so it sits outside the max-w-7xl container above. The
          cards run to both screen edges and dissolve into the ground rather
          than stopping at the gutter. */}
      <div className="pb-20 md:pb-28">
        <QuoteMarquee />
      </div>

      <Rule />

      {/* --------------------------------------------------------------- Worth

          Placed immediately after the marquee and before the mechanics, so the
          first thing the visitor actually reads is what the app is for rather
          than how it works. */}
      <WorthSection />

      <Rule />

      {/* -------------------------------------------------------------- Quotes */}
      <section id="quotes" className="section-anchor bg-ground py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Eyebrow>Quotes</Eyebrow>
            {/* Was "{QUOTE_COUNT} lines, delivered when you asked". A count is
                a boast about quantity, and most of that count is effort
                content, so the old heading led with the part of the library
                the app is least about. The number survives in the body below,
                where it is a fact about working offline rather than a claim. */}
            <h2 className="mt-5 max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
              Choose what you hear, and when
            </h2>
            <p className="mt-5 max-w-[34rem] font-sans text-muted leading-relaxed">
              You set the times. The app sends one line at each of them, never
              the same one twice in a row, drawn from the categories you have
              switched on. All {QUOTE_COUNT} ship inside the app, so it works
              with no signal and nothing is fetched.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule rounded-2xl overflow-hidden">
              {/* A one-pixel gap over a rule-coloured ground draws the grid
                  lines without giving any cell a border of its own, so the
                  interior lines stay single-weight and the corners stay clean.
                  A per-cell border would double every shared edge. */}
              {CATEGORIES.map((c) => (
                <li key={c.name} className="bg-ground p-7">
                  <h3 className="font-serif text-2xl tracking-wordmark text-ink leading-snug">
                    {c.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-muted leading-relaxed">
                    {c.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* --------------------------------------------------------------- Goals */}
      <section id="goals" className="section-anchor bg-ground py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Eyebrow>Goals</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
              A week, a month, a year
            </h2>
            <p className="mt-5 max-w-[34rem] font-sans text-muted leading-relaxed">
              Write down what you intend to finish and mark it done. Each period
              closes on its own and the next one starts empty. Nothing carries
              over unless you write it again, which is the point.
            </p>
            {/* The one place the page reconciles a goals tracker with the
                claim that your worth does not move with your output. Without
                it this section reads as belonging to a different app: a
                completion checklist is output framing by construction. Saying
                the relationship outright costs three sentences and removes the
                contradiction rather than hoping nobody notices it. */}
            <p className="mt-4 max-w-[34rem] font-sans text-muted leading-relaxed">
              Worth is the floor. Goals are what you do above it. Missing one
              does not lower the floor.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div className="border-t border-rule pt-6">
                <dt className="font-serif text-xl tracking-wordmark text-ink">
                  Weekly
                </dt>
                <dd className="mt-2 font-sans text-sm text-muted leading-relaxed">
                  Free. The scope most things actually fit in.
                </dd>
              </div>
              <div className="border-t border-rule pt-6">
                <dt className="font-serif text-xl tracking-wordmark text-ink">
                  Monthly
                </dt>
                <dd className="mt-2 font-sans text-sm text-muted leading-relaxed">
                  Part of Pro. For work that needs more than a week to show.
                </dd>
              </div>
              <div className="border-t border-rule pt-6">
                <dt className="font-serif text-xl tracking-wordmark text-ink">
                  Yearly
                </dt>
                <dd className="mt-2 font-sans text-sm text-muted leading-relaxed">
                  Part of Pro. The one you will be glad you wrote down.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ------------------------------------------------------------- Privacy */}
      <section id="privacy" className="section-anchor bg-ground py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Eyebrow>Privacy</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
              We cannot see any of it
            </h2>
            <p className="mt-5 max-w-[34rem] font-sans text-muted leading-relaxed">
              Your goals, your saved quotes and your delivery times are stored
              on your iPhone. There is no account, so you never give us a name
              or an email. There is no analytics and no advertising.
            </p>
            <p className="mt-4 max-w-[34rem] font-sans text-muted leading-relaxed">
              One thing does leave the device. If you buy Pro, Apple takes the
              payment and our payments provider confirms the purchase is still
              valid. Neither of them receives anything you have written. The{" "}
              <Link
                href="/privacy"
                className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-current"
              >
                Privacy Policy
              </Link>{" "}
              sets out exactly what each one gets.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl">
              {[
                "No account and no sign-in",
                "No analytics and no crash reporting",
                "No advertising and no ad identifiers",
                "No tracking across apps or websites",
                "Export everything to a file, free tier included",
                "Delete everything from inside the app",
              ].map((claim) => (
                <li
                  key={claim}
                  className="relative pl-5 font-sans text-sm text-ink leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.72em] h-px w-2.5 bg-ink/40"
                  />
                  {claim}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ----------------------------------------------------------------- Pro */}
      <section className="bg-ground py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Eyebrow>Pro</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
              Free is a real tier
            </h2>
            <p className="mt-5 max-w-[34rem] font-sans text-muted leading-relaxed">
              {FREE_SLOTS} delivery times a day, one category and weekly goals,
              with no time limit and no advertising. Pro opens the rest. If it
              ever lapses, nothing you made is deleted.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-14 max-w-[34rem] divide-y divide-rule border-y border-rule">
              {PRO_FEATURES.map((f) => (
                <li
                  key={f}
                  className="py-4 font-sans text-ink leading-relaxed"
                >
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[34rem] font-sans text-sm text-muted leading-relaxed">
              Monthly, yearly or a one-time purchase. Prices are shown in the
              app in your own currency. Up to {PRO_SLOTS} delivery times is a
              ceiling set by how many notifications iOS will hold for one app,
              which is why it is not described as unlimited.
            </p>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ---------------------------------------------------------------- Close */}
      <section className="bg-ground py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            {/* Was "Start tomorrow morning", which is habit framing: it asks
                the reader to commit to a routine, which is the genre this app
                is positioned against. The close should land on worth, and it
                should be the last thing read before the footer. */}
            <h2 className="max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
              Start from where you already are
            </h2>
            <p className="mt-5 max-w-[34rem] font-sans text-muted leading-relaxed">
              Available in {LANGUAGE_COUNT} languages. Requires an iPhone.
            </p>
            <div className="mt-10">
              <Download />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
