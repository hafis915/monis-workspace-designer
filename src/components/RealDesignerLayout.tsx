"use client";

import { useMemo, useState } from "react";
import { RealWorkspace, type RealZoneKey } from "./RealWorkspace";
import { RealPicker } from "./RealPicker";
import { RealItemEditor } from "./RealItemEditor";
import { useRealDesigner } from "@/lib/store-real";
import { REAL_CATALOG_BY_ID, type RealCategory } from "@/lib/catalog-real";

function nameForKey(key: string | null): string | undefined {
  if (!key) return undefined;
  const [, itemId] = key.split(":");
  return REAL_CATALOG_BY_ID[itemId]?.name;
}

export function RealDesignerLayout() {
  const [active, setActive] = useState<RealCategory>("desk");
  const [manualZone, setManualZone] = useState<RealZoneKey | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selection = useRealDesigner((s) => s.selection);

  // If the selected item is removed from selection, clear selection.
  const selectionFingerprint = useMemo(
    () => Object.values(selection).flat().join("|"),
    [selection],
  );

  const handleActiveChange = (cat: RealCategory) => {
    setActive(cat);
    setManualZone(null);
  };

  // Cheap guard: if selectedKey no longer corresponds to an item in selection, clear it.
  if (selectedKey) {
    const [cat, itemId, indexStr] = selectedKey.split(":");
    const ids = selection[cat as RealCategory] ?? [];
    if (ids[Number(indexStr)] !== itemId) {
      // selectedKey is stale
      setTimeout(() => setSelectedKey(null), 0);
    }
  }
  void selectionFingerprint;

  return (
    <>
      <div className="relative">
        <RealWorkspace
          activeCategory={active}
          manualZone={manualZone}
          onZoneChange={setManualZone}
          selectedKey={selectedKey}
          onSelectChange={setSelectedKey}
        />
        <RealItemEditor
          selectedKey={selectedKey}
          itemName={nameForKey(selectedKey)}
          onDeselect={() => setSelectedKey(null)}
        />
      </div>
      <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 lg:p-6">
        <RealPicker
          active={active}
          onActiveChange={handleActiveChange}
          selectedKey={selectedKey}
          onSelectInstance={setSelectedKey}
        />
      </div>
    </>
  );
}
