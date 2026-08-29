import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Vertical section rhythm + max-width container. */
export function Section({
  children,
  className,
  id,
  leading,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Tighter top padding — use for the first section under the hero. */
  leading?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        leading ? "pt-10 pb-16 sm:pt-14 sm:pb-24" : "py-16 sm:py-24",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Consistent section heading block (eyebrow + title + optional intro). */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Heading className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Heading>
      {intro ? (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  );
}

/** Renders schema.org JSON-LD. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, build-time data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Keyboard skip-to-content link (first focusable element on the page). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg
                 focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2
                 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-soft"
    >
      Skip to content
    </a>
  );
}
