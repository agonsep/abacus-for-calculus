# Reorder Help Panel Paragraphs

## Goal
Move the final paragraphs in the Help panel's "Interacting with the Abacus" section so they appear immediately after that heading.

## Current state
In `src/components/CalculusAbacus.tsx`, the "Interacting with the Abacus" section currently contains:
1. A paragraph about "Midpoint Tangent".
2. A paragraph about dragging stones.
3. A paragraph about minimum increment and max stones.
4. A paragraph about grey undefined columns.
5. A paragraph about typing `w` as an infinitesimal increment.
6. A paragraph beginning with "Clicking \"Divide By Increment\" removes the red size stones...".
7. A paragraph about using `w` with "Divide By Increment".
8. A paragraph about "Leibniz Mode".

## Changes

In `src/components/CalculusAbacus.tsx`:

1. Move paragraphs 6, 7, and 8 (the final three paragraphs beginning with the "Divide By Increment" explanation and ending with the "Leibniz Mode" explanation) so they follow directly after the `<h3>Interacting with the Abacus</h3>` heading.
2. Keep the remaining paragraphs (Midpoint Tangent, dragging, increment/max stones, grey columns, infinitesimal `w`) in their original order after the moved paragraphs.
3. Preserve all existing markup, styling classes, and wording exactly; only reorder the paragraphs.

## Verification
- Open the app and click the "?" Help button.
- In the Help panel, confirm the "Interacting with the Abacus" section begins with the "Divide By Increment" paragraph, followed by the `w` promotion paragraph, then the "Leibniz Mode" paragraph.
- Confirm the remaining paragraphs (Midpoint Tangent, dragging, increment/max stones, grey columns, infinitesimal `w`) still appear below, in the same order as before.
- Run typecheck and production build to ensure no regressions.
