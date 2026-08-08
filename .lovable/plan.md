# "Remove Stones" — promoting change-size stones to size stones

Yes, this is doable. It turns the abacus into a repeatable difference machine. With your refinement, each promotion divides by the increment, so the promoted board holds difference **quotients** — level 1 is Δf/Δx, level 2 is Δ²f/Δx², and so on. That keeps the promoted stacks tall when the increment is small, which is exactly when the shape is worth seeing.

## Issues under "divide by the increment"

1. **The numbers no longer match the old change-size numbers.** A change-size value of 3 with increment 0.25 becomes 12. That is the point of the change (taller stacks, readable shape), but the left panel is no longer a verbatim copy of the previous change-size column — it is that column divided by Δx. Worth saying so in the heading.

2. **Overflow when the increment is small.** Increment 0.001 multiplies every value by 1000, so almost any curve blows past the 80-stone ceiling and clamps flat — the shape disappears instead of improving. Fix: after dividing, re-derive the unit and floor to fit Max Stones, exactly as **Fill Board** does. The stack heights then show the shape at full resolution, and `One size-stone = …` reports the new smaller unit.

3. **Increment greater than 1 goes the other way.** With increment 4 the promoted values shrink fourfold and the board goes nearly flat. The same auto-rescale in point 2 fixes this case too.

4. **Rescaling reintroduces a floor.** Difference quotients are signed. Two consistent choices: floor at the minimum quotient (all stacks non-negative, shape preserved, zero is not the board floor) or floor at 0 (signs visible as black stones, but a curve with a large offset wastes the board). Proposal: floor at 0 when the quotients straddle zero, otherwise floor at the minimum — the same rule the board already uses for y.

5. **The slope column becomes uniform.** Because each level is already divided by Δx, `change × unit / increment` remains the right formula at every level — no `increment^n`. The heading should say which order it estimates: 1st, 2nd, 3rd.

6. **Rounding error amplification.** Promotion must divide the *raw* y-differences, not the rounded stone counts. Dividing rounded counts by 0.001 multiplies half-a-stone rounding into 500 stones of error. The app already keeps `yRaw`, so this is a matter of using it and never promoting from `size`.

7. **Infinitesimal `w`.** You cannot divide by `w` numerically. In `w` mode the change-size stones already carry the coefficient of `w`, so promotion divides by the coefficient of the step instead, and level 2 is all zeros (correct: the exact derivative is constant across the columns). A short note beats an empty board with no explanation.

8. **Columns shrink.** Each promotion loses one edge column (right, or left when the compare direction is flipped) because a difference needs two neighbours. Undefined columns propagate the same way. After several levels the board is visibly narrower.

9. **Reversibility and other controls.** Unchecking the box must restore the previous level exactly — including its unit, floor, drags and gaps — so levels are pushed on a stack rather than recomputed. **Fill Board** returns to level 0. **Fractional stones**, drags, and the per-row +/− buttons must work against the current level's unit and floor.

10. **Midpoint Tangent.** It draws the derivative of the typed formula, which no longer matches the board above level 0. Disable it there, or have it draw the next derivative.

## Proposed behaviour

**The checkbox**
- Label **Remove Stones**, next to the other checkboxes, disabled unless change-size stones are on the board.
- Checking it: red size stones disappear; the orange stones drop to the board floor, turn red, and are rescaled to `Δ(y)/Δx` fitted to Max Stones.
- Unchecking it: the previous level returns exactly as it was.
- Repeatable: check again for level 2, 3, … while differences still exist.
- **Find Differences** at the new level produces the next order of orange stones as usual.

**Left panel**
- Headings show the order above level 0: `Size (Δy/Δx)`, `Change-Size (Δ²y/Δx²)`, `Slope estimate (2nd)`.
- `One size-stone = …` and `Floor: …` show the recomputed values for the current level.
- Lost edge columns read `undefined`, as undefined points do today.

**Board**
- Same colours: negative promoted values are black size stones, negative differences dark grey.
- Midpoint Tangent disabled above level 0.

**Help panel**
- One paragraph: removing the size stones and dividing the differences by the increment turns the board into the slope curve; do it twice and you are looking at curvature.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- New `level` state plus a `levelStack` ref of snapshots `{ yRaw, size, change, shift, changeGap, unit, floorValue, defined, wBase }`.
- Promote: `newYRaw[i] = (leftCompare ? yRaw[i] − yRaw[i−1] : yRaw[i+1] − yRaw[i]) / h`, where `h` is the numeric increment (the `w` coefficient in `w` mode); `newDefined[i] = defined[i] && defined[neighbour]`.
- Re-run the existing min/max/unit/floor block from `setup()` on `newYRaw` so counts fit Max Stones, with the floor rule from issue 4; zero `change`, `shift`, `changeGap`; bump `runId` to replay the drop animation.
- Size clamping widens to `[−MAX_PIECES, MAX_PIECES]` whenever the floor is 0 and values are signed (the branch the constant-y case already uses).
- `calcDiff`, the `fractional` re-round effect, and the slope cell read the current level's `unit`/`floorValue`; the slope divisor stays `unit / increment` at every level.
- `setup()` resets `level` to 0 and clears the stack; `showLine` is forced false and its checkbox disabled when `level > 0`.
