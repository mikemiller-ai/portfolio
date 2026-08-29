"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Check, Download, Github, Link2, Linkedin, Mail, Printer } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/** Resume download/view link. Opens the PDF in a new tab; no gate. */
export function ResumeButton({
  variant = "primary",
  size = "md",
  label = "Download Resume",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.resumePath}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("resume_downloaded", { source: label })}
      className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
    >
      <Download className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}

/**
 * Sends people to the scheduler on /contact rather than straight to Calendly:
 * the page keeps the message form alongside it for anyone who would rather
 * write than book, and it keeps the visitor on the site.
 */
export function BookCallButton({
  variant = "secondary",
  size = "md",
  label = "Book a call",
  className,
  source = "unknown",
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  label?: string;
  className?: string;
  source?: string;
}) {
  return (
    <Link
      href="/contact#book"
      onClick={() => trackEvent("booking_opened", { source })}
      className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
    >
      <CalendarDays className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  );
}

/**
 * Prints the actual résumé PDF (not the web page). Loads the same-origin PDF in
 * a hidden iframe and opens the print dialog for it; falls back to opening the
 * PDF in a new tab if a browser blocks iframe printing (e.g. some Safari builds).
 */
export function PrintButton({
  label = "Print résumé",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const printResume = () => {
    document.getElementById("resume-print-frame")?.remove();
    const iframe = document.createElement("iframe");
    iframe.id = "resume-print-frame";
    iframe.setAttribute("aria-hidden", "true");
    // Real page dimensions (kept off-screen, not 0-size/hidden) so the PDF fully
    // paginates and ALL pages print — a 0-height iframe clips to page 1 in Chrome.
    iframe.style.cssText =
      "position:fixed;top:0;left:-10000px;width:816px;height:1056px;border:0;";
    iframe.src = siteConfig.resumePath;
    iframe.onload = () => {
      // Small delay so the PDF viewer finishes laying out all pages first.
      window.setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          window.open(siteConfig.resumePath, "_blank", "noopener,noreferrer");
        }
      }, 300);
    };
    document.body.appendChild(iframe);
    trackEvent("resume_printed");
  };

  return (
    <button
      type="button"
      onClick={printResume}
      className={cn("btn btn-ghost btn-md no-print", className)}
    >
      <Printer className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}

/** Copies the current page URL to the clipboard (with a fallback). */
export function ShareButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — no-op.
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      className={cn("btn btn-secondary btn-sm no-print", className)}
      aria-label="Copy link to this page"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" aria-hidden />
          Share
        </>
      )}
    </button>
  );
}

/** Row of social icon links (LinkedIn, GitHub) with analytics hooks. */
export function SocialLinks({
  className,
  showEmail = false,
}: {
  className?: string;
  showEmail?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <a
        href={siteConfig.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile (opens in a new tab)"
        onClick={() => trackEvent("linkedin_clicked")}
        className="btn btn-ghost h-9 w-9 !px-0"
      >
        <Linkedin className="h-[1.15rem] w-[1.15rem]" aria-hidden />
      </a>
      <a
        href={siteConfig.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile (opens in a new tab)"
        onClick={() => trackEvent("github_clicked")}
        className="btn btn-ghost h-9 w-9 !px-0"
      >
        <Github className="h-[1.15rem] w-[1.15rem]" aria-hidden />
      </a>
      {showEmail ? (
        <a
          href={`mailto:${siteConfig.email}`}
          aria-label={`Email ${siteConfig.name}`}
          className="btn btn-ghost h-9 w-9 !px-0"
        >
          <Mail className="h-[1.15rem] w-[1.15rem]" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}
