import { HelpCircle } from "lucide-react";
import { Section, SectionHeading, JsonLd } from "@/components/primitives";
import { Accordion, type AccordionItemData } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How I Think",
  description:
    "How Michael Miller Jr. reasons through enterprise AI decisions — the questions he asks before recommending an architecture, worked through real scenarios.",
  path: "/how-i-think",
});

// The lead scenario: the questions I ask before designing a chatbot.
const discoveryGroups: { label: string; questions: string[] }[] = [
  {
    label: "Frame the problem",
    questions: [
      "What business problem is the chatbot actually solving?",
      "Who are the users, and what do they need to walk away with?",
      "What would cause this project to be considered a failure?",
    ],
  },
  {
    label: "Understand the data",
    questions: [
      "What information sources are involved?",
      "Is the data structured, unstructured, or both?",
      "What are the security and privacy constraints on that data?",
    ],
  },
  {
    label: "Choose the approach",
    questions: [
      "Is retrieval (RAG) necessary, or is the knowledge small and static?",
      "Does the workflow actually require an agent, or is a fixed flow enough?",
      "What actions, if any, should the AI be permitted to take?",
    ],
  },
  {
    label: "Define quality & risk",
    questions: [
      "What level of accuracy is required, and who decides?",
      "How will responses be evaluated — by what and against what?",
      "Where should a human stay in the loop?",
    ],
  },
  {
    label: "Plan for operations",
    questions: [
      "What's the acceptable latency and expected usage volume?",
      "What is the operating budget?",
      "How will the solution be monitored once it's live?",
    ],
  },
];

const scenarios: AccordionItemData[] = [
  {
    id: "agent-vs-workflow",
    question: "The customer asks for an agent when a workflow may be enough",
    meta: "Scoping · Cost",
    content: (
      <div className="space-y-3">
        <p>
          &ldquo;Agent&rdquo; is the exciting word, but most requests describe a
          known sequence of steps — which is a workflow, not an agent. I&apos;ll
          ask them to walk me through the task concretely. If we can enumerate the
          steps in advance, a workflow is cheaper, faster, easier to test, and
          easier to trust.
        </p>
        <p>
          An agent earns its cost only when the path can&apos;t be known ahead of
          time — when a later step genuinely depends on what an earlier step
          discovers. I&apos;d rather ship a reliable workflow now and add agentic
          behavior where a specific decision actually needs it.
        </p>
      </div>
    ),
  },
  {
    id: "weak-rag",
    question: "A RAG system is returning weak answers",
    meta: "Debugging · Retrieval",
    content: (
      <div className="space-y-3">
        <p>
          I start at retrieval, not the model. The most common cause of weak RAG
          isn&apos;t the LLM — it&apos;s that the right passage never gets
          retrieved. I&apos;d check chunking, embeddings, and whether the query
          and documents are even in the same semantic space.
        </p>
        <p>
          Then I&apos;d build a small labeled evaluation set so &ldquo;weak&rdquo;
          becomes measurable. Only after retrieval is solid would I look at the
          generation prompt, add re-ranking or hybrid search, or consider a
          different model. Guessing without an eval set just moves the problem
          around.
        </p>
      </div>
    ),
  },
  {
    id: "poc-to-prod",
    question: "A proof of concept succeeded but isn't ready for production",
    meta: "Delivery · Governance",
    content: (
      <div className="space-y-3">
        <p>
          I&apos;d name the gap plainly: a POC proves the idea can work; production
          proves it can be operated safely. The distance between them is usually
          evaluation, monitoring, security, governance, cost at scale, and
          human-in-the-loop design — not model quality.
        </p>
        <p>
          I&apos;d turn that into a concrete checklist with the customer so the
          &ldquo;last 20%&rdquo; is visible and planned, rather than a vague
          promise that it&apos;s &ldquo;almost done.&rdquo;
        </p>
      </div>
    ),
  },
  {
    id: "realtime-for-batch",
    question: "A real-time system is proposed for a batch use case",
    meta: "Right-sizing · Cost",
    content: (
      <p>
        I&apos;d ask how the decision is actually made. If someone looks at it once
        a day, real-time infrastructure is standing cost for latency nobody uses.
        Real-time is worth it when the value of the data decays in minutes. Often
        the honest answer is that a scheduled batch job is cheaper, simpler, and
        entirely sufficient — and I&apos;d rather say so than sell complexity.
      </p>
    ),
  },
  {
    id: "biggest-model",
    question: "A customer wants to use the largest model for every task",
    meta: "Model selection · Cost",
    content: (
      <p>
        Bigger isn&apos;t automatically better, and it&apos;s definitely not
        cheaper. For grounded tasks, a smaller model with good retrieval usually
        beats a larger model without it. I&apos;d match the model to the task:
        reserve the biggest models for genuinely hard reasoning, and use smaller,
        faster, cheaper ones where they meet the accuracy bar — measured, not
        assumed.
      </p>
    ),
  },
  {
    id: "mcp-tools",
    question: "A team wants to expose internal tools to an LLM through MCP",
    meta: "Security · Agentic access",
    content: (
      <div className="space-y-3">
        <p>
          Good instinct, but every exposed tool is a new attack surface. I&apos;d
          scope credentials tightly, make tools least-privilege, and put an
          approval gate in front of anything destructive or irreversible.
        </p>
        <p>
          I&apos;d also treat any content that comes back from a tool as data, not
          instructions — prompt injection through tool results is a real risk. The
          goal is a secure, standards-based path to enterprise data, not a model
          with unrestricted keys.
        </p>
      </div>
    ),
  },
  {
    id: "no-metrics",
    question: "An AI initiative has no agreed-upon success metrics",
    meta: "Alignment · Evaluation",
    content: (
      <p>
        This is the highest-risk situation on the list, so I&apos;d stop and fix it
        first. Without an agreed definition of success, every demo is a debate and
        the project never &ldquo;lands.&rdquo; I&apos;d work with stakeholders to
        define what good looks like and how we&apos;ll measure it — before writing
        much code — so we&apos;re building toward a target instead of toward
        opinions.
      </p>
    ),
  },
];

