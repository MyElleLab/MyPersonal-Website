import type { Config } from "tailwindcss";

/**
 * (E)go is monochrome. There is no accent colour anywhere on this site, and
 * adding one is not a small change: emphasis is carried by weight, size and
 * space, and a hue would immediately become the thing the eye goes to instead.
 *
 * Every token below is named for its ROLE and resolves to a CSS variable
 * defined in app/globals.css, which is where the light and dark values live.
 * That indirection is the whole point. A Tailwind class like `text-ink` is
 * correct in both schemes, so no component carries a `dark:` variant and no
 * component can be right in one scheme and wrong in the other.
 *
 * The values mirror the app's `Extensions/Color+Theme.swift` exactly, so the
 * site and the app cannot drift:
 *
 *   ground      #FFFFFF / #000000     mlsBackground
 *   surface     #FAFAFA / #0A0A0A     mlsSurface
 *   surface-2   #F5F5F5 / #141414     mlsSurface2
 *   ink         #0A0A0A / #F5F5F5     mlsTextPrimary
 *   muted       #6B6B6B / #A0A0A0     mlsTextSecondary
 *   faint       #9B9B9B / #6B6B6B     mlsTextMuted
 *   rule        8% black / 12% white  mlsBorder
 */

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],

  /**
   * "media", not "class". The app follows the system in both modes: it removed
   * every `.preferredColorScheme(.dark)` and ships no in-app appearance
   * override. A toggle here would put the site out of step with the product,
   * and it would need a blocking inline script to avoid a flash of the wrong
   * scheme on first paint. Neither cost buys anything.
   *
   * Almost nothing in this codebase uses a `dark:` variant, because the tokens
   * below already resolve per scheme and a component that names a colour twice
   * can be right in one scheme and wrong in the other. The single exception is
   * components/AppIcon.tsx, which swaps between two real PNGs: the icon's
   * ground is part of the artwork, so there is no token that can carry it.
   */
  darkMode: "media",

  theme: {
    extend: {
      colors: {
        ground: "var(--ground)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        rule: "var(--rule)",
        /* Text on an ink-filled element (the primary button). Deliberately
           the ground colour rather than a literal white: on an ink fill in
           Dark mode the ink is #F5F5F5, so white-on-that would be invisible.
           Reading it from the ground token makes the fill self-inverting. */
        "on-ink": "var(--ground)",
      },

      fontFamily: {
        /* No web fonts. The app uses New York for quote prose and SF Pro for
           chrome, both system faces, and `ui-serif` / `ui-sans-serif` resolve
           to exactly those two on Apple platforms. Loading Playfair Display
           to imitate New York would be slower AND less accurate. The fallback
           chain covers everyone else. */
        serif: ['ui-serif', 'New York', 'Iowan Old Style', 'Palatino', 'Georgia', 'serif'],
        sans: ['ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },

      letterSpacing: {
        /* Carried from the studio site, which puts -0.015em on every serif
           heading. Large serif type sets loose by default and the negative
           tracking is what makes a display line read as one object. */
        wordmark: "-0.015em",
        /* Uppercase labels. 0.12em is the studio's value and it is the
           difference between an eyebrow and a shouted word. */
        eyebrow: "0.12em",
      },

      animation: {
        "fade-up": "fade-up 0.95s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 1.15s ease-out both",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },

  plugins: [],
};

export default config;
