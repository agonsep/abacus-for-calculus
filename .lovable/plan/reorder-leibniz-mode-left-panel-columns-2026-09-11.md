# Reorder Leibniz Mode left-panel columns

## Goal
When Leibniz Mode is active (including the case where Dual Increments is also checked), reorder the left-panel columns so the mathematical values appear before the stone counts, and use the uppercase Greek letter Δ in the `delta-y` header.

## New column order

```text
x | y | Δy | # size-stones | # change-size-stones | dy
```

- `y` and `Δy` come first, immediately after `x`.
- `# size-stones` and `# change-size-stones` follow the value columns.
- `dy` remains at the end.
- The header text becomes `Δy` while keeping the existing orange `palette.change` color.

## Scope
Only the Leibniz Mode panel in `src/components/CalculusAbacus.tsx` changes. The standard non-Leibniz panel order (`x | y | # size-stones | # change-size-stones | Slope estimate`) and the Dual Increments standard order (`x | f(x) | f(x+h₂) | # size-stones | # change-size-stones | Slope estimate`) remain as they are.

## Technical notes

In `src/components/CalculusAbacus.tsx`:
- Keep the existing `leibnizCols` track widths; they already accommodate six columns.
- In the Leibniz header row (around line 2025), reorder the cells to: `x`, `y`, `Δy`, `# size-stones`, `# change-size-stones`, `dy`.
- In the Leibniz data rows (around line 2042), reorder the value cells to match: `x`, `y`, `Δy`, `size[i]`, `change[i]`, `dy`.
- Preserve existing formatting, undefined handling, palette colors, and `w`-mode dual formatting.

## Verification
- Run `bunx tsgo` and `bun run build`.
- In the preview, set `y = x²`, midpoint `5`, increment `0.5`, max stones `50`, enable Leibniz Mode, then click Fill Board.
- With Dual Increments also checked, confirm the left-panel header reads `x, y, Δy, # size-stones, # change-size-stones, dy`.

