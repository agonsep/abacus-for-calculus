# Replace zoom buttons with a segmented pill stepper

## Goal
Replace the current "Zoom" label plus separate `-` and `+` square buttons at the bottom of the right control panel with a compact segmented pill stepper, matching the selected design direction.

## What will change
- In `src/components/CalculusAbacus.tsx`, restyle the zoom control area at the bottom of the right panel.
- Keep the existing zoom logic (increment/decrement zoom level on button click).
- Add a centered percentage readout between the two buttons.
- Use rounded, compact button styling consistent with the dark slate panel.

## Visual reference
Selected direction: **Segmented pill stepper**
- A single rounded pill container with a subtle border.
- Left button: minus icon.
- Center: current zoom percentage (e.g., `100%`).
- Right button: plus icon.
- Hover states: slightly lighter background and white icon.
- Label "Zoom" remains to the left of the pill.

## Implementation notes
- Preserve all existing zoom behavior and keyboard/accessibility attributes.
- Use Tailwind CSS only; no new dependencies.
- Keep the control at the bottom of the right panel, just above "Hide panels".

## Verification
- Run TypeScript typecheck.
- Run production build.
- Open `/abacus` in the preview and confirm the new zoom control appears and the +/- buttons still adjust the camera zoom.
