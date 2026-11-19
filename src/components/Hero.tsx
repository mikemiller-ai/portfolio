import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { capabilities } from "@/data/expertise";
import { ResumeButton } from "./SiteLinks";

export function Hero() {
  // Split the role so the second half gets the Evidence gradient for a bit of pop.
  const role = siteConfig.role;
  const splitAt = role.indexOf("Architect");
  const roleHead = splitAt > 0 ? role.slice(0, splitAt) : role;
  const roleGrad = splitAt > 0 ? role.slice(splitAt) : "";

  return (
    <>
      {/* Evidence hero: dark, atmospheric (glow + faint grid), always dark
          regardless of the light/dark theme — the signature "pop".

          `-mt-16` pulls the hero up behind the 4rem sticky header so the dark
          background runs all the way to the top of the page. That is what the
          nav's transparent "over hero" state (see Nav.tsx) assumes — without
          it the nav's light text sits on the light page background. The extra
          top padding below restores the same clearance under the nav. */}
      <section className="evidence-dark -mt-16">
        <div className="container-page grid items-center gap-12 pb-20 pt-32 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
          <div>
            {/* What the site is, in the mono eyebrow style used on the credibility
                strip and inner pages. Plain text rather than a pill so it wraps
                cleanly on narrow screens. */}
            <p className="font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-slate-400">
              {siteConfig.portfolioDescriptor}
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {roleHead}
              {roleGrad ? <span className="evidence-grad">{roleGrad}</span> : null}
            </h1>

            {/* Current position: deliberately quieter than the headline. */}
            <p className="mt-4 text-base font-medium text-slate-200 sm:text-lg">
              {siteConfig.currentPosition.title} at {siteConfig.currentPosition.company}
            </p>

            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-slate-300">
              {siteConfig.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn btn-evidence btn-md">
                Explore My Work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <ResumeButton variant="ghost" label="Download Résumé" className="btn-on-dark" />
            </div>

            <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-400">
              <MapPin className="h-4 w-4" aria-hidden />
              {siteConfig.location}
            </p>
          </div>

          {/* Headshot with a soft glow + gradient frame so it lifts off the dark. */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(60% 60% at 62% 30%, rgba(129,140,248,.45), transparent 70%)",
                filter: "blur(10px)",
              }}
              aria-hidden
            />
            <div
              className="relative rounded-2xl p-px shadow-2xl"
              style={{
                background:
                  "linear-gradient(150deg, rgba(255,255,255,.3), rgba(255,255,255,.05) 45%, rgba(129,140,248,.5))",
              }}
            >
              <Image
                src={siteConfig.headshotPath}
                alt={`Portrait of ${siteConfig.name}`}
                width={1200}
                height={1200}
                priority
                sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 90vw"
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip — the first light element of the body. */}
      <div className="border-b border-border bg-card">
        <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">
            Focus areas
          </span>
          {capabilities.map((cap) => (
            <span key={cap} className="text-sm font-medium text-muted-foreground">
              {cap}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
