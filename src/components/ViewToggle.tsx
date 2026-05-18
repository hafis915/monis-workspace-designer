"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const VIEWS = [
  { label: "Sketch", prefix: "/", match: (p: string) => !p.startsWith("/real") },
  { label: "Real", prefix: "/real", match: (p: string) => p.startsWith("/real") },
];

export function ViewToggle() {
  const pathname = usePathname() ?? "/";

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] p-0.5"
      role="tablist"
      aria-label="View"
    >
      {VIEWS.map((v) => {
        const active = v.match(pathname);
        return (
          <Link
            key={v.label}
            href={v.prefix}
            role="tab"
            aria-selected={active}
            className={clsx(
              "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] transition",
              active
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
            )}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
