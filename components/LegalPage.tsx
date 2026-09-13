import type { ReactNode } from "react";
import { TextPage } from "./TextPage";
import { LEGAL_LAST_UPDATED } from "@/lib/site";

/**
 * The legal routes' entry into the shared prose shell. Kept as its own name
 * because /privacy and /terms read better calling LegalPage than the generic
 * shell, and because the "Last updated" line belongs to legal pages rather
 * than to prose in general.
 *
 * The date comes from lib/site.ts and is deliberately not derived from the
 * build. "Last updated" on a policy means the terms changed, not that the site
 * was redeployed.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  /** The standing line under the H1, above the body. */
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <TextPage
      title={title}
      meta={`Last updated: ${LEGAL_LAST_UPDATED}`}
      subtitle={intro}
    >
      {children}
    </TextPage>
  );
}

/* ---------------------------------------------------------------------------
   Prose primitives

   These exist so a legal page is a list of sections rather than a wall of
   Tailwind. They are not general purpose: the sizes and the spacing are tuned
   for the 34rem measure above and nothing else.
   --------------------------------------------------------------------------- */

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-8 first:pt-0">
      <h2 className="font-serif text-2xl tracking-wordmark text-ink leading-snug">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-ink leading-relaxed">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed">{children}</p>;
}

/** Secondary prose. Used for the parenthetical detail under a claim. */
export function Note({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted leading-relaxed">{children}</p>;
}

export function List({ children }: { children: ReactNode }) {
  return (
    <ul className="space-y-2.5 pl-0">
      {children}
    </ul>
  );
}

/**
 * A list row. The marker is a hairline rule rather than a bullet glyph: a
 * disc is a filled dot, which is the closest thing to an accent colour a
 * monochrome page can accidentally acquire, and at 8 percent black the rule
 * sits at the same weight as every other divider on the site.
 */
export function Item({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-5 leading-relaxed">
      <span
        aria-hidden
        className="absolute left-0 top-[0.7em] h-px w-2.5 bg-ink/40"
      />
      {children}
    </li>
  );
}

/** A defined term inside prose. Weight, not colour. */
export function Term({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}
