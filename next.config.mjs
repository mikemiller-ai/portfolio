/** @type {import('next').NextConfig} */

// Security headers. For the production static export (S3 + CloudFront) these are
// applied at the CDN via a response-headers policy; they're kept here for
// non-export builds (`next start`) and local dev. See README "Security".
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

// Static export is switched on with NEXT_OUTPUT=export so the local dev server
// and its headers()/rewrites keep working normally the rest of the time.
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig = {
  reactStrictMode: true,
  // Images are served from /public and pre-optimized; the default loader is
  // fine for a static-friendly build. `unoptimized` keeps the static export
  // (S3/CloudFront) working without a runtime image optimizer.
  transpilePackages: ["@mikemiller-ai/web-brand-kit"],
  images: {
    unoptimized: true,
  },
  ...(isExport
    ? { output: "export", trailingSlash: true }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
