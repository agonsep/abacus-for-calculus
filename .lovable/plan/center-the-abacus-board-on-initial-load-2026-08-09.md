# Center the Abacus Board on Initial Load

## Goal
Make the abacus board appear centered vertically on the screen when the app first loads, instead of sitting noticeably above the viewport center.

## Current state
- The board is rendered inside a group offset by `-panY`. The default `panY` is `-1.0`, so the board is shifted up by 1 world unit.
- The camera position is `[0, 8, 29.2]` and both `OrbitControls` and `CameraController` use a hardcoded target of `[0, 7, 0]`.
- The separator/backboard height is `SEPARATOR_HEIGHT = MAX_PIECES * PIECE_HEIGHT + 0.2 = 18.2`, so its visual center is around `y = 9.15` (without the group shift).
- With the current settings, the board's center is roughly 2.5–3.5 units above the viewport center, making it look off-center on many screens.

## Proposed fix
1. Reset the default `panY` to `0` so the board sits at its natural world position.
2. Compute the board's vertical center from the geometry: `centerY = SEPARATOR_HEIGHT / 2 + 0.05` (about `9.15`).
3. Update the default camera position to `[0, centerY, 29.2]` so the camera is horizontally aligned with the board center.
4. Update both `OrbitControls` target and `CameraController` target to `[0, centerY, 0]` (or `[0, centerY, -depth/2]` if depth-alignment improves the look).
5. Keep the zoom out from the previous plan (`z = 29.2`) and leave `OrbitControls` min/max distance unchanged, so users can still zoom and pan freely.

## Verification
- Load the app at the current desktop viewport size (`949x783`) and confirm the board is vertically centered, with no top or bottom cut off.
- Confirm the zoom controls and pan controls still work as expected.
- Confirm the left title overlay does not overlap the board after centering.
