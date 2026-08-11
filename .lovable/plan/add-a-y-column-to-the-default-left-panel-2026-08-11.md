# Add a `y` column to the default left panel

## Goal
In the default state (Fill Board done, neither Leibniz Mode nor Difference Curve active), show the actual `y = f(x)` value next to the stone count, so users can relate stones to the function value.

## New layout

```text
x    # size-stones    y    # change-size-stones    Slope estimate
```

- `y` sits immediately to the right of `# size-stones`.
- Values come from the existing `yRaw` array, formatted with the same value formatter used in Leibniz Mode (`fmtVal`, dual-aware via `formatDual` when the increment is `w`).
- Undefined columns show `undefined`, matching the other cells.
- `y` is colored red like the size stones, since it is the value the red stones represent.

## Scope
Only the `level === 0 && !leibniz` panel changes. Difference Curve levels (`level > 0`) keep their current columns, and Leibniz Mode already has its own five-column layout.

## Technical notes

In `src/components/CalculusAbacus.tsx`:
- Add a `y` track to `gridCols` only when `level === 0`; keep the existing templates for promoted levels. Normal: `2rem 6rem 6rem 9rem 2rem`; high precision: `2rem 10rem 10rem 10rem 5rem`.
- In the header row (around line 1666) insert a `y` header cell after `{sizeHeader}`, guarded by `level === 0`.
- In the data rows (around line 1687) insert the matching value cell after the size-count cell, same guard, rendering `wMode ? formatDual(wBase, yRaw[i], fmtVal) : fmtVal(yRaw[i])` when defined.

## Verification
With `y = x^2`, midpoint 5, increment 1, max 100 stones: the row for `x = 5` should show `y = 25` beside its size-stone count, and toggling Difference Curve or Leibniz Mode should show their existing layouts unchanged.
