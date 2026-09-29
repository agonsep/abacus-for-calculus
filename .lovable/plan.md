# Clarify Divide By Increment in Dual Increments mode

## What changes on the board

For a filled Dual Increments board, animate each column in order from left to right:

1. The two size-stone stacks (left companion and right main) disappear together. The change-size stones remain at their original height above the left stack.
2. Those change-size stones widen from the half-column stack to fill the single, full-width column, without dropping yet.
3. The full-width change-size stack falls to the board floor.

After all columns have made this transition, keep the existing adjustment to the promoted slope curve's stone counts and recolor to size stones. Update the left panel only when the whole animation finishes. The value-per-stone notice, click/Esc skip, reduced-motion behavior, and non-Dual promotion remain as they are.

## Technical approach

- In `src/components/CalculusAbacus.tsx`, retain both halves of each Dual pair in the animation state until that column's clear event, rather than hiding all companion stacks immediately when animation begins.
- Track each animated column's change-stack horizontal position and width separately from its height. Move and widen the existing stones smoothly from the companion half to the centered, full-width column; then use the existing vertical drop mechanism. Keep fractional and negative stones intact.
- Queue clear, expand, and drop events per column before moving to the next; only then run the existing count-adjustment and recolor stages. Keep promotion calculations and the final committed result unchanged.
- Check the supplied x² / 5 / 1 / 50 example with second increment 1, including the start, middle, and end of the animation, then check a normal single-stack promotion and skipping the animation.
