#!/usr/bin/env bash
# Build the static export and deploy it to S3 + CloudFront for mikemiller.ai.
#
# Prereqs: AWS CLI configured (account 961406434831), Node/npm on PATH.
# Do NOT run `npm run build` while `npm run dev` is running (it corrupts .next).
# Stop the dev server first; this script cleans .next/out before building.
set -euo pipefail

BUCKET="mikemiller-ai-site"
DIST_ID="E2AB64W1D6L57C"
REGION="us-east-1"

cd "$(dirname "$0")/.."

# This repo lives in iCloud Drive, which resolves a sync collision by writing
# "name 2.ext" next to the original. public/ is copied verbatim into out/, so an
# unnoticed conflict copy ships to production as a junk url — and one of them was
# a duplicate of the signature mark, whose directory is meant to be append-only.
# Cheaper to refuse the build than to clean S3 afterwards.
echo "==> Checking for iCloud conflict copies"
conflicts=$(find public src scripts -regex '.* [0-9]\.[A-Za-z0-9]+' 2>/dev/null || true)
if [ -n "$conflicts" ]; then
  echo "Refusing to build — iCloud conflict copies present:"
  echo "$conflicts" | sed 's/^/  /'
  echo "Check each against its original, then delete them."
  exit 1
fi

echo "==> Building static export"
rm -rf .next out
NEXT_OUTPUT=export npm run build

# Only /_next/ is content-hashed, so only /_next/ may be immutable. Everything
# else (the résumé PDF, favicons, manifest, images) lives at a STABLE url whose
# content changes on redeploy — marking those immutable makes returning visitors
# keep the old file for a year, and a CloudFront invalidation cannot fix it
# because the browser never revalidates. Bump the ?v= in siteConfig/layout when
# replacing one of those files so already-cached browsers refetch.
echo "==> Syncing hashed build assets (immutable)"
aws s3 sync out/_next/ "s3://$BUCKET/_next/" --delete \
  --cache-control "public,max-age=31536000,immutable" --only-show-errors

echo "==> Syncing stable-url assets (must revalidate)"
aws s3 sync out/ "s3://$BUCKET/" --delete --exclude "_next/*" \
  --exclude "*.html" --exclude "*.xml" --exclude "*.txt" \
  --cache-control "public,max-age=3600,must-revalidate" --only-show-errors

echo "==> Syncing HTML (short cache)"
aws s3 sync out/ "s3://$BUCKET/" \
  --exclude "*" --include "*.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "public,max-age=60,must-revalidate" --only-show-errors

# Next's App Router fetches these RSC payloads instead of the html when the
# visitor navigates client-side (clicking a nav link rather than loading a url).
# They are the navigation equivalent of the html and must expire like it.
# Every pass above excludes *.txt, so before this existed they were never
# uploaded at all: direct page loads served fresh html while client-side
# navigation served payloads from whenever they first landed. robots.txt is
# swept up here too and then corrected below.
echo "==> Syncing RSC payloads (short cache)"
aws s3 sync out/ "s3://$BUCKET/" \
  --exclude "*" --include "*.txt" \
  --cache-control "public,max-age=60,must-revalidate" --only-show-errors

# The email-signature mark is the one stable-url asset that genuinely never
# changes, so it is the one exception to the rule above. Its url is embedded in
# every email already sent; the hard constraint on /brand/ is that a redesigned
# mark ships under a NEW filename rather than overwriting this one. That makes
# `immutable` correct here and it is what mail clients and Gmail's image proxy
# want — they cache aggressively and re-fetching on every open is wasted.
# Nothing else under /brand/ gets this: the logos and token files are stable
# urls whose contents can be revised.
echo "==> Pinning the signature mark (immutable, image/png)"
aws s3 cp "s3://$BUCKET/brand/signature-mark@2x.png" \
  "s3://$BUCKET/brand/signature-mark@2x.png" \
  --content-type "image/png" --metadata-directive REPLACE \
  --cache-control "public,max-age=31536000,immutable" --only-show-errors

# Correct content types for the metadata files.
aws s3 cp "s3://$BUCKET/sitemap.xml" "s3://$BUCKET/sitemap.xml" \
  --content-type "application/xml" --metadata-directive REPLACE \
  --cache-control "public,max-age=300" --only-show-errors
aws s3 cp "s3://$BUCKET/robots.txt" "s3://$BUCKET/robots.txt" \
  --content-type "text/plain" --metadata-directive REPLACE \
  --cache-control "public,max-age=300" --only-show-errors

echo "==> Invalidating CloudFront"
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" \
  --query 'Invalidation.Status' --output text

echo "==> Done. Live at https://mikemiller.ai"
