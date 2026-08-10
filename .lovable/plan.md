# Restore floor readout in left panel when not in Leibniz Mode

## Goal
When Leibniz Mode is not checked, the left panel lists stone counts, so the user needs the floor value to compute actual f(x) from the displayed stack heights. Always show the floor readout in the left panel when not in Leibniz Mode, instead of only showing it when the floor is non-zero.

## Changes
In `src/components/CalculusAbacus.tsx`, update the unit/floor readout near line 1617.

Current logic:

```text
One stone = {unit}.
{!leibniz && (floorValue !== 0 || (wMode && wBase !== 0)) && <> Floor: {floorValue}</>}
```

Updated logic:

```text
One stone = {unit}.
{!leibniz && <> Floor: {floorValue}</>}
```

Keep the w-mode floor formatting (`wMode ? formatDual(wBase, floorValue, fmtVal) : fmtVal(floorValue)`) unchanged.

## Verification
- Open the app with the default curve and confirm the left panel reads "One stone = ..." followed by "Floor: ..." whenever Leibniz Mode is off.
- Enable Leibniz Mode and confirm the floor line is hidden.
- Disable Leibniz Mode and confirm the floor line returns.
- Confirm the floor value still updates correctly when all y-values exceed the max-stone budget.
