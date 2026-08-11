# Replace Difference Curve left-panel header

## Goal
After the user clicks the **Difference Curve** checkbox (level 1), change the first numeric column header from `Size (Δy/Δx)` to `# change-size-stone/increment`.

## Scope
- Apply only at `level === 1`. Higher levels (`level >= 2`) keep their existing `Size (Δⁿy/Δxⁿ)` notation.
- Level 0 keeps its current `# size-stones` label.
- Only the `sizeHeader` derivation in `src/components/CalculusAbacus.tsx` changes.

## Changes
In `src/components/CalculusAbacus.tsx`, update the `sizeHeader` ternary around line 1538:

```
level === 0
  ? "# size-stones"
  : level === 1
    ? "# change-size-stone/increment"
    : `Size (Δ${superscriptDelta(level)}y/Δx${superscriptDelta(level)})`;
```

The `text-[#e8352c]` color class already applied to the header cell remains unchanged.

## Verification
- With `y = x^2`, midpoint `5`, increment `1`, max stones `100`, click **Find Differences** then **Difference Curve**.
- Confirm the left panel header reads `# change-size-stone/increment` instead of `Size (Δy/Δx)`.
- Uncheck **Difference Curve** and confirm the header returns to `# size-stones`.
- Click **Difference Curve** twice to reach level 2 and confirm the header still shows the Δ² math notation.
