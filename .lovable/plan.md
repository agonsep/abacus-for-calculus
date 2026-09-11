# Dual increments: checkbox becomes a pending setting

## What should happen

Checking **Dual increments** should only reveal the second increment box. Nothing on the board changes until the user clicks **Fill Board**. Unchecking it likewise only hides the box; the paired stacks stay on the board until the next **Fill Board**.

This matches how the formula, midpoint, increments and Max Stones already work: typing changes nothing until Fill Board.

## Why the current behavior looks odd

Today the checkbox rebuilds the board the moment it is clicked, and it also flips **Fractional stones** on and off at the same moment. Toggling back and forth therefore re-scales stones, re-rounds existing stacks, and can copy the not-yet-applied primary increment into the second box, so the board and the panel drift out of step with what the inputs say.

## Behavior after the change

- Checking the box: second increment field appears, pre-filled with the increment currently applied to the board. Board untouched.
- Unchecking the box: field disappears. Board untouched until Fill Board, which rebuilds it as a single-stack board.
- **Fill Board** is the only thing that switches the board between single and paired stacks, and it also turns Fractional stones on (dual) or restores the user's previous setting (non-dual).
- While the board is actually paired, Fractional stones stays locked on, as now.
- **Find Differences** and **Divide By Increment** follow the board that is displayed, not the checkbox.
- No change to Leibniz mode, `w` handling, labels, panel columns, or promotion behavior.

## Technical notes

In `src/components/CalculusAbacus.tsx`:

- Add an `appliedDual` state, set inside `setup()` from the `dual` option it used. Everything that describes the current board reads `appliedDual`: `dualActive` (line ~1155), the `companion` prop passed to `Stacks` (~1941), and the Fractional-stones lock/disabled state (~2424-2441).
- `dualMode` stays a pure UI/draft flag and only controls: checkbox state, whether the second increment input renders, and the primary input width.
- Delete the `prevDualRef` effect at ~1709 that calls `setup` on toggle.
- In `toggleDualMode`, keep pre-filling `increment2` from the applied increment (`appliedInputs.increment`, not the draft `increment`), and drop the immediate `setFractional` calls; move the fractional force/restore into the Fill Board path in `setup()`, keeping `prevFractionalRef` for the restore.
- Fill Board already applies drafts; make sure it passes `dual: dualMode` and `increment2` into `setup`.

## Verification

- `bunx tsgo` and `bun run build`.
- Browser: toggle the box several times with no Fill Board and confirm the board never changes; then Fill Board and confirm paired stacks appear; uncheck, Fill Board, and confirm single stacks return with Fractional stones restored.
