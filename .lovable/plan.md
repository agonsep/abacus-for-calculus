# Rearrange left-panel column order

## Goal
Reorder the left-panel columns so the function value appears before the stone counts, both in the default view and in Dual Increments mode.

## New column orders

**Default left panel (level 0, no Dual Increments):**
```text
x | y | # size-stones | # change-size-stones | Slope estimate
```

**Dual Increments left panel (level 0, Dual Increments active):**
```text
x | f(x) | f(x+h₂) | # size-stones | # change-size-stones | Slope estimate
```

**Leibniz Mode and promoted Difference Curve panels keep their current layouts.**

## Changes

In `src/components/CalculusAbacus.tsx`:

1. **Update `gridCols` templates** to match the new column sequences and sensible widths:
   - Default with y column and change columns: `2rem 4rem 4rem 5.5rem 2rem`
   - Default with y column, change columns, and Dual Increments: `2rem 4rem 4rem 3.5rem 4.5rem 2rem`
   - Difference Curve without y column: keep existing `2rem 4rem 5.5rem 2rem`
   - No change columns with y column: `2rem 4rem 4.5rem`
   - High-precision variants scale proportionally.

2. **Reorder the standard-mode header row** so that:
   - `x` is first,
   - `y`/`f(x)` follows next,
   - `f(x+h₂)` follows immediately after `f(x)` when Dual Increments is active,
   - `# size-stones`, `# change-size-stones`, and `Slope estimate` come after the value columns.

3. **Reorder the standard-mode data rows** to match the header sequence, moving the `y`/`f(x)` and optional `f(x+h₂)` value cells before the size-stone and change-size-stone count cells.

4. **Preserve existing behavior**: conditional rendering for `showYColumn`, `dualActive`, `showChangeColumns`, and `showPromotedSlope`; undefined handling; palette coloring; high-precision formatting; and Leibniz-mode layout all stay unchanged.

## Verification
- Run `bunx tsgo` and `bun run build`.
- In the preview, open `/abacus`, show panels, and click **Fill Board**:
  - Default left panel reads **x, y, # size-stones, # change-size-stones, Slope estimate**.
- Check **Dual increments** and click **Fill Board**:
  - Left panel reads **x, f(x), f(x+h₂), # size-stones, # change-size-stones, Slope estimate**.
- Confirm Leibniz Mode and Difference Curve promoted panels still display as before.
