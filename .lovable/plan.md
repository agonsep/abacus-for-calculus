# Mid-board notice when Dual increments is checked

## Goal

When the user checks **Dual increments**, a notice appears in the middle of the board:

> Input second increment, then click on Fill Board

It guides the user through the two-step flow: the second increment field only appears in the panel once dual mode is on, and the setting takes effect on Fill Board.

## Behavior

- Shown when Dual increments is checked (checkbox click or keyboard toggle).
- Styled and positioned like the existing stone-value notice: centered over the board, rounded card, blurred backdrop, not clickable.
- It stays until the user clicks **Fill Board** (any fill — it then disappears) or unchecks **Dual increments**. No 3-second timer: the dismissal answer chose "until Fill Board", so the notice persists rather than fading on its own.
- Checking the box again after unchecking shows the notice again.
- The notice does not block or alter any other behavior; it is purely informational.

## Changes

In `src/components/CalculusAbacus.tsx`:

1. Add state `dualHint` (string | null, default null) near the other notice state (~line 1249).
2. In `toggleDualMode` (~line 1205): when `on` is true, set the hint text; when false, clear it.
3. In `setup` (~line 1588): clear the hint at the top of the function so any Fill Board click (including errors) dismisses it.
4. Render: extend the existing mid-board overlay block (~lines 2080–2087) to show `dualHint ?? unitNotice`, keeping the identical styling. The two cannot co-occur — the hint is cleared by Fill Board, and the stone-value notice is only set by a promotion that requires a filled board.

No changes to math, counts, or the panel layout.

## Verification

- `bunx tsgo` typecheck and `bun run build`.
- In the preview: check Dual increments → the notice appears centered on the board; it remains (no fade) until Fill Board is clicked, then it disappears — including when Fill Board produces an error.
- Uncheck Dual increments → notice disappears; re-check → it reappears.
- Confirm the stone-value notice (Divide By Increment with a changed stone value) still renders and clears after 3 seconds.
