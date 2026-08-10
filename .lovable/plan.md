Hide Floor readout in Leibniz Mode and neutralize the unit readout

## Goal
When the user enables "Leibniz Mode", remove the "Floor: X" line from the left panel because the panel is showing mathematical values `f(x)` and `dy = f'(x)·dx`, not stone counts. The Floor is an internal scaling detail for the red `f(x)` stones and can confuse users in this mode.

Also clarify the unit readout: since the same unit applies to every stone type (red size stones, orange change-size/dy stones, and greyed-out columns), label it as a neutral "stone" instead of a red "size-stone".

## Changes
In `src/components/CalculusAbacus.tsx`, update the left panel unit/floor readout (around line 1615):

1. Hide the "Floor" portion whenever `leibniz` is true. Keep the "One stone = ..." unit readout visible.
2. Replace the word "size-stone" with "stone" in the unit readout, and remove the red `text-[#e8352c]` class so it matches the surrounding text color.

Current text:

```text
One <span className="text-[#e8352c]">size-stone</span> = {unit}.
{(floorValue !== 0 || (wMode && wBase !== 0)) && <> Floor: {floorValue}</>}
```

Updated text:

```text
One stone = {unit}.
{!leibniz && (floorValue !== 0 || (wMode && wBase !== 0)) && <> Floor: {floorValue}</>}
```

## Verification
- Open the app, load the default curve, and confirm the unit readout now says "One stone = ..." in the default text color and the Floor readout still appears when a floor is active.
- Enable "Leibniz Mode" and confirm the Floor readout disappears while the unit readout stays visible.
- Disable "Leibniz Mode" and confirm the Floor readout returns.
- Confirm column headers (`Size`, `Change-Size`, `f(x)`, `dy`) still retain their type colors (red/orange) to distinguish the data columns.
