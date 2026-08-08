# "Remove Stones" — promoting change-size stones to size stones

Yes, this is doable. It turns the abacus into a repeatable difference machine: level 0 is f, level 1 is Δf, level 2 is ΔΔf, and so on. Below are the issues worth deciding before building it, then the proposed behaviour.

## Issues to be aware of

1. **Negative stones.** Change-size values are signed (dark grey when negative), but size stones today are clamped at zero and measured from a floor. After promotion, the old negative values must show as black size stones. Cleanest answer: after promotion the floor is 0 and the stack is signed, so the left-panel numbers are exactly the old change-size numbers.

2. **Scale.** Differences are much smaller than the values they came from. If we keep the same unit, a stack that was 40 stones tall becomes 2 or 3 stones — visually thin. If instead we rescale to fill the board, the left-panel numbers will *not* match the old change-size numbers, which is what you asked for. Proposal: keep the unit (numbers match), and let the user click **Fill Board**-style rescaling only if they want it (see below).

3. **Columns shrink.** A difference needs two neighbours, so each promotion loses one column at the right edge (or left, when the compare direction is flipped). It becomes undefined/grey. Two promotions lose two columns, and so on. Undefined columns from the original curve propagate the same way.

4. **Slope column meaning.** The left panel currently computes slope as `change × unit / increment`. At level 1 that same column is really a second-derivative estimate (`change × unit / increment²`). The column needs a level-aware divisor and a heading that says which order it is.

5. **The tangent line.** `Midpoint Tangent` draws the true derivative of the typed formula. At level 1 that no longer matches the board. It should either follow the level (use the (n+1)-th derivative) or be disabled above level 0.

6. **Infinitesimal `w`.** With increment `w` every change-size stone is the same height, so level 2 is all zeros — an empty board. Correct, but worth a note rather than a puzzle.

7. **Reversibility and other controls.** Unchecking the box should return the previous level exactly, so state must be pushed on a stack, not recomputed. **Fill Board** resets to level 0. **Fractional stones**, drags, and per-row +/− buttons must operate on the current level's baseline, not the original floor.

## Proposed behaviour

**The checkbox**
- Label **Remove Stones**, sits with the other checkboxes, disabled (greyed) unless change-size stones are currently on the board.
- Checking it: red size stones disappear, orange change-size stones fall to the board floor and turn red, gaps and drags reset. The board is now one level up.
- Unchecking it: the previous level comes back exactly as it was, including gaps and drags.
- Clicking **Find Differences** at the new level produces second-order change-size stones in orange, as usual.
- The box can be checked repeatedly (level 2, 3, …) as long as differences exist; each uncheck steps back one level.

**Left panel**
- Size column shows the promoted values verbatim (old change-size numbers, signs kept).
- Headings gain the order when above level 0: `Size (Δ)`, `Change-Size (Δ²)`, `Slope estimate (2nd)`.
- `One size-stone = …` keeps the same unit; `Floor: 0` at promoted levels.
- The lost edge column reads `undefined`, as it does today for undefined points.

**Board**
- Same colours and behaviour: negative promoted values are black size stones, negative second differences are dark grey.
- Midpoint Tangent is turned off and its checkbox disabled above level 0 (a one-line tooltip explains why).

**Help panel**
- One short paragraph: removing the size stones and letting the differences become the new sizes is how you take a second difference — the abacus version of a second derivative.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- New `level` state plus a `levelStack` ref holding snapshots of `{ yRaw, size, change, shift, changeGap, unit, floorValue, defined }`.
- Promote: `newYRaw[i] = leftCompare ? yRaw[i] − yRaw[i−1] : yRaw[i+1] − yRaw[i]`, `newDefined[i] = defined[i] && defined[neighbour]`, `size = change` (unchanged numbers), `floorValue = 0`, `unit` carried over, `change/shift/changeGap` zeroed, `runId` bumped to replay the drop animation.
- Size clamping switches from `[0, MAX_PIECES]` to `[−MAX_PIECES, MAX_PIECES]` whenever `level > 0` (same branch the constant-y case already uses).
- Slope cell divides by `increment^(level+1)`; `calcDiff` and the `fractional` re-round effect read `floorValue` and the level-aware clamp instead of assuming a zero floor.
- `setup()` (Fill Board) resets `level` to 0 and clears the stack; `showLine` forced false and its checkbox disabled when `level > 0`.
