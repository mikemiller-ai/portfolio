/* eslint-disable @next/next/no-img-element */
/**
 * /brand — the public brand reference for mikemiller.ai.
 *
 * Two jobs, and they are independent:
 *
 * 1. This route puts a page over `public/brand/`, which is also the directory
 *    that serves `signature-mark@2x.png` — the logo the email signature points
 *    at. That file must stay reachable anonymously at
 *    https://mikemiller.ai/brand/signature-mark@2x.png forever: it is embedded
 *    in every email already sent, so moving, renaming or deleting it breaks the
 *    mark in mail people received months ago. Treat /brand/ as append-only. If
 *    the mark is ever redesigned, publish it under a NEW filename.
 * 2. It presents the brand kit. Everything here is transcribed from
 *    `mikemiller_ai_brand_kit/` (BRAND-GUIDELINES.md, COLOR.md, TYPOGRAPHY.md),
 *    which is generated from `10-source/tokens.py`. This page presents those
 *    values; it does not revise them. Change a value there, rerun the kit's
 *    build, then update here — never the other way round.
 *
 * Plain <img> rather than next/image throughout: these are logo files with a
 * dozen different intrinsic aspect ratios, shown at fluid widths, and the
 * export runs with `images: { unoptimized: true }` anyway, so next/image would
 * only add required width/height props for no benefit.
 */
import { DM_Sans } from "next/font/google";
import { Download } from "lucide-react";
import { Section, SectionHeading, JsonLd } from "@/components/primitives";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

// The brand face, self-hosted through next/font so the specimen below is set
// in DM Sans rather than the site's Onest. `axes: ["opsz"]` keeps the optical
// size axis available, which is what makes `font-optical-sizing: auto` real.
// Google's build has the stylistic sets stripped — see "Stylistic sets" below.
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata = buildMetadata({
  title: "Brand",
  description:
    "The mikemiller.ai brand reference: the M mark and lockups, clear space and minimum sizes, the palette and its contrast rules, the two gradients, and the DM Sans type scale — with every asset available to download.",
  path: "/brand",
});

/* -------------------------------------------------------------------------
   Logo and mark — source: brand kit 01-logo/ and 02-mark/
   `ground` picks one of the four approved backgrounds (BRAND-GUIDELINES §6).
   ------------------------------------------------------------------------- */

type Ground = "white" | "alt" | "navy";

type Asset = {
  name: string;
  note: string;
  src: string;
  ground: Ground;
  /** Rendered width cap, in px. The files themselves are resolution-free. */
  width: number;
  downloads: { label: string; href: string }[];
};

const lockups: Asset[] = [
  {
    name: "Primary lockup, light",
    note: "The default. Ink logotype, gradient mark and .ai, on white or #F8F8FB.",
    src: "/brand/logo-primary-light.svg",
    ground: "white",
    width: 340,
    downloads: [
      { label: "SVG", href: "/brand/logo-primary-light.svg" },
      { label: "PNG @2x", href: "/brand/logo-primary-light@2x.png" },
    ],
  },
  {
    name: "Primary lockup, dark",
    note: "For navy and the navy gradient. White logotype, same gradient mark.",
    src: "/brand/logo-primary-dark.svg",
    ground: "navy",
    width: 340,
    downloads: [
      { label: "SVG", href: "/brand/logo-primary-dark.svg" },
      { label: "PNG @2x", href: "/brand/logo-primary-dark@2x.png" },
    ],
  },
  {
    name: "Stacked, light",
    note: "Mark above the logotype. For square-ish spaces where the horizontal lockup would have to go too small.",
    src: "/brand/logo-stacked-light.svg",
    ground: "alt",
    width: 190,
    downloads: [
      { label: "SVG", href: "/brand/logo-stacked-light.svg" },
      { label: "PNG", href: "/brand/logo-stacked-light.png" },
    ],
  },
  {
    name: "Stacked, dark",
    note: "The same stacked lockup for dark grounds.",
    src: "/brand/logo-stacked-dark.svg",
    ground: "navy",
    width: 190,
    downloads: [
      { label: "SVG", href: "/brand/logo-stacked-dark.svg" },
      { label: "PNG", href: "/brand/logo-stacked-dark.png" },
    ],
  },
  {
    name: "Mono, black",
    note: "One-colour reproduction: fax, engraving, embroidery, single-plate print.",
    src: "/brand/logo-mono-black.svg",
    ground: "white",
    width: 340,
    downloads: [
      { label: "SVG", href: "/brand/logo-mono-black.svg" },
      { label: "PNG @2x", href: "/brand/logo-mono-black@2x.png" },
    ],
  },
  {
    name: "Mono, white",
    note: "The knockout cut, for dark grounds and over a navy scrim on photography.",
    src: "/brand/logo-mono-white.svg",
    ground: "navy",
    width: 340,
    downloads: [
      { label: "SVG", href: "/brand/logo-mono-white.svg" },
      { label: "PNG @2x", href: "/brand/logo-mono-white@2x.png" },
    ],
  },
];

