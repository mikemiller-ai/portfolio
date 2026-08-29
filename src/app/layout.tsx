import type { Metadata, Viewport } from "next";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${onest.variable} ${GeistMono.variable}`}>
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
