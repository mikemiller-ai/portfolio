import { process } from "@/data/expertise";
import { Reveal } from "./Reveal";

export function ProcessSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {process.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={i * 60}
          className="relative flex flex-col rounded-2xl border border-border bg-card p-5"
        >
          <span
            className="mb-3 font-mono text-sm font-semibold text-primary"
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[0.95rem] font-semibold leading-snug tracking-tight text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
