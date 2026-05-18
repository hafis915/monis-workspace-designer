"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CATALOG_BY_ID } from "./catalog";
import { CATEGORIES, CATEGORY_BY_ID, type Category, type Selection } from "./types";

export { formatPrice } from "./ui-store";
export type { Currency } from "./ui-store";

type State = {
  selection: Selection;
  toggle: (category: Category, itemId: string) => void;
  remove: (category: Category, itemId: string) => void;
  reset: () => void;
};

const DEFAULTS: Selection = {
  desk: ["desk-pandanus"],
  chair: ["chair-uluwatu"],
  lighting: ["lamp-bukit"],
  greenery: ["plant-monstera"],
  coffee: ["coffee-espresso"],
};

export const useDesigner = create<State>()(
  persist(
    (set) => ({
      selection: DEFAULTS,
      toggle: (category, itemId) =>
        set((s) => {
          const meta = CATEGORY_BY_ID[category];
          const current = s.selection[category] ?? [];
          if (current.includes(itemId)) {
            const next = current.filter((id) => id !== itemId);
            if (meta.required && next.length === 0) return s;
            return { selection: { ...s.selection, [category]: next } };
          }
          if (meta.max === 1) {
            return { selection: { ...s.selection, [category]: [itemId] } };
          }
          if (current.length >= meta.max) {
            return {
              selection: { ...s.selection, [category]: [...current.slice(1), itemId] },
            };
          }
          return { selection: { ...s.selection, [category]: [...current, itemId] } };
        }),
      remove: (category, itemId) =>
        set((s) => {
          const meta = CATEGORY_BY_ID[category];
          const current = s.selection[category] ?? [];
          const next = current.filter((id) => id !== itemId);
          if (meta.required && next.length === 0) return s;
          return { selection: { ...s.selection, [category]: next } };
        }),
      reset: () => set({ selection: DEFAULTS }),
    }),
    {
      name: "monis-designer-v3",
      skipHydration: true,
      partialize: (s) => ({ selection: s.selection }),
    },
  ),
);

export const totalPerDay = (selection: Selection): number => {
  let sum = 0;
  for (const ids of Object.values(selection)) {
    if (!ids) continue;
    for (const id of ids) {
      const item = CATALOG_BY_ID[id];
      sum += item?.pricePerDay ?? 0;
    }
  }
  return sum;
};

export type LineItem = {
  category: Category;
  item: ReturnType<typeof asItem>;
  index: number;
};

export const itemsInOrder = (selection: Selection): LineItem[] => {
  const result: LineItem[] = [];
  for (const cat of CATEGORIES) {
    const ids = selection[cat.id] ?? [];
    ids.forEach((id, index) => {
      const item = CATALOG_BY_ID[id];
      if (item) result.push({ category: cat.id, item, index });
    });
  }
  return result;
};

const asItem = (id: string) => CATALOG_BY_ID[id];

export const countInCategory = (selection: Selection, category: Category): number =>
  (selection[category] ?? []).length;

export const totalItemCount = (selection: Selection): number =>
  Object.values(selection).reduce((n, arr) => n + (arr?.length ?? 0), 0);

