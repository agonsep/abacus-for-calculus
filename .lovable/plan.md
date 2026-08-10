# "Leibniz Mode" checkbox

A third display mode where the orange stones no longer show a finite difference `f(x+Δx) − f(x)`, but Leibniz's differential `dy = f'(x)·dx`, with `dx` equal to the typed Increment. Red size stones are untouched.

For `y = x^2`, midpoint 5, increment 1, max stones 100: red stones 0, 1, 4, 9, ..., 100; orange stones 0, 2, 4, ..., 20 — exactly `2x·dx`.

## What the user sees

- New checkbox **Leibniz Mode**, next to the other checkboxes.
- Checking it fills every column (including the last one) with orange stones of height `f'(x)·dx`, drawn above the red stones exactly as change-size stones are today.
- Left panel switches to three columns: **x**, **f(x)**, **dy = f'(x)·dx**. The Change-Size and Slope-estimate columns disappear, because in this mode there is no difference and no estimate.
- Unchecking restores the ordinary board (whatever change stones were there before).

## Issues to resolve

1. **Which unit for the orange stones.** Two options:
   - *Shared unit* (same as the red stones): a stone is a stone anywhere on the board, so `dy` can be read directly against `f(x)` and the tangent line stays consistent. The cost is that a flat-ish curve gives a barely visible orange layer. This is how change-size stones behave today, and the example (0, 2, 4, ..., 20) only comes out clean because the unit there is 1.
   - *Own unit* (orange scaled to fill the upper half on its own): the shape of `f'(x)` is always clearly visible, but the two layers are no longer comparable by height, and "One size-stone = ..." needs a second line for the orange unit.

   Recommendation: shared unit, since the whole point of the mode is to see `dy` against `y` on one board. If the derivative layer turns out too flat in practice, an own-unit variant can be added later as a separate toggle.

2. **Overflow at the top — cap Max Stones at 50 in this mode.** When Leibniz Mode is on, Max Stones is clamped to 50 (the input's max drops to 50 and a larger typed value is reduced), so the red layer occupies at most the lower half of the board and the orange `dy` layer has the upper half to grow into. In the worked example the board rescales to a unit of 2: red stones 0, 1, 2, 5, 8, 13, 18, 25, 32, 41, 50 and orange stones 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 — the same shapes, half the resolution, and nothing overflows the 100-stone separator. If `dy` is still large enough to exceed the remaining space (a very steep derivative), the unit is reduced further so `max(size + dy)` fits.


3. **Where `f'(x)` comes from.** The dual-number evaluator in `src/lib/dual.ts` already gives exact derivatives; evaluate `f(x + w)` per column and read the `w` coefficient. Formulas the evaluator does not support fall back to a central difference, or the mode reports that it cannot be used.

4. **Negative `dy`.** Decreasing parts of a curve give negative differentials, which must draw as dark-grey stones below/next to the stack, following the existing sign convention for change stones.

5. **Undefined and non-differentiable columns.** A grey column stays grey. A defined point with no derivative (`abs(x)` at 0) needs its own treatment — most consistent is to show that column's `dy` as undefined rather than invent a one-sided value.

6. **Interaction with the existing controls.** While Leibniz Mode is checked, **Find Differences**, **Difference Curve** and **Lefthand comparison** are all inactive (greyed out and non-functional):
   - **Find Differences** and Leibniz Mode both own the orange layer; Leibniz Mode takes it over, clearing any existing change stones and restoring them on uncheck.
   - **Difference Curve** promotes orange stones into red ones, which would confuse the level stack with the differential layer.
   - **Lefthand comparison** has no meaning here, since a differential has no direction.
   - **Midpoint Tangent** is compatible and stays available.
   - **Fractional stones** applies naturally: `dy / unit` unrounded.
   - **`w` as the increment**: `dx = w` makes `dy = f'(x)·w` an infinitesimal, which is precisely Leibniz's other case and works with the existing `w` scaling. Worth allowing rather than blocking.

7. **Dragging.** Dragged stacks and gaps must be reset when entering the mode, as the promotion animation already requires.

## Conceptual note worth stating in Help

In ordinary mode the orange stones are `Δy`, an actual difference between two columns. In Leibniz Mode they are `dy`, a quantity defined only by the relation `dy/dx = f'(x)`. The two agree in the limit but differ on the board — for `y = x^2` at `x = 5`, `Δy = 11` while `dy = 10`. That visible gap is the point of the mode.

## Technical notes

All in `src/components/CalculusAbacus.tsx` plus a small helper using `evalDual` from `src/lib/dual.ts`.

- New `leibniz` state; when true, `change[i] = f'(x_i)·dx / unit` (rounded unless fractional), computed in `setup()` and in an effect that reacts to the checkbox.
- `defined` gains a per-column differentiability check (dual evaluation throws → treat as undefined for `dy` only).
- Left panel renders a 3-column layout when `leibniz` is true; headings `x`, `f(x)`, `dy = f'(x)·dx`.
- Checkbox disabling wired for Find Differences, Difference Curve, and Lefthand comparison.
- Max Stones input `max` becomes 50 while `leibniz` is true, with the current value clamped on entry and restored on exit; `computeCounts` then fits `size + dy` inside `MAX_PIECES`.
