# Dual-increment left-panel unit readout

## Change

When **Dual increments** is active, the top of the left panel currently reads:

```text
One stone = <unit>.
```

Update it to show two unit labels on the same line:

```text
One size stone = <unit>. One change-size stone = <second-increment>.
```

- The first label replaces the generic "One stone" wording only while Dual increments is applied (`appliedDual` / `dualActive`).
- The second label appears on the same line, after the first, only while Dual increments is applied, and shows the second increment value. If the second increment is the infinitesimal `w`, render it symbolically (e.g. `w`, `2w`) using the existing dual formatting helpers; otherwise render it as a plain number.
- Both labels stay in the existing neutral white/muted text color; do not tint them with the active stone palette.
- When Dual increments is not active, keep the current "One stone = ..." readout unchanged.

## Scope

Only `src/components/CalculusAbacus.tsx`, in the left-panel unit readout around line 2007.

## Verification

1. Load `y = x²`, midpoint `5`, increment `1`, max stones `100`.
2. Check **Dual increments**, set the second increment to `w`, click **Fill Board**, then **Find Differences**.
3. Confirm the left panel top reads:
   - `One size stone = 1.`
   - `One change-size stone = w.`
4. Repeat with second increment `0.5` and confirm `One change-size stone = 0.5.`
5. Uncheck Dual increments and confirm the readout returns to `One stone = ...`.
6. Run typecheck and production build; confirm no errors.
