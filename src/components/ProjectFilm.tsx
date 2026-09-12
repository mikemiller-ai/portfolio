"use client";

import { useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * The product film that leads a project detail page. Isolated as a Client
 * Component purely so the native <video> can report the first play to analytics
 * (`video_played`, location "detail"); the page around it stays a Server
 * Component. Markup mirrors the previous inline <video> so it renders the same.
 */
export function ProjectFilm({
  slug,
  src,
  poster,
  captions,
}: {
  slug: string;
  src: string;
  poster?: string;
  captions?: string;
}) {
  // Count one play per page view: <video> fires onPlay on every resume, but we
  // only care whether the film was started, not how often it was scrubbed.
  const played = useRef(false);

  return (
    <div className="max-w-3xl overflow-hidden rounded-2xl border border-border bg-black shadow-soft">
      <video
        className="aspect-video w-full"
        controls
        preload="metadata"
        playsInline
        poster={poster}
        onPlay={() => {
          if (played.current) return;
          played.current = true;
          trackEvent("video_played", { project: slug, location: "detail" });
        }}
      >
        <source src={src} type="video/mp4" />
        {captions ? (
          <track
            kind="captions"
            src={captions}
            srcLang="en"
            label="English"
            default
          />
        ) : null}
      </video>
    </div>
  );
}
