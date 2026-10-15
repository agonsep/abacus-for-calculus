# Animate Reverse one stage at a time

## What Reverse will show

Keep one Reverse click per operation, as confirmed: reversing Divide By Increment returns to Find Differences; another click returns to the preceding board without its change-size stones.

### Reverse Find Differences
- Remove complete change-size stacks one column at a time, **right to left**, reversing their addition order.
- Keep the size stacks stationary and visible. Do not replay their appearance.

### Reverse Divide By Increment
Use separate, readable passes, each **right to left**, finishing one pass before starting the next:
1. **Change color:** switch the promoted stones back to the change-size palette, including the corresponding dark color for negative stones.
2. **Restore counts where needed:** if division changed the displayed counts, restore the saved difference counts in a separate right-to-left pass before lifting. Skip this pass when counts are unchanged; it avoids a sudden count change at the end.
3. **Lift:** move each complete change stack vertically back to its saved position above the earlier size stack.
4. **Restore size stones:** reveal each original size stack as a whole, right to left, underneath the lifted change stones.

In Dual Increments, return the change stones to their original half-width position before restoring each pair of size stacks. Restore both size stacks in a column together. Preserve the overall color → movement → size-restoration order.

At completion, restore the earlier stone value, floor, table, headings, companion settings, and derivative level together. Leave the change stones visible: this is the Find Differences state.

## Preserve
- Exact saved values, signed and fractional stones, selected palettes, and repeated Reverse steps.
- Existing forward animations and Stack in one column behavior; clear the stacking demonstration before reversing.
- Disable board actions and dragging during the transition. Clicking or pressing Esc finishes the current Reverse operation immediately, without consuming another history entry.
- With reduced motion, restore the final state immediately.
- Update only the relevant Help paragraph; no article or exercise changes.

## Technical details
- The current Reverse restores a saved promotion snapshot or clears all differences immediately. Replace those immediate visual changes with a display-only reverse sequence in `CalculusAbacus.tsx`.
- Use the saved pre-promotion snapshot for target counts, positions, companion stacks, and final restoration; do not recompute the earlier curve.
- Extend the animation display state for upward movement and reversed paired-stack width/position changes. Allow previously undefined edge columns to return when their saved stacks are restored.
- Commit the snapshot and consume the history entry exactly once at completion or skip. Reuse timer cleanup and animation locks, ensuring restoration does not trigger another initial stack reveal.
- Give each vertical move enough time to finish visibly before the next column begins; keep reveals and recolors at a short, consistent interval.
- Record the reverse-animation rule in `AGENTS.md` and track completion in `roadmap.md` during implementation.

## Checks
- Verify Fill Board → Find Differences → Reverse removes stacks from column 11 toward column 1 without moving size stones.
- Verify Divide By Increment → Reverse visibly recolors, restores any changed counts, lifts, and restores size stacks in separate right-to-left passes; a second Reverse removes differences.
- Check ordinary and Dual Increments modes, changed and unchanged stone values, negative/fractional stones, returning undefined columns, and repeated derivative rounds.
- Check skipping, reduced motion, stacking cancellation, and repeated board setup for stale timers or extra history changes.
- Visually verify the actual stone movement and final table values in the running app, and check for page and compilation errors.