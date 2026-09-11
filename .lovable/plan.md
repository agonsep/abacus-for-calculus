# Rescale the board after Divide By Increment — dual increments only

## The problem

In dual increments mode the board is scaled to the spread of y values across the eleven primary columns. The change-size stones, however, measure only the tiny gap inside each pair, set by the second increment. After **Divide By Increment** the counts are kept as they are, so the slope curve is drawn at the old, much coarser scale: with a small second increment the stones are a sliver, and with `w` there is almost nothing to look at.

## The change

When — and only when — the **Dual increments** box is checked, **Divide By Increment** rescales the board to the range of the new divided values:

- One stone takes a value suited to the slope curve itself, so a range like 0.01 becomes a full board of stones.
- The floor and the stone value are recomputed from the slope values, exactly the way **Fill Board** scales a fresh curve, honouring Max Stones.
- Negative slopes keep the usual signed behaviour: black stones below the line.
- Undefined columns stay undefined.
- With `w` as the second increment the derivative values are exact, and the board now shows a real, readable slope curve instead of a flat board.

Without the Dual increments box checked, **Divide By Increment** keeps its current behaviour: stack heights unchanged, only the stone value divided. Nothing else about dual mode changes — Find Differences, the pair layout, the left panel columns, Leibniz Mode, and the undo/restore stack all stay as they are.

## What the user sees

- The stone counts change at the moment of division, rather than staying put.
- The `One stone =` readout shows a value derived from the slope range, not the previous value divided by the second increment.
- The left panel's slope numbers are unchanged; only how they are drawn changes.

## Technical notes

In `src/components/CalculusAbacus.tsx`, `computePromotion` currently always returns `{ counts: change, u: unit / incValue, floor: 0 }`.

- Add a dual-only branch: after building `newYRaw`/`newDefined`, if `dualActive && h2`, call `computeCounts(newYRaw, newDefined, fractional, appliedInputs.maxStones)` and return its `counts`, `u`, and `floor`; fall back to the count-preserving result when it returns `null`.
- The non-dual path is untouched.
- The promotion animation reads counts from the `Promotion` object, so the resize pass already handles differing counts; verify the fallen-stack animation still lands correctly when counts grow.
- `commitPromotion` and `demoteLevel` need no change: the snapshot already restores `unit`, `floorValue`, and counts.

## Verification

- `bunx tsgo` and the build.
- Manual: `y = x^2`, midpoint 3, increment 0.25, max stones 100, second increment 0.1 → after Find Differences and Divide By Increment the board shows a full-height rising slope curve.
- Same with second increment `w` → exact derivative curve, readable stones.
- Non-dual run unchanged: heights preserved, unit divided.
