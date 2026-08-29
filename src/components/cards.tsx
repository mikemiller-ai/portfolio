import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, ExternalLink, Github, Layers } from "lucide-react";
import type {
  ArchitectureFrontmatter,
  ArticleFrontmatter,
  ProjectFrontmatter,
} from "@/lib/content";
import { CoverArt, type CoverKind } from "./CoverArt";
import { cn } from "@/lib/cn";

/** Derive the abstract cover motif from a project's categories. */
export function projectCoverKind(categories: string[]): CoverKind {
  const c = categories.map((x) => x.toLowerCase());
  if (c.some((x) => x.includes("rag"))) return "rag";
  if (c.some((x) => x.includes("agentic"))) return "agentic";
  if (c.some((x) => x.includes("machine learning"))) return "ml";
  return "playbook";
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className="pill pill-accent absolute right-3 top-3 backdrop-blur">
      {status}
    </span>
  );
}

export function ProjectCard({ project }: { project: ProjectFrontmatter }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative p-3">
        {project.coverImage ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={project.coverImage}
              alt={`${project.title} interface`}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <CoverArt kind={projectCoverKind(project.categories)} />
        )}
        <StatusPill status={project.status} />
        {project.liveUrl ? (
          <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[0.7rem] font-medium text-white shadow-soft backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
            Live demo
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5 pt-2">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.categories.slice(0, 3).map((cat) => (
            <span key={cat} className="pill">
              {cat}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        <div className="mt-4 rounded-lg border border-border bg-muted/60 p-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
            Problem
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{project.problem}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              Live demo
            </a>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((t) => (
                <span key={t} className="font-mono text-xs text-subtle">
                  {t}
                </span>
              ))}
            </div>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            Case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}

const complexityTone: Record<ArchitectureFrontmatter["complexity"], string> = {
  Foundational: "text-emerald-600 dark:text-emerald-400",
  Intermediate: "text-amber-600 dark:text-amber-400",
  Advanced: "text-rose-600 dark:text-rose-400",
};

function archCoverKind(services: string[]): CoverKind {
  const s = services.join(" ").toLowerCase();
  if (s.includes("stream") || s.includes("kinesis")) return "streaming";
  if (s.includes("agent")) return "agentic";
  if (s.includes("vector") || s.includes("search")) return "rag";
  if (s.includes("sagemaker") || s.includes("ml")) return "ml";
  return "generic";
}

export function ArchitectureCard({
  arch,
}: {
  arch: ArchitectureFrontmatter;
}) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="p-3">
        <CoverArt kind={archCoverKind(arch.services)} compact />
      </div>
      <div className="flex flex-1 flex-col p-5 pt-2">
        <div className="flex items-center gap-2">
          <span className={cn("text-xs font-semibold", complexityTone[arch.complexity])}>
            ● {arch.complexity}
          </span>
          <span className="text-subtle">·</span>
          <span className="font-mono text-xs text-subtle">{arch.platform}</span>
          {arch.interactive ? (
            <span className="pill pill-accent ml-auto !py-0.5 text-[0.65rem]">
              Interactive
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={`/architecture/${arch.slug}`}
            className="after:absolute after:inset-0"
          >
            {arch.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{arch.useCase}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {arch.services.slice(0, 4).map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-primary">
          <Layers className="h-4 w-4" aria-hidden />
          <span>Explore architecture</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: ArticleFrontmatter }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-subtle">
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {article.readingTime}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
        <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {article.subtitle}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
