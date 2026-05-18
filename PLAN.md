# Desent Coding Test 2 — Workspace Designer

**Brief:** Build an interactive workspace designer for monis.rent (office equipment rental for digital nomads in Bali). Required: ≥2 desks, ≥2 chairs, accessories, live preview, checkout view, public deployment. Stack: Next.js + Tailwind + Vercel. Budget: 4–8h.

**Rubric (per brief):** "feels good to use." Final result matters, not method.

---

## Product framing

Not a generic furniture configurator. The product is the *feeling* of curating your dream remote workspace away from home. It's a mood board crossed with a checkout flow.

## Approach

**Fixed-composition isometric scene that morphs on selection.** A single workspace illustration with slots (desk, chair, monitor, lamp, plant, extras). User picks variants in a sidebar; the scene swaps with motion. Running price always visible.

### Why not drag-and-drop

DnD with snap/collision in 4–8h ships either broken or amateurish. Fixed composition lets every pixel be intentional and pushes the polish ceiling higher.

### Why not photo cutouts

Mixing real photos at consistent perspective is harder than it looks. Flat-color SVG at a 3/4 isometric angle is honest about its style and ships fast.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router + TS | Required |
| Styling | Tailwind v4 | Required |
| Deploy | Vercel | Required |
| State | Zustand | One tiny store, no boilerplate |
| Motion | Framer Motion | Best-in-class layout/presence animations |
| UI primitives | shadcn/ui (Button, Sheet, Separator) | Accessible defaults, no lock-in |
| Art | Hand-authored SVG | Consistency + small bundle |

## Pages

- `/` — Designer. Scene left, sidebar right (mobile: scene above sidebar). Sticky footer with running price + "Review setup" CTA.
- `/checkout` — Final summary scene + line items + monthly total + "Reserve setup" button (mocked → toast).

## Data model

```ts
type Category = 'desk' | 'chair' | 'monitor' | 'lighting' | 'plant' | 'extra';

type Item = {
  id: string;
  category: Category;
  name: string;
  blurb: string;          // one-line copy
  pricePerDay: number;    // IDR or USD; pick USD
  svg: ReactNode;         // scene-layer art
  thumb: ReactNode;       // sidebar thumbnail art
};

type Selection = Partial<Record<Category, string>>; // category -> item id
```

Catalog hardcoded in `lib/catalog.tsx`. Aim for 3 desks, 3 chairs, 2 monitors, 2 lamps, 3 plants, 2 extras = **15 items**.

## Aesthetic direction

- Warm sand `#F5EFE6` background, terracotta `#C97B5F` primary, jungle green `#3D5B4A` secondary, charcoal `#1F1B16` text.
- Fraunces (display serif) headlines + Inter body.
- Subtle film grain overlay (SVG noise filter).
- Editorial typography: oversized headers, plenty of whitespace.
- Motion: 250ms ease-out for slot swaps, scale 0.95→1 + fade.

## Scope cuts (NOT doing)

- No auth, no DB, no real payments.
- No drag-and-drop, no room dimensions, no multi-desk layouts.
- No internationalization, no dark mode.
- Mobile is responsive but not gesture-driven.

---

## Build phases (~6h target)

| # | Phase | Time | Output |
|---|---|---|---|
| 1 | Project setup | 0:30 | Next.js app, Tailwind theme tokens, Zustand store, Framer Motion installed, fonts loaded |
| 2 | Catalog + SVG art | 2:00 | 15 item illustrations, catalog data file |
| 3 | Scene composer | 1:00 | `<Workspace />` renders layered SVGs from selection store with `AnimatePresence` |
| 4 | Sidebar picker | 1:00 | Category tabs, item cards, selection state, sticky price footer |
| 5 | Checkout page | 0:45 | Summary scene + line items + total + Reserve button |
| 6 | Polish pass | 0:30 | Empty states, focus rings, OG image, favicon, meta tags |
| 7 | Deploy + housekeeping | 0:15 | Vercel deploy, README, invite desent-bot |

**Buffer:** 1–2h for SVG art overrun (the realistic risk).

---

## Submission checklist

- [ ] ≥2 desks, ≥2 chairs, ≥4 accessory types
- [ ] Live preview updates on every selection
- [ ] Checkout summary page
- [ ] Deployed Vercel URL
- [ ] GitHub repo, `desent-bot` invited (Read)
- [ ] README: approach, stack rationale, what I'd do with more time
- [ ] Personal submission link from confirmation email

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| SVG art takes >2h | Drop to 2 of each category. Quality > quantity. |
| Scene composition looks flat | Add cast shadows under each item; layer order = back-to-front depth. |
| Mobile breaks the scene | Scene gets `aspect-[4/3]` and scales; sidebar becomes a bottom sheet. |
| Vercel deploy fails | Test deploy after phase 3 (skeleton), not at the end. |

---

