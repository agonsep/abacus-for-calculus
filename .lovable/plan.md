# Convert "Divide By Increment" Checkbox to a Button

## Goal
Replace the current "Divide By Increment" checkbox in the right-side controls with a button that sits directly below the "Find Differences" button. The button should retain the same promote/demote toggle behavior.

## Current state
- The "Find Differences" button is rendered first in the right panel.
- Below it is a checkbox group that includes "Divide Differences By Increment", which is currently checked when `level > 0` and toggles between `promoteLevel()` and `demoteLevel()`.

## Changes

In `src/components/CalculusAbacus.tsx`:

1. Remove the "Divide Differences By Increment" `<label>` block from the checkbox group.
2. Add a new `<button>` immediately after the "Find Differences" button.
   - Label: "Divide Differences By Increment".
   - `type="button"`.
   - `onClick`: if `level === 0`, call `promoteLevel()` (with the same guard that requires change-size stones to exist); otherwise call `demoteLevel()`.
   - `disabled`: same conditions as the current checkbox — disabled while an animation is running, in Leibniz Mode, or when at level 0 with no change-size stones to promote.
   - Use the same tooltip messages currently applied to the checkbox.
   - Style consistently with the other action buttons (rounded, bordered, colored to match the feature; use the orange accent `#ff932a` to align with the difference/action color already used for "Find Differences").
3. Remove the now-unused checkbox group wrapper spacing if it becomes empty or adjust the remaining checkbox list layout so no visual gap remains.
4. Update the Help panel to refer to the control as a button rather than a checkbox, keeping the explanation of what it does unchanged.

## Verification
- Open the app and show the right panel.
- Confirm a button labeled "Divide Differences By Increment" appears directly below "Find Differences".
- With `y = x^2`, midpoint `5`, increment `1`, click "Find Differences" then the new button; confirm the board promotes to the difference curve and the button label or pressed state indicates it can be clicked again to restore.
- Click the button a second time and confirm the board reverts to the pre-promotion state.
- Confirm the button is disabled when no change-size stones exist, during animations, and in Leibniz Mode.
- Confirm the remaining checkboxes still render correctly without a stray gap.