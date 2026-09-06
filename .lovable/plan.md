# Make Divide By Increment always preserve stack heights

## Goal
Remove the opt-in "Preserve stack heights" checkbox and make count-preserving division the only behavior of **Divide By Increment**. The old rescaling path is deleted.

## What changes

1. **Remove the checkbox**
   - Delete the `preserveStackHeights` state, the `setPreserveStackHeights` setter, and the entire checkbox label in the right panel.
   - Remove the `unitFlash` state and timer logic, since the visual signal was tied to the optional behavior and is no longer needed.

2. **Make count-preserving promotion unconditional**
   - In `computePromotion`, drop the `if (wMode || preserveStackHeights)` branch and the fallback `computeCounts` path.
   - Always return `{ newYRaw, newDefined, counts, u: unit / incValue, floor: 0 }` for a promotion.
   - Keep the existing undefined-column handling and edge-column loss.

3. **Update the help text**
   - Change the description of **Divide By Increment** so it says the orange change-size stones drop to the board floor and become a new size curve *without changing their heights*, while the value represented by one stone is divided by the increment.

4. **Clean up related UI**
   - Remove the conditional unit-flash styling on the `One stone =` readout.
   - Keep the `One stone =` readout at the top of the left panel.

## Out of scope
- No change to Leibniz Mode behavior.
- No change to the tangent line, home-page launch defaults, or library content.

## Verification
- `bunx tsgo` passes.
- `bun run build` passes.
- Manual check: `y = (x^2 + x)/2`, midpoint `5`, increment `1`, max stones `55` — after **Find Differences** then **Divide By Increment**, stack heights match the orange change-size stones and `One stone =` changes from `1` to `1`.