## Design review decisions (post-build)

Captured via `/plan-design-review` after the initial build shipped. Each
decision is the chosen option from an `AskUserQuestion`, with the gap it
fixes.

### Pass 1 — Information Architecture (6/10 → 9/10 after fix)

- **D2 — Hero compression.** Move headline + description into a slim
  column beside the canvas instead of stacked above. First viewport:
  header + canvas + picker, all visible. Canvas becomes the unambiguous
  first impression. Applies to `/` and `/real`.
- **D3 — Hide zone bar while editor is open.** When `selectedKey` is
  not null, the bottom zone bar fades out so the editor (top-right) and
  the picker tabs (right) don't compete with it. Bar fades back in on
  deselect.

### Pass 2 — Interaction State Coverage (5/10 → 9/10 after fix)

- **D4 — Skeleton placeholder per photo.** Neutral gray rect at the
  item's position renders first; image fades in once loaded. Per-item
  in `RealWorkspace`; no layout shift; matches the canvas vibe.
- **D5 — Dismissible first-paint hint strip.** Thin pill at the top of
  the canvas: "Drag items · Scroll to zoom · Click to edit". `×` button
  dismisses; remembered in `localStorage` (key
  `monis-hints-dismissed`). Applies to both `/` and `/real`.
- **D6 — Reserve loading shimmer.** 600–1200ms `Reserving…` state on
  the Reserve button before the confirmation banner appears. Sells
  realism; sketch and real checkout both.

### Pass 3 — User Journey & Emotional Arc (5/10 → 8/10 after fix)

- **D7 — Cinematic camera move on Reserve.** On click, the canvas
  viewBox animates slowly left→right across the setup (~1.2s easing
  out), then a full takeover panel appears with the total and "We'll
  deliver tomorrow". Replaces the tiny confirmation banner.
- **D8 — URL encodes the selection.** Serialize `selection` and
  `transforms` into a compact URL param (base64 JSON or similar
  encoding) on every change. `Share` button on checkout copies the
  URL. Lets the Desent reviewer paste a deep link to a preset demo
  setup, and gives the user a take-home artifact.

**Deferred:** Name-your-workspace input (D8 option) and preset
starter setups. Worth doing in a v2 polish pass; not needed for the
submission.

### Pass 4 — AI Slop Risk (7/10 → 9/10 after fix)

- **D9 — Sharpen Sketch hero copy.** Replace
  `Design the workspace you wish you had — today.`
  with **`Rent the workspace you wish you had.`** Drops the dangling
  em dash + filler word. Swaps "Design" for "Rent" to align with the
  brand (monis.rent). Real hero stays as-is.
- **D10 — Mix one hard-edged container.** Item photo containers inside
  the picker cards (currently `rounded-xl`) go to `rounded-md` (or
  square). The workspace canvas keeps its `rounded-3xl` outer frame.
  Adds one hard-cornered visual anchor to break the
  "everything-is-soft" template feel.

### Pass 5 — Design System Alignment (6/10 → 9/10 after fix)

- **D11 — Document design tokens in README.** ~15-line section:
  palette, type pairing, spacing scale, motion token, component
  recipes (pill, card, button). Signals to the reviewer that the
  system was thought through.
- **D12 — Codify lime usage.** Rule: lime appears on (1) the currently
  active UI state (dots, badges, button-active backgrounds), (2) one
  product detail per item (lamp dome, monitor screen glow, surfboard
  stripe, bean-bag cushion). Never on text-sized surfaces. Document
  in the README.

### Pass 6 — Responsive & Accessibility (4/10 → 8/10 after fix)

- **D13 — Mobile picker: drop sticky-on-mobile + tab fade-edge.**
  Sticky footer only above `lg`; on mobile it becomes a normal flow
  element. Tab row gets a fading right edge (CSS gradient mask) to
  hint scrollability.
- **D14 — Mobile editor as bottom drawer.** Above `lg`: keep
  top-right panel. Below `lg`: editor becomes a bottom sheet that
  slides up. Doesn't fight the canvas.
- **D15 — A11y essentials bundle.** Three changes:
  1. Global `:focus-visible` style: 2px lime ring + 1px ink offset,
     visible on every background.
  2. `prefers-reduced-motion: reduce` media query wraps every
     `motion.*` animation; entry/exit/drag fall back to instant.
  3. `aria-live="polite"` on the Reserve confirmation banner so
     screen readers announce "Workspace reserved".

### Pass 7 — Unresolved Design Decisions (3 resolved)

- **D16 — Reserve takeover panel: full receipt-style.** After the
  cinematic camera move (D7), the takeover panel shows: big Fraunces
  "Reserved" headline, itemized line items, daily rate + 30-day
  subtotal + delivery, total in display weight, fake confirmation
  number (`MNS-` + 6 chars), delivery ETA ("Lands tomorrow"), and a
  "Share your setup" button (uses D8 URL).
