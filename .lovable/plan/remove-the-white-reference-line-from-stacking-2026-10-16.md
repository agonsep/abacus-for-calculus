# Remove the white reference line from stacking

## Intended result
Checking **Stack in one column** no longer draws the white horizontal line. The numeric comparison stays as the check on the pile: "Sum of changes = 50 stones. Size stones in column 11 − column 1 = 50 stones."

Everything else about the demonstration is untouched: outside size stacks remain visible and stationary, the destination is still the highest selected stack before alignment, the recolor → restore-counts → align → slide stages run as now, and unchecking still restores the board for Reverse.

## Technical details
- Delete the marker mesh (the white bar) from the scene, along with the `stackMarker` prop and its type, the value passed into the scene, and the `marker` field computed for the stacking state.
- The drag handles are currently hidden while the line is present. Switch that condition to use the active stacking journey instead, so handles stay hidden throughout the demonstration and return when it ends. The stacking journey is already non-null exactly while the line would have shown, so behavior is preserved.
- Remove the Help panel sentence "The pile begins at the selected starting height; the white line marks its endpoint." The tooltip for the checkbox does not mention the line and needs no change.
- Record in project memory and `AGENTS.md` that the guide line was removed at the user's request, so it is not reintroduced. Add the entry to `roadmap.md`.

## Checks
- Default From 1 To 10 and a partial From 3 To 9: no line anywhere during alignment, sliding, or completion; the readout still reports the sum and the endpoint comparison.
- Stacking after Divide By Increment, in ordinary, Dual Increments, and reduced-motion modes: stages unchanged, no line.
- Drag handles do not appear while the demonstration runs and return after unchecking; unchecking restores the board exactly and Reverse still works.
- No build or browser errors.
