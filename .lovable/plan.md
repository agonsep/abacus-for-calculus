# Hide empty Change-Size and Slope estimate columns after Difference Curve

## Goal
When the user clicks **Difference Curve** and the promoted `change` array is empty (all zeros), the left panel should hide the "Change-Size" and "Slope estimate" columns instead of showing columns of zeros. The columns should reappear when the user clicks **Find Differences** again at the new level and the `change` array contains non-zero values.

## Why
After promotion, the change-size stones have been converted into size stones. The next-order change data does not exist until the user explicitly requests it again with **Find Differences**. Showing two zero-filled columns is misleading and adds visual clutter.

## Changes
In `src/components/CalculusAbacus.tsx`:

1. Add a derived boolean (e.g., `showChangeColumns`) that is `true` when `level === 0` OR when the `change` array contains at least one non-zero value.
   - At level 0, keep the columns visible even if they are empty so the user knows where to look after clicking **Find Differences**.
   - At level > 0, hide the columns when `change` is all zeros (the immediate post-promotion state).

2. Update the left panel header row so it renders only the visible columns (`x` and `Size` when `showChangeColumns` is `false`; otherwise `x`, `Size`, `Change-Size`, `Slope estimate`).

3. Update the per-row grid layout so the column widths and number of columns match the visible headers.

4. Ensure the `+`/`−` buttons and the slope readout are only rendered when the corresponding columns are visible.

5. Keep Leibniz Mode unchanged—it already shows a focused 3-column layout (`x`, `f(x)`, `dy`).

## Verification
- With `y=x^2`, midpoint `5`, increment `1`, max stones `50`, click **Find Differences**.
- Click **Difference Curve**. Confirm the left panel now shows only the `x` and `Size (Δy/Δx)` columns.
- Click **Find Differences** again. Confirm the `Change-Size (Δ²y/Δx²)` and `Slope estimate (2nd)` columns reappear with non-zero values.
- Uncheck **Difference Curve** to return to level 0 and confirm the original 4-column layout returns.
- Confirm that in the default level-0 state, the 4 columns are still visible (even if zeros).
