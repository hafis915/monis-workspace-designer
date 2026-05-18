"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CATALOG } from "@/lib/catalog";
import { useDesigner, totalPerDay } from "@/lib/store";
import { CATEGORIES, type Category } from "@/lib/types";

export function Picker() {
  const [active, setActive] = useState<Category>("desk");
  const selection = useDesigner((s) => s.selection);
  const select = useDesigner((s) => s.select);
  const clear = useDesigner((s) => s.clear);

  const total = totalPerDay(selection);
  const itemsForCat = CATALOG.filter((i) => i.category === active);
  const categoryMeta = CATEGORIES.find((c) => c.id === active)!;

  return (
    <div className="flex h-full flex-col">
      {/* tabs */}
      <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-3">
        {CATEGORIES.map((c) => {
          const selected = selection[c.id];
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={clsx(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] transition",
                isActive
                  ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-[var(--color-sand)]"
                  : "border-[var(--color-line)] text-[var(--color-charcoal-soft)] hover:border-[var(--color-charcoal-soft)] hover:text-[var(--color-charcoal)]",
              )}
            >
              {c.label}
              {selected ? (
                <span className={clsx("ml-1.5", isActive ? "opacity-80" : "opacity-50")}>•</span>
              ) : c.required ? (
                <span className={clsx("ml-1.5", isActive ? "opacity-80" : "opacity-40")}>○</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* category header */}
      <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-3">
        <div>
          <h2 className="font-display text-2xl leading-none tracking-tight text-[var(--color-charcoal)]">
            {categoryMeta.label}
          </h2>
          <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-[var(--color-charcoal-soft)]">
            {categoryMeta.required ? "Required" : "Optional"} · {itemsForCat.length} options
          </p>
        </div>
        {!categoryMeta.required && selection[active] && (
          <button
            onClick={() => clear(active)}
            className="text-xs uppercase tracking-[0.14em] text-[var(--color-charcoal-soft)] underline-offset-2 hover:text-[var(--color-terracotta-deep)] hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      {/* item grid */}
      <div className="-mr-2 flex-1 overflow-y-auto pr-2 pt-4">
        <div className="grid grid-cols-1 gap-3">
          {itemsForCat.map((item) => {
            const isSelected = selection[active] === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => select(active, item.id)}
                whileTap={{ scale: 0.985 }}
                className={clsx(
                  "group flex items-center gap-4 rounded-2xl border bg-[var(--color-sand-soft)] p-3 text-left transition",
                  isSelected
                    ? "border-[var(--color-charcoal)] ring-1 ring-[var(--color-charcoal)]"
                    : "border-[var(--color-line)] hover:border-[var(--color-charcoal-soft)]",
                )}
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  {item.thumb}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-base text-[var(--color-charcoal)]">
                      {item.name}
                    </span>
                    <span className="text-xs tabular-nums text-[var(--color-charcoal-soft)]">
                      ${item.pricePerDay}
                      <span className="opacity-60">/day</span>
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-[var(--color-charcoal-soft)]">
                    {item.blurb}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* sticky footer */}
      <div className="sticky bottom-0 -mx-5 mt-4 border-t border-[var(--color-line)] bg-[var(--color-sand)] px-5 pb-5 pt-4 lg:-mx-6 lg:px-6">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-charcoal-soft)]">
            Daily total
          </span>
          <span className="font-display text-2xl tabular-nums text-[var(--color-charcoal)]">
            ${total}
            <span className="text-sm text-[var(--color-charcoal-soft)]">/day</span>
          </span>
        </div>
        <Link
          href="/checkout"
          className={clsx(
            "block w-full rounded-full bg-[var(--color-charcoal)] py-3 text-center text-sm uppercase tracking-[0.14em] text-[var(--color-sand)] transition hover:bg-[var(--color-jungle-deep)]",
            (!selection.desk || !selection.chair) && "pointer-events-none opacity-40",
          )}
          aria-disabled={!selection.desk || !selection.chair}
        >
          Review your setup
        </Link>
      </div>
    </div>
  );
}
