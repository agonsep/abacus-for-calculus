# Undo and "Stack in one column": adding up the changes

## Goal
Show both directions of the Fundamental Theorem on the board. **Undo** steps back through Find Differences and Divide By Increment, one step at a time. A new **Stack in one column** checkbox piles the change-size stones from a chosen stretch of columns onto the first column of that stretch. The top of the pile then lines up with the size curve at the end of the stretch: the total change equals the sum of the changes.

## What the user sees

### Undo
- An **Undo** button sits below Divide By Increment.
- After Divide By Increment, it restores the previous board exactly: size stones, change-size stones, stone value, floor, companions, and table.
- After Find Differences, it removes the change-size stones.
- Repeated presses walk back to the original Fill Board.
- It is greyed out during animations and when nothing is left to undo. Fill Board starts a fresh history.

### Stack in one column (under More)
- The checkbox has two small **From** and **To** column boxes beside it, using x-values or column numbers 1–11. They default to the whole board.
- The checkbox is available when change-size stones are on the board.
- When checked, the change-size stones of every column in the stretch rise and stack on top of the size stack at the From column. Each column's stones keep their own order, and the columns stay in left-to-right order.
- Negative (dark grey) stones cancel positive ones, so the pile's net height is the signed sum.
- A dashed marker at the To column's size-stack top shows where the pile should reach. A short readout reads: "Sum of changes = f(To) − f(From) = N stones".
- Unchecking returns the stones to their columns. Changing From or To restacks the pile.
- **After Divide By Increment** (the stones now show rates), checking the box first multiplies by the increment. The stones shrink back to difference size (the second increment in Dual Increments), then stack. The readout notes "rates × increment". The match is exact for whole differences; after a rate step it agrees exactly, because the rates came from those same differences.
- **Dual Increments:** each pair's difference measures a step of h₂, not the column spacing, so a pile of pair differences does not equal the rise between columns. In that mode the checkbox stays available, with a readout explaining that each stone stands for the change over one second increment. I will confirm the exact wording during the build.
- Animations run instantly when reduced motion is on.

### Help panel
One short paragraph each for Undo and for Stack in one column.

## What stays the same
Forward steps, notices, the left panel, and the existing "Divide By Increment restores the previous level" behavior all stay. Articles and exercises are unchanged.

## Technical details
- **Undo:** keep a history list of `"diff" | "promote"` entries, pushed in the Find Differences and promotion-commit paths. Undo of `promote` calls the existing `demoteLevel()` snapshot restore. Undo of `diff` clears `change` and its readouts. The list resets in `setup`.
- **Stacking:** this is display-only state (`stackOne`, `stackFrom`, `stackTo`) and never mutates `change`. The renderer computes each stone's target position as the From column's size top plus the cumulative signed counts of the earlier columns in the span. Stones animate between their home and stacked positions. The From/To boxes are clamped to the defined columns.
- **Rate stage:** the multiplier is the level's stored divisor (`divisors`), applied to the display only.
- **Disabled states:** the checkbox and boxes are disabled during `anim`, and stacking is turned off before any forward or undo action runs.
- Update roadmap.md, and add an AGENTS.md rule that stacking is a display-only overlay.
- **Verify:** for y = (x²+x)/2, midpoint 5, increment 1, max 55, stacking columns 0–10 reaches 55. Partial spans 2–6 reach 21 − 3 = 18. Also check the rate stage, Undo chains, both modes, no page errors, and a clean build.
