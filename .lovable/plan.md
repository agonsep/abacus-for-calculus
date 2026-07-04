## Goal

Implement floor-based scaling that matches the Help panel description exactly, and show the floor in the left panel when non-zero.

## Help panel contract (from lines 1008–1014)

- Find `yMin` and `yMax` of the 11 y-values.
- `u = (yMax − yMin) / maxStones` — one orange stone is worth this amount.
- Stone count per column = `(f(x) − yMin) / u`.
- Baseline (`floor`) = `yMin`.

This is the single source of truth. The current `maxAbs / avail` scaling will be replaced with this formula unconditionally (no branching by sign).

## Edge cases

- **Constant curve** (`yMax === yMin`): keep the existing constant-curve branch; floor is 0 in that case since the baseline gives no information.
- **`yMin === 0`**: floor is 0 → not shown in the UI (which naturally matches "no floor to acknowledge").
- **Negative or mixed y-values**: the formula still works. `f(x) − yMin` is always ≥ 0, so counts are non-negative and stones render normally.

## Changes to `src/components/CalculusAbacus.tsx`

1. **State**
   - Add `const [floorValue, setFloorValue] = useState(0);`

2. **`setup()` (around lines 731–755)**
   - Replace the non-constant branch:
     ```
     u = (yMax - yMin) / avail
     counts[i] = (ys[i] - yMin) / u
     setFloorValue(yMin)
     ```
   - Constant branch: keep current logic and `setFloorValue(0)`.
   - Clamp counts to `[0, MAX_PIECES]` (was `[-MAX_PIECES, MAX_PIECES]`) since values are now non-negative.

3. **`calcDiff()`**
   - Red stones = differences of raw y divided by `unit`. Formula stays the same; no floor subtraction (differences already cancel the baseline).

4. **Left panel top line (lines 866–868)**
   - Render `Floor: {formatNum(floorValue)}` to the right of the existing size-stone sentence, only when `floorValue !== 0`.

## Out of scope

- No help-text edits; the code will now match it.
- No changes to drag handles, slope estimate, or red-stone behavior beyond what the new `unit` naturally provides.