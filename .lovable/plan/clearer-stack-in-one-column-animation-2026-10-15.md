# Clearer “Stack in one column” animation

## Intended result
Checking **Stack in one column** will show two distinct movements rather than immediately replacing the change stacks with a single pile:

1. **Align vertically.** Keep each selected change-size stack in its own column while moving it vertically into a running-total arrangement: each neighboring stack starts where the preceding stack ends. Hide the size stones for this demonstration so the alignment is unobstructed. Do not drop the change stacks to the floor.
2. **Gather horizontally.** After all vertical movement finishes, slide the selected stacks **one at a time, from left to right**, keeping their established heights. They all end in **column 11, the board’s furthest right-hand column**, even when From/To selects only part of the curve. Keep every stack’s stones together during movement.

The completed pile remains visible until the checkbox is unchecked or another board operation begins. Unchecking restores the normal board without changing its mathematical state.

## Preserve existing behavior
- From/To still selects the stretch whose changes are included; it no longer determines the destination.
- After Divide By Increment, use the saved differences representing rates multiplied by their increment, as the current feature does.
- Keep signed totals, fractional stones, selected colors, and the distinction between ordinary and Dual Increments sums. Decreasing changes step downward; opposite signs cancel in the completed net pile rather than being added as positive heights.
- Keep Reverse and forward operations consistent: stacking is a visual demonstration, not a new mathematical operation or history entry.
- Update only the stacking tooltip and Help paragraph to describe the new sequence and destination. Leave articles and other abacus features unchanged.

## Technical details
- Replace the synthetic one-column `stackDisplay` rendering with a dedicated display-only animation state that retains each source stack’s identity, starting position, cumulative vertical position, and final horizontal position.
- Reuse the existing stone geometry and position interpolation, with full-size stones visible throughout movement. Sequence vertical and horizontal phases explicitly; avoid remounting unrelated stones or replaying the board’s fill animation.
- Anchor the running total to the selected span’s starting height and carry that reference to the destination. Update the existing reference marker so it still refers to the selected span, not the height of column 11 when that lies outside the span.
- Cancel pending movement cleanly on uncheck, Fill Board, Reverse, or other board changes. Prevent conflicting operations while movement is running; changing From/To while checked restarts the demonstration for the new span.
- Respect reduced-motion preferences by showing the completed arrangement immediately. Keep all included stones visible, adjusting framing when necessary rather than silently truncating the sum.

## Checks
- Visually verify that vertical alignment fully finishes before any horizontal slide, and that stacks travel individually to column 11.
- Test the full board and a partial span on the triangular-number curve; From 3 to To 7 should still total 18 stones, now gathered in column 11.
- Check after promotion, with Reverse, with fractional and negative changes, and with Dual Increments.
- Check unchecking, restarting, reduced motion, and narrow-screen controls; confirm no new page or compilation errors.