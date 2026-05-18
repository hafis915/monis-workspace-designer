import type { ReactNode } from "react";

export type Category =
  | "desk"
  | "chair"
  | "monitor"
  | "accessory"
  | "lighting"
  | "greenery"
  | "coffee"
  | "outdoor"
  | "relax";

export type CategoryMeta = {
  id: Category;
  label: string;
  required: boolean;
  max: number; // 1 = single-select
};

export const CATEGORIES: CategoryMeta[] = [
  { id: "desk", label: "Desk", required: true, max: 1 },
  { id: "chair", label: "Chair", required: true, max: 1 },
  { id: "monitor", label: "Monitors", required: false, max: 3 },
  { id: "accessory", label: "Accessories", required: false, max: 4 },
  { id: "lighting", label: "Lighting", required: false, max: 1 },
  { id: "greenery", label: "Greenery", required: false, max: 1 },
  { id: "coffee", label: "Coffee", required: false, max: 1 },
  { id: "outdoor", label: "Outdoor gear", required: false, max: 1 },
  { id: "relax", label: "Relax zone", required: false, max: 1 },
];

export const CATEGORY_BY_ID: Record<Category, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<Category, CategoryMeta>;

export type Item = {
  id: string;
  category: Category;
  name: string;
  blurb: string;
  pricePerDay: number;
  scene: (index: number) => ReactNode; // index is the position within the category's selection (0, 1, 2, ...)
  thumb: ReactNode;
};

export type Selection = Partial<Record<Category, string[]>>;
