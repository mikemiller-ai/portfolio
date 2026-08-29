import type { Config } from "tailwindcss";
import preset from "@mikemiller-ai/web-brand-kit/preset";

/**
 * The shared preset supplies everything that must not vary between mikemiller.ai
 * and the products: the shadcn role names, the radius steps, tracking-tight at
 * -0.025em, and the 1152/672 measurements from the kit's LAYOUT.md. Colour
 * values come from the tokens block in globals.css.
 *
 * Only put something here if it is genuinely this property's own. Overriding a
 * value the preset sets is drift, and the override is the bug — change the kit
 * instead, so every property gets the fix.
 */
const config: Config = {
  presets: [preset],
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand extension, not part of the shadcn contract: a third text level
        // below --muted-foreground, for captions and metadata. It lives here
        // rather than in the preset because a utility whose custom property is
        // undefined in another brand renders as a broken colour instead of
        // failing loudly.
        subtle: "hsl(var(--subtle) / <alpha-value>)",
      },
      // The house card shapes. `rounded-card` (the preset's, via --radius-card)
      // is the same 1.125rem as `rounded-2xl`; both exist so a component can be
      // written either against the token or against this property's own scale.
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.12)",
        "soft-lg":
          "0 1px 2px rgb(15 23 42 / 0.05), 0 20px 40px -20px rgb(15 23 42 / 0.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
