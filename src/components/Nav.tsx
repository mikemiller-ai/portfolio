"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { primaryNav, siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeButton, SocialLinks } from "./SiteLinks";
import { BrandLogo } from "./BrandLogo";

function BrandMark() {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center rounded-lg py-1 pr-2 text-foreground"
      aria-label={`${siteConfig.name} — home`}
    >
      <BrandLogo className="h-6 w-auto transition-transform group-hover:scale-[1.03] sm:h-7" />
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // On the homepage the hero is dark (Evidence theme); at the top the nav sits
  // over it, so it goes transparent with light text (handled in globals.css).
  const overHero = pathname === "/" && !scrolled && !open;

  // Close the mobile drawer on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Subtle shadow/border once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        data-over-hero={overHero ? "true" : undefined}
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        overHero
          ? "border-transparent bg-transparent"
          : scrolled
            ? "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
            : "border-transparent bg-background",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <BrandMark />

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                  isActive(pathname, item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-1.5 md:flex">
            <SocialLinks />
            <ThemeToggle />
          </div>
          <div className="hidden lg:block">
            <ResumeButton size="sm" label="Resume" />
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="btn btn-ghost h-9 w-9 !px-0 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </nav>
      </header>

      {/* Mobile drawer — rendered OUTSIDE the header. A scrolled header has
          backdrop-filter, which would otherwise become the containing block for
          this `fixed` overlay and trap it inside the 64px header box. */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" id="mobile-menu">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col border-l border-border bg-card shadow-soft-lg">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <span className="text-sm font-semibold">Menu</span>
              <button
                type="button"
                className="btn btn-ghost h-9 w-9 !px-0"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-col gap-1 p-4">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium transition-colors",
                      isActive(pathname, item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-4 border-t border-border p-5">
              <ResumeButton size="md" className="w-full" />
              <div className="flex items-center justify-between">
                <SocialLinks showEmail />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
