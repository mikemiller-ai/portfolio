import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Onest } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SkipLink, JsonLd } from "@/components/primitives";

// Onest (sans, self-hosted via next/font) + Geist Mono for labels/data.
// Sets --font-onest and --font-geist-mono, mapped in tailwind.config.ts.
const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  // Brand-kit favicon set (see public/ — generated from 03-favicon). The ?v=
  // matches siteConfig.resumePath: icons sit at stable urls, so a replaced file
  // needs a new url or already-cached browsers keep the old icon. Bump on swap.
  icons: {
    icon: [
      { url: "/favicon.ico?v=2026-09", sizes: "32x32" },
      { url: "/favicon.svg?v=2026-09", type: "image/svg+xml" },
      { url: "/icon-192.png?v=2026-09", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon-180.png?v=2026-09", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest?v=2026-09",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
    { media: "(prefers-color-scheme: dark)", color: "#090c14" },
  ],
};

// Privacy-friendly, cookieless analytics (Plausible). Loads only when a domain
// is configured (NEXT_PUBLIC_ANALYTICS_DOMAIN, set in .env.production); with the
// var unset — e.g. local dev — no tracker ships and trackEvent() stays a no-op.
// The script id below is the public per-site tag from the Plausible dashboard.
// See src/lib/analytics.ts.
const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${onest.variable} ${GeistMono.variable}`}>
      {analyticsEnabled ? (
        <>
          <Script
            async
            src="https://plausible.io/js/pa-I7bdbDdsUfHiU1DVKM90s.js"
            strategy="afterInteractive"
          />
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
          </Script>
        </>
      ) : null}
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <SkipLink />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <JsonLd data={personJsonLd()} />
      </body>
    </html>
  );
}
