"use client";

import { useState } from "react";
import { Workspace, type ZoneKey } from "./Workspace";
import { Picker } from "./Picker";
import type { Category } from "@/lib/types";

export function DesignerLayout() {
  const [active, setActive] = useState<Category>("desk");
  // null = follow the active tab (auto-zoom). Otherwise the user has
  // explicitly chosen a zone via the control bar.
  const [manualZone, setManualZone] = useState<ZoneKey | null>(null);

  const handleActiveChange = (cat: Category) => {
    setActive(cat);
    setManualZone(null); // tab change re-enables auto-zoom
  };

  return (
    <>
      <Workspace
        activeCategory={active}
        manualZone={manualZone}
        onZoneChange={setManualZone}
      />
      <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 lg:p-6">
        <Picker active={active} onActiveChange={handleActiveChange} />
      </div>
    </>
  );
}
