import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/**
 * Shell for the prose routes, so they carry the real site chrome: same nav,
 * same footer, same type. Carried from the studio site's TextPage, including
 * the measure and the reason for it.
 *
 * The top padding clears the fixed nav (h-16, 4rem) with room to spare rather
 * than exactly, because a heading that starts one pixel below the nav reads as
 * a mistake even when it is technically clear.
 */
export function TextPage({
  title,
  eyebrow,
  meta,
  subtitle,
  children,
  wide,
}: {
  title: string;
  /** Small tracked line above the H1. */
  eyebrow?: ReactNode;
  /** Small line under the H1. The legal pages put "Last updated" here. */
  meta?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  /** Rendered below the measure at full container width, for anything that
      is not running prose. */
  wide?: ReactNode;
}) {
  return (
    <main className="relative z-10">
      <Nav />
      <section className="relative bg-ground pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {eyebrow && <div className="mb-5">{eyebrow}</div>}

          <h1 className="font-serif text-4xl md:text-5xl tracking-wordmark text-balance leading-[1.05] text-ink">
            {title}
          </h1>

          {meta && <p className="mt-4 font-sans text-sm text-muted">{meta}</p>}

          {subtitle && (
            <p className="mt-5 max-w-[34rem] font-sans text-lg text-muted leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* 544px, about 72 characters of running prose.

              Not `65ch`: CSS `ch` is the advance width of the "0" glyph, so
              the measure would change with the typeface's figure width rather
              than staying put. The studio site measured 65ch at 690px and
              roughly 91 characters in its sans, well past the comfortable 45
              to 75. A fixed rem value is stable across faces. */}
          {children && (
            <div className="mt-10 max-w-[34rem] font-sans text-ink leading-relaxed space-y-4">
              {children}
            </div>
          )}

          {wide && <div className="mt-8">{wide}</div>}
        </div>
      </section>
      <Footer />
    </main>
  );
}
