## Plan

1. Update the difference calculation to preserve the real sign of `y` changes, not the sign of the scaled orange stack heights.
2. Store the sampled function values from `Fill Board` and use them when calculating red stones.
3. Convert those signed function differences back into the current stone scale, so increasing intervals stay red and decreasing intervals become dark grey.
4. Apply the same signed-difference logic to the initial red stones shown after the first fill.

## Technical notes

- The current red color logic already works: negative red values render dark grey.
- The remaining issue is that for equations like `y = x - 5`, the board scales orange stones from a baseline, which can turn negative function values into positive stack counts. Differences calculated from those stack counts therefore lose the expected negative sign.
- The fix is to calculate differences from raw sampled `y` values, then divide by `unit` for display.