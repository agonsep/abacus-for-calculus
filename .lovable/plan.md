## Fix fractional-stone threshold to respect the increment

### Problem
The UI hardcodes a `0.01` threshold when deciding whether to draw a partial stone. If the user sets the increment to `0.005` (or anything below `0.01`), differences of half a stone or more become invisible because the fractional part is below the cutoff.

### Solution
Replace the hardcoded `0.01` check with a dynamic threshold derived from the current increment:
- Render a partial stone whenever `Math.abs(fraction) > increment / 2`.
- This ensures any difference larger than half an increment is always visible as a partial stone, while smaller noise is still suppressed.

### Changes
- Update `src/components/CalculusAbacus.tsx`
  - Find every place that checks `fraction > 0.01` (or similar) for orange and red stone counts.
  - Replace with `Math.abs(fraction) > increment / 2`.
  - Ensure the increment value is available in those computation scopes.

### Outcome
Fractional stones appear consistently at any valid increment, and the UI stays truthful to the chosen granularity.
