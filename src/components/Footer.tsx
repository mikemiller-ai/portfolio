import Link from "next/link";
import { MapPin } from "lucide-react";
import { primaryNav, siteConfig } from "@/data/siteConfig";
import { SocialLinks, ResumeButton, BookCallButton } from "./SiteLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto]">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-fg">
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Designing enterprise AI that holds up in production: RAG and agentic
              systems on AWS, built with trust, evaluation, and governance.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-subtle">
              <MapPin className="h-4 w-4" aria-hidden />
              {siteConfig.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
              Connect
            </p>
            <BookCallButton size="sm" variant="secondary" source="footer" />
            <ResumeButton size="sm" variant="secondary" />
            <SocialLinks showEmail className="-ml-2" />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js · Hosted on AWS</p>
        </div>
      </div>
    </footer>
  );
}
