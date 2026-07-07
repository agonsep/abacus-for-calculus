Update the numeric readout widths in the left-hand control panel of the Calculus Abacus so every readout cell is 35 px wide by default.

Changes in `src/components/CalculusAbacus.tsx`:

1. **x column**: shrink grid width from `2.5rem` to `2.1875rem` (35 px).
2. **Size and Change-size readouts**: replace the inner `w-10` (40 px) spans with `w-[2.1875rem]` (35 px).
3. **Slope estimate column**: change default width from `3.5rem` to `2.1875rem` (35 px) when "10 decimals" is unchecked; keep the expanded width when the checkbox is checked so the full precision value remains visible.

All four numeric readouts will then be 35 px wide in the default state.