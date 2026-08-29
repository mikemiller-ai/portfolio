"use client";

import { useEffect, useReducer, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export type ShowcaseItem = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  liveUrl: string;
};

const ROTATE_MS = 4200;

/**
 * Auto-cycling, browser-framed preview of the live apps. Real screenshots, a
 * little motion, and a one-click path to each live demo. Pauses on hover/focus
 * and honors prefers-reduced-motion (no auto-advance).
 */
export function LiveShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, dispatch] = useReducer(
    (state: number, action: number | "next") =>
      action === "next" ? (state + 1) % items.length : action,
    0,
  );
  const paused = useRef(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || items.length < 2) return;
    const id = setInterval(() => {
      if (!paused.current) dispatch("next");
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[active];

  return (
    <div
      className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {/* Browser-framed, crossfading screenshot */}
      <div className="relative">
        <div className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-gradient-to-br from-accent/20 to-transparent blur-2xl" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft-lg">
          <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" aria-hidden />
            <span className="ml-3 truncate font-mono text-xs text-subtle">
              {current.liveUrl.replace("https://", "")}
            </span>
          </div>
          <div className="relative aspect-[16/10]">
            {items.map((item, i) => (
              <Image
                key={item.slug}
                src={item.image}
                alt={`${item.title} interface`}
                fill
                sizes="(min-width: 1024px) 60vw, 92vw"
                priority={i === 0}
                className={`object-cover object-top transition-opacity duration-700 ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Caption + controls */}
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
          Live on AWS
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {current.title}
        </h3>
        <p className="mt-2 text-muted-foreground">{current.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={current.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Open live demo
          </a>
          <Link href={`/projects/${current.slug}`} className="btn btn-ghost btn-sm">
            Case study
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {/* Selector tabs with progress */}
        <div className="mt-7 flex flex-col gap-1.5" role="tablist" aria-label="Live apps">
          {items.map((item, i) => (
            <button
              key={item.slug}
              role="tab"
              aria-selected={i === active}
              onClick={() => dispatch(i)}
              className={`group flex items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                i === active ? "text-foreground" : "text-subtle hover:text-muted-foreground"
              }`}
            >
              <span className="relative h-1 w-9 overflow-hidden rounded-full bg-border">
                <span
                  className={`absolute inset-y-0 left-0 rounded-full bg-primary transition-all ${
                    i === active ? "w-full" : "w-0"
                  }`}
                />
              </span>
              <span className="font-medium">{item.title.split(" — ")[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
