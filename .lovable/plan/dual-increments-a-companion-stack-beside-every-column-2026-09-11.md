# Dual increments: a companion stack beside every column

## The idea

A new checkbox, **Dual increments**, adds a second increment box next to the first (each box becomes half-width so both fit).

- The first increment still sets where the eleven columns sit: the window, spaced around the midpoint as today.
- The second increment sets how finely the curve is measured *at* each column.

With the box unchecked, nothing changes: the board shows the usual eleven single stacks and behaves exactly as today. Only when the box is checked does the board switch to eleven pairs. Every column then gains a companion stack immediately to its right, holding the stones for `f(x + second increment)` — 22 stacks in total.

## What the user sees

**Board**
- Eleven pairs of stacks. Both stacks of a pair are the usual red size-stones, just narrower so a pair occupies the space one column used to.
- The x-axis label stays on the pair, unchanged.
- A column whose main or companion value is undefined grays out as it does now.

**Find Differences**
- Orange change-size stones measure only the gap *within* each pair: companion minus main. No differences are taken between neighbouring pairs.
- So the orange stone count at a column is `(f(x + h₂) − f(x)) / stone value`.

**Divide By Increment**
- Works exactly as today, dividing by the **second** increment: red stones vanish, orange stones fall to the floor, counts stay put, colors change, and the left panel's "One stone =" value is divided by the second increment.
- The result is a slope curve sampled with the fine increment at eleven widely spaced points.

**Left panel (compact)**
- Columns: `x`, `y`, companion `y`, change-size stones, slope estimate.
- Slope estimate uses the second increment.

**Second increment**
- Any value the first box accepts, including `w`. With `w` the pair difference becomes exact and the slope column shows the true derivative at each of the eleven x-values.
- A companion may land past the next column; that is allowed and often instructive.

**Help panel**
- One new paragraph explaining that the first increment chooses the viewing window and the second measures the slope inside it.

## Interactions

- Leibniz Mode: orange `dy` stones sit on the shelf as today, now measuring the pair difference.
- Midpoint Tangent: the trace connects the main stacks only.
- Lefthand comparison is meaningless in dual mode (the pair already fixes the direction), so it is disabled while Dual increments is checked.
- Repeated Find Differences / Divide By Increment after the first promotion falls back to normal neighbour differencing, since the promoted board is a single curve again.
- Unchecking Dual increments returns the board to its present behaviour and refills.

## Technical notes

Work stays in `src/components/CalculusAbacus.tsx`.

- New state `dualMode: boolean` and `increment2: string`, parsed with the existing `parseIncrement` (so `w` and dual numbers flow through unchanged).
- `setup()` computes a second array `ysCompanion` alongside `ys`. Scaling runs `computeCounts` over the union of both arrays so a single unit and floor cover every stack.
- New `countsCompanion` state parallel to `size`; `defined` becomes true only when both members of a pair evaluate.
- `Board` and `Stacks` take the companion counts and render two stacks per column slot: halve the stack width, offset the main stack by `−xW/4` and the companion by `+xW/4`. Drag handles, connecting trace and tangent keep targeting the main stack.
- `Find Differences` in dual mode sets `change[i] = countsCompanion[i] − size[i]` instead of the neighbour difference; the last column no longer needs its zero special case.
- `computePromotion` divides by the second increment in dual mode; the count-preserving logic is otherwise untouched.
- Slope estimate and Leibniz `dy` readouts switch their divisor to the second increment.
- Increment inputs wrap in a flex row; the second input renders only when the checkbox is on.
