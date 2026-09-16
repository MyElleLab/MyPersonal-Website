import { Fragment } from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import {
  APP_NAME,
  CONTACT_EMAIL,
  TAGLINE,
  STUDIO_NAME,
  STUDIO_URL,
} from "@/lib/site";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

/**
 * The legal links are LIVE here, unlike on the studio site where the same row
 * is commented out. That is not an oversight on either side: the studio's
 * /privacy and /terms are placeholders carrying noindex, and linking to a
 * placeholder is worse than not linking at all. These two pages are real, and
 * App Review follows them from the app, so they are linked from every page.
 */
export function Footer() {
  return (
    <footer id="contact" className="relative bg-ground border-t border-rule mt-12">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            {/* Same lockup as the nav and the hero. No `trailing`: it defaults
                to the name's own tail, which is what this wants. */}
            <Wordmark className="font-serif tracking-wordmark text-xl text-ink" />
            <p className="mt-4 max-w-sm font-sans text-muted leading-relaxed text-sm">
              {TAGLINE}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-sans text-ink hover:text-muted transition"
            >
              {CONTACT_EMAIL}
              <svg
                viewBox="0 0 24 24"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans uppercase tracking-eyebrow text-[11px] font-medium text-muted">
              Legal
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-ink hover:text-muted transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans uppercase tracking-eyebrow text-[11px] font-medium text-muted">
              Studio
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={STUDIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-ink hover:text-muted transition"
                >
                  {STUDIO_NAME}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-rule font-sans text-muted">
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs"
          >
            {legalLinks.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && (
                  <span aria-hidden className="select-none opacity-50">
                    ·
                  </span>
                )}
                <Link href={l.href} className="hover:text-ink transition">
                  {l.label}
                </Link>
              </Fragment>
            ))}
          </nav>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <p>
              © {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.
            </p>
            <p>Built in Copenhagen.</p>
          </div>

          {/* Required attribution. The site names iPhone, iOS and the App
              Store. Fine print by design. */}
          <p className="mt-4 max-w-3xl text-[11px] leading-relaxed">
            Apple, the Apple logo, iPhone, iPad, and App Store are trademarks of
            Apple Inc., registered in the U.S. and other countries. IOS is a
            trademark or registered trademark of Cisco in the U.S. and other
            countries and is used under license.
          </p>
        </div>
      </div>
    </footer>
  );
}
