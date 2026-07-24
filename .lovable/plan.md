The user wants to stop rendering fractional stones on the 3D board, but keep the `Fractional stones` checkbox and its effect on the numeric values in the left panel. The connecting/tangent line should snap to the top of the visible whole-stone stacks.

## Changes to make

1. **Stop rendering fractional stones in `Stacks`**
   - Remove the two `if (yFrac > threshold)` and `if (rFrac > threshold)` blocks that render partial-height `Piece`s.
   - Keep the whole-stone loops using `Math.floor(absVal)` and `Math.floor(rAbs)` unchanged.
   - The `increment` prop will no longer be needed in `Stacks`; remove it from `Stacks` and update the `Scene` call site accordingly.

2. **Adjust change-stone base position**
   - In `Stacks`, set `changeBase = yFull + gap` (no longer adding 1 for a fractional size stone).

3. **Adjust drag handles to match visible stacks**
   - In `DragHandles`, compute `oCount = Math.floor(oAbs)` and `rCount = Math.floor(rAbs)` instead of adding the threshold-based partial stone.
   - Remove the `increment` prop from `DragHandles` since it is only used for the threshold.

4. **Snap the connecting/tangent line to whole-stone tops**
   - In `ConnectingLine`, use `Math.floor(Math.abs(v))` for the stack height instead of `Math.abs(v)`.
   - In `TangentLine`, compute the midpoint height using `Math.floor(Math.abs(size[mid]))` and add the same slope-based offset, so the line still follows the original slope but starts at the visible midpoint stone top.

5. **Leave the left panel and fractional checkbox logic unchanged**
   - `fmtCount`, `bump` step sizes, and the `fractional` state all continue to show and manipulate fractional values as they do now.

## Result

The board will display only whole stones, but the left panel still shows precise fractional values (and the `10 decimals` / `Fractional stones` toggles still affect the panel). The connecting line and midpoint tangent line will sit cleanly on top of the visible stacks rather than floating above them.