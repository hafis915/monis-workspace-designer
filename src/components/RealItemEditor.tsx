"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRealDesigner, type ItemTransform } from "@/lib/store-real";

const RotateCcw = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RotateCw = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Props = {
  selectedKey: string | null;
  itemName?: string;
  onDeselect: () => void;
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function RealItemEditor({ selectedKey, itemName, onDeselect }: Props) {
  const transforms = useRealDesigner((s) => s.transforms);
  const setTransform = useRealDesigner((s) => s.setTransform);
  const resetTransform = useRealDesigner((s) => s.resetTransform);

  const t: ItemTransform =
    (selectedKey && transforms[selectedKey]) || { rotation: 0, scale: 1 };

  if (!selectedKey) return null;

  const patch = (p: Partial<ItemTransform>) => setTransform(selectedKey, p);

  return (
    <AnimatePresence>
      <motion.div
        key={selectedKey}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease }}
        className="absolute right-3 top-3 z-20 flex w-[260px] flex-col gap-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)]/95 p-3 shadow-md backdrop-blur"
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
              Editing
            </p>
            <p className="truncate font-display text-sm leading-tight text-[var(--color-ink)]">
              {itemName ?? "Item"}
            </p>
          </div>
          <button
            onClick={onDeselect}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M2 2 L10 10 M10 2 L2 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Rotation */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
              Rotation
            </span>
            <span className="text-xs tabular-nums text-[var(--color-ink)]">
              {Math.round(t.rotation)}°
            </span>
          </div>
          <input
            type="range"
            min={-180}
            max={180}
            step={1}
            value={t.rotation}
            onChange={(e) => patch({ rotation: Number(e.target.value) })}
            className="w-full accent-[var(--color-ink)]"
            aria-label="Rotation"
          />
          <div className="flex gap-1.5">
            <button
              onClick={() => patch({ rotation: t.rotation - 15 })}
              className="flex h-8 flex-1 items-center justify-center gap-1 rounded-full border border-[var(--color-line)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
              aria-label="Rotate -15 degrees"
            >
              <RotateCcw size={12} aria-hidden="true" />
              −15°
            </button>
            <button
              onClick={() =>
                patch({
                  rotation:
                    t.rotation >= 0 ? Math.max(-180, t.rotation - 180) : Math.min(180, t.rotation + 180),
                })
              }
              className="h-8 rounded-full border border-[var(--color-ink)] bg-[var(--color-ink)] px-3 text-[11px] uppercase tracking-[0.1em] text-[var(--color-paper)] transition hover:bg-[var(--color-teal-deep)]"
            >
              Flip 180°
            </button>
            <button
              onClick={() => patch({ rotation: t.rotation + 15 })}
              className="flex h-8 flex-1 items-center justify-center gap-1 rounded-full border border-[var(--color-line)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
              aria-label="Rotate +15 degrees"
            >
              +15°
              <RotateCw size={12} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scale */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
              Size
            </span>
            <span className="text-xs tabular-nums text-[var(--color-ink)]">
              {Math.round(t.scale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0.3}
            max={2}
            step={0.05}
            value={t.scale}
            onChange={(e) => patch({ scale: Number(e.target.value) })}
            className="w-full accent-[var(--color-ink)]"
            aria-label="Scale"
          />
          <div className="flex gap-1.5">
            <button
              onClick={() => patch({ scale: t.scale - 0.1 })}
              className="h-8 flex-1 rounded-full border border-[var(--color-line)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
            >
              Smaller
            </button>
            <button
              onClick={() => patch({ scale: t.scale + 0.1 })}
              className="h-8 flex-1 rounded-full border border-[var(--color-line)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
            >
              Bigger
            </button>
          </div>
        </div>

        <button
          onClick={() => resetTransform(selectedKey)}
          className="mt-1 h-7 rounded-full text-[11px] uppercase tracking-[0.1em] text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)]"
        >
          Reset transform
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
