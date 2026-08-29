"use client";

import { useId, useState } from "react";
import { MousePointerClick } from "lucide-react";
import type { ArchitectureDiagram, DiagramNode } from "@/data/architectureDiagrams";
import { cn } from "@/lib/cn";

const toneClasses: Record<NonNullable<DiagramNode["tone"]>, string> = {
  input: "border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200",
  retrieval:
    "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200",
  generation:
    "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
  control:
    "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
  output:
    "border-indigo-300 bg-indigo-50 text-indigo-900 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200",
};

const toneDot: Record<NonNullable<DiagramNode["tone"]>, string> = {
  input: "bg-sky-500",
  retrieval: "bg-violet-500",
  generation: "bg-emerald-500",
  control: "bg-amber-500",
  output: "bg-indigo-500",
};

const legend: { tone: NonNullable<DiagramNode["tone"]>; label: string }[] = [
  { tone: "input", label: "Input" },
  { tone: "retrieval", label: "Retrieval" },
  { tone: "generation", label: "Generation" },
  { tone: "control", label: "Control & ops" },
  { tone: "output", label: "Output" },
];

export function InteractiveDiagram({ diagram }: { diagram: ArchitectureDiagram }) {
  const [selectedId, setSelectedId] = useState<string>(diagram.nodes[0]?.id ?? "");
  const panelId = useId();
  const selected = diagram.nodes.find((n) => n.id === selectedId) ?? diagram.nodes[0];

  const nodeById = (id: string) => diagram.nodes.find((n) => n.id === id);

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        {/* Diagram canvas — min-w-0 lets the scroll wrapper below shrink to the
            viewport so the 640px canvas scrolls inside it instead of the page. */}
        <div className="min-w-0">
          <div className="overflow-x-auto rounded-2xl border border-border bg-muted p-4">
            <div className="relative mx-auto min-w-[640px] aspect-[640/440]">
              {/* Connector lines */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M0,0 L10,5 L0,10 z" fill="rgb(var(--accent))" />
                  </marker>
                </defs>
                {diagram.edges.map((edge, i) => {
                  const a = nodeById(edge.from);
                  const b = nodeById(edge.to);
                  if (!a || !b) return null;
                  const active =
                    selectedId === edge.from || selectedId === edge.to;
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="rgb(var(--accent))"
                      strokeOpacity={active ? 0.9 : 0.35}
                      strokeWidth={active ? 0.8 : 0.5}
                      markerEnd="url(#arrow)"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {diagram.nodes.map((node) => {
                const isSelected = node.id === selectedId;
                const tone = node.tone ?? "control";
                return (
                  <button
                    key={node.id}
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls={panelId}
                    onClick={() => setSelectedId(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={cn(
                      "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-medium shadow-soft transition-all",
                      toneClasses[tone],
                      isSelected
                        ? "z-10 scale-105 ring-2 ring-primary ring-offset-2 ring-offset-muted"
                        : "hover:scale-[1.03]",
                    )}
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/70 font-mono text-[0.7rem] font-semibold text-foreground dark:bg-black/30">
                      {node.num}
                    </span>
                    <span className="whitespace-nowrap">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {legend.map((item) => (
              <span key={item.tone} className="inline-flex items-center gap-1.5 text-xs text-subtle">
                <span className={cn("h-2 w-2 rounded-full", toneDot[item.tone])} aria-hidden />
                {item.label}
              </span>
            ))}
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-subtle">
            <MousePointerClick className="h-3.5 w-3.5" aria-hidden />
            Select a numbered component to see why it&apos;s there and what it trades off.
          </p>
        </div>

        {/* Detail panel */}
        <aside
          id={panelId}
          aria-live="polite"
          className="rounded-2xl border border-border bg-card p-5"
        >
          {selected ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-mono text-sm font-semibold text-primary-foreground">
                  {selected.num}
                </span>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {selected.label}
                </h3>
              </div>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                    Purpose
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{selected.purpose}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                    Why it was chosen
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{selected.why}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                    Alternatives
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{selected.alternatives}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                    Risks &amp; trade-offs
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{selected.risks}</dd>
                </div>
              </dl>
            </>
          ) : null}
        </aside>
      </div>

      {/* Accessible text alternative — full description not dependent on the image. */}
      <details className="mt-6 rounded-xl border border-border bg-muted p-4 text-sm">
        <summary className="cursor-pointer font-medium text-foreground">
          Text description of this diagram
        </summary>
        <p className="mt-3 text-muted-foreground">{diagram.summary}</p>
        <ol className="mt-3 space-y-2">
          {diagram.nodes.map((node) => (
            <li key={node.id} className="text-muted-foreground">
              <span className="font-medium text-foreground">
                {node.num}. {node.label}:
              </span>{" "}
              {node.purpose}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-muted-foreground">
          <span className="font-medium text-foreground">Flow:</span>{" "}
          {diagram.edges
            .map((e) => {
              const a = diagram.nodes.find((n) => n.id === e.from)?.label;
              const b = diagram.nodes.find((n) => n.id === e.to)?.label;
              return `${a} → ${b}${e.label ? ` (${e.label})` : ""}`;
            })
            .join("; ")}
          .
        </p>
      </details>
    </div>
  );
}
