# Change-size stones sit on the companion stack in Dual mode

## Goal

In **Dual increments** mode, after **Find Differences**, the change-size stones currently stack on top of the main (right) stack. Move them so they sit on top of the companion (left) stack, growing from the companion's height toward the main stack's height — visually "filling the gap" between `f(x−h₂)` and `f(x)`.

Non-dual mode and Leibniz mode are unchanged.

## What the user sees

- With `y = x²`, midpoint 5, increment 1, Dual on: after Find Differences, the change-size stones at each column start on top of the left (companion) stack and rise to the height of the right (main) stack.
- Columns where the change is negative keep the current dark-grey treatment, based on the same companion-stack base.
- Dragging the change stones still works, now by grabbing them over the companion stack.
- After **Divide By Increment**, the board becomes a single slope curve exactly as today (the divide animation already re-renders centered single stacks).

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

1. **`Stacks` change-stone rendering** (around lines 567–625): when `dual` is true (companion present, not animating):
   - Render change pieces at the companion x offset (`cx - COL_SPACING / 4`) instead of the main stack's x.
   - Set `changeBase` from the companion stack's top slot (`cFull + (cFrac >= MIN_PARTIAL ? 1 : 0) + gap`) instead of `sizeTopSlot + gap`. Companion counts are already available in this scope; move the companion-count computation above the change-stone block if needed.
2. **Drag handles** (around lines 858–909): in dual mode, position the change handle's mesh at the companion x offset and compute its base from the companion stack height. The size (main) handle keeps targeting the right stack.
3. **Divide animation**: unchanged — `dual` is already false while `anim` is active, so the falling/repricing animation keeps its current single-stack layout.
4. Counts, differences (`main − companion`), panel values, labels, and unit/floor logic are untouched — this is purely where the change stones are drawn and grabbed.

## Verification

- `bunx tsgo` and `bun run build`.
- Browser check with `y = x²`, midpoint 5, increment 1, Dual on, second increment `w`: after Find Differences, the change-size stones at each column visibly start on top of the left companion stack (screenshot at a low-x column where the height gap is obvious).
- Confirm Divide By Increment still produces slope 10 at x = 5 and the animation plays normally.
- Confirm non-dual Find Differences and Leibniz mode are unchanged.
