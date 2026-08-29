import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, ArrowRight, Cpu } from "lucide-react";
import { JsonLd } from "@/components/primitives";
import { TableOfContents } from "@/components/TableOfContents";
import { InteractiveDiagram } from "@/components/InteractiveDiagram";
import { getAllArchitectures, getArchitecture } from "@/lib/content";
import { architectureDiagrams } from "@/data/architectureDiagrams";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return getAllArchitectures().map((a) => ({ slug: a.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const arch = getArchitecture(params.slug);
  if (!arch) return buildMetadata({ title: "Architecture not found" });
  return buildMetadata({
    title: arch.frontmatter.title,
    description: arch.frontmatter.summary,
    path: `/architecture/${arch.frontmatter.slug}`,
  });
}

const complexityTone: Record<string, string> = {
  Foundational: "text-emerald-600 dark:text-emerald-400",
  Intermediate: "text-amber-600 dark:text-amber-400",
  Advanced: "text-rose-600 dark:text-rose-400",
};

export default async function ArchitectureDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const arch = getArchitecture(params.slug);
  if (!arch) notFound();

  const { frontmatter, content, headings } = arch;
  const diagram = architectureDiagrams[frontmatter.slug];

  const { content: mdx } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  const all = getAllArchitectures();
  const index = all.findIndex((a) => a.frontmatter.slug === frontmatter.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Architecture", path: "/architecture" },
          { name: frontmatter.title, path: `/architecture/${frontmatter.slug}` },
        ])}
      />

      <article className="container-page py-12 sm:py-16">
        <Link
          href="/architecture"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Architecture gallery
        </Link>

        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className={cn("font-semibold", complexityTone[frontmatter.complexity])}>
              ● {frontmatter.complexity}
            </span>
            <span className="text-subtle">·</span>
            <span className="font-mono text-subtle">{frontmatter.platform}</span>
            {frontmatter.interactive ? (
              <span className="pill pill-accent ml-1">Interactive</span>
            ) : null}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {frontmatter.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {frontmatter.services.map((s) => (
              <span key={s} className="pill">
                <Cpu className="h-3 w-3" aria-hidden />
                {s}
              </span>
            ))}
          </div>
        </header>

        {/* Interactive diagram (when available) */}
        {diagram ? (
          <section className="mt-10" aria-label="Interactive architecture diagram">
            <InteractiveDiagram diagram={diagram} />
          </section>
        ) : null}

        {/* Body + sticky ToC */}
        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[1fr_16rem]">
          <div className="prose-content max-w-prose">{mdx}</div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>

        <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2" aria-label="More architectures">
          {prev ? (
            <Link href={`/architecture/${prev.frontmatter.slug}`} className="card card-hover group flex flex-col p-5">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-subtle">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                Previous
              </span>
              <span className="mt-1 font-medium text-foreground group-hover:text-primary">
                {prev.frontmatter.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/architecture/${next.frontmatter.slug}`}
              className="card card-hover group flex flex-col p-5 text-right sm:items-end"
            >
              <span className="inline-flex items-center gap-1 text-xs font-medium text-subtle">
                Next
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="mt-1 font-medium text-foreground group-hover:text-primary">
                {next.frontmatter.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </>
  );
}
