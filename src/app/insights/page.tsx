import { Section, JsonLd } from "@/components/primitives";
import { FilterableGrid, type FilterableItem } from "@/components/FilterableGrid";
import { ArticleCard } from "@/components/cards";
import { getAllArticles } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Durable, thoughtful writing on enterprise AI, RAG, agentic systems, and getting AI from proof of concept to production — by Michael Miller Jr.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = getAllArticles();
  const filters = Array.from(
    new Set(articles.flatMap((a) => a.frontmatter.tags)),
  ).sort();

  const items: FilterableItem[] = articles.map((a) => ({
    key: a.frontmatter.slug,
    tags: a.frontmatter.tags,
    node: <ArticleCard article={a.frontmatter} />,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <Section leading>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Insights</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A few things worth writing down
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Not a high-frequency blog — a small set of durable pieces on the
            decisions that come up again and again in enterprise AI. Opinionated,
            practical, and honest about trade-offs.
          </p>
        </div>

        <div className="mt-12">
          <FilterableGrid items={items} filters={filters} columns="two" />
        </div>
      </Section>
    </>
  );
}
