## Plan

Add a checkbox near the per-column controls labelled something like "High-precision slope". When checked:
- The slope estimate column widens from `4.5rem` to a larger value (e.g. `8rem`) so 10 decimal digits fit.
- Only the slope estimate values are formatted to 10 decimal places using `.toFixed(10)`.
- All other numeric columns keep the existing `formatNum` behaviour.

## Technical details

In `src/components/CalculusAbacus.tsx`:
1. Add state: `const [slopeHighPrecision, setSlopeHighPrecision] = useState(false)`.
2. Add a checkbox row just above the column header in the left panel, tied to that state.
3. Make the slope column width conditional in both the header grid and the row grid, e.g. `slopeHighPrecision ? "8rem" : "4.5rem"`.
4. In the slope estimate cell, use:
   ```tsx
   {slopeHighPrecision
     ? slopeValue.toFixed(10)
     : formatNum(slopeValue)}
   ```
   where `slopeValue = (red[i] ?? 0) * unit / (Number(increment) || 1)`.
5. Keep `formatNum` unchanged so other columns are unaffected.

No new dependencies are needed.