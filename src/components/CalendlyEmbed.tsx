"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const WIDGET_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Calendly's colour params take bare hex, no "#". These mirror the site tokens
 * in globals.css (--card / --foreground / --primary) so the scheduler reads as part
 * of the page rather than a white rectangle dropped into it.
 */
const EMBED_COLORS = {
  light: { background: "ffffff", text: "0f172a", primary: "4f46e5" },
  dark: { background: "111622", text: "edf0f7", primary: "818cf8" },
} as const;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(opts: { url: string; parentElement: HTMLElement }): void;
    };
  }
}

function embedUrl(slug: string, theme: "light" | "dark") {
  const c = EMBED_COLORS[theme];
  const params = new URLSearchParams({
    // Calendly shows its own cookie/GDPR banner inside the iframe otherwise,
    // which stacks a second consent prompt on top of the host page's.
    hide_gdpr_banner: "1",
    background_color: c.background,
    text_color: c.text,
    primary_color: c.primary,
  });
  return `${siteConfig.calendlyUrl}/${slug}?${params}`;
}

/**
 * Inline Calendly scheduler with a site-rendered duration picker.
 *
 * Why the picker exists: Calendly's inline widget reports its height back to
 * the host page, and only an individual event type reports a real one. Point it
 * at the account profile url (the page that lists every event type) and it
 * settles at ~150px, so the list of durations is cropped out of view entirely.
 * Embedding one event type at a time sizes correctly, so the choice between
 * them is rendered here instead, which also keeps it in the site's styling.
 *
 * Two further wrinkles:
 *
 * 1. The widget script loads only where this component renders, not globally,
 *    so the rest of the site keeps its current JS budget.
 * 2. The widget bakes its colours in at init time and cannot be restyled after,
 *    so a theme change has to tear the iframe down and re-init it. Without that
 *    it stays light while the page around it goes dark.
 *
 * The fallback link is deliberate: content blockers routinely block
 * assets.calendly.com, and a silent empty box would cost a booking.
 */
export function CalendlyEmbed({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const events = siteConfig.calendlyEvents;
  // Typed as string, not the inferred literal: siteConfig is `as const`, so
  // inference would pin the state to the first event's slug alone.
  const [activeSlug, setActiveSlug] = useState<string>(events[0].slug);
  const containerRef = useRef<HTMLDivElement>(null);
  // next-themes only knows the real theme after hydration; rendering the widget
  // before then would init it with the wrong colours and force a second reload.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const theme = resolvedTheme === "dark" ? "dark" : "light";
    let cancelled = false;

    const init = () => {
      if (cancelled || !window.Calendly || !containerRef.current) return;
      // initInlineWidget appends; clear first so a re-init doesn't stack iframes.
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: embedUrl(activeSlug, theme),
        parentElement: containerRef.current,
      });
    };

    if (window.Calendly) {
      init();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_SCRIPT}"]`,
    );
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", init);
    if (!existing) {
      script.src = WIDGET_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      script.removeEventListener("load", init);
    };
  }, [mounted, resolvedTheme, activeSlug]);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Meeting length"
        className="grid gap-3 sm:grid-cols-3"
      >
        {events.map((event) => {
          const selected = event.slug === activeSlug;
          return (
            <button
              key={event.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setActiveSlug(event.slug);
                trackEvent("booking_widget_shown", { length: event.label });
              }}
              className={cn(
                "rounded-2xl border p-4 text-left transition-colors",
                selected
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-primary/40 hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "block text-sm font-semibold",
                  selected ? "text-primary" : "text-foreground",
                )}
              >
                {event.label}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{event.blurb}</span>
            </button>
          );
        })}
      </div>

      {/* The height here must be EXPLICIT, not min-h. Calendly's widget sizes
          its iframe to height:100%, and a percentage height resolves against a
          parent's height, not its min-height — with only a min-height set the
          iframe collapses to ~150px and crops the calendar out of view. Mobile
          needs the taller value because the widget stacks profile over calendar. */}
      <div
        ref={containerRef}
        className="mt-6 h-[1040px] w-full overflow-hidden rounded-2xl border border-border bg-card sm:h-[700px]"
        aria-busy={!mounted}
      >
        {!mounted ? (
          <div className="grid h-full place-items-center p-6">
            <p className="text-sm text-subtle">Loading the scheduler…</p>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-subtle">
        Scheduler not loading?{" "}
        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booking_opened", { source: "fallback" })}
          className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2"
        >
          Open it in a new tab
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </p>
    </div>
  );
}
