# Prototype: Count-Preserving "Divide By Increment"

## Goal
Change the "Divide By Increment" button so it behaves like the existing infinitesimal (`w`) promotion for all increments: keep the orange change-stone counts exactly as they are, and change only the value represented by one stone (`unit = unit / increment`). Add a brief visual signal so users notice the unit change.

## Why this matches the discussion
- The user wants students to see that the slope curve is the change curve divided by the increment, not a reshaped curve.
- The current `w` mode already does this; the prototype extends it to ordinary finite increments.
- A visual signal addresses the concern that the board can look identical after the operation.

## Current behavior (from code inspection)
- `computePromotion` in `src/components/CalculusAbacus.tsx` computes new raw y-values as `Δy / increment`.
- In `w` mode it returns `{ counts: unchanged, u: unit / increment, floor: 0 }`.
- In normal mode it calls `computeCounts` to re-derive counts, unit, and floor from the new y-values, which reshapes the board.

## Proposed changes

### 1. Count-preserving promotion for all increments
In `computePromotion`, when not in `w` mode, replace the `computeCounts` call with:
- `newCounts` = current orange change-stone counts (rounded to integers, as displayed).
- `newUnit` = `unit / increment`.
- `newFloor` = `0` (so negative values remain black stones below the axis, matching the signed branch of `computeCounts`).

This makes the visible stack heights identical before and after clicking the button; only the "One stone =" readout changes.

### 2. Visual signal for unit change
When the promotion commits, briefly highlight the unit-scale readout at the top of the left panel:
- Flash the background or text color for ~1 second, or
- Show a transient inline message such as "One stone now worth ..." that fades out.

The exact style should reuse existing warm wood / amber accent tokens.

### 3. Guardrails and edge cases
- If `unit / increment` would produce a value smaller than the minimum representable stone value or cause floating-point noise, round it to a clean number of decimal places in the readout.
- If the promoted curve contains undefined columns, keep them undefined; do not invent counts.
- Repeated clicks continue to divide the unit by the current increment (e.g., second differences divide by increment again).
- The existing demote/restore behavior (clicking the button again when no orange stones remain) should still work by popping `levelStack`.

### 4. Toggle or temporary test mode
Because this is a pedagogical experiment, implement it behind a temporary internal flag or user-facing checkbox first (e.g., "Preserve stack heights when dividing"). This lets the user compare both behaviors without committing immediately. After evaluation, the flag can be removed and the new behavior kept, or the old behavior restored.

## Files to touch
- `src/components/CalculusAbacus.tsx` — `computePromotion`, `commitPromotion`, and the unit-scale readout UI.
- Possibly `src/content/library/*.md` — update any help text that describes the current rescale behavior if the prototype is kept.

## Out of scope for this prototype
- No changes to Leibniz Mode shelf behavior.
- No changes to the tangent line or home-page launch defaults.
- No new library articles or exercises.

## Verification
- Typecheck with `bunx tsgo`.
- Production build with `bun run build`.
- Manual checks:
  - `y = (x^2 + x)/2`, midpoint 5, increment 1, max 55: after Divide By Increment, stack heights should be unchanged and "One stone =" should change from 1 to 1.
  - `y = x^2`, midpoint 5, increment 0.5, max 100: after Divide By Increment, stack heights should be unchanged and "One stone =" should double.
  - `y = x^2`, midpoint 5, increment 0.01: after Divide By Increment, stack heights should be unchanged and "One stone =" should become 100× larger; the visual signal should appear.

## Next step
Approve this plan to implement the prototype, or reply with adjustments to the behavior, visual signal, or scope.