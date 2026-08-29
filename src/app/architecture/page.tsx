import { Section, JsonLd } from "@/components/primitives";
import { FilterableGrid, type FilterableItem } from "@/components/FilterableGrid";
import { ArchitectureCard } from "@/components/cards";
import { getAllArchitectures } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Architecture Gallery",
  description:
    "A gallery of enterprise AI and cloud architecture patterns — each with the request flow, component reasoning, trade-offs, and when not to use it.",
  path: "/architecture",
});

export default function ArchitecturePage() {
  const architectures = getAllArchitectures();

  // Filter by platform and complexity together.
  const filters = Array.from(
    new Set([
      ...architectures.map((a) => a.frontmatter.platform),
      ...architectures.map((a) => a.frontmatter.complexity),
    ]),
  );

  const items: FilterableItem[] = architectures.map((a) => ({
    key: a.frontmatter.slug,
    tags: [a.frontmatter.platform, a.frontmatter.complexity],
    node: <ArchitectureCard arch={a.frontmatter} />,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Architecture", path: "/architecture" },
        ])}
      />
      <Section leading>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Architecture gallery</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Enterprise AI &amp; cloud patterns, explained honestly
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The conversation has moved on from &ldquo;can AI do this&rdquo; to
            &ldquo;can we trust it in production.&rdquo; The hard problems now are
            grounding answers in real sources, deciding how much autonomy an agent
            should have, evaluating a system that is non-deterministic by design,
            and doing all of it without a runaway cloud bill. These are the
            patterns I keep coming back to for exactly those problems.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Each one covers the request flow, why each component is there, the
            alternatives, and when <em>not</em> to use it. Start with{" "}
            <span className="font-medium text-foreground">Enterprise RAG</span> for the
            interactive walkthrough.
          </p>
        </div>

        <div className="mt-12">
          <FilterableGrid items={items} filters={filters} />
        </div>
      </Section>
    </>
  );
}
