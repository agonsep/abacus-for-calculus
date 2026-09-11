# Remove the zoom buttons from the right panel

## Goal
Remove the "Zoom" label and `-` / `+` buttons from the bottom of the right control panel. Users will still be able to zoom with the mouse wheel or pinch gestures on touch devices.

## What will change
- In `src/components/CalculusAbacus.tsx`, remove the zoom control block at the bottom of the right panel.
- Keep the underlying zoom state and wheel/pinch handlers intact so zooming still works.
- Remove any now-unused zoom-button-related state or helper code only if it becomes truly unused; otherwise leave the logic in place for future reuse.

## What will stay the same
- Mouse-wheel zoom continues to work.
- Touch/pinch zoom continues to work.
- The camera/zoom state management remains unchanged.

## Implementation notes
- No new dependencies.
- No replacement UI element is added.
- The panel bottom will simply end after the checkbox options and action buttons.

## Verification
- Run TypeScript typecheck.
- Run production build.
- Open `/abacus` in the preview and confirm the zoom buttons are gone and wheel zoom still functions.