const marks: Asset[] = [
  {
    name: "Mark, gradient",
    note: "The M on its own. The primary mark wherever the logotype will not fit.",
    src: "/brand/mark-gradient.svg",
    ground: "white",
    width: 128,
    downloads: [
      { label: "SVG", href: "/brand/mark-gradient.svg" },
      { label: "PNG 1024", href: "/brand/mark-gradient-1024.png" },
    ],
  },
  {
    name: "Mark, navy square",
    note: "The compact treatment: navy square, 20% corner radius, mark at 64.7% of the width. This is the favicon and profile cut.",
    src: "/brand/mark-navy-square.svg",
    ground: "alt",
    width: 128,
    downloads: [
      { label: "SVG", href: "/brand/mark-navy-square.svg" },
      { label: "PNG 1024", href: "/brand/mark-navy-square-1024.png" },
    ],
  },
  {
    name: "Mark, black",
    note: "One-colour mark for light grounds.",
    src: "/brand/mark-black.svg",
    ground: "white",
    width: 128,
    downloads: [
      { label: "SVG", href: "/brand/mark-black.svg" },
      { label: "PNG 1024", href: "/brand/mark-black-1024.png" },
    ],
  },
  {
    name: "Mark, white",
    note: "One-colour mark for dark grounds.",
    src: "/brand/mark-white.svg",
    ground: "navy",
    width: 128,
    downloads: [
      { label: "SVG", href: "/brand/mark-white.svg" },
      { label: "PNG 1024", href: "/brand/mark-white-1024.png" },
    ],
  },
];

/* -------------------------------------------------------------------------
   Palette — source: COLOR.md §1. Hex values are sampled from the approved
   artwork, not chosen; the gradient endpoints came out of a least-squares fit
   across 5,031 interior pixels of the mark.
   ------------------------------------------------------------------------- */

const palette = [
  { name: "Blue", hex: "#1E58F7", role: "Gradient start. The primary accent." },
  { name: "Violet", hex: "#8A5CF4", role: "Gradient end. Never a solid on its own." },
  { name: "Ink", hex: "#020C1E", role: "The logotype on light, and body text." },
  { name: "Navy", hex: "#060F21", role: "App-icon square, dark surfaces, avatars." },
  { name: "Navy deep", hex: "#020D2B", role: "Navy gradient start." },
  { name: "Indigo", hex: "#3028B5", role: "Navy gradient end." },
  { name: "Surface", hex: "#FFFFFF", role: "Primary light background." },
  { name: "Surface alt", hex: "#F8F8FB", role: "Secondary light background, panels." },
  { name: "Divider", hex: "#DEE0E7", role: "The lockup hairline, rules on light." },
  { name: "Muted", hex: "#5A6478", role: "Supporting text on light surfaces." },
  { name: "Muted dark", hex: "#98A2B8", role: "Supporting text on dark surfaces." },
];

