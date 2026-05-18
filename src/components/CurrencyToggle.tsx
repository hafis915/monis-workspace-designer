"use client";

import clsx from "clsx";
import { useDesigner } from "@/lib/store";

const OPTIONS = [
  { id: "USD", label: "USD" },
  { id: "IDR", label: "IDR" },
] as const;

export function CurrencyToggle() {
  const currency = useDesigner((s) => s.currency);
  const setCurrency = useDesigner((s) => s.setCurrency);

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] p-0.5"
      role="tablist"
      aria-label="Currency"
    >
      {OPTIONS.map((o) => {
        const active = currency === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setCurrency(o.id)}
            role="tab"
            aria-selected={active}
            className={clsx(
              "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] transition",
              active
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
