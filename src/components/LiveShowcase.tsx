"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Play } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export type ShowcaseItem = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  liveUrl: string;
  // When present, the browser frame plays this film on click (pausing the
  // carousel) instead of showing the static screenshot. Optional — items
  // without a film keep the crossfading screenshot.
  video?: string;
  videoPoster?: string;
  videoCaptions?: string;
};

const ROTATE_MS = 4200;

/**
 * Auto-cycling, browser-framed preview of the live apps. Real screenshots, a
 * little motion, and a one-click path to each live demo. Pauses on hover/focus
 * and honors prefers-reduced-motion (no auto-advance).
 *
 * An item that carries a `video` shows a play button over its screenshot;
 * clicking plays the film inline and stops the rotation until the film ends or
 * the viewer switches apps. Items without a film are unchanged, so the two
 * products that have films light up and the other two degrade cleanly.
 */
export function LiveShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, dispatch] = useReducer(
    (state: number, action: number | "next") =>
      action === "next" ? (state + 1) % items.length : action,
    0,
  );
  const paused = useRef(false);
  // `playing` drives the render; `playingRef` is read inside the interval
  // closure, which is created once and never sees state updates otherwise.
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const setPlay = (v: boolean) => {
    playingRef.current = v;
    setPlaying(v);
  };

  // Switching apps (tab click) stops any film that was playing.
  useEffect(() => {
    setPlay(false);
  }, [active]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || items.length < 2) return;
    const id = setInterval(() => {
      // A playing film owns the frame; never rotate out from under it.
      if (!paused.current && !playingRef.current) dispatch("next");
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[active];
  const hasFilm = Boolean(current.video);

  return (
    <div
      className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {/* Browser-framed, crossfading screenshot (or the film, on click) */}
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
          <div className="relative aspect-[16/10] bg-black">
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

            {/* The film plays over the screenshot for the active item. */}
            {hasFilm && playing ? (
              <video
                key={current.slug}
                className="absolute inset-0 z-20 h-full w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
                poster={current.videoPoster}
                onEnded={() => setPlay(false)}
              >
                <source src={current.video} type="video/mp4" />
                {current.videoCaptions ? (
                  <track
                    kind="captions"
                    src={current.videoCaptions}
                    srcLang="en"
                    label="English"
                    default
                  />
                ) : null}
              </video>
            ) : null}

            {/* Play affordance, only for an item that has a film. */}
            {hasFilm && !playing ? (
              <button
                type="button"
                onClick={() => {
                  trackEvent("video_played", {
                    project: current.slug,
                    location: "showcase",
                  });
                  setPlay(true);
                }}
                aria-label={`Play the ${current.title.split(" — ")[0]} film`}
                className="group/play absolute inset-0 z-20 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/25 focus-visible:bg-black/25 focus-visible:outline-none"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft-lg ring-1 ring-black/5 backdrop-blur transition-transform group-hover/play:scale-105">
                  <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden />
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[0.7rem] tracking-wide text-white backdrop-blur">
                  Watch the film
                </span>
              </button>
            ) : null}
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
              {item.video ? (
                <Play className="h-3 w-3 fill-current text-subtle" aria-hidden />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
