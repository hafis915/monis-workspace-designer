import type { ReactNode } from "react";

export type Category =
  | "desk"
  | "chair"
  | "monitor"
  | "lighting"
  | "plant"
  | "extra";

export const CATEGORIES: { id: Category; label: string; required: boolean }[] = [
  { id: "desk", label: "Desks", required: true },
  { id: "chair", label: "Chairs", required: true },
  { id: "monitor", label: "Monitors", required: false },
  { id: "lighting", label: "Lighting", required: false },
  { id: "plant", label: "Plants", required: false },
  { id: "extra", label: "Extras", required: false },
];

export type Item = {
  id: string;
  category: Category;
  name: string;
  blurb: string;
  pricePerDay: number; // USD
  scene: ReactNode;
  thumb: ReactNode;
};

export type Selection = Partial<Record<Category, string>>;
