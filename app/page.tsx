import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { AppIcon } from "@/components/AppIcon";
import { Download } from "@/components/Download";
import {
  APP_NAME,
  CATEGORIES,
  FREE_SLOTS,
  LANGUAGE_COUNT,
  PRO_FEATURES,
  PRO_SLOTS,
  QUOTE_COUNT,
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

  One real quote is set at display size in the hero, in the same face the app
  sets it in. That is the product: the page should look like the app's quote
  screen before it looks like a marketing page.

  Every number on this page comes from lib/site.ts, which sources each one from
  a named file in the Xcode project. There are no round numbers invented to
  look good.
  ---------------------------------------------------------------------------
*/

/**
 * Quote 53 in Resources/quotes.json, Confidence, public domain. Quoted exactly
 * as the app ships it, including the full stop inside the sentence, so a
 * visitor who downloads the app sees the same line rendered the same way.
 */
const HERO_QUOTE = {
  text: "Waste no more time arguing about what a good man should be. Be one.",
  author: "Marcus Aurelius",
};

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
          <div className="animate-fade-in">
            <AppIcon size={80} />
          </div>

          <h1 className="mt-10 font-serif text-5xl sm:text-6xl md:text-7xl tracking-wordmark text-balance leading-[1.03] text-ink animate-fade-up">
            {APP_NAME}
          </h1>

          <p className="mt-6 max-w-[34rem] font-sans text-lg text-muted leading-relaxed animate-fade-up">
            A quote when you asked for one. A goal you actually close.
            Everything stays on your iPhone.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up">
            <Download />
            <a
              href="#privacy"
              className="inline-flex items-center rounded-full border border-rule px-6 py-3.5 text-sm font-sans font-medium text-ink hover:bg-surface transition"
            >
              How it handles your data
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- The quote itself */}
      <section className="relative bg-ground pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <figure className="border-t border-rule pt-12 md:pt-16">
              {/* The measure is wider than the prose measure and deliberately
                  so. This is display type, not running text: at 34rem a
                  three-line quote breaks into six and stops reading as one
                  utterance. */}
              <blockquote className="max-w-[44rem] font-serif text-3xl md:text-4xl leading-[1.28] tracking-wordmark text-balance text-ink">
                {HERO_QUOTE.text}
              </blockquote>
              {/* Sans, smaller, no leading punctuation. The app's
                  Typography+Theme.swift specifies the author line exactly this
                  way: "the plain name with no leading punctuation of any
                  kind". */}
              <figcaption className="mt-6 font-sans text-sm text-muted">
                {HERO_QUOTE.author}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* -------------------------------------------------------------- Quotes */}
      <section id="quotes" className="section-anchor bg-ground py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Eyebrow>Quotes</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
              {QUOTE_COUNT} lines, delivered when you asked
            </h2>
            <p className="mt-5 max-w-[34rem] font-sans text-muted leading-relaxed">
              You set the times. The app sends one quote at each of them, never
              the same one twice in a row, chosen from the categories you have
              switched on. The whole library ships inside the app, so it works
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
            <h2 className="max-w-2xl font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
              Start tomorrow morning
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
