# Companion stack at x − h₂, placed to the left

## The idea

In **Dual increments** mode, the companion stack currently holds `f(x + h₂)` and sits to the **right** of the main stack. Switch it to hold `f(x − h₂)` and sit to the **left** of the main stack. Everything else about dual mode stays the same.

## What the user sees

**Board**
- Each pair is now: companion stack on the left (`f(x − h₂)`), main stack on the right (`f(x)`).
- The x-axis labels under each pair swap accordingly: the left label reads `x − h₂` (or the dual form `x − h₂·w`), the right label reads `x`.

**Left panel**
- The companion column header changes from `f(x+h₂)` to `f(x−h₂)` (with the minus sign).
- Column order stays: `x | f(x) | f(x−h₂) | # size-stones | # change-size stones | Slope estimate`.
- Companion values update to `f(x − h₂)`.

**Find Differences / slope**
- The change at each column becomes `f(x) − f(x − h₂)` (main minus left companion), so orange change-size stones still measure the gap within the pair.
- Divide By Increment still divides by the second increment `h₂`; with `h₂ = w` the slope column remains the exact derivative (forward and backward differences coincide for the infinitesimal).
- Stone sizes, floor value, and board scale are unchanged — the same union of values is measured, so no rescaling differences.

**Behavior notes**
- The Lefthand comparison checkbox is already disabled in dual mode; that stays.
- Help panel text that describes the companion as `x + h₂` is updated to `x − h₂`.

## Technical notes

All in `src/components/CalculusAbacus.tsx`:

- In `setup()`, compute `ysCompanion` at `x − h₂` instead of `x + h₂` (including the dual/`w` evaluation: evaluate at `x − k·w`).
- Rendering: swap the offsets of the two stacks in a pair — companion at `−COL_SPACING/4`, main at `+COL_SPACING/4` (or equivalent swap in the `Stacks`/`Board` pair layout). Drag handles, connecting trace, and tangent keep targeting the main stack (now the right one).
- Pair labels: left label uses `x − h₂` via `formatDual`, right label uses the plain `x` value.
- Find Differences: `change[i] = size[i] − countsCompanion[i]` (sign flips vs. today) so the orange count stays `f(x) − f(x − h₂)` measured positively in the usual direction.
- Left panel: header `f(x−h₂)`; companion column values already come from `ysCompanion`, so they follow automatically.
- Help panel: update the dual-increments paragraph wording.
- Top readout labels (`One size stone =`, `One change-size stone =`) are unaffected.

## Verification

- `bunx tsgo` and `bun run build`.
- Browser check with `y = x^2`, midpoint `5`, increment `1`, second increment `w`: at `x = 5` the pair shows `25 − 10w` on the left and `25` on the right; Find Differences gives 10 change-size stones' worth of change; Divide By Increment yields the exact slope `10`.
- Repeat with a real second increment (e.g. `0.5`) and confirm labels read `x − 0.5` / `x`.
- Confirm non-dual mode, Leibniz mode, and the disabled Lefthand comparison checkbox are unchanged.
