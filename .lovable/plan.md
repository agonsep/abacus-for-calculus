## Problem

For `y = x − 5`, midpoint 3, increment 1, the first several columns have negative y (rendered as **black** stones). The red column rendered above the black ones is also negative on some columns (rendered as **dark grey**). You can't grab the black stones, and grabbing the red/dark-grey stones requires clicking down where the black stones live.

## Root cause

`Stacks` renders stones using `Math.abs(yVal)`, so black/dark-grey stones are drawn **above the baseline** in the same positions as positive stones — only the color changes.

But `DragHandles` (src/components/CalculusAbacus.tsx, lines 449–478) computes the handle geometry from the raw signed values:

```ts
const oVal = orange[i] ?? 0;         // can be negative (e.g. -7)
const rVal = red[i] ?? 0;            // can be negative
const oCount = Math.floor(oVal) + ...;   // becomes -7
const rCount = Math.floor(rVal) + ...;   // becomes negative
```

Consequences when `oVal` is negative:
- `oCount > 0` is false, so **no orange/black handle mesh is rendered at all** (line 483 guard).
- `orangeTopY = slotY(oCount + off) - PIECE_HEIGHT/2` becomes far below the baseline, so the red handle's `rBottom = oCount > 0 ? orangeTopY : minY` falls back to `minY`, while `redTopY` (computed with negative `oCount`) ends up below `rBottom`. The handle clamps to the 0.1-tall minimum near the floor — so the only place you can grab a red stack is down where the black stones visually sit.

## Fix

In `DragHandles`, treat the visual stack height as the **absolute** count, matching how `Stacks` renders. Two small changes inside the column loop:

1. Replace
   ```ts
   const oCount = Math.floor(oVal) + (oVal - Math.floor(oVal) > 0.01 ? 1 : 0);
   const rCount = Math.floor(rVal) + (rVal - Math.floor(rVal) > 0.01 ? 1 : 0);
   ```
   with absolute-value equivalents:
   ```ts
   const oAbs = Math.abs(oVal);
   const rAbs = Math.abs(rVal);
   const oCount = Math.floor(oAbs) + (oAbs - Math.floor(oAbs) > 0.01 ? 1 : 0);
   const rCount = Math.floor(rAbs) + (rAbs - Math.floor(rAbs) > 0.01 ? 1 : 0);
   ```

The rest of the geometry (orangeTopY, redTopY, MIN_H growth, etc.) then resolves correctly: the orange/black handle is rendered with the right height, and the red/dark-grey handle sits directly over the red/grey stones — no overlap with the black stones below.

## Out of scope

No changes to colors, drag deltas, or `dragColor` logic. The drag math already operates on signed counts; only the **hit-box geometry** is being corrected.
