# Drop the "10 decimals" recommendation from *From Secant to Tangent*

## What changes

- **Setup paragraph:** students enable only **Fractional stones** before **Find Differences**; the **10 decimals** instruction is removed. Increments, refilling, and the Lefthand comparison note stay.
- **One clarifying sentence:** the board shows fractional values to two decimals, so the exact digits for the small increments come from the paper calculation of f(2 + h) − f(2); the board supplies the sizes and the direction of change.
- **Three places that quietly assumed the extra digits:**
  - "What Students Often Notice" — the decimals bullet is reworded around the two-decimal display and the shrinking increment.
  - Common Misconceptions — "Equating more decimals with more accuracy" is reworded the same way, keeping the point.
  - Quick Formative Assessment — uses change-size 0.41 with increment 0.1, which is exactly what the board shows, instead of 0.0401 with 0.01.
- Everything else is untouched: the four increments (0.5, 0.1, 0.01, 0.001), both tables, Figure 1, the expected-values check, timing and adaptation notes, and the attribution line.

## Technical details

- Edits are confined to `src/content/library/from-secant-to-tangent.md`: the setup paragraph, the two bullets, and the assessment line.
- Display behaviour was confirmed in `src/components/CalculusAbacus.tsx`: fractional values are rounded to two decimals unless the "10 decimals" option is on, so 0.0401 and 0.004001 cannot be read off the board — hence the paper-calculation sentence and the assessment change.
- No code, schema, or styling changes.
- Other library files still recommend "10 decimals" (`estimation-before-formalization.md` in its two app-sequence passages, and `from-columns-to-area.md` in its Options row). They are left as they are unless you want the same change applied there.
- After editing: the exercise still renders in the Library in the right order, contains no "10 decimals" text, and shows no horizontal overflow on a phone-width screen.
