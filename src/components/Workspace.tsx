"use client";

import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDesigner } from "@/lib/store";
import { CATALOG_BY_ID } from "@/lib/catalog";
import type { Category } from "@/lib/types";

// Back-to-front draw order. Wall stuff first, then floor, then desk + on-desk.
const LAYER_ORDER: Category[] = [
  "outdoor",      // leans against right wall
  "coffee",       // far left wall area
  "lighting",     // tall floor lamp goes behind
  "greenery",     // floor plant
  "desk",
  "monitor",      // on desk (between desk and chair)
  "accessory",    // on desk
  "chair",        // in front of desk
  "relax",        // foreground front-right
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const slotMotion = {
  initial: { opacity: 0, y: 8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.96 },
  transition: { duration: 0.32, ease },
};

export function Workspace({ className }: { className?: string }) {
  const selection = useDesigner((s) => s.selection);

  return (
    <div className={className}>
      <div className="relative aspect-[12/7] w-full overflow-hidden rounded-3xl bg-[var(--color-paper-soft)] ring-1 ring-[var(--color-line)]">
        {/* sun wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 32% at 18% 14%, rgba(212,255,0,0.10), transparent 70%)",
          }}
        />

        <svg viewBox="0 0 1200 750" className="block h-full w-full">
          {/* wall */}
          <rect x={0} y={0} width={1200} height={530} fill="var(--color-paper-soft)" />
          {/* floor */}
          <rect x={0} y={530} width={1200} height={220} fill="var(--color-paper-deep)" />
          {/* horizon line */}
          <line x1={0} y1={530} x2={1200} y2={530} stroke="var(--color-line)" strokeWidth={1} />
          <rect x={0} y={530} width={1200} height={4} fill="var(--color-line)" opacity={0.6} />

          {/* subtle floor pattern (block-printed feel) */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`floor${i}`}
              x1={i * 100}
              y1={530}
              x2={i * 100 - 60}
              y2={750}
              stroke="var(--color-line)"
              strokeWidth={0.5}
              opacity={0.5}
            />
          ))}

          {/* layers */}
          <AnimatePresence>
            {LAYER_ORDER.map((category) => {
              const ids = selection[category] ?? [];
              if (ids.length === 0) return null;
              return (
                <Fragment key={category}>
                  {ids.map((id, index) => {
                    const item = CATALOG_BY_ID[id];
                    if (!item) return null;
                    return (
                      <motion.g key={`${category}-${id}-${index}`} {...slotMotion}>
                        {item.scene(index)}
                      </motion.g>
                    );
                  })}
                </Fragment>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
}
