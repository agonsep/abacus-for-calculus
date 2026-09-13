# Remove the default float above size stones

## Goal

Make the change-size stones sit flush on top of the size stones (or, in Dual mode, on top of the companion stack) when the user has not dragged them. Remove any unintended vertical gap that appears by default after **Fill Board** / **Find Differences**.

## Current state

The change stack's base slot is computed as:

```text
changeBase = (dual ? compTopSlot : sizeTopSlot) + gap
```

where `gap` comes from the per-column `changeGap` state array. `changeGap` is initialized to all zeros and is reset to zeros on **Fill Board** and on every promotion. In theory, with no user drag, the change stones should sit exactly on the size stack.

## Investigation and fix

1. **Reproduce and measure.** Open the preview with a simple curve (`y = x²`, midpoint 5, increment 1), click **Fill Board**, then **Find Differences**, and capture a close-up screenshot of a column where the change-size stones meet the size stones. Also inspect the live `changeGap` values in the browser console to confirm whether the gap is state (`changeGap > 0`) or rendering.

2. **Audit `changeGap` defaults.** Search all assignments to `setChangeGap` and the initial `useState` to confirm no path sets a non-zero default. If any path does (e.g., snapshot restore, level push, or an edge case in the drag handlers), change it to zero.

3. **Fix the source.**
   - If the gap is caused by a non-zero `changeGap` leaking in, reset it explicitly at the start of `calcDiff` and in any other path that rebuilds the change stack.
   - If `changeGap` is already zero but the stones still render above the size stack, adjust the base calculation so that when `gap === 0` the first change stone shares the same slot boundary as the top size stone (or top companion stone in Dual mode). Keep the `+ gap` term only for user-dragged offsets.
   - If the float is a 3D perspective effect from the change stones being a separate mesh/color, consider reducing the visual separation by aligning their bottom face exactly with the top face of the size stack.

4. **Preserve drag behavior.** The user must still be able to drag the change-size stack up or down, growing or shrinking `changeGap`. Only the *default, un-dragged* position changes.

5. **Verify.**
   - `bunx tsgo` and `bun run build` pass.
   - Browser check: after **Fill Board** → **Find Differences** on `y = x²`, midpoint 5, increment 1, the change-size stones touch the size stones with no visible gap.
   - Confirm dragging the change stack still opens a gap and the size stack stays put.
   - Confirm Dual mode still places change-size stones on the companion stack, flush with its top.

## Scope

All changes stay in `src/components/CalculusAbacus.tsx`.