const BRAND_GRADIENT = "linear-gradient(90deg, #1E58F7 0%, #8A5CF4 100%)";
const NAVY_GRADIENT =
  "linear-gradient(90deg, #020D2B 0%, #020D2B 30%, #07134C 50%, #12196F 70%, #211F97 85%, #3028B5 100%)";

/* -------------------------------------------------------------------------
   Type — source: TYPOGRAPHY.md §3 and §7. 16px base, 1.25 (major third)
   ratio, rounded to whole pixels.
   ------------------------------------------------------------------------- */

const typeScale = [
  { token: "display-xl", px: 61, lh: "1.05", tracking: "-0.030em", weight: 700, role: "Title slides." },
  { token: "display-lg", px: 49, lh: "1.08", tracking: "-0.028em", weight: 700, role: "Page heroes." },
  { token: "display", px: 39, lh: "1.12", tracking: "-0.025em", weight: 700, role: "Opening statement." },
  { token: "h1", px: 31, lh: "1.16", tracking: "-0.022em", weight: 700, role: "Page titles." },
  { token: "h2", px: 25, lh: "1.22", tracking: "-0.020em", weight: 700, role: "Section headings." },
  { token: "h3", px: 20, lh: "1.35", tracking: "-0.012em", weight: 700, role: "Sub-headings, card titles." },
  { token: "body-lg", px: 20, lh: "1.55", tracking: "0", weight: 400, role: "Standfirsts and ledes." },
  { token: "body", px: 16, lh: "1.6", tracking: "0", weight: 400, role: "Running text. The default." },
  { token: "body-sm", px: 13, lh: "1.55", tracking: "+0.005em", weight: 400, role: "Captions, fine print." },
  { token: "label", px: 13, lh: "1.4", tracking: "+0.140em", weight: 700, role: "Eyebrows, table headers." },
];

const stylisticSets = [
  { set: "ss01", what: "Alternate comma, semicolon and quote marks.", verdict: "Safe" },
  { set: "ss02", what: "Single-storey a.", verdict: "Never" },
  { set: "ss03", what: "Single-storey g.", verdict: "Optional" },
  { set: "ss04", what: "Alternate u.", verdict: "Optional" },
  { set: "ss05", what: "Hooked y in place of the straight-tailed default.", verdict: "Optional" },
  { set: "ss06", what: "Alternate Q with a longer tail.", verdict: "Optional" },
  { set: "ss07", what: "Alternate figures: 1 gains a foot, 4 opens, 3 flattens.", verdict: "Optional" },
  { set: "ss08", what: "Alternate quotes and arrow glyphs.", verdict: "Safe" },
];

/* ------------------------------------------------------------------------- */

const downloads = [
  {
    group: "Icons and social",
    items: [
      {
        label: "Favicon set",
        note: "18 files — .ico, .svg, 16 through 512, apple-touch, maskable, and site.webmanifest",
        href: "/brand/favicon-set.zip",
      },
      { label: "OG image", note: "1200 × 630 PNG, for link previews", href: "/brand/og-image.png" },
      { label: "Twitter card", note: "PNG, summary_large_image", href: "/brand/twitter-card.png" },
    ],
  },
  {
    group: "Colour tokens",
    items: [
      { label: "brand.css", note: "Custom properties, including the light/dark surface swap", href: "/brand/brand.css" },
      { label: "brand-colors.json", note: "For design tools and scripts", href: "/brand/brand-colors.json" },
      { label: "brand-colors.scss", note: "Sass variables", href: "/brand/brand-colors.scss" },
      { label: "tailwind.colors.js", note: "Drop into theme.extend.colors", href: "/brand/tailwind.colors.js" },
    ],
  },
  {
    group: "Type tokens",
    items: [
      { label: "type.css", note: "Custom properties plus a class per step", href: "/brand/type.css" },
      { label: "type-scale.json", note: "The scale as data", href: "/brand/type-scale.json" },
      { label: "tailwind.type.js", note: "Drop into theme.extend", href: "/brand/tailwind.type.js" },
    ],
  },
];

