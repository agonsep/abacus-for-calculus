# Split the final step of the Divide By Increment animation

Today the last stage of the transition works column by column, doing two things per column before moving on: column 0 is resized and immediately recolored, then column 1, and so on.

## New behaviour

The stage becomes two separate left-to-right passes:

1. **Resize pass** — each column's fallen orange stack takes its new count, one column at a time, left to right. Everything stays orange (or dark grey when negative).
2. **Recolor pass** — starting again from the left, each column switches to the size palette: orange becomes red, dark grey becomes black.

Timing per column event stays the same (about 130 ms), so the stage takes the same number of events, just reordered. Clicking anywhere or pressing Esc still skips to the finished state, and the left panel still updates only at the very end.

## Technical notes

In `src/components/CalculusAbacus.tsx`, inside `startPromotionAnimation`, the "Step 2b" loop currently pushes a count step and a recolor step inside one loop over columns. Split it into two consecutive loops over all columns: the first pushes only the `state.change[i] = ...` count steps, the second pushes only the `state.asSize[i] = true` recolor steps.
