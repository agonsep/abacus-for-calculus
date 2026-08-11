# Leibniz Mode: add a delta-y column

## How dy is calculated today

For each column `x`, the app evaluates the formula with dual numbers (`evalDual` in `src/lib/dual.ts`, called through `derivAt`), which returns the exact derivative `f'(x)`. If the formula isn't supported by the dual evaluator, it falls back to a central difference with a tiny epsilon. Then:

```text
dy = f'(x) · dx        where dx = the typed Increment
```

With increment `w`, the derivative is taken at the midpoint and `dy` is the infinitesimal `f'(m)·w`. Columns where `f` is undefined or non-differentiable show `undefined`.

## The new column

Insert a sixth column between `# change-size-stones` and `dy`, headed `delta-y`, holding the true forward difference:

```text
delta-y = f(x + dx) − f(x)
```

This is the quantity the orange stones show in ordinary mode, so the panel makes the Leibniz point visible: for `y = x^2`, `x = 5`, `dx = 1`, the row reads `delta-y = 11` next to `dy = 10`.

- Computed by evaluating the formula at `x + dx` directly (not by subtracting the next board column), so the top row also gets a value rather than a blank.
- If `f(x + dx)` is undefined, that cell reads `undefined` while `dy` may still show a value.
- Colored orange like `dy`, since both describe the change layer. `# change-size-stones` keeps counting the orange stones on the shelf, which continue to represent `dy`, not `delta-y` — no board change.
- With increment `w`, `delta-y` prints in `a + b·w` form and equals `dy` exactly for polynomials of degree ≤ 1; for others it still shows only the first-order part, since the dual arithmetic drops `w²`. Worth noting rather than blocking.

Panel layout becomes:

```text
x | # size-stones | y | # change-size-stones | delta-y | dy
```

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- In `setup()`'s Leibniz branch, alongside `dyVals`, build `deltaVals: (number | null)[]` by evaluating the cleaned formula at `x + h` (with the same `isW` handling used for `dyVals`) and subtracting `ys[i]`; store in new `deltaValues` / `deltaDefined` state next to `dyValues` / `dyDefined`.
- Widen the Leibniz header and data grids from 5 to 6 tracks: normal `3rem 5rem 6rem 7rem 6rem 6rem`; `slopeHighPrecision` `3rem 5rem 10rem 7rem 10rem 10rem`.
- Insert the header cell `delta-y` (orange) and the matching value cell, formatted with `fmtVal` / `formatDual` exactly like the `dy` cell.
- The panel is fixed-width; the extra track widens it by about 6rem, which the left panel can absorb at the current viewport.

## Verification

`y = x^2`, midpoint 5, increment 1, max stones 50, Leibniz Mode on: the `x = 5` row should read `y = 25`, `delta-y = 11`, `dy = 10`; the top row should still show a `delta-y` value.
