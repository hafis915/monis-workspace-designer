"use client";

import { useState } from "react";
import { buildShareUrl } from "@/lib/share";

type Props = {
  basePath: string;
  payload: unknown;
};

export function ShareButton({ basePath, payload }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = buildShareUrl(basePath, payload);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback: open prompt with URL so user can copy manually
      window.prompt("Copy this share link:", url);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-line)] py-2.5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
      aria-live="polite"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M2 6.5 L5 9 L10 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          Link copied to clipboard
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M3 6 H9 M6 3 V9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              transform="rotate(45 6 6)"
            />
          </svg>
          Share this setup
        </>
      )}
    </button>
  );
}
