"use client";

import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDesigner } from "@/lib/store";
import { CATALOG_BY_ID, CoffeeTable } from "@/lib/catalog";
import type { Category } from "@/lib/types";

const LAYER_ORDER: Category[] = [
  "outdoor",
  "coffee",
  "lighting",
  "greenery",
  "desk",
  "monitor",
  "accessory",
  "chair",
  "relax",
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const slotMotion = {
  initial: { opacity: 0, y: 8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.96 },
  transition: { duration: 0.32, ease },
};

// Drag bounds per category (in viewBox units, applied to the wrapping motion.g).
const DRAG_BOUNDS: Partial<Record<Category, { left: number; right: number; top: number; bottom: number }>> = {
  monitor: { left: -80, right: 80, top: -10, bottom: 10 },
  accessory: { left: -50, right: 50, top: -15, bottom: 15 },
  greenery: { left: -120, right: 120, top: -20, bottom: 20 },
};

// viewBox per focus zone. All maintain 12:7 aspect.
const ZONE_VIEWBOX: Record<string, string> = {
  default: "0 0 1200 750",
  coffee: "0 320 686 400",
  relax: "740 360 480 280",
  desk: "240 100 686 400", // covers desk, chair, monitors, accessories
};

function zoneForCategory(category: Category | undefined): keyof typeof ZONE_VIEWBOX {
  if (!category) return "default";
  if (category === "coffee") return "coffee";
  if (category === "relax") return "relax";
  if (category === "desk" || category === "chair" || category === "monitor" || category === "accessory") return "desk";
  return "default";
}

type WorkspaceProps = {
  className?: string;
  activeCategory?: Category;
  forceUnzoom?: boolean;
  onExitZoom?: () => void;
};

export function Workspace({ className, activeCategory, forceUnzoom, onExitZoom }: WorkspaceProps) {
  const selection = useDesigner((s) => s.selection);
  const autoZone = zoneForCategory(activeCategory);
  const zone = forceUnzoom ? "default" : autoZone;
  const isZoomed = zone !== "default";

  return (
    <div className={className}>
      <div className="relative aspect-[12/7] w-full overflow-hidden rounded-3xl bg-[var(--color-paper-soft)] ring-1 ring-[var(--color-line)]">
        {/* sun wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 32% at 18% 14%, rgba(212,255,0,0.10), transparent 70%)",
          }}
        />

        <motion.svg
          viewBox={ZONE_VIEWBOX.default}
          animate={{ viewBox: ZONE_VIEWBOX[zone] }}
          transition={{ duration: 0.55, ease }}
          className="relative block h-full w-full"
        >
          {/* wall */}
          <rect x={0} y={0} width={1200} height={530} fill="var(--color-paper-soft)" />
          {/* floor */}
          <rect x={0} y={530} width={1200} height={220} fill="var(--color-paper-deep)" />
          <line x1={0} y1={530} x2={1200} y2={530} stroke="var(--color-line)" strokeWidth={1} />
          <rect x={0} y={530} width={1200} height={4} fill="var(--color-line)" opacity={0.6} />

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

          <AnimatePresence>
            {LAYER_ORDER.map((category) => {
              const ids = selection[category] ?? [];
              if (ids.length === 0) return null;
              return (
                <Fragment key={category}>
                  {category === "coffee" && (
                    <motion.g key="coffee-table" {...slotMotion}>
                      <CoffeeTable />
                    </motion.g>
                  )}
                  {ids.map((id, index) => {
                    const item = CATALOG_BY_ID[id];
                    if (!item) return null;
                    const bounds = DRAG_BOUNDS[category];
                    if (bounds) {
                      return (
                        <motion.g
                          key={`${category}-${id}-${index}`}
                          {...slotMotion}
                          drag
                          dragConstraints={bounds}
                          dragMomentum={false}
                          dragElastic={0.08}
                          whileHover={{ scale: 1.02 }}
                          whileDrag={{ scale: 1.04 }}
                          style={{ cursor: "grab" }}
                        >
                          {item.scene(index)}
                        </motion.g>
                      );
                    }
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
        </motion.svg>

        {/* Zoom indicator — click to exit */}
        <AnimatePresence>
          {isZoomed && (
            <motion.button
              type="button"
              onClick={onExitZoom}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-paper)] shadow-sm transition hover:bg-[var(--color-teal-deep)]"
              aria-label="Exit zoom"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
              Zoom · {zone === "desk" ? "Desk" : zone === "coffee" ? "Coffee" : "Relax"}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
