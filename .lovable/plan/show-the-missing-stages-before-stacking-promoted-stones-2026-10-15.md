# Show the missing stages before stacking promoted stones

## Intended result
After **Fill Board → Find Differences → Divide By Increment → Stack in one column**, keep the promoted stones visible and transform them in readable stages instead of immediately replacing them with the earlier change stacks.

1. **Recolor:** switch the promoted stacks to the selected change-size palette, one column at a time, left to right. Negative stones use dark grey. Finish this pass before changing counts or moving stones.
2. **Rescale when needed:** restore the saved difference-stone counts in a separate left-to-right pass when promotion changed their counts, including Dual Increments. Skip this stage when counts are unchanged. Keep stacks at their current vertical positions during these first two stages.
3. **Align vertically:** move the selected stacks directly from their current positions into the neighboring bottom-to-top arrangement. As confirmed, do not first lift them back above the earlier size stacks.
4. **Gather horizontally:** after vertical alignment finishes, slide the stacks individually, left to right, into the board’s furthest right-hand column.

Use distinct pauses between stages so recoloring, rescaling, and movement are easy to follow. Do not add original size stones underneath the stacks.

## Preserve
- From/To selects the stretch to sum; the destination remains the board’s last column.
- Stacking directly after Find Differences keeps its existing vertical-then-horizontal sequence.
- Preserve signed and fractional counts, selected palettes, the sum and endpoint marker, and cancellation of opposite signs in the finished pile.
- Stacking remains a demonstration only: unchecking restores the promoted board unchanged, and Reverse still undoes exactly one mathematical operation.
- Reduced motion shows the final arrangement immediately; unchecking or changing the selected span cancels or restarts cleanly.
- Update only the relevant stacking Help paragraph and tooltip; leave articles and exercises unchanged.

## Technical details
- The current journey immediately reads the saved pre-promotion difference counts and starting heights and renders them in the change palette. Extend it with explicit recolor and conditional count-restoration phases before alignment and sliding.
- Initialize the rate-stage display from the currently visible promoted stacks, retaining source identities and positions. Use the saved pre-promotion snapshot for target difference counts and cumulative alignment, without restoring its size stacks or committing it to board state.
- Keep movement groups stable across palette and count passes, retaining the material-refresh safeguard against white stones.
- Include preparation positions and counts in camera bounds so the full transition stays visible. Keep animation locks and completion reporting active through every stage.
- Record the updated display-only animation rule in AGENTS.md and track implementation in roadmap.md.

## Checks
- Visually verify separate recolor → rescale if needed → vertical alignment → horizontal gathering stages after promotion.
- Check ordinary mode with unchanged counts and Dual Increments with changed counts, including second increment 0.1 and w.
- Check Blue/Cyan and the other palettes, negative and fractional stacks, full and partial spans, repeated derivative levels, and direct stacking after Find Differences.
- Verify unchecking restores the exact promoted counts and stone value, Reverse remains consistent, and reduced motion and cancellation leave no stale animation.
- Check the running app for rendering and compilation errors.