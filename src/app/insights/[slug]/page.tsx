import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { JsonLd } from "@/components/primitives";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButton, PrintButton } from "@/components/SiteLinks";
import { ProjectCard, ArticleCard } from "@/components/cards";
import { getAllArticles, getArticle, getProject } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) return buildMetadata({ title: "Article not found" });
  return buildMetadata({
    title: article.frontmatter.title,
    description: article.frontmatter.subtitle,
    path: `/insights/${article.frontmatter.slug}`,
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const { frontmatter, content, headings } = article;

  const { content: mdx } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  // Related projects (explicit) + related articles (by shared tag).
  const relatedProjects = (frontmatter.relatedProjects ?? [])
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedArticles = getAllArticles()
    .filter((a) => a.frontmatter.slug !== frontmatter.slug)
    .filter((a) => a.frontmatter.tags.some((t) => frontmatter.tags.includes(t)))
    .slice(0, 2);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: frontmatter.title, path: `/insights/${frontmatter.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: frontmatter.title,
          description: frontmatter.subtitle,
          date: frontmatter.date,
          path: `/insights/${frontmatter.slug}`,
        })}
      />

      <article className="container-page py-12 sm:py-16">
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary no-print"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All insights
        </Link>

        <header className="mx-auto mt-6 max-w-prose">
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2.75rem]">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-pretty text-xl leading-relaxed text-muted-foreground">
            {frontmatter.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 text-sm text-subtle">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden />
              <time dateTime={frontmatter.date}>{formattedDate}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {frontmatter.readingTime}
            </span>
            <span className="ml-auto flex items-center gap-2 no-print">
              <ShareButton />
              <PrintButton />
            </span>
          </div>
        </header>

        {/* Body + ToC */}
        <div className="mx-auto mt-10 max-w-prose lg:grid lg:max-w-none lg:grid-cols-[16rem_minmax(0,44rem)_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
          <div className="prose-content">{mdx}</div>
          <div className="hidden lg:block" />
        </div>

        {/* Related */}
        {(relatedProjects.length > 0 || relatedArticles.length > 0) && (
          <div className="mx-auto mt-16 max-w-4xl border-t border-border pt-10 no-print">
            {relatedProjects.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-subtle">
                  Related projects
                </h2>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {relatedProjects.map((p) => (
                    <ProjectCard key={p.frontmatter.slug} project={p.frontmatter} />
                  ))}
                </div>
              </section>
            )}
            {relatedArticles.length > 0 && (
              <section className="mt-12">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-subtle">
                  Keep reading
                </h2>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {relatedArticles.map((a) => (
                    <ArticleCard key={a.frontmatter.slug} article={a.frontmatter} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </article>
    </>
  );
}
