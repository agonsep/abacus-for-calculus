# Show partial stones instead of truncating

## Why 3.85 currently shows 3 stones

There is no pedagogical reason — it is simply how the board draws stacks today. Every stack (size, change-size, companion) draws `floor(|value|)` whole stones and discards the remainder, so 3.85 draws 3 stones while the left panel prints 3.85. That gap between panel and board is misleading, especially in dual increments mode where fractional counts are the whole point.

## New behavior

A stack whose value is 3.85 draws 3 full stones plus one short stone of 0.85 the normal height sitting on top. A value of 0.4 draws a single short stone. Negative values behave the same way, keeping their black / dark-grey coloring.

Applies to all three kinds of stacks:
- size stones (red / black)
- change-size stones (orange / dark grey), including on the Leibniz shelf
- companion stacks in Dual increments mode

Whole-number values look exactly as they do now. With Fractional stones off, counts are already whole, so nothing changes there either.

## Details worth noting

- The partial stone's top is where the panel value says it is, so the board height reads as the exact value.
- Whatever sits above a stack keeps clearing the top of the partial stone: the change-size stones stack on top of the size stones, and the connecting trace, midpoint tangent, and drag handles all anchor to the true (fractional) top rather than the truncated one.
- Very small remainders (below a few percent of a stone) draw nothing, to avoid a paper-thin sliver.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- `Piece` already accepts `heightScale`; the drawing loops in `Stacks` (lines ~448-518) currently stop at `Math.floor`. Add a partial piece after each full-stone loop, using `heightScale = frac` and a target y offset so its base sits on the last full stone.
- Apply in all three loops: size (`yFull`), change (`rFull`), companion (`cFull`).
- Height-dependent geometry currently uses `Math.floor(...)`: the drag-handle top (line ~546) and the tangent midpoint anchor (line ~589). Switch those to the unfloored absolute value so handles and lines meet the partial stone.
- `ConnectingLine` already receives raw `size` values, so it needs no change; verify it lines up with the new tops.
- Change-stone base (`changeBase = yFull + gap`) stays integer-slotted so change stones rest just above the partial size stone; keep the existing gap logic.

## Verification

- `y = x^2`, midpoint 3, increment 0.25, max stones 100, Dual increments with second increment 0.1: the column at x=3 shows 3 full change-size stones plus a 0.85 partial stone.
- Non-fractional runs look identical to today.
- `bunx tsgo` and `bun run build` pass; browser screenshot of the board in both modes.
