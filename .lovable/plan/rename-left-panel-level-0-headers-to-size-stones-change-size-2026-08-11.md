# Rename left panel level-0 headers to "# size-stones" / "# change-size-stones"

## Goal
When neither **Leibniz Mode** nor **Difference Curve** is active (`level === 0 && !leibniz`), update the left panel column headers so the connection to the physical stones is explicit:
- `Size` → `# size-stones`
- `Change-Size` → `# change-size-stones`

## Why this is safe
- The Help panel already refers to the stones as "size-stones" and "change-size-stones", so the labels will match the user's vocabulary.
- **Difference Curve** (`level > 0`) uses mathematical headers (`Size (Δy/Δx)`, `Change-Size (Δ²y/Δx²)`). These should remain unchanged, so the new wording only applies at `level === 0`.
- **Leibniz Mode** renders its own 3-column layout (`x`, `f(x)`, `dy = f'(x)·dx`) and is unaffected.

## Issues to resolve
1. **Column width**: The current level-0 grid is `2rem 5.5rem 5.5rem 2rem`. The new labels are longer than the old ones and may wrap or be truncated within a 5.5rem column.
   - Option A: Increase the width of the two label columns (e.g. to `6.5rem` or `7rem`) so the full text fits on one line.
   - Option B: Keep the current width and allow the text to wrap to two lines.

## Changes
In `src/components/CalculusAbacus.tsx`:

1. Update the `sizeHeader` and `changeHeader` definitions at `level === 0`:
   - `sizeHeader` → `"# size-stones"`
   - `changeHeader` → `"# change-size-stones"`
2. Optionally adjust the `gridCols` template for the level-0 case to accommodate the longer labels if they do not fit on one line.

## Verification
- With the default curve (`y = x^2`, midpoint 5, increment 1, max 100 stones), verify the left panel headers read `# size-stones` and `# change-size-stones`.
- Click **Find Differences** and then **Difference Curve**; verify the headers return to the difference-quotient form (`Size (Δy/Δx)`, `Change-Size (Δ²y/Δx²)`).
- Enable **Leibniz Mode** and verify the 3-column layout still shows `x`, `f(x)`, `dy = f'(x)·dx`.
- Uncheck both modes and verify the headers return to `# size-stones` / `# change-size-stones`.
