# Gray out columns where f(x) is undefined

## Goal
When f(x) has no real, finite value at one of the 11 x-values, keep the board working: that single column is shown in gray and marked undefined, while the other columns fill normally.

## Behavior

**Board**
- An undefined column gets no stones. Instead it shows a translucent gray panel filling the column slot (full separator height), so it reads as "no data here" rather than "zero".
- Its x-label under the board is drawn in gray.

**Left panel**
- The row for that x shows "undefined" (gray) in place of Size, Change-Size and Slope estimate.
- The neighbouring column's Change-Size and Slope estimate also become "undefined", because the difference needs both endpoints.

**Scaling**
- Unit and floor are computed from the defined y-values only, so one bad column no longer distorts (or blocks) the whole board.

**Lines**
- Midpoint Tangent's curved trace breaks at undefined columns (drawn as separate segments) instead of dipping to zero.
- The straight tangent line is still drawn if the midpoint itself is defined; if the midpoint is undefined, no tangent is drawn.

## Does this remove the need for an error message?
Mostly, but not entirely. Keep the error for cases the gray column can't express:
- the formula can't be parsed at all,
- Midpoint or Increment is not a valid number,
- every one of the 11 columns is undefined (nothing to show).

For the partial case, replace the current error with a short gray note above/below the board, e.g. "f(x) is undefined at x = 10.5", stated as information rather than an error. If the midpoint column itself is undefined, that note also mentions the tangent can't be drawn.

## Technical notes
All changes are in `src/components/CalculusAbacus.tsx`:
- Add `defined: boolean[]` state, set in `setup()`; stop throwing `undefined@x` per column and only throw when nothing is defined.
- Compute `yMin`/`yMax`/`isConstant` over defined values only; set `size`/`change` entries to 0 for undefined columns.
- Pass `defined` into `Board` (gray label + gray column panel), `Stacks` (skip rendering), `DragHandles` (no handles on that column), `ConnectingLine` (split into contiguous defined runs), and `TangentLine` (guard on midpoint).
- Left panel rows read `defined[i]` to render "undefined"; difference-dependent cells also check the neighbour used by the current left/right compare direction.
