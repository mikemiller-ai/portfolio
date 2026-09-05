/**
 * File-based content loader for MDX in src/content/{projects,architectures,articles}.
 *
 * Each file has YAML frontmatter (parsed with gray-matter) plus an MDX body.
 * These helpers run on the server at build time (static generation).
 *
 * To add content, drop a new .mdx file into the relevant folder with valid
 * frontmatter — no code changes required. (See README.)
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  featured?: boolean;
  status: string;
  order?: number;
  categories: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  // A product film. When present, it plays in the home LiveShowcase (play on
  // click) and leads the project detail page. Optional — products without one
  // fall back to `coverImage`, so the surfaces degrade cleanly.
  video?: string;
  videoPoster?: string;
  videoCaptions?: string;
  accent?: string;
};

export type ArchitectureFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  useCase: string;
  complexity: "Foundational" | "Intermediate" | "Advanced";
  platform: string;
  order?: number;
  services: string[];
  interactive?: boolean;
};

export type ArticleFrontmatter = {
  title: string;
  slug: string;
  subtitle: string;
  date: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  relatedProjects?: string[];
};

export type ContentEntry<T> = {
  frontmatter: T;
  content: string;
  headings: Heading[];
};

export type Heading = { id: string; text: string; level: number };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extract h2/h3 headings from raw MDX to build a table of contents. */
export function extractHeadings(source: string): Heading[] {
  const headings: Heading[] = [];
  const lines = source.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[*`_]/g, "").trim();
      headings.push({ id: slugify(text), text, level });
    }
  }
  return headings;
}

function readDir<T>(subdir: string): ContentEntry<T>[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        frontmatter: data as T,
        content,
        headings: extractHeadings(content),
      };
    });
}

function bySlug<T extends { slug: string }>(
  entries: ContentEntry<T>[],
  slug: string,
): ContentEntry<T> | undefined {
  return entries.find((e) => e.frontmatter.slug === slug);
}

// ---- Projects -------------------------------------------------------------
export function getAllProjects(): ContentEntry<ProjectFrontmatter>[] {
  return readDir<ProjectFrontmatter>("projects").sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99),
  );
}
export function getProject(slug: string) {
  return bySlug(getAllProjects(), slug);
}
export function getFeaturedProjects() {
  return getAllProjects().filter((p) => p.frontmatter.featured);
}

// ---- Architectures --------------------------------------------------------
export function getAllArchitectures(): ContentEntry<ArchitectureFrontmatter>[] {
  return readDir<ArchitectureFrontmatter>("architectures").sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99),
  );
}
export function getArchitecture(slug: string) {
  return bySlug(getAllArchitectures(), slug);
}

// ---- Articles -------------------------------------------------------------
export function getAllArticles(): ContentEntry<ArticleFrontmatter>[] {
  return readDir<ArticleFrontmatter>("articles").sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1,
  );
}
export function getArticle(slug: string) {
  return bySlug(getAllArticles(), slug);
}
