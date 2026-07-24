## Problem

Toggling the **Fractional stones** checkbox currently calls `setup()`, which resets the `change` array to all zeros (because it isn't the first run). Result: the slope estimate column drops to 0 (or whatever the user last dragged) and doesn't visibly re-round to reflect the checkbox. The user has to click **Find Differences** again to see any change, so it looks like the checkbox has no effect on the estimate.

## Fix

Stop tying the fractional toggle to a full `setup()` refresh. Instead, when `fractional` changes, recompute the `change` array from the existing `yRaw` and `unit` using the same formula as `calcDiff`, rounding or not based on the new value. Also re-round the `size` array from the current `yRaw` and `unit` (and `floorValue`) so the size column and stones update in lockstep.

### Steps

1. In `src/components/CalculusAbacus.tsx`, split the current effect
   ```ts
   useEffect(() => { ... setup() ... }, [maxStones, fractional])
   ```
   into two:
   - `[maxStones]` still calls `setup()` (full recompute — unit may change).
   - `[fractional]` calls a new lightweight `reround()` that:
     - rebuilds `size` from `yRaw`, `unit`, `floorValue` (constant vs. floor case handled the same way as `setup`), rounding iff `!fractional`.
     - rebuilds `change` from `yRaw` and `unit` the same way `calcDiff` does, rounding iff `!fractional`.
     - leaves `shift`, `changeGap`, `xValues`, `unit`, `floorValue`, and formula state untouched.
2. Keep the existing `skipRefillRef` guard so the initial mount doesn't trigger `reround()`.

## Result

Toggling **Fractional stones** immediately re-rounds both size and change columns in place, so the slope estimate (`change * unit / increment`) reflects whole-stone values when the box is off and fractional values when it is on — without wiping user state or requiring a click on **Find Differences**.