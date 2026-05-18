"use client";

import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
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

const DRAG_BOUNDS: Record<Category, { left: number; right: number; top: number; bottom: number }> = {
  desk:      { left: -50,  right: 50,  top: -10, bottom: 10 },
  chair:     { left: -70,  right: 70,  top: -20, bottom: 20 },
  monitor:   { left: -80,  right: 80,  top: -15, bottom: 15 },
  accessory: { left: -50,  right: 50,  top: -15, bottom: 15 },
  lighting:  { left: -100, right: 100, top: -30, bottom: 30 },
  greenery:  { left: -140, right: 140, top: -30, bottom: 30 },
  coffee:    { left: -60,  right: 60,  top: -10, bottom: 10 },
  outdoor:   { left: -80,  right: 80,  top: -40, bottom: 40 },
  relax:     { left: -100, right: 100, top: -40, bottom: 40 },
};

export type ZoneKey = "default" | "coffee" | "relax" | "desk";

const ZONE_VIEWBOX: Record<ZoneKey, string> = {
  default: "0 0 1200 750",
  coffee: "0 320 686 400",
  relax: "740 360 480 280",
  desk: "240 100 686 400",
};

const ZONE_BUTTONS: { key: ZoneKey; label: string }[] = [
  { key: "default", label: "Room" },
  { key: "desk", label: "Desk" },
  { key: "coffee", label: "Coffee" },
  { key: "relax", label: "Relax" },
];

function autoZoneForCategory(category: Category | undefined): ZoneKey {
  if (!category) return "default";
  if (category === "coffee") return "coffee";
  if (category === "relax") return "relax";
  if (category === "desk" || category === "chair" || category === "monitor" || category === "accessory") return "desk";
  return "default";
}

type WorkspaceProps = {
  className?: string;
  activeCategory?: Category;
  manualZone?: ZoneKey | null;
  onZoneChange?: (zone: ZoneKey | null) => void;
};

export function Workspace({ className, activeCategory, manualZone, onZoneChange }: WorkspaceProps) {
  const selection = useDesigner((s) => s.selection);
  const autoZone = autoZoneForCategory(activeCategory);
  const zone: ZoneKey = manualZone ?? autoZone;

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

        {/* Zone control bar */}
        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)]/95 p-1 shadow-sm backdrop-blur">
            {ZONE_BUTTONS.map((b) => {
              const isActive = zone === b.key;
              return (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => onZoneChange?.(b.key)}
                  className={clsx(
                    "rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition",
                    isActive
                      ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                      : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)]",
                  )}
                  aria-pressed={isActive}
                >
                  {isActive && b.key !== "default" && (
                    <span className="mr-1 inline-block h-1 w-1 rounded-full bg-[var(--color-lime)] align-middle" />
                  )}
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
