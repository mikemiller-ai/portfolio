"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItemData = {
  id: string;
  question: string;
  meta?: string;
  content: ReactNode;
};

/**
 * Progressive-disclosure list. Each item expands independently. Fully
 * keyboard-operable via native <button> + aria-expanded/aria-controls.
 */
export function Accordion({
  items,
  defaultOpenId,
}: {
  items: AccordionItemData[];
  defaultOpenId?: string;
}) {
  const [open, setOpen] = useState<Set<string>>(
    new Set(defaultOpenId ? [defaultOpenId] : []),
  );
  const baseId = useId();

  const toggle = (id: string) =>
    setOpen((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) nextSet.delete(id);
      else nextSet.add(id);
      return nextSet;
    });

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted"
              >
                <span>
                  <span className="text-[0.95rem] font-semibold text-foreground">
                    {item.question}
                  </span>
                  {item.meta ? (
                    <span className="mt-0.5 block font-mono text-xs text-subtle">
                      {item.meta}
                    </span>
                  ) : null}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-subtle transition-transform duration-300",
                    isOpen && "rotate-180 text-primary",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              hidden={!isOpen}
              className="px-5 pb-5 pt-0 text-sm leading-relaxed text-muted-foreground"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
