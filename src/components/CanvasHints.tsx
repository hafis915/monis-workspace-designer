"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "monis-hints-dismissed";
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function CanvasHints({ message }: { message: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "1");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease }}
          className="pointer-events-auto absolute left-1/2 top-3 z-20 flex max-w-[min(540px,calc(100%-2rem))] -translate-x-1/2 items-center gap-3 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)]/95 px-4 py-1.5 shadow-sm backdrop-blur"
          role="note"
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-lime)]"
          />
          <span className="truncate text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
            {message}
          </span>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss hint"
            className="-mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper-deep)] hover:text-[var(--color-ink)]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path
                d="M2 2 L8 8 M8 2 L2 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
