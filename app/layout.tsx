import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { appSchema } from "@/lib/schema";
import { APP_NAME, META_DESCRIPTION, SITE_URL, TAGLINE } from "@/lib/site";

/**
 * No next/font import, and that is the design rather than an omission.
 *
 * The app sets its prose in New York and its chrome in SF Pro, both system
 * faces. `ui-serif` and `ui-sans-serif` in tailwind.config.ts resolve to
 * exactly those two on Apple platforms, which is where an iPhone app's site
 * gets most of its traffic. Loading a web font to imitate them would be both
 * slower and less accurate. See the fontFamily comment in the Tailwind config.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: APP_NAME,
    /* Legal pages set their own title and get the app name appended, so a
       browser tab reads "Privacy Policy · (E)go: MyPersonal Success" without
       either page repeating the other's half.

       A middle dot, not a dash. House rule bans em and en dashes in all copy,
       and a title is copy: it is the first thing shown in a tab, a bookmark
       and a search result. A hyphen would satisfy the rule but reads as a
       break in a name that already contains a colon; the middle dot is the
       same separator the footer's legal row uses. */
    template: `%s · ${APP_NAME}`,
  },
  /* All three descriptions below read from lib/site.ts. They used to be three
     separate literals here plus one in lib/schema.ts and one in the footer,
     which is five copies of the positioning line and four places for it to go
     stale unnoticed: nobody proofreads a link preview. */
  description: META_DESCRIPTION,
  applicationName: APP_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: TAGLINE,
  },
  twitter: {
    card: "summary",
    title: APP_NAME,
    description: TAGLINE,
  },
};

/**
 * Declares that the page is designed for both schemes, so the browser paints
 * its own chrome, the scrollbar and the overscroll gutter to match. Without
 * it a black page keeps a white gutter when you rubber-band it on iOS.
 *
 * `themeColor` is given as two entries rather than one, for the same reason
 * every colour on this site is: a single value would be wrong in one scheme.
 */
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ground text-ink font-sans antialiased">
        <JsonLd data={appSchema()} />
        {children}
      </body>
    </html>
  );
}
