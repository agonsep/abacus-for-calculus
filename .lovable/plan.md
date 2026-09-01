# Keep dividing: promote repeatedly instead of toggling back

## Goal

Today the "Divide By Increment" button is a toggle: at level 0 it promotes; at any higher level it demotes back to the previous level. Change it so the button keeps going deeper — after promoting to the slope curve (level 1), clicking "Find Differences" and then "Divide By Increment" promotes again to the curvature curve (level 2), and so on.

## New button behavior

The button's action depends on what's on the board, not on the level number:

- **Change-size stones are on the board** (any level) → promote: remove the size stones, drop the change-size stones, resize them to Δ/Δx, recolor them. Same four-phase animation as today, now repeatable at every level.
- **No change-size stones and level > 0** → restore the previous level (demote), exactly as today.
- **Level 0 with no change-size stones** → disabled, tooltip "Find differences first." (unchanged).

So the flow Fill Board → Find Differences → Divide By Increment → Find Differences → Divide By Increment climbs levels 0 → 1 → 2 → …, and the demotion path is still available once a level has no change-size stones.

## What changes in `src/components/CalculusAbacus.tsx`

1. **Button onClick (around line 2039):** replace the `level === 0 ? promote : demote` test with `change.some(v => v !== 0) ? promoteLevel() : demoteLevel()`. The existing "no change-size stones" error stays for the level-0 case (button is disabled there anyway).
2. **Disabled/title logic:** disabled when `level === 0 && no change stones`, or during animation, or Leibniz Mode — unchanged. Keep the `w` restriction: in `w` mode the promoted curve is constant, so its differences are zero and the button naturally falls through to demote at level > 0. The existing tooltip copy still applies.
3. **Promotion guards already handle deeper levels:** `computePromotion` divides raw `yRaw` differences by the increment and re-fits unit/floor via `computeCounts`, so it works identically at level 1, 2, … The level stack (`levelStack`) already snapshots each level, so demotion pops one level at a time. No changes needed there.
4. **Headers/left panel:** already level-aware (`Δ²y/Δx²`, `Slope estimate (2nd)`, etc.) via the existing `level` state — no changes.
5. **Help panel text (around line 1910):** update the "Divide By Increment" paragraph to describe repeatable promotion: after promoting to the slope curve, Find Differences produces second-order change-size stones and clicking Divide By Increment again promotes them to the curvature curve (Δ²y/Δx²); when a level has no change-size stones, the button restores the previous level.

## Edge cases

- **Demotion requires clearing change stones first.** Once you've clicked Find Differences at level 1, the button promotes to level 2 rather than returning to level 0. To go back, the user clicks Divide By Increment at a level with no change-size stones (one demotion per click, down the stack). This is the direct consequence of the requested "no reversal while differences exist" rule.
- **Column shrinkage:** each promotion already drops an edge column and propagates undefined columns; deeper levels just get narrower, as designed.
- **`w` mode:** unchanged — promotion from level 0 gives the exact derivative; second differences are zero so the button demotes from level 1.

## Verification

- `bunx tsgo` typecheck.
- Manual/Playwright run: Fill Board → Find Differences → Divide By Increment (level 1, red slope stones) → Find Differences (orange Δ² stones) → Divide By Increment (level 2, red curvature stones, header shows Δ³y/Δx³ for the change column) → Divide By Increment with no change stones (back to level 1 with its stones intact).
