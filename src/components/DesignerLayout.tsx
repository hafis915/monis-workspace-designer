"use client";

import { useState } from "react";
import { Workspace } from "./Workspace";
import { Picker } from "./Picker";
import type { Category } from "@/lib/types";

export function DesignerLayout() {
  const [active, setActive] = useState<Category>("desk");

  return (
    <>
      <Workspace activeCategory={active} />
      <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 lg:p-6">
        <Picker active={active} onActiveChange={setActive} />
      </div>
    </>
  );
}
