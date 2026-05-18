"use client";

import { useEffect } from "react";
import { useDesigner } from "@/lib/store";

export function StoreHydrator() {
  useEffect(() => {
    useDesigner.persist.rehydrate();
  }, []);
  return null;
}
