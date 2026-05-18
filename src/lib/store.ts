"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CATALOG_BY_ID } from "./catalog";
import type { Category, Selection } from "./types";

type State = {
  selection: Selection;
  select: (category: Category, itemId: string) => void;
  clear: (category: Category) => void;
  reset: () => void;
};

const DEFAULTS: Selection = {
  desk: "desk-pandanus",
  chair: "chair-uluwatu",
};

export const useDesigner = create<State>()(
  persist(
    (set) => ({
      selection: DEFAULTS,
      select: (category, itemId) =>
        set((s) => ({ selection: { ...s.selection, [category]: itemId } })),
      clear: (category) =>
        set((s) => {
          const next = { ...s.selection };
          delete next[category];
          return { selection: next };
        }),
      reset: () => set({ selection: DEFAULTS }),
    }),
    { name: "monis-designer", skipHydration: true },
  ),
);

export const totalPerDay = (selection: Selection): number =>
  Object.values(selection).reduce((sum, id) => {
    if (!id) return sum;
    const item = CATALOG_BY_ID[id];
    return sum + (item?.pricePerDay ?? 0);
  }, 0);

export const itemsInOrder = (selection: Selection) => {
  const order: Category[] = ["desk", "chair", "monitor", "lighting", "plant", "extra"];
  return order
    .map((c) => (selection[c] ? CATALOG_BY_ID[selection[c]!] : null))
    .filter(Boolean) as ReturnType<typeof asItem>[];
};

const asItem = (id: string) => CATALOG_BY_ID[id];
