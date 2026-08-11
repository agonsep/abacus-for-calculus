# Show Slope estimate after Difference Curve

## Situation

With `y = x^2`, midpoint 5, increment 1, click **Find Differences** then **Difference Curve**. The promotion moves the orange change-size stones down to the board and divides them by the increment, so the `change` array is all zeros. The left panel then hides the `# change-size-stones` and `Slope estimate` columns and shows only two columns:

```text
x    # change-size-stones/increment
```

But the board now *is* the difference curve, so a slope estimate is still meaningful — it is just read off the red stones instead of the orange ones.

## Change

Add a third column, `Slope estimate`, whenever `level > 0` and the change columns are hidden.

Its value for each row is the height of the red stack expressed in y-units:

```text
Slope estimate = Size-Stone Floor + (# stones x unit)
```

i.e. the value of the difference curve Δy/Δx at that x. For `y = x^2`, increment 1, this reads `9, 11, 13, ...` (left-hand comparison flips the sign convention exactly as it does today).

Undefined columns show `undefined`, as they do now.

## Notes

- Level 0 is untouched: it keeps the four columns (`x`, `# size-stones`, `# change-size-stones`, `Slope estimate`) with the existing orange-stone-based slope.
- When the user clicks **Find Differences** again at `level > 0`, real next-order change stones exist, the existing `Change-Size` and `Slope estimate (2nd)` columns come back, and this new column is not shown — avoiding two columns with the same name.
- Unchecking **Difference Curve** restores the pre-promotion panel unchanged.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- Add `const showPromotedSlope = level > 0 && !showChangeColumns;`
- Extend the `gridCols` "hidden" branch from two tracks to three: normal `"2rem 5.5rem 6rem"`, `slopeHighPrecision` `"2rem 10rem 10rem"`.
- In the header row, render a `Slope estimate` cell when `showPromotedSlope`.
- In each data row, render `floorValue + (size[i] ?? 0) * unit`, formatted with the existing `toFixed(2)` / `toFixed(10)` rule used by the current slope cell, greyed to `undefined` when `defined[i]` is false.
