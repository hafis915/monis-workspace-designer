"use client";

import { useEffect } from "react";
import { useDesigner } from "@/lib/store";
import { useRealDesigner } from "@/lib/store-real";
import { useUi } from "@/lib/ui-store";

export function StoreHydrator() {
  useEffect(() => {
    useDesigner.persist.rehydrate();
    useRealDesigner.persist.rehydrate();
    useUi.persist.rehydrate();
  }, []);
  return null;
}
