# Neutral headers in Difference Curve mode

## Changes

In `src/components/CalculusAbacus.tsx` (non-Leibniz left panel):

1. When `level > 0` (Difference Curve active), render all header cells in the same neutral light color — the panel's existing `text-muted-foreground` inherited from the header row — instead of red (`#e8352c`) for the size header and orange (`#ff932a`) for the change header. At `level === 0` the current red/orange headers stay unchanged.

2. Change `changeHeader` for `level > 0` from `Change-Size (Δ²y/Δx²)` to just `Δ²y/Δx²`, and the higher-level form from `Change-Size (Δⁿy/Δxⁿ)` to `Δⁿy/Δxⁿ`.

Column widths in `gridCols` stay as they are; the shorter label simply uses less of the existing track.

## Verification

With `y = x^2`, midpoint 5, increment 1: click Find Differences, then Difference Curve, then Find Differences again. The header row should read `x | # change-size-stones/increment | Δ²y/Δx² | Slope estimate (2nd)` all in the same light grey.
