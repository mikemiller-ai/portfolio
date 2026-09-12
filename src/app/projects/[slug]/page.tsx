import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { JsonLd } from "@/components/primitives";
import { TableOfContents } from "@/components/TableOfContents";
import { CoverArt } from "@/components/CoverArt";
import { ProjectFilm } from "@/components/ProjectFilm";
import { projectCoverKind } from "@/components/cards";
import { getAllProjects, getProject } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) return buildMetadata({ title: "Project not found" });
  return buildMetadata({
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    path: `/projects/${project.frontmatter.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { frontmatter, content, headings } = project;

  const { content: mdx } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  // Prev / next by declared order.
  const all = getAllProjects();
  const index = all.findIndex((p) => p.frontmatter.slug === frontmatter.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: frontmatter.title, path: `/projects/${frontmatter.slug}` },
        ])}
      />

      <article className="container-page py-12 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All projects
        </Link>

        {/* Header */}
        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill pill-accent">{frontmatter.status}</span>
            {frontmatter.categories.map((c) => (
              <span key={c} className="pill">
                {c}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {frontmatter.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {frontmatter.liveUrl ? (
              <a
                href={frontmatter.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                View live demo
              </a>
            ) : null}
            {frontmatter.githubUrl ? (
              <a
                href={frontmatter.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Github className="h-4 w-4" aria-hidden />
                View on GitHub
              </a>
            ) : null}
          </div>
        </header>

        <div className="mt-8">
          {frontmatter.video ? (
            // A product film leads the page. The film is a small Client
            // Component (ProjectFilm) so it can report the first play to
            // analytics; the poster is the product's landing-page screenshot
            // (its `coverImage`), so the thumbnail matches the one in the home
            // "SEE THEM LIVE" showcase, with the film's brand frame as fallback.
            <ProjectFilm
              slug={frontmatter.slug}
              src={frontmatter.video}
              poster={frontmatter.coverImage ?? frontmatter.videoPoster}
              captions={frontmatter.videoCaptions}
            />
          ) : frontmatter.coverImage ? (
            <a
              href={frontmatter.liveUrl ?? frontmatter.coverImage}
              target="_blank"
              rel="noopener noreferrer"
              className="group block max-w-3xl overflow-hidden rounded-2xl border border-border bg-muted shadow-soft"
            >
              <Image
                src={frontmatter.coverImage}
                alt={`${frontmatter.title} interface`}
                width={1600}
                height={1000}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </a>
          ) : (
            <CoverArt kind={projectCoverKind(frontmatter.categories)} className="max-w-3xl" />
          )}
        </div>

        {/* Body + sticky ToC */}
        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[1fr_16rem]">
          <div className="prose-content max-w-prose">{mdx}</div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>

        {/* Prev / next */}
        <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2" aria-label="More projects">
          {prev ? (
            <Link
              href={`/projects/${prev.frontmatter.slug}`}
              className="card card-hover group flex flex-col p-5"
            >
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
              href={`/projects/${next.frontmatter.slug}`}
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
