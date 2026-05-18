"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDesigner } from "@/lib/store";
import { useRealDesigner, type ItemTransform } from "@/lib/store-real";
import { useUi } from "@/lib/ui-store";
import { clearSharedPayload, readSharedPayload } from "@/lib/share";
import type { Selection } from "@/lib/types";
import type { RealSelection } from "@/lib/catalog-real";

type SketchPayload = { selection: Selection };
type RealPayload = {
  selection: RealSelection;
  transforms?: Record<string, ItemTransform>;
};

export function StoreHydrator() {
  const pathname = usePathname();

  useEffect(() => {
    // Rehydrate persisted stores from localStorage.
    useDesigner.persist.rehydrate();
    useRealDesigner.persist.rehydrate();
    useUi.persist.rehydrate();

    // If the URL carries a share payload, apply it AFTER rehydrate so the
    // shared setup wins over the previously-saved one.
    const onRealRoute = pathname?.startsWith("/real") ?? false;

    if (onRealRoute) {
      const shared = readSharedPayload<RealPayload>();
      if (shared?.selection) {
        useRealDesigner.setState({
          selection: shared.selection,
          ...(shared.transforms ? { transforms: shared.transforms } : {}),
        });
        clearSharedPayload();
      }
    } else {
      const shared = readSharedPayload<SketchPayload>();
      if (shared?.selection) {
        useDesigner.setState({ selection: shared.selection });
        clearSharedPayload();
      }
    }
  }, [pathname]);

  return null;
}
