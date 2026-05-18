import { RealDesignerLayout } from "@/components/RealDesignerLayout";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { ViewToggle } from "@/components/ViewToggle";

export default function RealPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1500px] flex-col px-5 pb-10 pt-6 lg:px-10">
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-[var(--color-ink)]">
            monis<span className="text-[var(--color-lime-deep)]">.</span>rent
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] sm:inline">
            · Workspace designer
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ViewToggle />
          <CurrencyToggle />
        </div>
      </header>

      <section className="mb-6 max-w-3xl">
        <h1 className="font-display text-4xl leading-[1.04] tracking-tight text-[var(--color-ink)] sm:text-5xl md:text-[3.5rem]">
          The real catalog.{" "}
          <em className="not-italic text-[var(--color-ink-soft)]">Photos, not sketches.</em>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
          Build your workspace using actual products from monis.rent. Mix and
          match desk, chair, monitors, peripherals, plus coffee, gaming, and
          fitness gear. Drag items to arrange the showroom.
        </p>
      </section>

      <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <RealDesignerLayout />
      </section>

      <footer className="mt-10 flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
        <span>monis.rent · Real catalog</span>
        <span>Designed for the Desent coding test</span>
      </footer>
    </main>
  );
}
