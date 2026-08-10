# Reorder checkboxes: Difference Curve first, then Leibniz Mode

## Goal
In the right-side controls panel, place the "Difference Curve" checkbox at the top of the checkbox list, immediately followed by "Leibniz Mode". This keeps the two curve-level transformation modes grouped at the top.

## Current checkbox order
1. Leibniz Mode
2. Fractional stones
3. Midpoint Tangent
4. Difference Curve
5. Lefthand comparison
6. 10 decimals

## Desired checkbox order
1. Difference Curve
2. Leibniz Mode
3. Fractional stones
4. Midpoint Tangent
5. Lefthand comparison
6. 10 decimals

## Changes
In `src/components/CalculusAbacus.tsx`, move the `<label>` block for "Difference Curve" (currently around lines 2031-2063) above the "Leibniz Mode" `<label>` block (currently around lines 1994-2003). Do not change any labels, disabled logic, tooltips, or handlers — only reorder the JSX blocks.

## Verification
- Open the app and show the right panel.
- Confirm the top checkbox is now "Difference Curve".
- Confirm the second checkbox is "Leibniz Mode".
- Confirm the remaining checkboxes still appear in the order: Fractional stones, Midpoint Tangent, Lefthand comparison, 10 decimals.
- Confirm existing behavior (disabled states, error messages, Leibniz interactions) is unchanged.