const misuse = [
  "Don't redraw, re-trace or round the M, and don't add a stroke, shadow, glow, bevel or 3D effect.",
  "Don't close the gap between the two ribbons or change the 47.5-unit offset — that offset is what makes it read as an M.",
  "Don't stretch, squash or rotate the lockup. Scale proportionally only.",
  "Don't change the spacing between mark, divider and logotype.",
  "Don't recolour the mark outside the supplied variants.",
  "Don't put the gradient mark on a mid-tone ground, on a photograph without a scrim, or anywhere violet meets violet.",
  "Don't add a tagline inside the clear space.",
  "Don't retype mikemiller.ai in DM Sans and call it the logo — the tracking, the gradient span and the relationship to the mark will all be wrong. Place the supplied file.",
];

/* ------------------------------------------------------------------------- */

const groundClass: Record<Ground, string> = {
  white: "bg-white",
  alt: "bg-[#F8F8FB]",
  navy: "bg-[#060F21]",
};

/**
 * The approved grounds are fixed colours, not theme tokens — an asset has to be
 * shown on the background it is actually cleared for. The inset ring is what
 * keeps a navy tile legible against the site's own dark theme, where ground and
 * page would otherwise be the same value.
 */
function AssetTile({ asset }: { asset: Asset }) {
  return (
    <figure className="card flex h-full flex-col overflow-hidden">
      <div
        className={`flex min-h-[9.5rem] items-center justify-center px-6 py-8 ring-1 ring-inset ring-black/10 dark:ring-white/10 ${groundClass[asset.ground]}`}
      >
        <img
          src={asset.src}
          alt={asset.name}
          style={{ width: "100%", maxWidth: asset.width }}
          className="h-auto"
        />
      </div>
      <figcaption className="flex flex-1 flex-col border-t border-border p-5">
        <p className="text-sm font-semibold text-fg">{asset.name}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{asset.note}</p>
        {/* mt-auto pins the download row to the bottom so a row of tiles with
            captions of different lengths still lines its buttons up. */}
        <p className="mt-auto flex flex-wrap gap-2 pt-4">
          {asset.downloads.map((d) => (
            <a
              key={d.href}
              href={d.href}
              download
              className="btn btn-sm btn-secondary"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              {d.label}
              <span className="sr-only"> — {asset.name}</span>
            </a>
          ))}
        </p>
      </figcaption>
    </figure>
  );
}

