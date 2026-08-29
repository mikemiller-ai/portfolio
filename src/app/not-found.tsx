import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Page not found" });

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
        <Compass className="h-7 w-7" aria-hidden />
      </span>
      <p className="mt-6 font-mono text-sm uppercase tracking-[0.16em] text-subtle">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        This page took a wrong turn
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be broken or the page may have moved. Let&apos;s get you back
        to something useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary btn-md">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back home
        </Link>
        <Link href="/projects" className="btn btn-secondary btn-md">
          View projects
        </Link>
      </div>
    </div>
  );
}
