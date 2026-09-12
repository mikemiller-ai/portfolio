/**
 * Analytics abstraction — a single, documented place to forward events to a
 * privacy-conscious provider without touching component code. See README
 * "Analytics".
 *
 * The provider is Plausible (cookieless, no personal data). It is only active
 * when NEXT_PUBLIC_ANALYTICS_DOMAIN is set AND the Plausible script has loaded
 * (see src/app/layout.tsx). With the env var unset — e.g. local dev — this
 * stays a safe no-op and the site behaves exactly as before.
 */

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export type AnalyticsEvent =
  | "resume_downloaded"
  | "resume_printed"
  | "project_viewed"
  | "architecture_viewed"
  | "github_clicked"
  | "linkedin_clicked"
  | "contact_form_submitted"
  | "booking_opened"
  | "booking_widget_shown";

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, properties ?? {});
  }

  // Forward to Plausible when the script is present. When it is not (env var
  // unset, or during SSR), this is a no-op.
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(event, properties ? { props: properties } : undefined);
  }
}
