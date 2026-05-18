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
