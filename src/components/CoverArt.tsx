import { cn } from "@/lib/cn";

/**
 * Generated abstract "architecture motif" artwork used as card thumbnails and
 * detail-page headers — so the site looks intentional without stock imagery.
 * Decorative only (aria-hidden); every card also carries a real text label.
 */

type Kind = "rag" | "agentic" | "playbook" | "streaming" | "ml" | "generic";

const LABELS: Record<Kind, string> = {
  rag: "Retrieval · Grounding · Generation",
  agentic: "Plan · Act · Observe",
  playbook: "Patterns · Reference · SQL",
  streaming: "Ingest · Process · Serve",
  ml: "Features · Train · Score",
  generic: "Design · Build · Adopt",
};

function Nodes({ kind }: { kind: Kind }) {
  // A few hand-placed layouts so different content reads differently.
  const layouts: Record<Kind, [number, number][]> = {
    rag: [
      [40, 60],
      [130, 40],
      [130, 100],
      [220, 70],
      [300, 50],
      [300, 100],
    ],
    agentic: [
      [170, 30],
      [80, 90],
      [260, 90],
      [120, 140],
      [220, 140],
      [170, 90],
    ],
    playbook: [
      [60, 40],
      [60, 90],
      [60, 140],
      [160, 65],
      [160, 115],
      [270, 90],
    ],
    streaming: [
      [40, 90],
      [110, 90],
      [180, 60],
      [180, 120],
      [260, 90],
      [320, 90],
    ],
    ml: [
      [50, 60],
      [50, 120],
      [150, 90],
      [240, 55],
      [240, 125],
      [320, 90],
    ],
    generic: [
      [60, 70],
      [160, 40],
      [160, 120],
      [260, 70],
      [320, 110],
      [110, 110],
    ],
  };
  const pts = layouts[kind];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
  ];
  return (
    <g>
      <g stroke="rgb(var(--accent))" strokeOpacity="0.45" strokeWidth="1.5">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={pts[a]?.[0]}
            y1={pts[a]?.[1]}
            x2={pts[b]?.[0]}
            y2={pts[b]?.[1]}
          />
        ))}
      </g>
      <g>
        {pts.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 3 ? 9 : 6}
            fill="rgb(var(--accent))"
            fillOpacity={i === 3 ? 0.95 : 0.55}
          />
        ))}
      </g>
    </g>
  );
}

export function CoverArt({
  kind = "generic",
  className,
  compact = false,
}: {
  kind?: Kind;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-muted",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/60 to-transparent" />
      <svg
        viewBox="0 0 360 180"
        className={cn("relative w-full", compact ? "h-28" : "h-44")}
        preserveAspectRatio="xMidYMid meet"
      >
        <Nodes kind={kind} />
      </svg>
      {!compact ? (
        <span className="absolute bottom-3 left-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-subtle">
          {LABELS[kind]}
        </span>
      ) : null}
    </div>
  );
}

export type CoverKind = Kind;
