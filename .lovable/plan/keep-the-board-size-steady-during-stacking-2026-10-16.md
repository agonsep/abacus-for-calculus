# Keep the board size steady during stacking

## Verified cause
Checking **Stack in one column** currently changes the camera zoom to fit the demonstration’s calculated vertical extent. This makes the whole board appear smaller even though its physical dimensions have not changed. Unchecking restores the previous zoom.

## Planned change
- Keep the current view unchanged when checking or unchecking **Stack in one column**, changing From/To, and moving through every stacking stage.
- Preserve the highest-stack destination, stationary outside size stacks, comparison readout, and recolor → conditional rescale → align → slide sequence.
- Leave stone counts, stone values, mathematical history, and Reverse unchanged.
- Keep existing manual view controls available. If an unusually tall pile extends beyond the current view, the user can adjust the view rather than having the app automatically shrink the board.

## Technical details
- Remove the stacking-only camera zoom adjustment and its cleanup restore from `StackJourneyView` in `src/components/CalculusAbacus.tsx`; retain animation initialization and reduced-motion handling.
- Record the unchanged-framing rule in `AGENTS.md` and track the fix in `roadmap.md` during implementation.

## Verification
- Run the example `y = x²`, midpoint 5, increment 1, maximum 50: Fill Board → Find Differences → More → From 3 to 9 → Stack in one column. Confirm the board edges remain in the same screen positions throughout stacking and after unchecking.
- Repeat with the default 1–11 range, a manually adjusted view, and stacking after Divide By Increment, including Dual Increments.
- Confirm outside comparison stacks remain visible when they were visible before stacking, the selected changes still gather correctly, reduced motion works, and no new browser or compilation errors appear.