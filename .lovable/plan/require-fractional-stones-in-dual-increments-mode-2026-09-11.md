# Require Fractional Stones in Dual Increments Mode

## Behavior

- Checking **Dual increments** automatically turns **Fractional stones** on.
- While Dual increments is checked, the Fractional stones checkbox is disabled (greyed out) with a short hint that dual mode needs fractional counts.
- Unchecking Dual increments restores the user's previous Fractional stones setting (on stays on; off returns to off).
- Works regardless of the order the boxes are checked.

## Why

With a small second increment, the companion stack differs from the main stack by a fraction of a stone. Whole-stone rounding turns every within-pair difference into zero orange stones, and the slope estimate column reads 0 everywhere — the mode shows nothing. Fractional counts keep tiny differences visible, and with `w` as the second increment they are the exact symbolic coefficients.

## Technical details

- `src/components/CalculusAbacus.tsx`
  - Add `prevFractionalRef` (or equivalent state) to remember the fractional setting before dual mode was enabled.
  - In the dual-mode toggle handler: on enable, save current `fractional` and set it `true`; on disable, restore the saved value. This reuses the existing fractional-toggle recompute path (main + companion counts re-rounded together) so no extra count logic is needed.
  - Disable the Fractional stones checkbox (`disabled` attribute + dimmed styling) whenever `dualMode` is on; add a small inline note, e.g. "needed for dual increments".
  - Update the help panel: dual increments requires fractional stones, which is enabled automatically while the mode is on.

## Verification

- `bunx tsgo` typecheck and `bun run build`.
- Browser check: check Dual increments → fractional turns on and its checkbox greys out; uncheck dual → fractional returns to its prior state; with a small second increment the panel shows nonzero fractional change values.
