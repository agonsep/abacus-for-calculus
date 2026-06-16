## Problem

Looking at `src/components/CalculusAbacus.tsx`, the rendering code in `Pieces` (lines 243–245) already turns a stone black when its stored value is negative:

```ts
const neg = yVal < 0;
const stoneColor = neg ? BLACK : ORANGE;
```

…but the data fed into it is never negative. In `setup()` (lines 733–740), orange counts are normalized as:

```ts
counts = ys.map(y => (y - yMin) / u)   // always ≥ 0
```

So even for `y = x − 5` (which gives y-values from −7 to 3 across the 11 columns), every count comes out ≥ 0 and every orange stone renders orange. Black orange stones are effectively unreachable.

Similarly, red stones (differences) are forced positive at line 748/750 with `Math.abs(...)`, so a decreasing function can never produce black red stones either.

## Fix

1. **Orange column — preserve sign.**
   In `setup()`, change the non-constant branch so the unit `u` is based on the largest magnitude (not the range), and counts use raw `y / u`:
   ```ts
   const maxAbs = Math.max(Math.abs(yMin), Math.abs(yMax), 1e-9);
   u = maxAbs / avail;
   counts = ys.map(y => {
     const raw = y / u;
     const v = fractional ? raw : Math.round(raw);
     return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
   });
   ```
   Negative y now yields a negative count, which the existing `Pieces` code already renders as a stack of black stones.

2. **Red column — allow signed differences and render black when negative.**
   - In the initial-red computation (lines 746–751), drop `Math.abs(...)` so red holds signed differences.
   - In `Pieces` (lines 280–314), mirror the orange logic for red: compute `rNeg = rVal < 0`, use `Math.abs(rVal)` for `rFull`/`rFrac`, and pass `color={rNeg ? BLACK : RED}` to the red `<Piece>`s.
   - Audit the rest of the file for places that assume red ≥ 0 (drag handlers around line 642+ and the readout at line 887) and update them to use absolute value where needed for stacking/positioning while keeping the sign for color.

3. **Verification.**
   With midpoint 3, increment 1, `y = x − 5`: leftmost columns (y = −7…−1) should render as black stacks, the column at x=5 has y=0 (empty), and x=6…8 render as orange. Red differences are all +1, so red stones stay red. Try `y = 5 − x` to confirm red stones turn black for a decreasing function.

## Notes / open question

The change subtly alters the orange scale for functions that never cross zero (e.g. `y = x²` on a positive range): stones will be sized relative to `max|y|` instead of `yMax − yMin`, so a curve like y from 100 to 110 will show ~full stacks across all columns instead of spreading 0…avail across the range. If you'd rather keep the current "spread across the range" look when all y-values share a sign, say so and I'll gate the new behavior to only kick in when `yMin < 0 < yMax`.
