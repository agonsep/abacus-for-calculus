# Zoom Camera Out to Fit the Full Board

## Goal
Prevent the top of the 100-stone abacus board from being cut off on a typical desktop Chrome viewport by pulling the default camera back slightly.

## Current state
- The default camera is at `position: [0, 8, 23.6]` with `fov: 45`.
- The 100-stone separator/backboard reaches a world height of about `19.1` units.
- The visible vertical range at the target (`[0, 7, 0]`) is roughly `y = -2.78` to `16.78`, so the top of the board is about 2.3 units above the visible area.

## Proposed fix
- Increase the default camera distance along the z-axis in the `<Canvas>` setup so the full 100-stone height fits in the initial frame.
- A new default position of `position: [0, 8, 29.2]` (or a similarly rounded value) should make the visible range roughly `y = -5.1` to `19.1`, keeping both the bottom and top of the board in view.
- Keep the target at `[0, 7, 0]`, the fov at `45`, and the `OrbitControls` min/max distances unchanged so the user can still zoom in/out.
- File: `src/components/CalculusAbacus.tsx`, line where `<Canvas>` is declared.

## Verification
- Typecheck the project.
- Load the app in a desktop-sized browser and confirm the entire board is visible on first load without scrolling or panning.
- Confirm the zoom controls still work normally.
