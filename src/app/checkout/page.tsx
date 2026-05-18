import Link from "next/link";
import { CheckoutClient } from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1300px] flex-col px-5 pb-10 pt-6 lg:px-10">
      <header className="flex items-center justify-between pb-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-[var(--color-ink)]">
            monis<span className="text-[var(--color-lime-deep)]">.</span>rent
          </span>
        </Link>
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        >
          ← Back to designer
        </Link>
      </header>
      <CheckoutClient />
    </main>
  );
}
