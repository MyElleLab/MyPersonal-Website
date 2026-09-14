"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { APP_NAME, APP_SHORT_NAME } from "@/lib/site";

/**
 * Root-relative hashes, not bare ones. This nav is rendered on /privacy and
 * /terms as well as on /, and "#quotes" from a legal page points at a section
 * that is not on the page. "/#quotes" resolves from anywhere.
 */
const links = [
  { href: "/#quotes", label: "Quotes" },
  { href: "/#goals", label: "Goals" },
  { href: "/#privacy", label: "Privacy" },
];

const linkClass = "px-3 py-2 rounded-full text-muted hover:text-ink transition";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        /* The blur only appears once the page has moved. At rest the nav is
           part of the ground, which is what keeps the top of the page as
           empty as the app's quote screen. */
        scrolled
          ? "backdrop-blur-xl bg-ground/80 border-b border-rule"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        {/* The same icon-plus-go lockup as the hero. It used to be a bordered
            E tile sitting next to the text "(E)go", which told the joke twice:
            the icon supplied an E and then the text spelled one out anyway.
            One lockup component now serves the nav, the footer and the hero. */}
        <Link
          href="/"
          className="flex items-center text-ink"
          /* Wordmark carries its own sr-only name, but the LINK needs its own
             accessible name or it announces as its URL. */
          aria-label={`${APP_SHORT_NAME}, home`}
        >
          <Wordmark
            trailing=""
            label={APP_NAME}
            className="font-serif tracking-wordmark text-[19px] leading-none"
          />
        </Link>

        <ul className="flex items-center gap-0.5 md:gap-2 text-sm font-sans">
          {links.map((l) => (
            <li key={l.href}>
              {/* Fragments stay plain anchors so the hash jump and the smooth
                  scroll behave. There are no non-fragment links in this nav
                  today, but the branch is kept so adding one is not a trap. */}
              {l.href.includes("#") ? (
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
