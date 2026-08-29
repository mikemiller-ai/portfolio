import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { Section, SectionHeading, JsonLd } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { ResumeButton, PrintButton } from "@/components/SiteLinks";
import { roles, careerSummary, education } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { siteConfig } from "@/data/siteConfig";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "The professional history of Michael Miller Jr. — solutions engineering, data science leadership, and production ML across enterprise accounts.",
  path: "/experience",
});

const competencies: { title: string; skills: string[] }[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      "Machine Learning",
      "Neural Networks",
      "LLMs",
      "RAG",
      "Agentic AI",
      "MLOps",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "XGBoost",
      "LangChain",
      "LangGraph",
      "Forecasting",
    ],
  },
  {
    title: "Data Platforms",
    skills: [
      "Snowflake",
      "Databricks",
      "MLflow",
      "Apache Spark",
      "BigQuery",
      "Pinecone",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    title: "Cloud & Tooling",
    skills: [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "Serverless",
      "Infrastructure as Code",
      "Docker",
      "Git",
      "GitHub Actions",
    ],
  },
  {
    title: "Languages & BI",
    skills: ["Python", "R", "SQL", "Bash", "Tableau", "Power BI", "Plotly"],
  },
];

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />

      <Section leading>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Experience &amp; resume</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A decade of building, leading, and advising on AI and data
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{careerSummary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ResumeButton label="Download Resume" />
            <ResumeButton variant="secondary" label="View PDF" />
            <PrintButton label="Print résumé" />
          </div>
          <p className="mt-3 text-sm text-subtle">
            This page is a curated overview — the PDF resume has the full detail.
          </p>
        </div>
      </Section>

      {/* Timeline */}
      <div className="border-t border-border bg-card">
        <Section>
          <SectionHeading eyebrow="Career timeline" title="Where I've worked and what changed because of it" />
          <ol className="mt-10 space-y-8 border-l border-border pl-6 sm:pl-8">
            {roles.map((role, i) => (
              <Reveal
                as="li"
                key={`${role.company}-${role.title}`}
                delay={i * 40}
                className="relative"
              >
                <span
                  className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-primary sm:-left-[2.1rem]"
                  aria-hidden
                />
                <div className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {role.title}
                    </h3>
                    <span className="font-mono text-sm text-subtle">
                      {role.start} – {role.end}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-medium text-primary">{role.company}</span>
                    <span className="text-subtle">·</span>
                    <span className="text-muted-foreground">{role.location}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wide text-subtle">
                    {role.focus}
                  </p>

                  <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {role.summary}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {role.technologies.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>
      </div>

      {/* Certifications */}
      <Section>
        <SectionHeading
          eyebrow="Certifications"
          title="Validated across the platforms I recommend"
          intro="Credentials in the exact stack I design on — AI, Snowflake, and machine learning."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 60} as="article" className="card flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Award className="h-5 w-5" aria-hidden />
                </span>
                <span className="pill">{cert.status}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground">
                {cert.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
              <p className="mt-auto pt-4 font-mono text-xs text-subtle">{cert.date}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Competencies + education */}
      <div className="border-t border-border bg-card">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <SectionHeading eyebrow="Core competencies" title="Grouped by where it fits" />
              <div className="mt-8 space-y-6">
                {competencies.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
                      {group.title}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <li key={skill} className="pill">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Education" title="Foundations" />
              <div className="mt-8 space-y-4">
                {education.map((ed) => (
                  <div key={ed.school} className="card p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                        <GraduationCap className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {ed.school}
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                      {ed.degrees.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <a
                  href={siteConfig.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Open the full PDF resume
                </a>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
