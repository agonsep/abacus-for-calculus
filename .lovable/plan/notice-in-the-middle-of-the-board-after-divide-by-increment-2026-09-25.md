# Notice in the middle of the board after Divide By Increment

## Goal
After **Fill Board → Find Differences → Divide By Increment**, the user currently gets no clear signal that the value of one stone has changed. Replace the existing readout flash with a notice that appears in the middle of the board for three seconds.

## Decisions (from the user)
- The center-board notice **replaces** the readout flash; the left-panel values go back to plain styling.
- The notice is **skipped** when the number does not actually change (for example increment 1, where the unit is divided by 1).

## What the user sees
- When the promotion commits (end of the animation, or immediately with reduced motion), a small notice appears centered over the board:
  **"The value of one stone has changed to X."** — X is the new value, formatted exactly like the left-panel readout (same precision rules, including Dual Increments).
- It stays for 3 seconds, then disappears. It does not block dragging or clicking (pointer-events none) and it needs no dismissal.
- In Dual Increments mode, size stones and change-size stones share the same unit, so one notice with the single value is enough.
- If the new value is the same as before (increment 1), no notice appears.
- Demote/restore never triggers the notice — only a promotion commit does.

## Technical notes
All in `src/components/CalculusAbacus.tsx` plus a small cleanup in `src/styles.css`.

1. **Remove the flash**
   - Delete the `unitFlashTick` state and the `key={unitFlashTick}` / `unit-flash` conditional classes from the three readout spans (the "One size stone", "One change-size stone", and "One stone" values).
   - Remove the `@keyframes unit-flash` and `.unit-flash` block (including the reduced-motion variant) from `src/styles.css`.

2. **Add the notice state**
   - New state `unitNotice: string | null` plus a timeout ref. Cleanup clears the timer on unmount.
   - At the end of `commitPromotion` (the single commit point shared by the animated and reduced-motion paths): compute the old value with the current `unit` and the new value with `p.u`, using the same expression the readout uses (`wValues ? formatDual(0, unit, fmtVal) : fmtVal(unit)`). If the two formatted strings differ, set the notice text `"The value of one stone has changed to {new}."` and start the 3-second timer; otherwise clear it.
   - `fmtVal` is declared later in the component than `commitPromotion`, but it is only referenced when the handler runs, after render — safe as-is.

3. **Render the overlay**
   - Inside the existing `relative` full-screen wrapper that holds the `Canvas`, add a sibling overlay div: absolutely positioned, centered (50%/50% with translate), `pointer-events-none`, above the canvas but below the panels' z-order concerns. Styling uses design tokens: card background with slight translucency and blur, border, rounded corners, foreground text — consistent with the existing panel look.

4. **No other behavior changes** — promotion, dual rescaling, demote/restore, Leibniz Mode, and the help panel stay as they are.

## Verification
- `bunx tsgo` and `bun run build` pass.
- Browser check: `y = x²`, midpoint 5, increment 0.5 → Fill Board, Find Differences, Divide By Increment — the notice appears centered on the board with the new value and disappears after 3 seconds; the left-panel value no longer flashes.
- Increment 1 case: same flow — the promotion commits, but no notice appears.
- Dual Increments: one notice with the shared new value.
