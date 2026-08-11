# Tighten the Leibniz Mode left panel

The Leibniz panel currently reserves wide fixed-width tracks (mostly sized so the long "# change-size-stones" header fits on one line), leaving large gaps between the numbers.

## Changes

- Break the header "# change-size-stones" onto two lines: "# change-size-" / "stones", so its column no longer needs to be wide.
- Shrink the fixed column widths and the gap between columns so numbers sit closer together, while keeping every value readable and centered.
- Keep the wider tracks when "10 decimals" is checked, but trim them too so the panel stays compact.

## Technical detail

In `src/components/CalculusAbacus.tsx`:
- `leibnizCols`: reduce the normal-precision track widths (roughly `2.5rem 4rem 4.5rem 5rem 4.5rem 4.5rem`) and the high-precision widths; drop the grid `gap-2` to `gap-1` on both the header and data rows.
- Header cell for change-size-stones renders `# change-size-{<br/>}stones` (leading-tight) so it wraps predictably.
