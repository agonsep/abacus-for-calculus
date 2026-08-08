# "Remove Stones" — promoting change-size stones to size stones

Turning the abacus into a repeatable difference machine: each promotion moves from the current level to the next difference quotient. Level 0 is the original function; level 1 is Δy/Δx; level 2 is Δ²y/Δx²; and so on.

## Why divide by the increment on promotion

Dividing the change-size stones by the increment before they become size stones keeps the promoted stacks tall when the increment is small. With a small increment, raw differences are tiny, so the shape would be nearly invisible. The quotient is the slope (or the next-order derivative estimate), which is the quantity the eye is actually looking for.

## When this is not allowed

- The checkbox is **disabled** when the increment is `w` (or any `k·w`) and a tooltip or message says why.
- If the user somehow triggers it in `w` mode, an error message appears — the same style used for an invalid equation — explaining that promotion requires a real increment, not an infinitesimal one.
- The rest of the board stays unchanged; no state transition occurs.

## Issues to be aware of

1. **The numbers no longer match the old change-size numbers.** A change-size value of 3 with increment 0.25 becomes 12. This is intentional — the left panel now shows the quotient, not the raw difference. The headings will make that explicit.

2. **Overflow when the increment is small.** Increment 0.001 multiplies every value by 1000, so almost any curve blows past the 80-stone ceiling. Fix: after dividing, re-derive the unit and floor to fit Max Stones, exactly as Fill Board does. The stack heights then show the shape at full resolution, and `One size-stone = …` reports the new smaller unit.

3. **Increment greater than 1 shrinks the stack.** With increment 4 the promoted values shrink fourfold. The same auto-rescale in issue 2 fixes this case too.

4. **Floor choice for signed quotients.** Difference quotients are signed. If the values straddle zero, the floor is set to 0 so negative values show as black stones. If they are all positive or all negative, the floor is set to the minimum so the shape fills the board. This mirrors the existing floor logic for y values.

5. **Rounding error amplification.** Promotion must divide the *raw* y-differences, not the rounded stone counts. Dividing rounded counts by 0.001 can turn a half-stone rounding error into 500 stones of error. The app already keeps `yRaw`, so this is a matter of using it and never promoting from `size`.

7. **Columns shrink.** Each promotion loses one edge column (right, or left when the compare direction is flipped) because a difference needs two neighbours. Undefined columns propagate the same way. After several levels the board is visibly narrower.

8. **Reversibility.** Unchecking the box must restore the previous level exactly — including its unit, floor, drags and gaps — so levels are pushed on a stack rather than recomputed. Fill Board returns to level 0. Fractional stones, drags, and the per-row +/− buttons must work against the current level's unit and floor.

9. **Midpoint Tangent.** It draws the derivative of the typed formula, which no longer matches the board above level 0. It is disabled above level 0.

## What the user sees

**The checkbox**
- Label **Remove Stones**, placed with the other checkboxes, disabled unless change-size stones are on the board.
- In `w` mode it is also disabled, with a tooltip: "Promotion needs a real increment, not w."
- Checking it: red size stones disappear; the orange stones fall to the board floor, turn red, and are rescaled to `Δ(y)/Δx` fitted to Max Stones.
- Unchecking it: the previous level returns exactly as it was.
- Repeatable: check again for level 2, 3, … while differences still exist.
- Find Differences at the new level produces the next order of orange stones as usual.

**Left panel**
- Headings show the order above level 0: `Size (Δy/Δx)`, `Change-Size (Δ²y/Δx²)`, `Slope estimate (2nd)`.
- `One size-stone = …` and `Floor: …` show the recomputed values for the current level.
- Lost edge columns read `undefined`, as undefined points do today.

**Board**
- Same colours: negative promoted values are black size stones, negative differences are dark grey.
- Midpoint Tangent disabled above level 0.

**Help panel**
- One paragraph: removing the size stones and dividing the differences by the increment turns the board into the slope curve; do it twice and you are looking at curvature.
- Note that this is not available when the increment is `w`, because `w` already makes the first differences exact and the second differences are zero.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- New `level` state plus a `levelStack` ref of snapshots `{ yRaw, size, change, shift, changeGap, unit, floorValue, defined, wBase }`.
- Promote only if `wMode` is false. If `wMode` is true, set `error` (or `note`) to a message like "Remove Stones cannot be used with the infinitesimal increment w." and return.
- Promote: `newYRaw[i] = (leftCompare ? yRaw[i] − yRaw[i−1] : yRaw[i+1] − yRaw[i]) / h`, where `h` is the numeric increment; `newDefined[i] = defined[i] && defined[neighbour]`.
- Re-run the existing min/max/unit/floor block from `setup()` on `newYRaw` so counts fit Max Stones, with the floor rule from issue 4; zero `change`, `shift`, `changeGap`; bump `runId` to replay the drop animation.
- Size clamping widens to `[−MAX_PIECES, MAX_PIECES]` whenever the floor is 0 and values are signed (the branch the constant-y case already uses).
- `calcDiff`, the `fractional` re-round effect, and the slope cell read the current level's `unit`/`floorValue`; the slope divisor stays `unit / increment` at every level.
- `setup()` resets `level` to 0 and clears the stack; `showLine` is forced false and its checkbox disabled when `level > 0`.
