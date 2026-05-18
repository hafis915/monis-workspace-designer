import Link from "next/link";
import { RealCheckoutClient } from "./RealCheckoutClient";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { ViewToggle } from "@/components/ViewToggle";

export default function RealCheckoutPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1300px] flex-col px-5 pb-10 pt-6 lg:px-10">
      <header className="flex items-center justify-between pb-6">
        <Link href="/real" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-[var(--color-ink)]">
            monis<span className="text-[var(--color-lime-deep)]">.</span>rent
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ViewToggle />
          <CurrencyToggle />
          <Link
            href="/real"
            className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            ← Back to designer
          </Link>
        </div>
      </header>
      <RealCheckoutClient />
    </main>
  );
}
