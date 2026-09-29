# Find Differences counts the visible stones

When Fractional stones is off, Find Differences will add exactly the gap you can see between two stacks. For example, 50 − 41 = 9 stones, not the 10 you get from rounding the true difference.

## Behavior
- Fractional stones off: difference = next stack's stone count minus this stack's stone count (or this minus the one on its left when Lefthand comparison is on).
- Dual increments: difference = main stack's stones minus companion stack's stones. The exception is a second increment of w: that difference stays exact, because the companion has no finite gap.
- Fractional stones on: no change (the true values already add up exactly).
- Leibniz Mode: no change.
- Divide By Increment: no change. Stack heights stay the same and only the stone value is divided.

## Technical details
- In `calcDiff` (`src/components/CalculusAbacus.tsx`), when `!fractional`, compute the difference from the `size` (and `companion`) count arrays instead of `yRaw / unit`. Keep the existing clamps and the undefined-column checks.
- Use the same logic in the re-round effect's `change` recompute branch, so switching Fractional stones off gives matching results.
- Check it in the preview: x², midpoint 5, increment 1, max stones 50 should put 9 stones on the 41 column.