- **D17 — Default selection: add monitor + lamp + coffee.** Real
  store DEFAULTS expand from `{desk, chair}` to `{desk, chair,
  mon-27-4k, lamp-mi, coffee-nespresso}`. Sketch defaults stay as
  `{desk-pandanus, chair-uluwatu}` plus add `{lamp-bukit,
  plant-monstera, coffee-espresso}` so both views feel populated on
  first paint.
- **D18 — Sketch and Real share layout; only content + hero differ.**
  No layout restructure. Differentiation lives in: palette tone
  (both Punchy Utility but Real has more white-on-white),
  background (paper-soft vs pure white), and hero copy (D9 vs
  current Real). Honest "same product, different rendering medium".

### Approved decisions summary

| # | Pass | Decision | Effort |
|---|---|---|---|
| D2  | IA   | Hero column beside canvas       | 30m |
| D3  | IA   | Hide zone bar when editing       | 10m |
| D4  | State | Photo skeleton per item         | 25m |
| D5  | State | First-paint hint strip           | 20m |
| D6  | State | Reserve loading shimmer          | 15m |
| D7  | Journey | Cinematic Reserve camera move  | 45m |
| D8  | Journey | URL-encoded selection          | 30m |
| D9  | Slop | Sketch hero rewrite              | 2m  |
| D10 | Slop | Hard-edged photo containers      | 5m  |
| D11 | System | Design tokens README section   | 15m |
| D12 | System | Codify lime usage rule         | 5m  |
| D13 | Mobile | Picker mobile sticky + tabs    | 15m |
| D14 | Mobile | Editor as bottom drawer        | 25m |
| D15 | A11y | Focus ring + reduce-motion + aria-live | 30m |
| D16 | Closing | Reserve takeover receipt panel | 30m |
| D17 | Closing | Default-selection expansion    | 5m  |
| D18 | Closing | Keep shared layout (no work)   | 0m  |

Total implementation: ~5h.

### NOT in scope (explicitly deferred)

- **Name-your-workspace** (D8 alt) — adds personalization but the
  share-URL artifact (D8 main) carries most of the value.
- **Preset starter library** (D17 alt) — would be richer than the
  default-selection expansion, but ~45min vs 5min for a marginal
  perception gain.
- **Keyboard navigation for scene items** — out of scope for the
  coding test budget; deserves a v2 pass.
- **Pinch-to-zoom on mobile that lets the page also pinch** —
  current implementation captures all pinches inside the canvas.
  Standard for design tools; not worth solving.
- **Image error fallback for monis.rent 404s** — production
  consideration; rare in a 24h-pinned coding test.
- **Drag with keyboard** — niche; defer indefinitely.

### What already exists (reuse, don't reinvent)

- **CSS variables in `globals.css`** — color tokens are already there.
  Document them in the README (D11), don't rebuild.
- **Pill control recipe** — `rounded-full` + 1px border + `px-3 py-1.5`
  + `text-[11px] uppercase tracking-[0.14em]`. Used by the zone bar,
  view toggle, currency toggle. Reuse for any new control.
- **Card recipe** — `rounded-2xl` + 1px border + `bg-paper-soft` +
  `p-3` + thumb (left) + content (right). Reuse for any new selector.
- **`StoreHydrator` pattern** — already handles SSR-safe hydration
  for three stores. Reuse for any new persistent store.
- **`AnimatePresence` + `motion.g` slot animation** — the entry/exit
  pattern is consistent; reuse the `slotMotion` shape.
- **`useUi.currency` + `formatPrice`** — currency formatting is
  centralized. Use `formatPrice(usd, currency)` for any new price
  display.

### Completion summary

```
+====================================================================+
|         DESIGN PLAN REVIEW — COMPLETION SUMMARY                    |
+====================================================================+
| System audit         | No DESIGN.md (gap), PLAN.md is de-facto     |
| Step 0               | Initial 6/10                                |
| Pass 1 (Info Arch)   | 6/10 -> 9/10                                |
| Pass 2 (States)      | 5/10 -> 9/10                                |
| Pass 3 (Journey)     | 5/10 -> 8/10                                |
| Pass 4 (AI Slop)     | 7/10 -> 9/10                                |
| Pass 5 (Design Sys)  | 6/10 -> 9/10                                |
| Pass 6 (Responsive)  | 4/10 -> 8/10                                |
| Pass 7 (Decisions)   | 3 resolved, 6 deferred                      |
+--------------------------------------------------------------------+
| NOT in scope         | 6 items                                     |
| What already exists  | 6 items                                     |
| Approved mockups     | 0 (used live screenshots instead)           |
| Decisions made       | 17 (D2-D18)                                 |
| Decisions deferred   | 6 (listed in NOT in scope)                  |
| Overall design score | 6/10 -> 8.7/10                              |
+====================================================================+
```
