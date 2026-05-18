"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "USD" | "IDR";

const USD_TO_IDR = 16000;

type UiState = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
};

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set({ currency }),
    }),
    { name: "monis-ui", skipHydration: true },
  ),
);

const idrFormatter = new Intl.NumberFormat("id-ID");

export function formatPrice(usd: number, currency: Currency): string {
  if (currency === "IDR") {
    const idr = Math.round((usd * USD_TO_IDR) / 1000) * 1000;
    return `Rp ${idrFormatter.format(idr)}`;
  }
  return `$${usd}`;
}
