# Left-panel header: default "y", switch to "f(x)" only with Dual Increments

## Goal
Restore the left panel's main function-value header so it reads **"y"** by default. It should change to **"f(x)"** only when the **Dual Increments** checkbox is active. The companion column, when shown, stays **"f(x+h₂)"**.

## What will change
1. In `src/components/CalculusAbacus.tsx`, introduce a derived header label:
   - `dualActive ? "f(x)" : "y"`
2. Apply that label to:
   - The standard (non-Leibniz) left-panel header currently hard-coded as `f(x)`.
   - The Leibniz Mode left-panel header currently hard-coded as `f(x)`.
     - Since Dual Increments is disabled in Leibniz Mode, this will display "y" there.
3. Leave the companion column header `f(x+h₂)` unchanged.

## Verification
- Run `bunx tsgo` and `bun run build`.
- In the browser preview, confirm:
  - Default state shows the left-panel header as **y**.
  - Checking **Dual Increments** and clicking **Fill Board** changes the header to **f(x)** and shows **f(x+h₂)** for the companion column.
  - Leibniz Mode shows **y** in the left panel.
