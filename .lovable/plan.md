Reorder left-panel checkboxes

Move the "Leibniz Mode" checkbox so it appears after the "Dual increments" checkbox in the left control panel of `src/components/CalculusAbacus.tsx`.

Current order:
- Leibniz Mode
- Fractional stones
- Midpoint Tangent
- Dual increments
- Lefthand comparison
- 10 decimals

New order:
- Fractional stones
- Midpoint Tangent
- Dual increments
- Leibniz Mode
- Lefthand comparison
- 10 decimals

Technical detail
- The change is a single JSX reorder in the panel around lines 2413–2460. No state, logic, labels, or disabled conditions change; only the DOM order of the two `<label>` elements is swapped.
- Verify with typecheck and production build.