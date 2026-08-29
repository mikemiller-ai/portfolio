"use client";

import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FilterableItem = {
  key: string;
  tags: string[];
  node: ReactNode;
};

/**
 * Generic client-side category filter + responsive grid. Cards are rendered on
 * the server and passed in as `node`, so this stays a thin interaction layer.
 */
export function FilterableGrid({
  items,
  filters,
  columns = "three",
  allLabel = "All",
}: {
  items: FilterableItem[];
  filters: string[];
  columns?: "two" | "three";
  allLabel?: string;
}) {
  const [active, setActive] = useState<string>(allLabel);

  const visible = useMemo(() => {
    if (active === allLabel) return items;
    return items.filter((item) => item.tags.includes(active));
  }, [active, allLabel, items]);

  const options = [allLabel, ...filters];

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {options.map((option) => {
          const isActive = active === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(option)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-subtle" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "item" : "items"}
        {active !== allLabel ? ` in ${active}` : ""}.
      </p>

      <div
        className={cn(
          "mt-6 grid gap-6",
          columns === "three"
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2",
        )}
      >
        {visible.map((item) => (
          <div key={item.key}>{item.node}</div>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-muted p-8 text-center text-muted-foreground">
          No items match this filter yet.
        </p>
      ) : null}
    </div>
  );
}
