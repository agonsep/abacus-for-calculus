# Reorder Help Panel Paragraphs

## Goal
Reorder the paragraphs in the Help panel's "Interacting with the Abacus" section so the infinitesimal-increment paragraph leads, followed by the "Divide By Increment" explanation and the remaining paragraphs.

## Current state
In `src/components/CalculusAbacus.tsx`, the "Interacting with the Abacus" section currently contains:
1. A paragraph about "Midpoint Tangent".
2. A paragraph about dragging stones.
3. A paragraph about minimum increment and max stones.
4. A paragraph about grey undefined columns.
5. A paragraph beginning "You can also type `w` as the increment...".
6. A paragraph beginning "Clicking \"Divide By Increment\" removes the red size stones...".
7. A paragraph about using `w` with "Divide By Increment".
8. A paragraph about "Leibniz Mode".

## Changes

In `src/components/CalculusAbacus.tsx`:

1. Move paragraph 5 ("You can also type `w` as the increment...") so it appears immediately after the `<h3>Interacting with the Abacus</h3>` heading.
2. Move paragraphs 6, 7, and 8 so they follow paragraph 5, preserving their internal order:
   - "Clicking \"Divide By Increment\" removes..."
   - "When the increment is `w`..."
   - "Checking \"Leibniz Mode\"..."
3. Keep the remaining paragraphs (Midpoint Tangent, dragging, increment/max stones, grey columns) in their original order after the moved paragraphs.
4. Preserve all existing markup, styling classes, and wording exactly; only reorder the paragraphs.

## Verification
- Open the app and click the "?" Help button.
- In the Help panel, confirm the "Interacting with the Abacus" section begins with the "You can also type `w` as the increment" paragraph, followed by the "Divide By Increment" paragraph, the `w` promotion paragraph, and the "Leibniz Mode" paragraph.
- Confirm the remaining paragraphs (Midpoint Tangent, dragging, increment/max stones, grey columns) still appear below, in the same order as before.
- Run typecheck and production build to ensure no regressions.

