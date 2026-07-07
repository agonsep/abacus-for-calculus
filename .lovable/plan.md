Update all numeric readout widths in `src/components/CalculusAbacus.tsx` from `2.1875rem` to `2rem` (32px) for cleaner, round rem values.

Changes:
- x column grid width: `2.1875rem` → `2rem` in both header and row grid templates.
- Size and Change-size header cells: `w-[2.1875rem]` → `w-8`.
- Size and Change-size numeric readouts: `w-[2.1875rem]` → `w-8`.
- Slope estimate column default width: `2.1875rem` → `2rem` when "10 decimals" is unchecked; keep `6rem` expanded width when checked.

Verification:
- Confirm build passes.
- Confirm via browser inspection that the four numeric readout columns render at 32px in the default state and the slope column still expands when "10 decimals" is checked.