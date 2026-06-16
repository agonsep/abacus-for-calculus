Use a dedicated dark grey color for negative red stones, while keeping negative orange stones black.

## Changes (src/components/CalculusAbacus.tsx)

1. Add a new color constant near the existing `BLACK` (line 18):
   ```ts
   const DARK_GREY = "#4a4a4a";
   ```

2. Update the red column's negative color (line 283):
   ```ts
   const redStoneColor = rNeg ? DARK_GREY : RED;
   ```

Orange-column behavior (line 245) stays unchanged — negative orange stones remain `BLACK`.

## Verification

With `y = 5 - x`, midpoint 3, increment 1: red differences are negative, so red stones should render in dark grey instead of black. Orange negatives (e.g. `y = x - 5`) still render black.