Increase the max stones input limit to 100 and update the Help panel copy.

## Changes

- In `src/components/CalculusAbacus.tsx`:
  - Raise the constant `MAX_PIECES` from `80` to `100` (this also increases the separator/backboard height to fit the taller stacks).
  - Update the validation clamp in the righthand panel input from `Math.min(80, ...)` to `Math.min(100, ...)`.
  - Update the `<input type="number" max=...` attribute from `80` to `100`.
  - Update the Help panel sentence: "The abacus supports increments as small as 0.001 and as many as 100 stones per column."

## Verification

- Typecheck the project to ensure no numeric constant assumptions break.
- Open the UI and confirm the Max Stones input now accepts values up to 100.
- Open the Help panel and confirm the updated sentence reads correctly.

## Non-goals

- No changes to stone sizing, spacing, or the Remove Stones animation.
- No changes to default max-stones value (remains 50).
