# Replace Difference Curve left-panel header

## Goal
After the user clicks the **Difference Curve** checkbox (level 1), change the first numeric column header from `Size (Δy/Δx)` to `# change-size-stone/increment`.

## Scope
- Apply at every level above 0 (`level > 0`). In practice the checkbox toggles between level 0 and level 1 — unchecking it restores the board to its pre-promotion state — so this label covers all promoted states.
- Level 0 keeps its current `# size-stones` label.
- Only the `sizeHeader` derivation in `src/components/CalculusAbacus.tsx` changes.

## Changes
In `src/components/CalculusAbacus.tsx`, update the `sizeHeader` derivation around line 1538 so every level above 0 uses the new label:

```
level === 0
  ? "# size-stones"
  : "# change-size-stone/increment";
```

Remove the now-unused `level === 1` branch and the `superscriptDelta` higher-level math headers for this column. (Other headers such as `changeHeader` and `slopeHeader` remain unchanged.)

## Verification
- With `y = x^2`, midpoint `5`, increment `1`, max stones `100`, click **Find Differences** then **Difference Curve**.
- Confirm the left panel header reads `# change-size-stone/increment` instead of `Size (Δy/Δx)`.
- Click **Difference Curve** again to reach level 2 and confirm the first numeric column header still reads `# change-size-stone/increment`.
- Uncheck **Difference Curve** and confirm the header returns to `# size-stones`.
