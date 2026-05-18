"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
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

type Rect = { x: number; y: number; w: number; h: number };

const SCENE_W = 1200;
const SCENE_H = 750;
const ASPECT = SCENE_W / SCENE_H;
const MIN_W = 200;   // tightest zoom (zoom in)
const MAX_W = 1600;  // widest zoom (zoom out a bit past room)
const EDGE_BUFFER = 80;

const ZONE_RECT: Record<RealZoneKey, Rect> = {
  default: { x: 0,   y: 0,   w: 1200, h: 750 },
  desk:    { x: 240, y: 100, w: 686,  h: 400 },
  coffee:  { x: 0,   y: 320, w: 480,  h: 280 },
  gaming:  { x: 720, y: 160, w: 460,  h: 460 },
  fitness: { x: 760, y: 340, w: 440,  h: 320 },
};

const ZONE_BUTTONS: { key: RealZoneKey; label: string }[] = [
  { key: "default", label: "Room" },
  { key: "desk",    label: "Desk" },
  { key: "coffee",  label: "Coffee" },
  { key: "gaming",  label: "Gaming" },
  { key: "fitness", label: "Fitness" },
];

function boundsForRect(rect: Rect) {
  return {
    left:   -rect.x - EDGE_BUFFER,
    right:  SCENE_W - rect.x - rect.w + EDGE_BUFFER,
    top:    -rect.y - EDGE_BUFFER,
    bottom: SCENE_H - rect.y - rect.h + EDGE_BUFFER,
  };
}

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

const clamp = (n: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, n));

// Compute a normalized rect from a zone preset: keep aspect ratio, expand to
// fit the canvas aspect by enlarging the shorter side.
function normalizeRect(r: Rect): Rect {
  const targetAR = ASPECT;
  const ar = r.w / r.h;
  if (ar >= targetAR) {
    // wider than canvas aspect: grow height
    const newH = r.w / targetAR;
    return { x: r.x, y: r.y - (newH - r.h) / 2, w: r.w, h: newH };
  }
  const newW = r.h * targetAR;
  return { x: r.x - (newW - r.w) / 2, y: r.y, w: newW, h: r.h };
}

// Zoom around a focal point (sx, sy in container coords 0..1).
function zoomAround(vb: Rect, factor: number, fx: number, fy: number): Rect {
  const targetW = clamp(vb.w * factor, MIN_W, MAX_W);
  const targetH = targetW / ASPECT;
  return {
    x: vb.x + fx * (vb.w - targetW),
    y: vb.y + fy * (vb.h - targetH),
    w: targetW,
    h: targetH,
  };
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

  // Canonical viewBox state (numeric). Snaps to the zone preset whenever the
  // zone changes (via tab or zone button); free-form when zoomed via gesture.
  const [vb, setVb] = useState<Rect>(() => normalizeRect(ZONE_RECT[zone]));
  const containerRef = useRef<HTMLDivElement>(null);

  // Snap to zone when zone preset changes.
  useEffect(() => {
    setVb(normalizeRect(ZONE_RECT[zone]));
  }, [zone]);

  // Wheel / trackpad-pinch zoom.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const fx = (e.clientX - rect.left) / rect.width;
      const fy = (e.clientY - rect.top) / rect.height;
      // Negative deltaY -> zoom in
      const factor = e.deltaY > 0 ? 1.08 : 0.92;
      setVb((v) => zoomAround(v, factor, clamp(fx, 0, 1), clamp(fy, 0, 1)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch pinch (two-finger).
  const pinchRef = useRef<{ dist: number; vb: Rect; midFx: number; midFy: number } | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const distance = (a: Touch, b: Touch) =>
      Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return;
      const rect = el.getBoundingClientRect();
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      pinchRef.current = {
        dist: distance(e.touches[0], e.touches[1]),
        vb,
        midFx: clamp((midX - rect.left) / rect.width, 0, 1),
        midFy: clamp((midY - rect.top) / rect.height, 0, 1),
      };
    };
    const onTouchMove = (e: TouchEvent) => {
      const p = pinchRef.current;
      if (!p || e.touches.length !== 2) return;
      e.preventDefault();
      const d = distance(e.touches[0], e.touches[1]);
      const factor = p.dist / d; // dist grows -> we want smaller w (zoom in) -> factor < 1
      const targetW = clamp(p.vb.w * factor, MIN_W, MAX_W);
      const targetH = targetW / ASPECT;
      setVb({
        x: p.vb.x + p.midFx * (p.vb.w - targetW),
        y: p.vb.y + p.midFy * (p.vb.h - targetH),
        w: targetW,
        h: targetH,
      });
    };
    const onTouchEnd = () => {
      pinchRef.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [vb]);

  const zoomPercent = Math.round((SCENE_W / vb.w) * 100);

  const stepZoom = useCallback((factor: number) => {
    setVb((v) => zoomAround(v, factor, 0.5, 0.5));
  }, []);

  const isDefault =
    Math.abs(vb.x) < 1 && Math.abs(vb.y) < 1 && Math.abs(vb.w - SCENE_W) < 1;

  return (
    <div
      ref={containerRef}
      className="relative aspect-[12/7] w-full overflow-hidden rounded-3xl bg-white ring-1 ring-[var(--color-line)] touch-none"
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
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        animate={{ viewBox: `${vb.x} ${vb.y} ${vb.w} ${vb.h}` }}
        transition={{ duration: 0.18, ease }}
        className="relative block h-full w-full"
        style={{ perspective: "1400px" }}
      >
        <rect x={0} y={0} width={SCENE_W} height={530} fill="#FFFFFF" />
        <rect x={0} y={530} width={SCENE_W} height={220} fill="#F4F2EC" />
        <line x1={0} y1={530} x2={SCENE_W} y2={530} stroke="var(--color-line)" strokeWidth={1} />

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
                  const bounds = boundsForRect(rect);
                  const k = instanceKey(category, id, index);
                  const t = transforms[k] ?? { rotation: 0, swivelY: 0, flipX: false, scale: 1 };
                  const isSelected = selectedKey === k;
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

      {/* Zoom indicator + +/- */}
      <div
        className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)]/95 p-1 shadow-sm backdrop-blur"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => stepZoom(1.15)}
          aria-label="Zoom out"
          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 7 H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <span className="min-w-10 text-center text-[11px] tabular-nums text-[var(--color-ink)]">{zoomPercent}%</span>
        <button
          type="button"
          onClick={() => stepZoom(0.85)}
          aria-label="Zoom in"
          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 7 H12 M7 2 V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {!isDefault && (
          <button
            type="button"
            onClick={() => setVb(normalizeRect(ZONE_RECT.default))}
            className="ml-1 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)]"
          >
            Fit
          </button>
        )}
      </div>

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
