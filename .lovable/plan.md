# "Leibniz Mode" checkbox

A third display mode where the orange stones no longer show a finite difference `f(x+Δx) − f(x)`, but Leibniz's differential `dy = f'(x)·dx`, with `dx` equal to the typed Increment. Red size stones are untouched.

For `y = x^2`, midpoint 5, increment 1, max stones 100: red stones 0, 1, 4, 9, ..., 100; orange stones 0, 2, 4, ..., 20 — exactly `2x·dx`.

## What the user sees

- New checkbox **Leibniz Mode**, next to the other checkboxes.
- Checking it fills every column (including the last one) with orange stones of height `f'(x)·dx`, drawn above the red stones exactly as change-size stones are today.
- Left panel switches to three columns: **x**, **f(x)**, **dy = f'(x)·dx**. The Change-Size and Slope-estimate columns disappear, because in this mode there is no difference and no estimate.
- Unchecking restores the ordinary board (whatever change stones were there before).

## Issues to resolve

1. **Stones vs. values.** Orange counts must use the same `unit` as the red stones, i.e. `round(dy / unit)`, not `dy` itself. The example works out to 0, 2, 4, ..., 20 only because the unit happens to be 1 there. With any other scale the counts differ from the printed `dy`, exactly as change-size stones behave today.

2. **Overflow at the top.** Today the last column has no orange stones (forward difference), so `x = 9` is the tallest stack (100). In Leibniz Mode the last column gets `dy = 20` on top of 100 red stones — 120 stones against a 100-stone separator. Options: (a) let it overflow visually, (b) rescale the unit so `max(size + dy)` fits Max Stones, (c) clamp the drawn orange stack and note the true value in the panel. Recommended: (b), consistent with how Fill Board already fits the board, with the consequence that the red counts in the example become 0, 1, 3, 8, ... instead of the clean squares.

3. **Where `f'(x)` comes from.** The dual-number evaluator in `src/lib/dual.ts` already gives exact derivatives; evaluate `f(x + w)` per column and read the `w` coefficient. Formulas the evaluator does not support fall back to a central difference, or the mode reports that it cannot be used.

4. **Negative `dy`.** Decreasing parts of a curve give negative differentials, which must draw as dark-grey stones below/next to the stack, following the existing sign convention for change stones.

5. **Undefined and non-differentiable columns.** A grey column stays grey. A defined point with no derivative (`abs(x)` at 0) needs its own treatment — most consistent is to show that column's `dy` as undefined rather than invent a one-sided value.

6. **Interaction with the existing controls.**
   - **Find Differences** and **Leibniz Mode** both own the orange layer. Simplest rule: Leibniz Mode takes over the orange stones and disables Find Differences while checked (and clears any existing change stones, restoring them on uncheck).
   - **Difference Curve** promotes orange stones into red ones; promoting a differential is meaningful (it is the derivative curve) but changes the meaning of the level stack. Recommended: disable Difference Curve while Leibniz Mode is on.
   - **Lefthand comparison** has no meaning here (a differential has no direction) — disable it.
   - **Midpoint Tangent** is compatible and should stay available.
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
- Optional unit rescale (issue 2) reuses the existing `computeCounts` fitting logic against `size + dy`.
