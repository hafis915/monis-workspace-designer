import { Workspace } from "@/components/Workspace";
import { Picker } from "@/components/Picker";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1400px] flex-col px-5 pb-10 pt-6 lg:px-10">
      {/* nav */}
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-[var(--color-charcoal)]">
            monis<span className="text-[var(--color-terracotta-deep)]">.</span>rent
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-[var(--color-charcoal-soft)] sm:inline">
            · Workspace designer
          </span>
        </div>
        <div className="hidden text-xs uppercase tracking-[0.14em] text-[var(--color-charcoal-soft)] md:block">
          Bali · Canggu, Ubud, Uluwatu
        </div>
      </header>

      {/* hero */}
      <section className="mb-7 max-w-3xl">
        <h1 className="font-display text-4xl leading-[1.04] tracking-tight text-[var(--color-charcoal)] sm:text-5xl md:text-6xl">
          Build the desk you wish you had{" "}
          <em className="not-italic text-[var(--color-terracotta-deep)]">— today.</em>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-charcoal-soft)] sm:text-base">
          Mix and match desks, chairs, monitors, and accessories. Rent the
          whole setup by the day. Delivered to your villa, café, or coworking
          space anywhere on the island.
        </p>
      </section>

      {/* grid */}
      <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <Workspace />
        <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-sand)] p-5 lg:p-6">
          <Picker />
        </div>
      </section>

      <footer className="mt-10 flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-xs uppercase tracking-[0.14em] text-[var(--color-charcoal-soft)]">
        <span>monis.rent · Made for nomads in Bali</span>
        <span>Designed for the Desent coding test</span>
      </footer>
    </main>
  );
}
