# Rename Dual Increments Left-Panel Column Label

## Goal
Make the fourth left-panel column label clearer in Dual Increments mode by changing it from `y(x+h₂)` to `Companion y`.

## Changes

In `src/components/CalculusAbacus.tsx`:

1. Locate the left-panel header grid (around line 2085) where the Dual Increments companion column is labeled:
   ```tsx
   <div className="text-center" style={{ color: palette.size }}>y(x+h₂)</div>
   ```
2. Replace the inner text with `Companion y`:
   ```tsx
   <div className="text-center" style={{ color: palette.size }}>Companion y</div>
   ```
3. Preserve the existing styling, conditional rendering, and surrounding columns.

## Verification
- Open `/abacus`, show panels, and check **Dual increments**.
- Confirm the fourth left-panel column header now reads **Companion y**.
- Confirm the companion value column still displays correctly for ordinary and `w` second increments.
- Run typecheck and production build to ensure no regressions.
