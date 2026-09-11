# Fractional stones for companion stacks

## Goal

Make the companion stacks in Dual increments mode follow the **Fractional stones** checkbox exactly like the main stacks, so the two boxes can be combined in either order with consistent behavior.

## What the user sees

- With **Fractional stones** on and **Dual increments** on: both stacks of every pair show a partial top stone (or negative partial stone) when the count is not a whole number.
- With **Fractional stones** off: both stacks of every pair round to whole stones.
- Flipping the fractional box while Dual increments is active re-rounds both stacks of every pair immediately, without refilling the board or losing drags.
- No changes when Dual increments is off.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

1. **Companion rendering in `Stacks`** (around line 498): replace the `Math.floor(Math.abs(cVal))` whole-stones-only loop with the same full-stones-plus-partial-stone logic the main stack uses (heightScale on the last piece), gated by the existing `fractional` setting. Companion keeps its half width and red/black sign coloring.
2. **Fractional-toggle reroll effect** (around line 1578): when dual mode is active, also recompute `companion` counts from `yRawCompanion` using the same baseline/unit logic as the main `size` recount, rounding or keeping fractions per the new `fractional` value.
3. No other changes: difference measurement, promotion, drag handles, and panel columns are unaffected (counts are already fractional numbers under the hood).

## Verification

- `y = x^2`, midpoint 2, increment 1, second increment 0.5, Fractional stones on: pairs show matching partial-stone behavior on both stacks.
- Toggling Fractional stones with Dual increments active re-rounds both stacks of every pair.
- `bunx tsgo` and `bun run build` pass; browser check of both toggle orders (fractional-first and dual-first).
