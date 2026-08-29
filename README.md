# Michael Miller Jr. — Portfolio & Digital Resume

A modern personal portfolio and digital resume site positioning Michael "Mike"
Miller Jr. as a senior, customer-facing AI, data, and solutions architecture
leader. Built with Next.js, statically generated, content-driven by MDX, and
designed to be hosted on AWS.

- **Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS
- **Content:** MDX + frontmatter for projects, architectures, and articles
- **Theming:** light (default) + dark, with system-preference detection
- **Accessibility:** targets WCAG 2.1 AA (semantic HTML, keyboard nav, skip link,
  reduced-motion support, text alternatives for diagrams)

---

## Local setup

**Requirements:** Node.js **18.17+** (built and tested on Node 20/current) and npm.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build (static generation) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint (`next lint`) |
| `npm run typecheck` | TypeScript type check (`tsc --noEmit`) |

### Environment variables

Copy `.env.example` to `.env.local`. Nothing is required to run the prototype
locally. Documented variables:

- `NEXT_PUBLIC_SITE_URL` — canonical base URL for metadata/sitemap (falls back to
  localhost in dev).
- `NEXT_PUBLIC_CONTACT_ENDPOINT` — future contact-form backend (unused in the
  prototype; the form uses a mock handler).
- `NEXT_PUBLIC_ANALYTICS_DOMAIN` — future privacy-conscious analytics (disabled by
  default).

**No secrets are committed.** `.env.local` is gitignored.

---

## Project structure

```
src/
  app/                 # Routes (App Router) + sitemap.ts, robots.ts, not-found
    projects/[slug]/   # MDX-driven project case studies
    architecture/[slug]/  # MDX-driven architecture detail (+ interactive diagram)
    insights/[slug]/   # MDX-driven articles
  components/          # Nav, Footer, cards, Hero, InteractiveDiagram, ContactForm, …
  content/
    projects/          # *.mdx (frontmatter + body)
    architectures/     # *.mdx
    articles/          # *.mdx
  data/                # siteConfig, experience, certifications, expertise, diagrams
  lib/                 # content loader, seo helpers, analytics stub, cn()
  styles / app/globals.css   # design tokens (colors, accent) + prose styles
public/
  images/              # headshot, OG image
  resume/              # resume PDF
```

---

## Editing content

### Add a project

Create `src/content/projects/<slug>.mdx` with frontmatter:

```yaml
---
title: "Project Title"
slug: "project-title"
summary: "One-sentence value proposition."
problem: "The business problem this addresses."
featured: true          # shows on the home page
status: "Prototype"
order: 5                 # controls list + prev/next order
categories: [Generative AI, RAG]   # also power the Projects filters
technologies: [Snowflake, Python]
githubUrl: "https://github.com/mikemiller-ai/…"
---

## Overview
Markdown/MDX body. `##` and `###` headings become the sticky table of contents.
```

The case-study template supports these sections (use the headings you need):
Overview, Business problem, Target users, Goals, Architecture, Architecture
walkthrough, Key technologies, Important design decisions, Alternatives
considered, Security and governance, Cost considerations, Evaluation & success
metrics, Screenshots & demo, Challenges, Lessons learned, Future improvements,
Links.

### Add an article

Create `src/content/articles/<slug>.mdx`:

```yaml
---
title: "Article Title"
slug: "article-title"
subtitle: "One or two sentences."
date: "2026-06-18"          # ISO date; controls ordering
readingTime: "7 min read"
featured: true
tags: [RAG, Architecture]   # power the Insights filters + "related" links
relatedProjects: [enterprise-ai-support-copilot]   # project slugs
---
```

### Add an architecture

Create `src/content/architectures/<slug>.mdx`:

```yaml
---
title: "Architecture Name"
slug: "architecture-name"
summary: "Short description."
useCase: "When you'd use it."
complexity: "Intermediate"   # Foundational | Intermediate | Advanced
platform: "AWS"              # shown + used as a filter
order: 7
interactive: false
services: [Lambda, SQS, S3]
---
```

**To make an architecture interactive** (clickable annotated diagram), add an
entry keyed by its slug to `src/data/architectureDiagrams.ts` and set
`interactive: true` in the frontmatter. See the `enterprise-rag` entry as the
reference — each node has `x`/`y` (percent coordinates), a `label`, and the
`purpose` / `why` / `alternatives` / `risks` shown when selected (which also
serve as the diagram's accessible text description).

---

## Customizing

### Replace the headshot

Replace **`public/images/michael-miller-headshot.jpg`** (square image, ~1200×1200
recommended). No code changes needed — the path is set once in
`src/data/siteConfig.ts` (`headshotPath`).

### Replace the resume

Replace **`public/resume/michael-miller-resume.pdf`**. The path is set once in
`src/data/siteConfig.ts` (`resumePath`) and is linked from the nav, hero,
experience page, and footer.

### Update personal info & social links

Edit **`src/data/siteConfig.ts`** — name, role/headline, tagline, location,
email, and the `socials` object.

### Change the accent color

Edit the `--accent`, `--accent-fg`, and `--accent-soft` variables in
**`src/app/globals.css`** (both the `:root` light block and the `.dark` block).
The whole design system reads from these. The default is Indigo.

### Update navigation

Edit the `primaryNav` array in **`src/data/siteConfig.ts`**. It drives both the
header and footer.

### Experience, certifications, expertise

Edit the plain-data files in `src/data/`: `experience.ts`, `certifications.ts`,
`expertise.ts`.

---

## Deployment

**Live in production at [mikemiller.ai](https://mikemiller.ai)** on AWS: a static
export (`NEXT_OUTPUT=export npm run build`) served from a private S3 bucket behind
CloudFront (Origin Access Control), with an ACM certificate, a Route 53 alias, and a
CloudFront Function that rewrites clean URLs to the exported `index.html` files. The
contact form posts to an API Gateway HTTP API backed by a Lambda that sends via SES.

To redeploy after changes: stop the dev server, then run

```bash
NEXT_OUTPUT=export npm run build   # or: ./scripts/deploy.sh (build + sync + invalidate)
```

Production resources (account `961406434831`, `us-east-1`):

| Resource | Id |
| --- | --- |
| S3 bucket | `mikemiller-ai-site` |
| CloudFront distribution | `E2AB64W1D6L57C` |
| CloudFront URL-rewrite function | `mikemiller-rewrite` |
| ACM certificate | `mikemiller.ai` + `www.mikemiller.ai` (us-east-1) |
| Contact API (HTTP API) | `xefv2yqmb8` → `POST /contact` |
| Contact Lambda | `mikemiller-contact` |
| SES identities | domain `mikemiller.ai` (verified) + recipient inbox |

> **SES note:** the account is in the SES sandbox, which is fine for a personal
> contact form. Sending requires the recipient inbox to be a verified SES identity.
> To send to any address, request SES production access.

The `scripts/deploy.sh` helper runs the build, syncs `out/` to S3 with correct cache
headers, and invalidates CloudFront.

### Alternative — AWS Amplify Hosting

1. Push this repo to GitHub/CodeCommit.
2. In the Amplify console, **Host web app** → connect the repository/branch.
3. Amplify auto-detects Next.js. Confirm build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands: [npm ci]
       build:
         commands: [npm run build]
     artifacts:
       baseDirectory: .next
       files: ['**/*']
     cache:
       paths: [node_modules/**/*]
   ```