export default function HowIThinkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How I Think", path: "/how-i-think" },
        ])}
      />

      <Section leading>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">How I think</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            The questions come before the architecture
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Anyone can list technologies. What actually matters in a customer
            conversation is judgment — knowing which questions to ask, and being
            willing to recommend the simpler answer. Here&apos;s how I reason
            through a few situations that come up constantly.
          </p>
        </div>
      </Section>

      {/* Lead scenario */}
      <div className="border-t border-border bg-card">
        <Section>
          <SectionHeading
            eyebrow="Worked scenario"
            title={"A customer asks for “an enterprise chatbot”"}
            intro="Before designing anything, I want to understand the problem well enough to know whether they even need what they asked for. These are the questions I'd work through — roughly in this order."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discoveryGroups.map((group, i) => (
              <Reveal key={group.label} delay={i * 50} as="article" className="card p-6">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  {String(i + 1).padStart(2, "0")} · {group.label}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.questions.map((q) => (
                    <li key={q} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" aria-hidden />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-pretty text-muted-foreground">
            Notice how few of these are about technology. By the time I&apos;ve
            worked through them, the architecture usually designs itself — and
            sometimes the answer is that they don&apos;t need a chatbot at all.
          </p>
        </Section>
      </div>

      {/* Additional scenarios */}
      <Section>
        <SectionHeading
          eyebrow="More situations"
          title="Judgment calls I make often"
          intro="Expand each one to see how I'd think it through. There's a consistent bias here: toward the simpler solution, clear success criteria, and keeping humans in control of consequential decisions."
        />
        <div className="mt-10 max-w-3xl">
          <Accordion items={scenarios} defaultOpenId="agent-vs-workflow" />
        </div>
      </Section>
    </>
  );
}
