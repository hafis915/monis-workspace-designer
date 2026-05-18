# monis.rent — Workspace Designer

> Submission for the Desent developer challenge.

Build the desk you wish you had. Pick a desk, a chair, a monitor, lighting, a plant, a rug — watch the scene update live. Rent the whole setup by the day, delivered to your villa, café, or coworking spot anywhere in Bali.

**Live:** _(deploy URL will go here once it's live)_

---

## Approach

The brief asks for an *interactive visual tool* that "feels good to use." The product framing matters more than feature count: this isn't a furniture configurator, it's a mood board for your dream remote workspace. I optimized for that feeling first, scope second.

### The big design call: fixed-composition isometric scene, not drag-and-drop

Drag-and-drop in 4–8 hours either ships broken (snap, collision, scaling) or amateurish. Instead the scene is a single 3/4 isometric composition with fixed slots (desk, chair, monitor, lighting, plant, extras). The user picks a variant per slot in the sidebar; the scene swaps with a Framer Motion crossfade. Every pixel stays intentional. Higher polish ceiling for the time budget.

### The art

Every item is a hand-authored flat-color SVG at a consistent perspective. Mixing real photos at consistent perspective is much harder than it looks; a flat illustrative style is honest about what it is and ships fast.

3 desks · 3 chairs · 2 monitors · 2 lamps · 3 plants · 2 extras = 15 items.

### Brand voice

Bali-nomad: warm sand background, terracotta accent, jungle green secondary, Fraunces display + Inter body, a hint of film grain. Editorial typography. Item copy is short and tactile ("Cream top with woven rattan front").

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router + TypeScript | Required |
| Styling | Tailwind v4 | Required |
| Deploy | Vercel | Required |
| State | Zustand + persist middleware | One tiny store; selections survive page reloads |
| Motion | Framer Motion | Best-in-class layout/presence animations |
| Icons | None — every visual is custom SVG | Consistency |

No UI kit. No image dependencies. The whole catalog ships as a single TSX file.

---

## Structure

```
src/
├─ app/
│  ├─ layout.tsx           # fonts, theme, metadata
│  ├─ globals.css          # design tokens, grain, scene styles
│  ├─ page.tsx             # designer (workspace + picker)
│  └─ checkout/
│     ├─ page.tsx          # checkout shell (server)
│     └─ CheckoutClient.tsx
├─ components/
│  ├─ Workspace.tsx        # isometric scene composer, layered SVG
│  └─ Picker.tsx           # category tabs, item cards, sticky price footer
└─ lib/
   ├─ types.ts             # Category, Item, Selection
   ├─ catalog.tsx          # 15 items + their SVG scene/thumb art
   └─ store.ts             # Zustand store with persistence
```

---

## How the live preview works

`Workspace.tsx` reads the current selection from the Zustand store and maps over a fixed layer order (`extra → plant → desk → chair → monitor → lighting`). Each layer renders the selected item's `scene` JSX inside an `AnimatePresence`-wrapped `motion.g`. Swapping a desk fires an exit animation on the old one and an enter animation on the new one. No layout shift, no janky reflow, no flash of empty state — the scene morphs.

The selection state is persisted to `localStorage` via Zustand's `persist` middleware, so your dream setup survives a refresh and carries to the checkout page.

---

## What I'd do with another 4 hours

- **Real-time price ticker animation** — count up on selection, not snap.
- **Two-week pricing tiers** — the longer you rent, the cheaper per day.
- **Hover preview on thumbnails** — show the scene change before committing.
- **Mobile bottom-sheet picker** — currently the sidebar stacks below the scene on mobile; a sheet would be slicker.
- **Share-your-setup link** — encode the selection into a URL.
- **A couple more "wow" extras** — a wall-mounted bike, a surf-board leaning, a record player. The brand earns those.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

The `dev` script uses Webpack because Turbopack's PostCSS subprocess crashed locally on this machine (looks like an environmental issue, unrelated to the project itself). Production builds use Turbopack and deploy to Vercel cleanly.

---

Designed and built in a single afternoon for the Desent developer challenge.
