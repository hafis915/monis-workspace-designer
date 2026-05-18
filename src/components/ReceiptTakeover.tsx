"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "./ShareButton";
import { formatPrice, type Currency } from "@/lib/ui-store";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export type ReceiptLine = {
  id: string;
  index: number;
  name: string;
  categoryLabel: string;
  pricePerDay: number;
};

type Props = {
  lines: ReceiptLine[];
  daily: number;
  subtotal: number;
  delivery: number;
  total: number;
  currency: Currency;
  shareBase: "/" | "/real";
  sharePayload: unknown;
  designerHref: "/" | "/real";
};

// Deterministic 6-char confirmation code derived from the cart so the user
// always sees the same number for the same setup. Avoids React-state churn.
function confirmationCode(lines: ReceiptLine[], total: number): string {
  let h = 0;
  const seed = `${total}|${lines.map((l) => l.id).join(",")}`;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let n = Math.abs(h);
  let out = "";
  for (let i = 0; i < 6; i++) {
    out = ALPHABET[n % ALPHABET.length] + out;
    n = Math.floor(n / ALPHABET.length);
  }
  return `MNS-${out}`;
}

export function ReceiptTakeover({
  lines,
  daily,
  subtotal,
  delivery,
  total,
  currency,
  shareBase,
  sharePayload,
  designerHref,
}: Props) {
  const code = useMemo(() => confirmationCode(lines, total), [lines, total]);
  const deliveryDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.15 }}
      className="flex flex-col"
      role="status"
      aria-live="polite"
    >
      <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
        Confirmation · {code}
      </span>
      <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-tight text-[var(--color-ink)] sm:text-6xl">
        Reserved.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-ink-soft)]">
        Lands at your door <span className="text-[var(--color-ink)]">{deliveryDate}</span>.
        We&apos;ll text you a 30-minute delivery window the night before.
      </p>

      <ul className="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {lines.map((line) => (
          <li key={`${line.id}-${line.index}`} className="flex items-baseline justify-between gap-4 py-2.5">
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm text-[var(--color-ink)]">{line.name}</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
                {line.categoryLabel}
              </div>
            </div>
            <div className="shrink-0 text-sm tabular-nums text-[var(--color-ink-soft)]">
              {formatPrice(line.pricePerDay, currency)}<span className="opacity-60">/day</span>
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-[var(--color-ink-soft)]">
          <dt>30 days at {formatPrice(daily, currency)}/day</dt>
          <dd className="tabular-nums">{formatPrice(subtotal, currency)}</dd>
        </div>
        <div className="flex justify-between text-[var(--color-ink-soft)]">
          <dt>Delivery &amp; setup</dt>
          <dd className="tabular-nums">{formatPrice(delivery, currency)}</dd>
        </div>
        <div className="mt-3 flex items-baseline justify-between border-t border-[var(--color-line)] pt-3">
          <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
            Charged on delivery
          </dt>
          <dd className="font-display text-3xl tabular-nums text-[var(--color-ink)]">
            {formatPrice(total, currency)}
          </dd>
        </div>
      </dl>

      <ShareButton basePath={shareBase} payload={sharePayload} />

      <Link
        href={designerHref}
        className="mt-2 inline-flex w-full items-center justify-center rounded-full py-2.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
      >
        ← Build another
      </Link>

      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
        Demo · no payment was taken
      </p>
    </motion.div>
  );
}
