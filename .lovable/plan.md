# Make the stone-value notice reliably visible

## Goal
After **Fill Board → Find Differences → Divide By Increment**, make the changed `One stone` value visibly flash every time, including with:

- `y = x²`
- midpoint `5`
- increment `0.5`
- max stones `50`
- value changing from `1` to `2`

The notice stays in the left panel: it highlights the number in `One stone = 2`, rather than appearing over the board.

## Plan

1. Reproduce that exact sequence in the running Abacus and inspect the value immediately when the division finishes.
2. Confirm whether the flash class is missing, failing to restart, or present but visually too subtle.
3. Fix the trigger so each completed **Divide By Increment** starts a fresh notice, including repeated divisions and reduced-motion mode.
4. Strengthen the existing two-second highlight around the new value so it is unmistakable without moving or resizing the panel.
5. Verify the exact reported settings, a repeated division, and Dual Increments mode; confirm the highlight appears and then returns to normal.

## Scope
Only the stone-value notice will change. The calculation, stack heights, animation sequence, and controls will remain unchanged.
