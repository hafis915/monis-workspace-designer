"use client";

import { useState } from "react";
import { RealWorkspace, type RealZoneKey } from "./RealWorkspace";
import { RealPicker } from "./RealPicker";
import type { RealCategory } from "@/lib/catalog-real";

export function RealDesignerLayout() {
  const [active, setActive] = useState<RealCategory>("desk");
  const [manualZone, setManualZone] = useState<RealZoneKey | null>(null);

  const handleActiveChange = (cat: RealCategory) => {
    setActive(cat);
    setManualZone(null);
  };

  return (
    <>
      <RealWorkspace
        activeCategory={active}
        manualZone={manualZone}
        onZoneChange={setManualZone}
      />
      <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 lg:p-6">
        <RealPicker active={active} onActiveChange={handleActiveChange} />
      </div>
    </>
  );
}
