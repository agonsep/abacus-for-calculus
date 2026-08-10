Hide Floor readout in Leibniz Mode

## Goal
When the user enables "Leibniz Mode", remove the "Floor: X" line from the left panel because the panel is showing mathematical values `f(x)` and `dy = f'(x)·dx`, not stone counts. The Floor is an internal scaling detail for the red `f(x)` stones and can confuse users in this mode.

## Change
In `src/components/CalculusAbacus.tsx`, update the left panel unit/floor readout so the "Floor" portion is hidden whenever `leibniz` is true. The "One size-stone = ..." line remains visible.

Current structure (around line 1615):

```text
One size-stone = {unit}. {floorValue !== 0 && <> Floor: {floorValue}</>}
```

Updated structure:

```text
One size-stone = {unit}.
{!leibniz && (floorValue !== 0 || (wMode && wBase !== 0)) && <> Floor: {floorValue}</>}
```

## Verification
- Open the app, load the default curve, and confirm the Floor readout still appears when a floor is active.
- Enable "Leibniz Mode" and confirm the Floor readout disappears while the unit readout stays.
- Disable "Leibniz Mode" and confirm the Floor readout returns.
