import { Section, JsonLd } from "@/components/primitives";
import { FilterableGrid, type FilterableItem } from "@/components/FilterableGrid";
import { ProjectCard } from "@/components/cards";
import { getAllProjects } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Featured projects from Michael Miller Jr. — enterprise AI systems, Snowflake and RAG reference libraries, and cloud architecture patterns.",
  path: "/projects",
});

// Canonical filter order (spec §13). Only filters present in content are shown.
const FILTER_ORDER = [
  "AI",
  "Generative AI",
  "Agentic AI",
  "Multi-Agent",
  "RAG",
  "Machine Learning",
  "MCP",
  "Human-in-the-Loop",
  "Governance",
  "Multi-Tenant SaaS",
  "Education",
  "Snowflake",
  "AWS",
  "Data Architecture",
  "Customer Solutions",
];

export default function ProjectsPage() {
  const projects = getAllProjects();

  const present = new Set(projects.flatMap((p) => p.frontmatter.categories));
  const filters = FILTER_ORDER.filter((f) => present.has(f));

  const items: FilterableItem[] = projects.map((p) => ({
    key: p.frontmatter.slug,
    tags: p.frontmatter.categories,
    node: <ProjectCard project={p.frontmatter} />,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <Section leading>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Featured projects</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Four live AWS apps, not slideware
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Each of these is a working, AWS-native product you can open and try.
            They lead with the business problem and are honest about the
            trade-offs, and together they cover grounding, agents, trust, and the
            jump from prototype to production. Filter by focus area below.
          </p>
        </div>

        <div className="mt-12">
          <FilterableGrid items={items} filters={filters} columns="two" />
        </div>
      </Section>
    </>
  );
}
