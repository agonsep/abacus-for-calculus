# Fix the change-size stone value readout in Dual increments

## What you saw

With `y = x^2`, midpoint 5, increment 0.5, max stones 100, second increment `w`:

- `f(x+h₂)` at x=5 shows `25 + 10w` — correct, since the exact pair difference is `10w`.
- The change-size stack shows `20` stones — also correct, but only because one change-size stone is not worth `w` here.

The board scales everything by one stone value. Over this range the y values run from 6.25 to 56.25, so with 100 stones the app sets **one stone = 0.5**. The change-size stones are drawn on that same scale, so each one is worth `0.5w`, and `20 × 0.5w = 10w`. The count is right; the slope estimate (`10`) is right.

The wrong number is the label at the top of the left panel. It reads **"One change-size stone = w"**, when it should read **0.5w**. In your earlier example the increment was 1 and the stone value happened to be exactly 1, so the label looked correct by coincidence.

## The change

Make the top readout report the actual value of one change-size stone, which is the board's stone value (optionally times `w`), not the second increment:

- Second increment `w` (or `k·w`): show the stone value with a `w` attached — `0.5w` in this example.
- Ordinary second increment: change-size stones use the same stone value as size stones, so both labels show the same number. Keep both labels for clarity.
- Non-dual mode keeps `One stone = ...` unchanged.

Nothing about the stone counts, the `f(x+h₂)` column, the slope estimate, or Find Differences / Divide By Increment changes — those are already correct.

## Technical note

In `src/components/CalculusAbacus.tsx`, the dual branch of the "One size stone / One change-size stone" readout currently prints `h2.value`. It should print `unit` instead, rendered through `formatDual(0, unit, fmtVal)` when `h2.infinitesimal` is true and `fmtVal(unit)` otherwise — matching how `calcDiff` divides the pair difference by `unit`.

## Verification

Reproduce the example above and confirm the readout says `One size stone = 0.5. One change-size stone = 0.5w.` with 20 change-size stones at x=5 and a slope estimate of 10. Re-check the earlier increment-1 case still reads `w`. Typecheck and build.
