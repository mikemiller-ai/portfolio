/**
 * Analytics abstraction — intentionally a no-op in the prototype.
 *
 * The site does NOT ship any tracker. This gives a single, documented place to
 * wire up a privacy-conscious provider (Plausible, Fathom, or AWS-native
 * logging) later without touching component code. See README "Analytics".
 */

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
  // No-op placeholder. When analytics is enabled, forward `event` +
  // `properties` to the chosen provider here.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, properties ?? {});
  }
}
