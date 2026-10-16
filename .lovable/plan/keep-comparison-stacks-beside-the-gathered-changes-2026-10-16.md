# Keep comparison stacks beside the gathered changes

## Verified result
- For `y = x²`, midpoint 5, increment 1, and Max Stones 50, the board shows 1 size stone in column 2 and 41 in column 10. Their difference is **40 stones**.
- The change stacks in columns **3–9** contain **3 + 3 + 5 + 5 + 7 + 7 + 9 = 39 stones**. This equals column 10 minus column 3: **41 − 2 = 39**.
- Getting 40 would also require the change stack in column 2. The user chose to make From/To select **change stacks 3–9**, rather than include that extra stack.
- Currently, From 3 to 9 selects changes bridging size columns 3 and 9, producing 30 stones and gathering in column 8. The proposed selection will instead gather in **column 9**, retaining the highest-before-alignment destination rule.

## Changes
1. Make From and To inclusive **change-stack column numbers**. For From 3 to 9, gather the change stacks in columns 3 through 9.
2. Keep the size stones outside the selected range visible and stationary throughout alignment, sliding, and completion. In this example, columns **1, 2, 10, and 11** remain visible. Hide size stones inside columns 3–9 as before.
3. Preserve the existing destination rule: choose the selected change stack with the highest visible top before alignment, breaking ties to the right. All other selected change stacks gather there.
4. Correct the sum comparison to use the actual endpoints of the selected differences. For ordinary right-hand comparison, columns 3–9 represent the rise from size column 3 to size column 10; left-hand comparison uses size columns 2 and 9. Do not claim that column 10 minus column 2 equals the 3–9 sum.
5. Update only the stacking Help paragraph, tooltip, and comparison readout to reflect inclusive selection and the retained outside stacks.

## Technical details
- Keep the demonstration display-only: never change board counts, saved operations, or Reverse history.
- Render outside size stacks separately from moving change stacks, preserving their colors, signs, fractional geometry, positions, and visibility after mixed-sign cancellation.
- After Divide By Increment, use the saved pre-division size stacks for outside comparisons in the same units as the restored difference counts. Preserve recoloring, conditional count restoration, and alignment/sliding stages; avoid duplicate stones during the preparation passes.
- Keep Dual Increments’ existing warning: its within-pair differences do not generally telescope between neighboring board columns. Include all selected dual change stacks without inventing an endpoint equality.
- At board edges, ignore nonexistent neighbor differences and use the actual valid endpoints for the comparison. Keep the default 1–11 selection usable.
- Include stationary comparison stacks in framing calculations so they remain visible alongside the gathered pile.

## Checks
- Verify the example end-to-end: inclusive 3–9 sum **39**, destination **9**, outside size counts **0, 1, 41, 50** in columns 1, 2, 10, 11; unchecking restores the original board.
- Verify full-board selection, left-hand comparison, signed and fractional stones, equal-height destinations, and board-edge selections.
- Verify stacking after division, Dual Increments, reduced motion, and Reverse restoration without changing mathematical history.
- Check the visible board and comparison readout, and confirm there are no build or browser errors.