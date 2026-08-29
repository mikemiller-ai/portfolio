/**
 * Central place for personal details, links, and navigation.
 * Update these values to change identity/contact info across the whole site.
 * (See README "Update personal information" and "Update social links".)
 */

export const siteConfig = {
  name: "Michael Miller Jr.",
  shortName: "Michael Miller",
  initials: "MM",
  // Headline + value proposition used on the home hero and in metadata.
  role: "Senior AI Solutions Architect & Engineer",
  tagline:
    "I design enterprise AI that holds up in production: RAG and agentic systems with the guardrails, evaluation, and human-in-the-loop controls that make them safe to ship.",
  summary:
    "Senior AI solutions architect and engineer with 10+ years across AI/ML and cloud data platforms. I build RAG and multi-agent systems on AWS, and I care as much about trust, governance, and evaluation as I do about the model.",

  // Privacy-conscious: general location only, no phone number or home address.
  location: "Cincinnati, Ohio area",

  email: "mike.millerjr16@gmail.com",

  // Canonical site URL (falls back to localhost during development).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikemiller.ai",

  // Documented single-file replacement points (see README).
  // These live at stable urls, so replacing the file is not enough on its own:
  // browsers that already downloaded the old copy would keep serving it. Bump
  // the ?v= whenever the file behind one of these changes.
  resumePath: "/resume/michael-miller-resume.pdf?v=2026-08",
  headshotPath: "/images/michael-miller-headshot.jpg",
  ogImagePath: "/images/og-image.png",

  // Scheduling. Embedded on /contact and linked from the hero/footer.
  //
  // The options are listed here rather than letting Calendly render its own
  // list: Calendly's inline widget only self-sizes for a SINGLE event type, so
  // embedding the profile page collapses the iframe to ~150px and hides the
  // choices. Rendering the picker here keeps all three visible, in site styling.
  // `slug` must match the event's Calendly url (it is not derived from `label`).
  calendlyUrl: "https://calendly.com/mike-millerjr16",
  calendlyEvents: [
    {
      label: "30 minutes",
      slug: "30min",
      blurb: "An intro, a screen, or a quick question.",
    },
    {
      label: "45 minutes",
      slug: "45-minute-meeting",
      blurb: "An interview or a technical discussion.",
    },
    {
      label: "60 minutes",
      slug: "60-minute-meeting",
      blurb: "A deep dive or a working session.",
    },
  ],

  socials: {
    linkedin: "https://www.linkedin.com/in/mikemillerjr16",
    github: "https://github.com/mikemillerjr16",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Architecture", href: "/architecture" },
  { label: "How I Think", href: "/how-i-think" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];
