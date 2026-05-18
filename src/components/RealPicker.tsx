"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  REAL_CATALOG,
  REAL_CATEGORIES,
  REAL_CATEGORY_BY_ID,
  type RealCategory,
} from "@/lib/catalog-real";
import {
  useRealDesigner,
  realTotalPerDay,
  realCountInCategory,
  realTotalItemCount,
} from "@/lib/store-real";
import { useUi, formatPrice } from "@/lib/ui-store";

type Props = {
  active: RealCategory;
  onActiveChange: (cat: RealCategory) => void;
};

export function RealPicker({ active, onActiveChange }: Props) {
  const setActive = onActiveChange;
  const selection = useRealDesigner((s) => s.selection);
  const toggle = useRealDesigner((s) => s.toggle);

  const total = realTotalPerDay(selection);
  const currency = useUi((s) => s.currency);
  const itemsForCat = REAL_CATALOG.filter((i) => i.category === active);
  const categoryMeta = REAL_CATEGORY_BY_ID[active];
  const selectedIds = selection[active] ?? [];
  const atMax = selectedIds.length >= categoryMeta.max;

  return (
    <div className="flex h-full flex-col">
      <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-3">
        {REAL_CATEGORIES.map((c) => {
          const count = realCountInCategory(selection, c.id);
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={clsx(
                "shrink-0 rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition",
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
              )}
            >
              <span>{c.label}</span>
              {count > 0 && (
                <span
                  className={clsx(
                    "ml-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium",
                    isActive
                      ? "bg-[var(--color-lime)] text-[var(--color-ink)]"
                      : "bg-[var(--color-ink)] text-[var(--color-paper)]",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-3">
        <div>
          <h2 className="font-display text-2xl leading-none tracking-tight text-[var(--color-ink)]">
            {categoryMeta.label}
          </h2>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
            {categoryMeta.required ? "Required" : "Optional"} ·{" "}
            {categoryMeta.max === 1
              ? "Pick one"
              : `Pick up to ${categoryMeta.max}`}{" "}
            · {itemsForCat.length} options
          </p>
        </div>
      </div>

      <div className="-mr-2 flex-1 overflow-y-auto pr-2 pt-4">
        <div className="grid grid-cols-1 gap-3">
          {itemsForCat.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            const isDisabled = !isSelected && atMax && categoryMeta.max > 1;
            return (
              <motion.button
                key={item.id}
                onClick={() => toggle(active, item.id)}
                whileTap={isDisabled ? undefined : { scale: 0.985 }}
                disabled={isDisabled}
                className={clsx(
                  "group flex items-center gap-4 rounded-2xl border bg-[var(--color-paper-soft)] p-3 text-left transition",
                  isSelected
                    ? "border-[var(--color-ink)] ring-1 ring-[var(--color-ink)]"
                    : isDisabled
                      ? "cursor-not-allowed border-[var(--color-line)] opacity-40"
                      : "border-[var(--color-line)] hover:border-[var(--color-ink-soft)]",
                )}
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="56px"
                    unoptimized
                    style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-base text-[var(--color-ink)]">
                      {item.name}
                    </span>
                    <span className="text-xs tabular-nums text-[var(--color-ink-soft)]">
                      {formatPrice(item.pricePerDay, currency)}
                      <span className="opacity-60">/day</span>
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-[var(--color-ink-soft)]">
                    {item.blurb}
                  </p>
                </div>
                {isSelected && categoryMeta.max > 1 && (
                  <span className="font-medium text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
                    Tap to remove
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 mt-4 border-t border-[var(--color-line)] bg-[var(--color-paper)] px-5 pb-5 pt-4 lg:-mx-6 lg:px-6">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
            Daily total · {realTotalItemCount(selection)} items
          </span>
          <span className="font-display text-2xl tabular-nums text-[var(--color-ink)]">
            {formatPrice(total, currency)}
            <span className="text-sm text-[var(--color-ink-soft)]">/day</span>
          </span>
        </div>
        <Link
          href="/real/checkout"
          className={clsx(
            "block w-full rounded-full bg-[var(--color-ink)] py-3 text-center text-sm uppercase tracking-[0.14em] text-[var(--color-paper)] transition hover:bg-[var(--color-teal-deep)]",
            ((selection.desk ?? []).length === 0 || (selection.chair ?? []).length === 0) &&
              "pointer-events-none opacity-40",
          )}
        >
          Review your setup
        </Link>
      </div>
    </div>
  );
}
