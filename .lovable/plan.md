# Leibniz Mode: show stone counts alongside values

## Goal
Make the Leibniz Mode left panel explain the board: show the stone counts next to the mathematical values, and bring back the Floor readout so counts can be converted back to `y`.

## New panel layout

Five columns instead of three:

```text
x    # size-stones    y    # change-size-stones    dy
```

- **# size-stones** — the number of red stones standing on the main floor for that x (the same `size` count the board draws).
- **# change-size-stones** — the number of orange stones on the shelf in the top half of the board for that x (the `change` count). Negative `dy` shows a negative count, matching the dark-grey stones.
- Undefined columns show `undefined` in the count cells as they do today for `y`/`dy`.
- Column colors follow the stones: size count and `y` red, change count and `dy` orange; `x` neutral.

## Floor readout

The header line becomes:

```text
One stone = 0.1.   Floor: 22.5625
```

in Leibniz Mode as well, whenever a floor is in effect. This is what makes the counts readable: `y = Floor + (# size-stones x unit)`, and `dy = # change-size-stones x unit` measured from the shelf.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- Remove the `!leibniz` guard on the Floor span (around line 1611) so the Floor shows in both modes under the existing non-zero condition.
- In the Leibniz branch of the panel (around lines 1615-1653), widen `gridTemplateColumns` from 3 to 5 tracks (normal: `3rem 5rem 6rem 7rem 6rem`; `slopeHighPrecision`: `3rem 5rem 10rem 7rem 10rem`) in both the header row and the data rows.
- Insert a count cell after `x` rendering `size[i]` and one after `y` rendering `change[i]`, both centered, monospace, formatted with the existing `fmtCount` helper so fractional stones display correctly, and greyed to `undefined` when the corresponding value is undefined.

## Verification
With `y = x^2`, midpoint 5, increment 0.05, max stones 50, Leibniz Mode on: the row for `x = 5` should read `y = 25` with a size-stone count near 24, the top row (`x = 5.25`) should read 50 size stones, and the Floor should read `22.5625` next to the unit readout.
