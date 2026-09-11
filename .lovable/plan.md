# Simplify promoted left-panel header

## Change

After **Divide By Increment** (promoted state, `level > 0`), the first numeric column currently reads `# change-size-stones/increment`. Change it to `# change-size-stones` in all promoted states.

## Why

The division by the increment is reflected in the **value of one stone** shown at the top of the left panel (`One stone = ...`). The stones themselves are still change-size stones, so the column header should describe the stones, not the per-increment value.

## Scope

Only `src/components/CalculusAbacus.tsx`.

- Update the `sizeHeader` derivation so `level > 0` uses `# change-size-stones` instead of `# change-size-stones/increment`.
- Leave `level === 0` as `# size-stones`.
- Leave `changeHeader`, `slopeHeader`, Leibniz layout, and Difference Curve behavior unchanged.

## Verification

With `y = x²`, midpoint `3`, increment `0.5`, max stones `100`, enable Dual increments with second increment `0.5`, click **Find Differences**, then **Divide By Increment**. The left panel's first numeric header should read `# change-size-stones`, and the unit readout at the top should still show the divided value.
