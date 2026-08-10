# Simplify the left panel after "Difference Curve"

Two related simplifications to the left panel, both applying only when the user is above level 0 (i.e. after clicking **Difference Curve**).

## 1. Remove the + / − buttons

Once the board shows a difference curve, the stone counts are derived values (Δy/Δx), not something the user should nudge by hand. The `+` and `−` buttons next to the Size and Change-Size numbers are removed whenever `level > 0`; the numbers still display, just as plain read-only values. At level 0 the buttons stay exactly as they are today.

## 2. Hide the empty Change-Size and Slope estimate columns

Immediately after a promotion, the change-size stones have been absorbed into the size stones, so both the "Change-Size" and "Slope estimate" columns are filled with zeros. Those two columns are hidden while the `change` array is all zeros at `level > 0`, and reappear as soon as the user clicks **Find Differences** again and real next-order differences exist. At level 0 the four columns always show, even when empty.

## Technical notes

All changes are in the non-Leibniz branch of the left panel in `src/components/CalculusAbacus.tsx` (roughly lines 1663-1748). Leibniz Mode already renders its own 3-column read-only layout and is untouched.

- Add a derived `readOnlyCounts = level > 0`. When true, render the Size and Change-Size cells as a centered `<span>` with the same font/width as today, without the two button elements. Keep the existing `undefined` fallbacks.
- Add a derived `showChangeColumns = level === 0 || change.some((c) => c !== 0)`.
- When `showChangeColumns` is false, drop the Change-Size and Slope estimate cells from both the header row and the data rows, and shorten the `gridTemplateColumns` strings accordingly (two columns instead of four, for both the normal and `slopeHighPrecision` widths).

## Verification

With `y=x^2`, midpoint `5`, increment `1`, max stones `50`:

- Click **Find Differences**, then **Difference Curve**. The left panel shows only `x` and `Size (Δy/Δx)`, with no `+`/`−` buttons.
- Click **Find Differences** again. The `Change-Size (Δ²y/Δx²)` and `Slope estimate (2nd)` columns reappear with non-zero values and still no `+`/`−` buttons.
- Uncheck **Difference Curve**. The original four-column layout returns with the `+`/`−` buttons working as before.
- Toggle **Leibniz Mode** and confirm its panel is unchanged.
