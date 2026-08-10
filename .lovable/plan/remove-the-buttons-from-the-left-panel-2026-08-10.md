# Remove the + / − buttons from the left panel

The nudge buttons next to each Size and Change-Size number are unused clutter. Remove them everywhere, in all modes.

## What changes

- No + / − buttons in the left panel at any time (level 0, after Difference Curve, and in Leibniz Mode).
- Each row shows just the numbers: x, Size, Change-Size, Slope estimate.
- Column headers re-center over the numbers now that the button spacers are gone; column widths tighten slightly so the panel stays compact.
- Everything else stays the same: dragging stones on the board still edits values, and the hiding of empty Change-Size / Slope columns after a Difference Curve promotion is unchanged.

## Technical notes

In `src/components/CalculusAbacus.tsx`:
- Delete the button elements and the `h-5 w-5` header spacer divs in the left-panel header and row map.
- Remove the now-unused `readOnlyCounts` flag, the `bump` helper, and `sizeBumpMin`.
- Simplify the numeric cells to plain centered spans and adjust `gridCols` widths accordingly.
