Replace "y" with "f(x)" in left-panel column headers

## Goal
Make the left-panel column headers consistent with the recently changed Dual Increments companion header `f(x+h₂)` by relabeling the main function-value column from `y` to `f(x)`.

## Changes
- In `src/components/CalculusAbacus.tsx`, update the two left-panel header rows that currently display `y`:
  - Standard mode header row (around line 2083).
  - Leibniz mode header row (around line 2026).
- Replace the text with `f(x)` while preserving the existing `palette.size` color styling and conditional rendering.
- Leave all other labels (`x`, size/change headers, slope header, `f(x+h₂)`) untouched.

## Verification
- Run `bunx tsgo` to confirm TypeScript type safety.
- Run `bun run build` to confirm production build succeeds.
- Use a Playwright browser check to open `/abacus`, enable Dual Increments, fill the board, and verify the headers read `x`, `f(x)`, `f(x+h₂)` in the left panel.
