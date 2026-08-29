import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Section, JsonLd } from "@/components/primitives";
import { ContactForm } from "@/components/ContactForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ResumeButton } from "@/components/SiteLinks";
import { siteConfig } from "@/data/siteConfig";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Michael Miller Jr. about AI, data, and solutions architecture roles, consulting, speaking, or professional networking.",
  path: "/contact",
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/mikemillerai",
    href: siteConfig.socials.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "mikemiller-ai",
    href: siteConfig.socials.github,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Section leading>
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Let&apos;s start a conversation
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Whether you&apos;re hiring for a senior AI solutions architect or
            engineer, exploring a proof of concept, or just want to compare notes
            on getting AI to production, I&apos;d be glad to hear from you.
          </p>
        </div>

        {/* Booking first: it is the higher-intent action, and anyone who would
            rather write than commit to a slot still has the form below. */}
        <div id="book" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">
            Book a call
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Pick a time that suits you and you&apos;ll get a calendar invite
            straight away. Times shown are in your own timezone.
          </p>
          <CalendlyEmbed className="mt-6" />
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">
            Prefer to write first?
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Reach me directly, or send a message and I&apos;ll come back to you.
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: direct channels */}
          <div className="space-y-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-4 p-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <c.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium uppercase tracking-wide text-subtle">
                    {c.label}
                  </span>
                  <span className="block truncate text-sm font-medium text-fg">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}

            <div className="card flex items-center gap-4 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-muted">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-subtle">
                  Location
                </span>
                <span className="block text-sm font-medium text-fg">
                  {siteConfig.location}
                </span>
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-surface-2 p-5">
              <p className="text-sm font-medium text-fg">Prefer the resume?</p>
              <p className="mt-1 text-sm text-muted">
                No form required. Download it directly.
              </p>
              <ResumeButton size="sm" variant="secondary" className="mt-4" />
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
