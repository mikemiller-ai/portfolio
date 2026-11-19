/**
 * Central place for personal details, links, and navigation.
 * Update these values to change identity/contact info across the whole site.
 * (See README "Update personal information" and "Update social links".)
 */

export const siteConfig = {
  name: "Michael Miller",
  shortName: "Michael Miller",
  initials: "MM",
  // Headline + value proposition used on the home hero and in metadata.
  // This is a professional identity, not a job title. The actual title lives
  // in currentPosition and is the only thing the structured data calls a jobTitle.
  role: "AI Solutions Architect & Engineering Leader",
  // Current employer, shown small under the hero headline and in the
  // Experience timeline. Keep it accurate and keep it secondary: the site is
  // an independent portfolio, not an employer page.
  currentPosition: {
    title: "Manager, Advanced AI Solutions",
    company: "Accenture",
    organization: "Center for Advanced AI",
  },
  tagline:
    "I design and build enterprise AI that holds up in production, combining solution architecture, hands-on engineering, and technical leadership to deliver measurable business outcomes.",
  portfolioDescriptor:
    "Independent AI Projects · Live Applications · Enterprise Architecture Case Studies",
  summary:
    "AI solutions architect and engineering leader with 10+ years across AI/ML and cloud data platforms. I design and build RAG and multi-agent systems, and I care as much about trust, governance, and evaluation as I do about the model.",

  // Privacy-conscious: general location only, no phone number or home address.
  location: "Cincinnati, Ohio area",

  email: "mike@mikemiller.ai",

  // Canonical site URL (falls back to localhost during development).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikemiller.ai",

  // Documented single-file replacement points (see README).
  // These live at stable urls, so replacing the file is not enough on its own:
  // browsers that already downloaded the old copy would keep serving it. Bump
  // the ?v= whenever the file behind one of these changes.
  resumePath: "/resume/michael-miller-resume.pdf?v=2026-09-07",
  headshotPath: "/images/michael-miller-headshot.jpg",
  ogImagePath: "/images/og-image.png",

  // Scheduling. Embedded on /contact and linked from the hero/footer.
  //
  // The options are listed here rather than letting Calendly render its own
  // list, so all three stay visible in site styling, land in the prerendered
  // HTML, and drop the visitor straight onto a calendar instead of making them
  // click through inside the iframe.
  //
  // `slug` must match the event's Calendly url (it is NOT derived from `label`,
  // and renaming an event in Calendly does not change its slug). Changing the
  // account handle changes calendlyUrl but leaves these slugs alone.
  calendlyUrl: "https://calendly.com/mikemillerai",
  calendlyEvents: [
    {
      label: "30 minutes",
      slug: "30min",
      blurb: "A quick introduction or question.",
    },
    {
      label: "45 minutes",
      slug: "45-minute-meeting",
      blurb: "A technical discussion.",
    },
    {
      label: "60 minutes",
      slug: "60-minute-meeting",
      blurb: "A deeper dive into architecture or one of the projects.",
    },
  ],

  socials: {
    linkedin: "https://www.linkedin.com/in/mikemillerai/",
    github: "https://github.com/mikemiller-ai",
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
