"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { RealWorkspace } from "@/components/RealWorkspace";
import {
  useRealDesigner,
  realTotalPerDay,
  realItemsInOrder,
} from "@/lib/store-real";
import { REAL_CATEGORY_BY_ID } from "@/lib/catalog-real";
import { useUi, formatPrice } from "@/lib/ui-store";

const RENTAL_DAYS = 30;
const DELIVERY = 12;
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function RealCheckoutClient() {
  const [reserved, setReserved] = useState(false);
  const selection = useRealDesigner((s) => s.selection);
  const currency = useUi((s) => s.currency);
  const daily = realTotalPerDay(selection);
  const items = realItemsInOrder(selection);
  const subtotal = daily * RENTAL_DAYS;
  const total = subtotal + DELIVERY;

  if (items.length === 0) {
    return (
      <section className="my-16 text-center">
        <h1 className="font-display text-4xl text-[var(--color-ink)]">Nothing selected yet</h1>
        <p className="mt-3 text-[var(--color-ink-soft)]">
          Head back to the designer and pick at least a desk and a chair.
        </p>
        <Link
          href="/real"
          className="mt-6 inline-block rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[var(--color-paper)]"
        >
          Start designing
        </Link>
      </section>
    );
  }

  return (
    <section className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
          Your setup
        </span>
        <RealWorkspace />
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
          We&apos;ll deliver and set up within 24 hours anywhere on the island.
          Rental runs day-to-day — keep it as long as you need.
        </p>
      </div>

      <div className="flex flex-col">
        <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
          Order summary · {items.length} items
        </span>
        <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Reserve your workspace.
        </h1>

        <ul className="mt-6 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {items.map((line, i) => (
            <li
              key={`${line.item.id}-${line.index}-${i}`}
              className="flex items-center gap-4 py-3"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                <Image
                  src={line.item.imageUrl}
                  alt={line.item.name}
                  fill
                  sizes="48px"
                  unoptimized
                  style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                />
              </div>
              <div className="flex-1">
                <div className="font-display text-base text-[var(--color-ink)]">{line.item.name}</div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
                  {REAL_CATEGORY_BY_ID[line.category].label}
                </div>
              </div>
              <div className="text-right tabular-nums">
                <div className="text-sm text-[var(--color-ink)]">
                  {formatPrice(line.item.pricePerDay, currency)}
                  <span className="text-xs text-[var(--color-ink-soft)]">/day</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between text-[var(--color-ink-soft)]">
            <dt>Daily rate</dt>
            <dd className="tabular-nums">{formatPrice(daily, currency)}/day</dd>
          </div>
          <div className="flex justify-between text-[var(--color-ink-soft)]">
            <dt>{RENTAL_DAYS} days</dt>
            <dd className="tabular-nums">{formatPrice(subtotal, currency)}</dd>
          </div>
          <div className="flex justify-between text-[var(--color-ink-soft)]">
            <dt>Delivery &amp; setup</dt>
            <dd className="tabular-nums">{formatPrice(DELIVERY, currency)}</dd>
          </div>
          <div className="mt-3 flex items-baseline justify-between border-t border-[var(--color-line)] pt-3">
            <dt className="font-display text-lg text-[var(--color-ink)]">Total this month</dt>
            <dd className="font-display text-2xl tabular-nums text-[var(--color-ink)]">
              {formatPrice(total, currency)}
            </dd>
          </div>
        </dl>

        <button
          onClick={() => setReserved(true)}
          disabled={reserved}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-ink)] py-3.5 text-sm uppercase tracking-[0.14em] text-[var(--color-paper)] transition hover:bg-[var(--color-teal-deep)] disabled:opacity-60"
        >
          {reserved ? "Reserved — see you soon" : "Reserve setup"}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--color-ink-soft)]">
          No payment is taken in this demo.
        </p>

        <div role="status" aria-live="polite" aria-atomic="true">
          <AnimatePresence>
            {reserved && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease }}
                className="mt-5 rounded-2xl border border-[var(--color-teal)] bg-[var(--color-paper-soft)] p-4 text-sm text-[var(--color-teal-deep)]"
              >
                Workspace reserved. Our team will be in touch about delivery
                within the next few hours.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
