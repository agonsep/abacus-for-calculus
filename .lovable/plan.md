# Apply input changes only with Fill Board

## Goal
Values typed into the formula, midpoint, increment, second increment, and Max Stones fields remain drafts. The visible board and its calculations do not change until **Fill Board** is clicked.

## Current cause
- **Max Stones** automatically calls the board setup whenever its field changes.
- The second increment automatically refills the board while Dual increments is active.
- Formula, midpoint, and increment are also read directly by tangent, slope, and Divide By Increment calculations, so parts of the current board can change even without a refill.

## Changes
- Keep separate **draft input values** and **applied board settings**.
- Make **Fill Board** validate and apply all five input values together, then rebuild the board once.
- Remove automatic refills caused by editing Max Stones or the second increment.
- Make the current board’s tangent, slope display, differences, and Divide By Increment use the last applied settings rather than unsubmitted text.
- Keep **Find Differences** acting on the board already visible; it will not apply pending input edits.
- Preserve the existing checkbox interactions. In particular, checking **Dual increments** can still switch the board to paired stacks as designed, but subsequent edits to its second increment wait for **Fill Board**.
- Preserve the initial automatic fill when the abacus first opens.

## Verification
Test formula, midpoint, both increments, and Max Stones individually to confirm typing and leaving each field does not alter stones, labels, tangent, or slope values. Then confirm **Fill Board** applies all pending values together and **Find Differences** continues to use the previously filled board when edits are pending.

## Technical notes
The implementation remains contained in `src/components/CalculusAbacus.tsx`. An applied-settings snapshot will become the source for board-dependent calculations, while the existing input state remains editable form state.
