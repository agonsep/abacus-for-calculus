## Show 10 decimals for Size and Change-Size columns too

**Difficulty: easy.** All changes stay in `src/components/CalculusAbacus.tsx`, in the same block already used by the "10 decimals" toggle. No new state, no math changes — just formatting and column widths.

### What changes

When the "10 decimals" checkbox (`slopeHighPrecision`) is checked:
1. The Size cell (`fmtCount(orange[i])`) shows 10 decimals.
2. The Change-Size cell (`fmtCount(red[i])`) shows 10 decimals.
3. The Slope estimate cell keeps its existing 10-decimal behavior.
4. All three columns expand; the two other panel columns (x, and the current 5.5rem stone columns) stay put.

When unchecked, everything renders exactly as it does today.

### Implementation details

In `src/components/CalculusAbacus.tsx`:

- **`fmtCount` (line 832)**: extend to take precision from `slopeHighPrecision`. When true, return `v.toFixed(10)`; otherwise keep current behavior (integer, or 2-decimal in fractional mode).
- **Grid template (lines 880 and 901)**: widen the 2nd and 3rd tracks when `slopeHighPrecision` is true so the wider number + the two +/− buttons fit on one line. Proposed:
  - unchecked: `2rem 5.5rem 5.5rem 2rem` (unchanged)
  - checked: `2rem 10rem 10rem 5rem`
- **Middle number span** inside Size and Change-Size cells (lines 911 and 928): the current `w-8` clips a 10-decimal string. Switch to `slopeHighPrecision ? "w-24" : "w-8"` (or equivalent) so the value has room while the buttons stay pinned to the sides.

The header labels ("Size", "Change-Size") don't need changes; their center `w-8` sits comfortably inside the wider track.

### Verification

- Build passes.
- With "10 decimals" unchecked: panel looks identical to today.
- With "10 decimals" checked: Size, Change-Size, and Slope estimate all show 10 decimals; no clipping; +/− buttons still aligned; panel widens but stays within the viewport at normal zoom.
