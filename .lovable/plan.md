# Show the stone-value notice before the count changes

## What changes

After every column's change-size stones have reached the bottom during **Divide By Increment**, pause the animation before the first count adjustment. If the displayed value of one stone will change, show the existing centered notice with the **new value** for two seconds; in Dual Increments mode, call it a “change-size stone.” Then hide the notice and start the existing left-to-right count-adjustment pass, followed by recoloring and the final panel update. Keep the stones and left-panel values unchanged during the pause.

If the displayed stone value does not change, do not show a notice or add a pause, even when counts change. Do not show the same notice a second time when the animation finishes. Keep click/Esc skip immediate, and keep the direct promotion path for reduced-motion users; its notice lasts two seconds.

## Technical approach

In `src/components/CalculusAbacus.tsx`, compare the currently displayed stone value with the promotion's new value using the existing formatting. Insert a conditional two-second notice step between the last drop and the first resize in the animation queue. Share one notice-display helper with the direct commit path so timers and wording stay consistent, while avoiding a second notice at animated commit. Ensure skip and unmount clear pending animation/notice timers appropriately.

## Checks

Verify a Dual Increments example where rescaling changes counts: all stacks finish falling, the new-value notice appears for two seconds while counts remain steady, then counts change left to right. Check a normal promotion with a changed value, an unchanged-value promotion with no pause, click/Esc skip during the pause, and reduced-motion promotion.
