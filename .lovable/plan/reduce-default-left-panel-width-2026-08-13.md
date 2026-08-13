# Reduce default left panel width

## Goal
Make the default left panel more compact when "Fill Board" is clicked, without sacrificing readability. The high-precision layout (10 decimals checked) should remain wide enough for 10-digit values.

## Current state
In `src/components/CalculusAbacus.tsx`, the default level-0 panel (`showChangeColumns && showYColumn && !slopeHighPrecision`) uses:

```text
2rem 6rem 6rem 9rem 2rem
```

That is: `x | # size-stones | y | # change-size-stones | Slope estimate`.

## Proposed change
Tighten the default column widths to something like:

```text
2rem 4rem 4rem 5.5rem 2rem
```

- `x` stays at `2rem`.
- `# size-stones` shrinks from `6rem` to `4rem` (counts up to 100 fit).
- `y` shrinks from `6rem` to `4rem`.
- `# change-size-stones` shrinks from `9rem` to `5.5rem`.
- `Slope estimate` stays at `2rem`.

Also tighten the related non-default layouts slightly so the panel feels consistent:
- Difference Curve layout without y column (`2rem 6rem 9rem 2rem` → `2rem 4rem 5.5rem 2rem`).
- Layout without change columns (`2rem 5.5rem 6rem` → `2rem 4rem 4.5rem`).

The high-precision templates (`10rem ...`) remain unchanged so 10-decimal values still have room.

## Verification
With the default curve (`y = x^2`, midpoint 5, increment 1, max 100 stones), the left panel should be noticeably narrower after clicking **Fill Board**, while all values remain readable. Checking **10 decimals** should restore the wider layout.
