import { appStoreUrl, APP_NAME } from "@/lib/site";

/**
 * The download control.
 *
 * `appStoreUrl` is null until the app is approved and its numeric ID is filled
 * into lib/site.ts, so this renders a plain non-interactive state instead of a
 * link. That is the whole reason it is a component rather than an inline
 * anchor: the site has to ship before the listing exists, and a button that
 * looks live and goes nowhere is worse than one that says it is not ready.
 *
 * When the ID lands, the button becomes a real link with no other edit here or
 * at any call site.
 */
export function Download({ className = "" }: { className?: string }) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-sans font-medium transition";

  if (!appStoreUrl) {
    return (
      <span
        className={`${base} border border-rule text-muted cursor-default ${className}`}
        /* Not a button and not disabled: there is nothing to press. A
           disabled button is still announced as a control that could work. */
      >
        Coming to the App Store
      </span>
    );
  }

  return (
    <a
      href={appStoreUrl}
      className={`${base} bg-ink text-on-ink hover:opacity-80 ${className}`}
      aria-label={`Download ${APP_NAME} on the App Store`}
    >
      <svg
        viewBox="0 0 384 512"
        className="size-4"
        fill="currentColor"
        aria-hidden
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      Download on the App Store
    </a>
  );
}
