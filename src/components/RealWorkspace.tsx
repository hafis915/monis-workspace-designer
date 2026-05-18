"use client";

import { Fragment } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRealDesigner, instanceKey } from "@/lib/store-real";
import {
  REAL_CATALOG_BY_ID,
  type RealCategory,
} from "@/lib/catalog-real";

const LAYER_ORDER: RealCategory[] = [
  "gaming",
  "lighting",
  "coffee",
  "desk",
  "monitor",
  "accessory",
  "computer",
  "chair",
  "fitness",
];

export type RealZoneKey = "default" | "desk" | "coffee" | "gaming" | "fitness";

const ZONE_VIEWBOX: Record<RealZoneKey, string> = {
  default: "0 0 1200 750",
  desk:    "240 100 686 400",
  coffee:  "0 320 480 280",
  gaming:  "720 160 460 460",
  fitness: "760 340 440 320",
};

const ZONE_BUTTONS: { key: RealZoneKey; label: string }[] = [
  { key: "default", label: "Room" },
  { key: "desk",    label: "Desk" },
  { key: "coffee",  label: "Coffee" },
  { key: "gaming",  label: "Gaming" },
  { key: "fitness", label: "Fitness" },
];

const DRAG_BOUNDS: Record<RealCategory, { left: number; right: number; top: number; bottom: number }> = {
  desk:      { left: -40,  right: 40,  top: -15, bottom: 15 },
  chair:     { left: -70,  right: 70,  top: -20, bottom: 20 },
  monitor:   { left: -90,  right: 90,  top: -20, bottom: 20 },
  accessory: { left: -60,  right: 60,  top: -20, bottom: 20 },
  lighting:  { left: -80,  right: 80,  top: -30, bottom: 30 },
  coffee:    { left: -80,  right: 80,  top: -20, bottom: 20 },
  computer:  { left: -80,  right: 80,  top: -20, bottom: 20 },
  gaming:    { left: -100, right: 100, top: -40, bottom: 40 },
  fitness:   { left: -100, right: 100, top: -40, bottom: 40 },
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const slotMotion = {
  initial: { opacity: 0, y: 8, scale: 0.96 },
  exit:    { opacity: 0, y: -6, scale: 0.96 },
};

function autoZoneForCategory(category?: RealCategory): RealZoneKey {
  if (!category) return "default";
  if (category === "coffee") return "coffee";
  if (category === "gaming") return "gaming";
  if (category === "fitness") return "fitness";
  if (
    category === "desk" ||
    category === "chair" ||
    category === "monitor" ||
    category === "accessory" ||
    category === "computer"
  )
    return "desk";
  return "default";
}

type Props = {
  activeCategory?: RealCategory;
  manualZone?: RealZoneKey | null;
  onZoneChange?: (z: RealZoneKey | null) => void;
  selectedKey?: string | null;
  onSelectChange?: (key: string | null) => void;
};

export function RealWorkspace({
  activeCategory,
  manualZone,
  onZoneChange,
  selectedKey,
  onSelectChange,
}: Props) {
  const selection = useRealDesigner((s) => s.selection);
  const transforms = useRealDesigner((s) => s.transforms);
  const autoZone = autoZoneForCategory(activeCategory);
  const zone: RealZoneKey = manualZone ?? autoZone;

  return (
    <div
      className="relative aspect-[12/7] w-full overflow-hidden rounded-3xl bg-white ring-1 ring-[var(--color-line)]"
      onClick={() => onSelectChange?.(null)}
    >
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
        style={{ perspective: "1400px" }}
      >
        <rect x={0} y={0} width={1200} height={530} fill="#FFFFFF" />
        <rect x={0} y={530} width={1200} height={220} fill="#F4F2EC" />
        <line x1={0} y1={530} x2={1200} y2={530} stroke="var(--color-line)" strokeWidth={1} />

        <AnimatePresence>
          {LAYER_ORDER.map((category) => {
            const ids = selection[category] ?? [];
            if (ids.length === 0) return null;
            return (
              <Fragment key={category}>
                {ids.map((id, index) => {
                  const item = REAL_CATALOG_BY_ID[id];
                  if (!item) return null;
                  const rect = item.position(index);
                  const bounds = DRAG_BOUNDS[category];
                  const k = instanceKey(category, id, index);
                  const t = transforms[k] ?? { rotation: 0, swivelY: 0, flipX: false, scale: 1 };
                  const isSelected = selectedKey === k;
                  // center the rect so rotation/scale orbit the item center
                  const cx = rect.x + rect.w / 2;
                  const cy = rect.y + rect.h / 2;
                  return (
                    <motion.g
                      key={`${category}-${id}-${index}`}
                      initial={slotMotion.initial}
                      exit={slotMotion.exit}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotate: t.rotation,
                        rotateY: t.swivelY,
                        scaleX: t.flipX ? -t.scale : t.scale,
                        scaleY: t.scale,
                      }}
                      transition={{ duration: 0.32, ease }}
                      drag
                      dragConstraints={bounds}
                      dragMomentum={false}
                      dragElastic={0.08}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectChange?.(k);
                      }}
                      whileHover={{ scaleX: t.flipX ? -t.scale * 1.02 : t.scale * 1.02, scaleY: t.scale * 1.02 }}
                      whileDrag={{ scaleX: t.flipX ? -t.scale * 1.05 : t.scale * 1.05, scaleY: t.scale * 1.05 }}
                      style={{
                        cursor: "grab",
                        transformOrigin: `${cx}px ${cy}px`,
                        transformBox: "view-box",
                      }}
                    >
                      <image
                        href={item.imageUrl}
                        x={rect.x}
                        y={rect.y}
                        width={rect.w}
                        height={rect.h}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ mixBlendMode: "multiply", pointerEvents: "auto" }}
                      />
                      {isSelected && (
                        <rect
                          x={rect.x - 6}
                          y={rect.y - 6}
                          width={rect.w + 12}
                          height={rect.h + 12}
                          fill="none"
                          stroke="var(--color-lime-deep)"
                          strokeWidth={2}
                          strokeDasharray="6 4"
                          rx={6}
                          pointerEvents="none"
                        />
                      )}
                    </motion.g>
                  );
                })}
              </Fragment>
            );
          })}
        </AnimatePresence>
      </motion.svg>

      {/* Zone control bar */}
      <div
        className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2"
        onClick={(e) => e.stopPropagation()}
      >
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
  );
}
