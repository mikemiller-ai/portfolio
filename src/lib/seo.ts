/**
 * SEO helpers — metadata defaults and JSON-LD structured data builders.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

const defaultTitle =
  "Michael Miller Jr. | Senior AI Solutions Architect & Engineer";
const defaultDescription =
  "Michael Miller Jr. designs enterprise AI that holds up in production: RAG and agentic systems on AWS, with the guardrails, evaluation, and human-in-the-loop controls that make them safe to ship.";

/** Build page metadata with sensible OG/Twitter defaults. */
export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const resolvedTitle = title ? `${title} | ${siteConfig.shortName}` : defaultTitle;
  const resolvedDescription = description ?? defaultDescription;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImagePath,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${siteConfig.name} — ${siteConfig.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: siteConfig.ogImagePath,
          alt: `${siteConfig.name} — ${siteConfig.role}`,
        },
      ],
    },
  };
}

/** schema.org Person for the site owner. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cincinnati",
      addressRegion: "OH",
      addressCountry: "US",
    },
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github],
    knowsAbout: [
      "Artificial Intelligence",
      "Generative AI",
      "Retrieval-Augmented Generation",
      "Agentic AI",
      "Multi-Agent Systems",
      "AI Governance",
      "AWS",
      "Solutions Architecture",
      "Machine Learning",
    ],
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  date: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}${a.path}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
