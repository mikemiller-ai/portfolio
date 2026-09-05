import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Section, SectionHeading } from "@/components/primitives";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ExpertiseGrid } from "@/components/ExpertiseGrid";
import { ProjectCard } from "@/components/cards";
import { LiveShowcase, type ShowcaseItem } from "@/components/LiveShowcase";
import { Reveal } from "@/components/Reveal";
import { BookCallButton, ResumeButton } from "@/components/SiteLinks";
import { getFeaturedProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata();

// Punchy one-liners for the animated showcase (shorter than the case-study summary).
const SHOWCASE_TAGLINES: Record<string, string> = {
  resolveiq:
    "Turns high-risk cases into cited, evidence-backed recommendations, with a human on every decision.",
  trustresponse:
    "A governed multi-agent system that catches unsupported commitments before they ship.",
  archiq:
    "An AWS Solutions Architect study platform with a grounded AI tutor that answers only from its sources.",
  careerops:
    "Keeps the whole state of a job search continuously understood, ranks what deserves attention, and leaves the decision to you.",
};

export default function HomePage() {
  const featured = getFeaturedProjects();

  const showcaseItems: ShowcaseItem[] = featured
    .filter((p) => p.frontmatter.coverImage && p.frontmatter.liveUrl)
    .map((p) => ({
      slug: p.frontmatter.slug,
      title: p.frontmatter.title,
      tagline:
        SHOWCASE_TAGLINES[p.frontmatter.slug] ?? p.frontmatter.summary,
      image: p.frontmatter.coverImage as string,
      liveUrl: p.frontmatter.liveUrl as string,
      video: p.frontmatter.video,
      videoPoster: p.frontmatter.videoPoster,
      videoCaptions: p.frontmatter.videoCaptions,
    }));

  return (
    <>
      <Hero />

      {/* Live app showcase */}
      {showcaseItems.length > 0 ? (
        <div className="border-b border-border bg-card">
          <Section leading>
            <SectionHeading
              eyebrow="See them live"
              title="Four AWS apps you can open right now"
              intro="Not slideware. Each is a working, AWS-native product you can click through, built to show how I handle grounding, agents, trust, and the jump from prototype to production."
            />
            <div className="mt-10">
              <LiveShowcase items={showcaseItems} />
            </div>
          </Section>
        </div>
      ) : null}

      {/* Featured case studies */}
      <Section id="featured">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="The case studies"
            title="The thinking behind each build"
            intro="Every project leads with the business problem and is honest about the trade-offs, the governance, and the cost."
          />
          <Link
            href="/projects"
            className="btn btn-secondary btn-sm hidden sm:inline-flex"
          >
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.frontmatter.slug} delay={i * 70}>
              <ProjectCard project={p.frontmatter} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How I work */}
      <div className="border-y border-border bg-card">
        <Section>
          <SectionHeading
            eyebrow="How I work"
            title="A repeatable path from business problem to adopted solution"
            intro="The same approach whether it's a proof of concept or a production system — the goal is always something a team can confidently own."
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </Section>
      </div>

      {/* Expertise */}
      <Section>
        <SectionHeading
          eyebrow="Expertise"
          title="Depth across the AI and data stack — and the customer conversation"
          intro="Grouped by where it matters: the models, the data foundation, the cloud they run on, and the work of helping people adopt them."
        />
        <div className="mt-10">
          <ExpertiseGrid />
        </div>
      </Section>

      {/* Personal intro */}
      <div className="border-t border-border bg-card">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading eyebrow="A little about me" title="I work where the model meets production reality" />
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                My work sits at the point where an AI idea has to become something
                a team can actually run. I like designing RAG and agentic systems,
                and I spend most of my attention on the parts that decide whether
                they ship: grounding, guardrails, evaluation, and keeping a human
                on the decisions that count.
              </p>
              <p>
                I have built production ML systems, led a data science team, and
                spent the last stretch customer-facing. Lately I have been building
                my own AWS applications, which means I care as much about whether a
                solution gets adopted, and stays safe, as whether it works in a demo.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/about" className="btn btn-secondary btn-md">
                  More about me
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/how-i-think" className="btn btn-ghost btn-md">
                  How I think through problems
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Final CTA — dark atmospheric, bookends the hero */}
      <Section>
        <div className="evidence-dark rounded-3xl px-6 py-16 text-center sm:px-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s talk about your AI and data challenges
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Whether you&apos;re hiring, exploring a proof of concept, or trying
              to get an AI initiative to production — I&apos;m glad to help think
              it through.
            </p>
            {/* Two choices only. A closing CTA should ask for one thing, and
                these cover the two states a reader is actually in: ready to
                talk, or wanting to evaluate first. "Explore Projects" sent
                people back up a page they had just scrolled, and LinkedIn is
                already in both the nav and the footer. */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BookCallButton className="btn-evidence border-transparent" source="home-cta" />
              <ResumeButton variant="ghost" label="View Resume" className="btn-on-dark" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