export default function BrandPage() {
  return (
    <div className={dmSans.variable}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Brand", path: "/brand" },
        ])}
      />

      {/* ---------------------------------------------------------------- */}
      <Section leading>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Brand</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            The mikemiller.ai identity
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
            The mark, the lockups, the palette and the type scale, with the rules
            that go with them. Every value here was measured from the approved
            artwork rather than picked by eye, and every asset on this page is
            downloadable. If you are placing the logo somewhere, take the file —
            don&apos;t rebuild it.
          </p>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Logo"
          title="The lockup"
          intro="The horizontal lockup is the default. Reach for the stacked cut only when the space is close to square, and the mono cuts only when a gradient genuinely cannot reproduce."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {lockups.map((a) => (
            <AssetTile key={a.src} asset={a} />
          ))}
        </div>

        <h3 className="mt-16 text-xl font-semibold tracking-tight text-fg">
          The mark on its own
        </h3>
        <p className="mt-3 max-w-2xl text-muted">
          The M is built on a 160 × 150 grid. Stroke weight is one eighth of the
          width, every diagonal runs at dx/dy = 4/3, and the V sits dead centre.
          Three rules generate the whole thing.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {marks.map((a) => (
            <AssetTile key={a.src} asset={a} />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Placement"
          title="Clear space and minimum size"
          intro="The clear space is already baked into the supplied files, so in most cases you get it for free by not cropping them."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
              Clear space
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Keep clear on all four sides a margin equal to{" "}
              <strong className="font-semibold text-fg">
                the mark&apos;s stroke weight × 1.8
              </strong>{" "}
              — that is 0.24 × the mark height. Nothing else may enter it: no
              type, no rules, no other logos, no tagline.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              At mark height H the lockup reads: mark 1.067 H wide, a 0.50 H gap,
              the hairline divider, a 0.46 H gap, then the logotype at 0.60 H
              ascender-to-baseline. The logotype&apos;s x-height band is centred
              on the mark&apos;s centre — that is what makes the two halves sit
              level despite the ascenders.
            </p>
          </div>

          <div className="card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
              Minimum size
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-border py-2 pr-4 font-semibold text-fg">
                      Asset
                    </th>
                    <th className="border-b border-border py-2 font-semibold text-fg">
                      Minimum
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Full lockup", "24 px mark height · 8 mm in print"],
                    ["Mark alone", "16 px"],
                    ["Mark inside the navy square", "16 px"],
                  ].map(([asset, min]) => (
                    <tr key={asset}>
                      <td className="border-b border-border py-2 pr-4 align-top text-muted">
                        {asset}
                      </td>
                      <td className="border-b border-border py-2 align-top font-mono text-[0.8125rem] text-muted">
                        {min}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Below 16 px the one-eighth stroke drops under two device pixels and
              the ribbon gap closes up. The 16 px and 32 px favicons in the kit
              are already opened out to compensate — use those files rather than
              downscaling a larger one.
            </p>
          </div>
        </div>

        <h3 className="mt-14 text-xl font-semibold tracking-tight text-fg">
          Misuse
        </h3>
        <ul className="mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
          {misuse.map((rule) => (
            <li
              key={rule}
              className="flex gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm leading-relaxed text-muted"
            >
              <span aria-hidden className="mt-0.5 font-mono text-subtle">
                ×
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Colour"
          title="The palette"
          intro="Eleven values. The gradient endpoints were fitted across 5,031 interior pixels of the approved mark — the fit's vertical coefficient came out at zero, which is what proves the ramp runs horizontally rather than on a diagonal."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((c) => (
            <div key={c.hex + c.name} className="card overflow-hidden">
              {/* The inset ring is doing real work: Ink, Navy and Navy deep are
                  near-black, so on the dark theme the swatch and the card would
                  otherwise be indistinguishable. */}
              <div
                className="h-20 border-b border-border ring-1 ring-inset ring-black/10 dark:ring-white/10"
                style={{ background: c.hex }}
                aria-hidden
              />
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-fg">{c.name}</p>
                  <p className="font-mono text-xs uppercase text-subtle">{c.hex}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border-l-2 border-accent bg-surface-2 p-5">
            <p className="text-sm font-semibold text-fg">
              Violet is not a text colour
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              <code className="font-mono">#8A5CF4</code> on white is 4.27:1 and
              fails AA for body copy. Use it in the gradient, in artwork, and in
              large display type only. The logo itself is exempt — WCAG sets no
              contrast minimum for logotypes — but that is not a licence to set
              running text in violet.
            </p>
          </div>
          <div className="rounded-xl border-l-2 border-accent bg-surface-2 p-5">
            <p className="text-sm font-semibold text-fg">
              Blue works on light, not on dark
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              <code className="font-mono">#1E58F7</code> clears AA on white at
              5.53:1 and drops to 3.46:1 on navy. On dark surfaces use{" "}
              <code className="font-mono">#81A1FB</code> instead — 7.67:1 on
              navy, AAA. For AAA body text on white, step down to{" "}
              <code className="font-mono">#194AD0</code> at 7.16:1.
            </p>
          </div>
        </div>

        <h3 className="mt-16 text-xl font-semibold tracking-tight text-fg">
          The two gradients
        </h3>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card overflow-hidden">
            <div className="h-28" style={{ background: BRAND_GRADIENT }} aria-hidden />
            <div className="border-t border-border p-5">
              <p className="text-sm font-semibold text-fg">Brand gradient</p>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-surface-2 p-3 font-mono text-[0.78rem] leading-relaxed text-muted">
{`background: linear-gradient(
  90deg, #1E58F7 0%, #8A5CF4 100%);`}
              </pre>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Horizontal, left to right, spanning{" "}
                <strong className="font-semibold text-fg">
                  each object&apos;s own bounding box
                </strong>{" "}
                — the mark gets one, the <code className="font-mono">.ai</code>{" "}
                gets its own. Two stops, no more. Never vertical, never diagonal,
                never reversed.
              </p>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="h-28" style={{ background: NAVY_GRADIENT }} aria-hidden />
            <div className="border-t border-border p-5">
              <p className="text-sm font-semibold text-fg">Navy gradient</p>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-surface-2 p-3 font-mono text-[0.78rem] leading-relaxed text-muted">
{`background: linear-gradient(90deg,
  #020D2B 0%, #020D2B 30%, #07134C 50%,
  #12196F 70%, #211F97 85%, #3028B5 100%);`}
              </pre>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Holds flat navy across the first third, then ramps to indigo.
                That ease-in is deliberate: a straight two-stop ramp between the
                same endpoints reads muddy through the middle.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center">
          <div
            className="h-14 w-14 shrink-0 rounded-lg border border-border"
            style={{ background: "#545AF6" }}
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold text-fg">
              When you can&apos;t have a gradient, use{" "}
              <code className="font-mono">#545AF6</code>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              A one-colour print run, an embroidery file, a client that flattens
              everything. Use the midpoint rather than picking one end — 5.04:1
              on white, 3.80:1 on navy. Both brand colours sit outside CMYK
              gamut, so four-colour process will come back duller than the screen
              values; hold the real hue with a spot colour, or avoid the gradient
              in print.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Typography"
          title="DM Sans does everything"
          intro="Chosen by measurement, not taste: ten open-licence families were scored against the approved artwork and DM Sans Bold won on whole-word overlap at 0.861."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="card p-6">
            <p
              className="text-[2.75rem] leading-none tracking-[-0.03em] text-fg"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700 }}
            >
              Aa Bb Gg Qq
            </p>
            <p
              className="mt-4 text-lg leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              The quick brown fox jumps over the lazy dog. 0123456789 — this
              paragraph is set in DM Sans Regular so you can read the face
              itself, not a description of it.
            </p>
          </div>

          <div className="card p-6">
            <dl className="space-y-3 text-sm">
              {[
                ["Family", "DM Sans"],
                ["Licence", "SIL Open Font License 1.1"],
                ["Axes", "opsz 9–40, wght 100–1000"],
                ["Shipped cuts", "Regular 400, Medium 500, Bold 700"],
                ["Coverage", "403 codepoints — Latin-1 and Latin Extended-A"],
                ["x-height", "0.526 em"],
                ["Cap height", "0.700 em"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-medium text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              OFL 1.1 means free for commercial use, free to embed, and free to
              hand to a vendor. No Cyrillic and no Greek — if the brand ever
              needs either, DM Sans cannot do it and the decision has to be
              reopened.
            </p>
          </div>
        </div>

        <h3 className="mt-14 text-xl font-semibold tracking-tight text-fg">
          The scale
        </h3>
        <p className="mt-3 max-w-2xl text-muted">
          A 16 px base on a 1.25 (major third) ratio, rounded to whole pixels:
          13, 16, 20, 25, 31, 39, 49, 61. The ratio is a design choice; the
          rounding keeps every step on a whole pixel so nothing renders
          half-blurred.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead>
              <tr>
                {["Token", "Size", "Line-height", "Tracking", "Weight", "Role"].map((h) => (
                  <th
                    key={h}
                    className="border-b border-border py-2.5 pr-4 font-semibold text-fg"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {typeScale.map((t) => (
                <tr key={t.token}>
                  <td className="border-b border-border py-2.5 pr-4 align-top font-mono text-[0.8125rem] text-fg">
                    {t.token}
                  </td>
                  <td className="border-b border-border py-2.5 pr-4 align-top font-mono text-[0.8125rem] text-muted">
                    {t.px} px
                  </td>
                  <td className="border-b border-border py-2.5 pr-4 align-top font-mono text-[0.8125rem] text-muted">
                    {t.lh}
                  </td>
                  <td className="border-b border-border py-2.5 pr-4 align-top font-mono text-[0.8125rem] text-muted">
                    {t.tracking}
                  </td>
                  <td className="border-b border-border py-2.5 pr-4 align-top font-mono text-[0.8125rem] text-muted">
                    {t.weight}
                  </td>
                  <td className="border-b border-border py-2.5 align-top text-muted">
                    {t.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          The measured line-height floor is 1.043 em for ASCII and 1.256 em once
          accented capitals are in play, so a display heading at 1.05 is safe in
          English and will clip in Polish or Latvian. And DM Sans ships no{" "}
          <code className="font-mono">tnum</code> — its ten digits have ten
          advance widths, so{" "}
          <code className="font-mono">font-variant-numeric: tabular-nums</code>{" "}
          does nothing. Numbers that must align go in JetBrains Mono.
        </p>

        <h3 className="mt-14 text-xl font-semibold tracking-tight text-fg">
          Stylistic sets
        </h3>
        <p className="mt-3 max-w-2xl text-muted">
          Eight of them. Google Fonts&apos; build has all of them stripped —
          measured, not assumed — so on the web they are simply unavailable
          unless you self-host the variable font. Which at least means nobody can
          turn <code className="font-mono">ss02</code> on by accident.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr>
                {["Set", "What it does", "Verdict"].map((h) => (
                  <th
                    key={h}
                    className="border-b border-border py-2.5 pr-4 font-semibold text-fg"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stylisticSets.map((s) => (
                <tr key={s.set}>
                  <td className="border-b border-border py-2.5 pr-4 align-top font-mono text-[0.8125rem] text-fg">
                    {s.set}
                  </td>
                  <td className="border-b border-border py-2.5 pr-4 align-top text-muted">
                    {s.what}
                  </td>
                  <td className="border-b border-border py-2.5 align-top">
                    <span
                      className={
                        s.verdict === "Never"
                          ? "pill border-transparent bg-red-500/10 text-red-600 dark:text-red-400"
                          : "pill"
                      }
                    >
                      {s.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          <code className="font-mono">ss02</code> must stay off everywhere. It
          swaps the double-storey <em>a</em> for a single-storey one, and the
          double-storey <em>a</em> is one of the letterforms the typeface was
          chosen for. Turning it on makes running text disagree with the logo.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Files"
          title="Downloads"
          intro="Everything above, plus the pieces that don't have a picture. Token files are generated from a single source, so they agree with each other by construction."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {downloads.map((group) => (
            <div key={group.group}>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
                {group.group}
              </p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      download
                      className="card card-hover flex items-start gap-3 p-4"
                    >
                      <Download
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span>
                        <span className="block text-sm font-medium text-fg">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {item.note}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl rounded-xl border-l-2 border-accent bg-surface-2 p-5">
          <p className="text-sm font-semibold text-fg">A permanent URL lives here</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <code className="font-mono">/brand/signature-mark@2x.png</code> is
            the mark referenced by the mikemiller.ai email signature. It is
            embedded in every message already sent, so it is append-only: never
            move, rename or delete it. A redesigned mark gets a new filename.
          </p>
        </div>
      </Section>
    </div>
  );
}