4. Add environment variables (e.g. `NEXT_PUBLIC_SITE_URL`) in the Amplify console.
5. Add your custom domain under **Domain management** (Amplify provisions the TLS
   certificate via ACM automatically).

### Option 2 — Amazon S3 + CloudFront (static export)

This site avoids Next.js features that require a server (no server actions;
images are configured `unoptimized`), so it can be exported to static files.

1. Add `output: "export"` to `next.config.mjs`.
2. `npm run build` → static site is emitted to `out/`.
3. Upload `out/` to an S3 bucket configured for static hosting.
4. Put **CloudFront** in front of the bucket (Origin Access Control), attach an
   **ACM** certificate for HTTPS, and point **Route 53** at the distribution.

> **Static-export limitations:** the `sitemap.xml`/`robots.txt` route handlers and
> `next/image` optimization don't run on a pure static host. `robots`/`sitemap`
> still emit at build time; images already ship `unoptimized`, so both are fine
> here. If you later add server-only features (a real contact-form API,
> middleware, ISR), use Amplify (Option 1) instead of static export.

### Option 3 — Vercel (preview convenience)

Import the repo at [vercel.com/new](https://vercel.com/new) for a zero-config
preview deploy. Useful for quick sharing — **AWS remains the intended production
host.**

---

## Production architecture (target)

```
User → Route 53 → CloudFront → S3 / Amplify Hosting → static Next.js site
```

Future additions: ACM (HTTPS), API Gateway + Lambda + SES (functional contact
form), DynamoDB (submissions), WAF, CloudWatch + CloudFront logs, AWS Budgets.

---

## Security notes

- No hardcoded credentials or API keys; config via environment variables.
- Baseline security headers are set in `next.config.mjs`
  (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`).
- **Content Security Policy:** for production, add a CSP header once the final
  analytics/host choices are known. A good starting policy for this
  self-contained site: `default-src 'self'; img-src 'self' data:; style-src
  'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; frame-ancestors
  'self'`. (Tighten `script-src`/`style-src` further with nonces if desired.)
- The contact form validates on the client and posts to an API Gateway + Lambda
  backend that re-validates, applies a honeypot check, and sends via SES. CORS on
  the API is locked to the site origin. No secrets ship in the client.
- No personal phone number or home address appears anywhere on the site.

---

## Accessibility & analytics

- Skip-to-content link, semantic landmarks, keyboard-operable nav/drawer/diagram,
  visible focus states, labeled form fields, `prefers-reduced-motion` support,
  and written text descriptions for architecture diagrams.
- Analytics is a documented **no-op** abstraction (`src/lib/analytics.ts`,
  `trackEvent()`). Wire up a privacy-conscious provider there later; no tracker
  ships in the prototype.

---

## Testing checklist

`npm run typecheck`, `npm run lint`, and `npm run build` should all pass with no
app-code warnings. Manually verify: navigation + mobile drawer, theme switcher,
project/architecture/insights filters, the interactive architecture diagram,
contact-form validation states, resume links, keyboard navigation, and responsive
layout (no horizontal scroll on mobile).

---

Built with Next.js. Deployable on AWS.

*Placeholders to replace with finals:* the headshot and resume in `public/`
(real files are already in place), the social sharing image
`public/images/og-image.svg`, and the `NEXT_PUBLIC_SITE_URL` domain.
