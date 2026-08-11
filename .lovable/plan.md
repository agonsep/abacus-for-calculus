# Confirm Difference Curve header notation

## Current state

The Difference Curve change-column header in `src/components/CalculusAbacus.tsx` currently reads **Δ²y/Δx²** for level 1 (and **Δⁿy/Δxⁿ** for higher levels). This matches the requested finite-difference notation: second difference of y divided by the square of the increment.

## Decision

No code change is required. The existing header remains.

## Verification

With the default `y = x^2`, midpoint 5, increment 1, after clicking **Find Differences** then **Difference Curve**, the left panel header row should still show `x | # change-size-stones/increment | Δ²y/Δx² | Slope estimate (2nd)` in the neutral light color.
