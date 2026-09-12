# Move the change-size stone value label to its own line

## Change

In `src/components/CalculusAbacus.tsx`, when **Dual Increments** is active, split the top-of-left-panel unit readout across two lines:

```text
One size stone = <unit>.  Size-Stone Floor: <floor>.
One change-size stone = <value>.
```

- The first line keeps the existing "One size stone" label and the optional floor readout.
- The second line shows only the change-size stone value.
- Both lines keep the existing neutral `text-muted-foreground` / `text-foreground` styling.
- Non-Dual mode stays unchanged: a single line reading `One stone = <unit>.` (plus floor if present).

## Scope

Only the unit/floor paragraph near the top of the left panel in `src/components/CalculusAbacus.tsx`.

## Verification

1. `bunx tsgo` and `bun run build` pass.
2. Browser check: with `y = x²`, midpoint `5`, increment `1`, max stones `100`, Dual Increments on, second increment `w`, Fill Board, the left panel top reads:
   ```text
   One size stone = 1.  Size-Stone Floor: 16.
   One change-size stone = w.
   ```
3. Uncheck Dual Increments and confirm the single-line `One stone = ...` readout returns.
