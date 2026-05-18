"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  REAL_CATALOG_BY_ID,
  REAL_CATEGORIES,
  REAL_CATEGORY_BY_ID,
  type RealCategory,
  type RealSelection,
} from "./catalog-real";

export type ItemTransform = { rotation: number; scale: number };

const DEFAULT_TRANSFORM: ItemTransform = { rotation: 0, scale: 1 };

type State = {
  selection: RealSelection;
  transforms: Record<string, ItemTransform>; // key: instanceKey
  toggle: (category: RealCategory, itemId: string) => void;
  setTransform: (key: string, patch: Partial<ItemTransform>) => void;
  resetTransform: (key: string) => void;
  reset: () => void;
};

const DEFAULTS: RealSelection = {
  desk: ["desk-electric"],
  chair: ["chair-ergo"],
};

export function instanceKey(category: RealCategory, itemId: string, index: number) {
  return `${category}:${itemId}:${index}`;
}

const ROT_MIN = -180;
const ROT_MAX = 180;
const SCALE_MIN = 0.3;
const SCALE_MAX = 2;

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export const useRealDesigner = create<State>()(
  persist(
    (set) => ({
      selection: DEFAULTS,
      transforms: {},
      toggle: (category, itemId) =>
        set((s) => {
          const meta = REAL_CATEGORY_BY_ID[category];
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
      setTransform: (key, patch) =>
        set((s) => {
          const cur = s.transforms[key] ?? DEFAULT_TRANSFORM;
          const next: ItemTransform = {
            rotation:
              patch.rotation !== undefined
                ? clamp(patch.rotation, ROT_MIN, ROT_MAX)
                : cur.rotation,
            scale:
              patch.scale !== undefined
                ? clamp(patch.scale, SCALE_MIN, SCALE_MAX)
                : cur.scale,
          };
          return { transforms: { ...s.transforms, [key]: next } };
        }),
      resetTransform: (key) =>
        set((s) => {
          const next = { ...s.transforms };
          delete next[key];
          return { transforms: next };
        }),
      reset: () => set({ selection: DEFAULTS, transforms: {} }),
    }),
    {
      name: "monis-real-v1",
      skipHydration: true,
      partialize: (s) => ({ selection: s.selection, transforms: s.transforms }),
    },
  ),
);

export const realTotalPerDay = (selection: RealSelection): number => {
  let sum = 0;
  for (const ids of Object.values(selection)) {
    if (!ids) continue;
    for (const id of ids) {
      const item = REAL_CATALOG_BY_ID[id];
      sum += item?.pricePerDay ?? 0;
    }
  }
  return sum;
};

export type RealLineItem = {
  category: RealCategory;
  item: (typeof REAL_CATALOG_BY_ID)[string];
  index: number;
};

export const realItemsInOrder = (selection: RealSelection): RealLineItem[] => {
  const result: RealLineItem[] = [];
  for (const cat of REAL_CATEGORIES) {
    const ids = selection[cat.id] ?? [];
    ids.forEach((id, index) => {
      const item = REAL_CATALOG_BY_ID[id];
      if (item) result.push({ category: cat.id, item, index });
    });
  }
  return result;
};

export const realCountInCategory = (selection: RealSelection, category: RealCategory): number =>
  (selection[category] ?? []).length;

export const realTotalItemCount = (selection: RealSelection): number =>
  Object.values(selection).reduce((n, arr) => n + (arr?.length ?? 0), 0);
