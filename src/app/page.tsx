import { DesignerLayout } from "@/components/DesignerLayout";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { ViewToggle } from "@/components/ViewToggle";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1600px] flex-col px-5 pb-10 pt-6 lg:px-10">
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

      <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)_400px]">
        <div className="lg:sticky lg:top-6 lg:self-start lg:pt-2">
          <h1 className="font-display text-3xl leading-[1.04] tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-[2.5rem]">
            Rent the workspace you wish you had.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            Mix and match desks, chairs, monitors, accessories, coffee gear,
            outdoor toys, and a relax corner. Rent the whole setup by the
            day, delivered to your villa, café, or coworking spot.
          </p>
          <p className="mt-4 hidden text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)] lg:block">
            Bali · Canggu · Ubud · Uluwatu
          </p>
        </div>
        <DesignerLayout />
      </section>

      <footer className="mt-10 flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
        <span>monis.rent · Made for nomads in Bali</span>
        <span>Designed for the Desent coding test</span>
      </footer>
    </main>
  );
}
