"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDesigner } from "@/lib/store";
import { CATALOG_BY_ID } from "@/lib/catalog";
import type { Category } from "@/lib/types";

const LAYER_ORDER: Category[] = [
  "extra",    // rug behind / shelf above (rendered first; shelf is on the wall and naturally sits behind everything)
  "plant",    // background plant
  "desk",
  "chair",
  "monitor",
  "lighting",
];

const slotMotion = {
  initial: { opacity: 0, y: 8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.96 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export function Workspace({ className }: { className?: string }) {
  const selection = useDesigner((s) => s.selection);

  return (
    <div className={className}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[var(--color-sand-soft)] ring-1 ring-[var(--color-line)]">
        {/* sun light wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 22% 18%, rgba(200,163,86,0.18), transparent 70%)",
          }}
        />

        <svg viewBox="0 0 800 600" className="block h-full w-full">
          {/* wall */}
          <rect x={0} y={0} width={800} height={460} fill="var(--color-sand-soft)" />
          {/* floor */}
          <rect x={0} y={460} width={800} height={140} fill="var(--color-sand-deep)" />
          <line x1={0} y1={460} x2={800} y2={460} stroke="var(--color-line)" strokeWidth={1} />
          {/* faint baseboard */}
          <rect x={0} y={460} width={800} height={4} fill="var(--color-line)" opacity={0.6} />

          {/* layers */}
          <AnimatePresence>
            {LAYER_ORDER.map((category) => {
              const id = selection[category];
              if (!id) return null;
              const item = CATALOG_BY_ID[id];
              if (!item) return null;
              return (
                <motion.g key={`${category}-${id}`} {...slotMotion}>
                  {item.scene}
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
}
