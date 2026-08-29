import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Layers, Lightbulb, ShieldCheck, Target, Wrench } from "lucide-react";
import { Section, SectionHeading, JsonLd } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { ResumeButton } from "@/components/SiteLinks";
import { siteConfig } from "@/data/siteConfig";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Michael Miller Jr. bridges technical teams and business leaders — building and adopting AI and data solutions from proof of concept to production.",
  path: "/about",
});

const bridges = [
  "Technical teams and business leaders",
  "Strategy and execution",
  "Proofs of concept and production systems",
  "Customer goals and architectural decisions",
];

const beliefs = [
  {
    icon: ShieldCheck,
    title: "An AI system earns trust by what it refuses to do",
    body: "The interesting part of a RAG or agent system is not how much it answers. It is whether it declines, cites, and escalates when the evidence is thin. That restraint is what makes it safe to ship.",
  },
  {
    icon: Compass,
    title: "Keep a human on the decision that matters",
    body: "Agents can plan, retrieve, and draft. When an action touches a real customer or a real commitment, a person should still hold the approval. That line is a design choice, not an afterthought.",
  },
  {
    icon: Target,
    title: "Start with the business problem",
    body: "Technology decisions should begin with the outcome that matters, not the model that is exciting this quarter. The architecture follows the problem, not the other way around.",
  },
  {
    icon: Lightbulb,
    title: "Ground the answer in something you can point to",
    body: "A confident, fluent, wrong answer is the failure mode that kills enterprise AI. Retrieval before generation, with citations, is how you keep a system honest.",
  },
  {
    icon: Layers,
    title: "Evaluation is the real engineering",
    body: "Non-deterministic systems need evals, guardrails, and monitoring more than deterministic ones do. Making governance measurable is most of the work, and the model call is the easy part.",
  },
  {
    icon: Wrench,
    title: "Design for the team that owns it",
    body: "The best solution is the one a team can confidently operate after I am gone, not the cleverest one I can build.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <Section leading>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <div>
            <p className="eyebrow mb-3">About</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              I build AI that has to earn its trust
            </h1>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;m {siteConfig.name}, a senior AI solutions architect and
                engineer based in the {siteConfig.location}. Most of my work now
                lives in the same place: retrieval-augmented systems, agents, and
                agentic workflows, and the guardrails, evaluation, and human
                approval that decide whether any of it is safe to put in front of
                a real customer.
              </p>
              <p>
                My path into this is a little unusual. I started by building
                things. I spent years as a data scientist and ML engineer shipping
                forecasting and optimization models into production, then led a
                data science team, and moved into a customer-facing role because I
                liked the part of the job that was about helping people make good
                technical decisions. That history is why I care less about the
                demo and more about what happens when the system meets real data,
                real latency, and a real audit.
              </p>
              <p>
                Lately I have been building it, not just advising on it. ResolveIQ,
                TrustResponse, and ArchIQ are live AWS applications where I worked
                through the questions that actually matter for enterprise AI: how a
                system cites its sources, when it should refuse to answer, where a
                human stays in control, and how you keep a public AI feature from
                becoming a surprise bill.
              </p>
            </div>
          </div>

          <Reveal className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <Image
                src={siteConfig.headshotPath}
                alt={`Portrait of ${siteConfig.name}`}
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 26rem, 90vw"
                className="aspect-square w-full object-cover"
              />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="text-subtle">Experience</dt>
                <dd className="mt-1 text-2xl font-semibold text-foreground">10+ yrs</dd>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="text-subtle">Revenue impact</dt>
                <dd className="mt-1 text-2xl font-semibold text-foreground">$35M+</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* What I bridge */}
      <div className="border-y border-border bg-card">
        <Section>
          <SectionHeading
            eyebrow="What I do"
            title="I bridge the gaps where AI projects usually stall"
            intro="Enterprise AI rarely fails on the math. It fails in the seams — between the people who understand the business and the people who understand the systems. That seam is where I'm most useful."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {bridges.map((b, i) => (
              <Reveal
                key={b}
                delay={i * 60}
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5"
              >
                <span className="font-mono text-sm font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.95rem] font-medium text-foreground">{b}</span>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* What I believe */}
      <Section>
        <SectionHeading
          eyebrow="What I believe"
          title="A few principles I keep coming back to"
          intro="These aren't slogans — they're the checks I run on my own recommendations before I put them in front of a customer."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beliefs.map((belief, i) => (
            <Reveal key={belief.title} delay={i * 50} as="article" className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <belief.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                {belief.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{belief.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Personal touch */}
      <div className="border-t border-border bg-card">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading eyebrow="Away from the whiteboard" title="What I'm like to work with" />
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a compulsive learner — I keep a running set of reference
                libraries and technical playbooks, partly because writing
                something down is how I know I actually understand it, and partly
                because I like having a good answer ready when a customer asks.
              </p>
              <p>
                I genuinely enjoy teaching and explaining architecture. Some of my
                favorite moments are watching a concept click for a room of
                engineers, or helping a business leader feel confident about a
                decision they were nervous about. If I can make a hard idea feel
                approachable without hiding its complexity, I&apos;ve done my job.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/experience" className="btn btn-secondary btn-md">
                  See my experience
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <ResumeButton variant="ghost" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
