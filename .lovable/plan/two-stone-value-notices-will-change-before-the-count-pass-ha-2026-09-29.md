# Two stone-value notices: "will change" before the count pass, "has changed" with the panel update

## What changes

During the **Divide By Increment** animation there are now two notices, each lasting **3 seconds**:

1. **Before the count adjustment** (current position — after every column's stones have fallen, before the first count change): **"The value of one stone will change to X."** The board holds still while it shows.
2. **After all stones have been adjusted and recolored**: **"The value of one stone has changed to X."** The left panel updates to the new level **at the same moment** this notice appears; it stays 3 seconds.

Both notices are skipped when the displayed stone value does not actually change (e.g. increment 1) — no notice and no pause, even when counts change. In Dual Increments mode both notices say "change-size stone". Demote/restore never shows either notice. Click or Esc still skips immediately (clearing whatever notice is on screen and jumping to the final board). Reduced-motion users see only the final "has changed to X." notice for 3 seconds right after the instant commit.

## Technical approach

All in `src/components/CalculusAbacus.tsx`:

- `promotionNotice` splits into two text builders sharing one value comparison: the current comparison stays (return null when the formatted old and new values are equal), and it produces both strings — `"The value of one ${dualActive ? "change-size stone" : "stone"} will change to ${newVal}."` and `"… has changed to ${newVal}."`
- `showPromotionNotice`: its timer changes from 2000 ms to **3000 ms** (this also extends the reduced-motion path's final notice).
- `startPromotionAnimation`:
  - The existing notice step between the last fall and the resize pass shows the **"will change"** text for 3000 ms.
  - A new **final step** is appended after the recolor pass: its `run` calls a `commitOnce()` helper (wraps `commitPromotion(p, false)` so it runs at most once) and shows the **"has changed"** text, `duration: 3000`.
  - `finish` changes: it calls `commitOnce()` (a no-op when the final step already committed), keeps clearing the timer/notice and `anim`, and sets `instant`. This keeps every skip path (before, during, or after either notice) consistent, and unmount cleanup is unchanged.
- `commitPromotion(p, showNotice = true)` keeps showing the final **"has changed"** notice for the reduced-motion direct commit; the animated path passes `false` as before.

## Checks

- `bunx tsgo` and `bun run build` pass.
- Playwright (1280×1800, WebGL flags): a Dual Increments promotion with a changed value — after the falls, "will change to X" holds for 3 s with counts steady, then counts adjust and recolor, then "has changed to X" appears together with the updated panel and lasts 3 s; the Divide By Increment button re-enables (checked with `is_enabled()`).
- Ordinary changed-value promotion (midpoint 2, increment 1): both notices in the right order.
- Unchanged-value promotion (midpoint 5, increment 1): no notices, no pauses, button re-enables, panel still reads "One stone = 4.48."
- Esc skip during each notice phase clears the notice and lands on the final board; reduced-motion shows only "has changed to X" for 3 s.
- Update the notice wording/durations in `AGENTS.md` and `roadmap.md`.
