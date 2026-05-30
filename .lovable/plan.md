## Goal

Add a user-controlled **Max stones per column** input so the abacus sizes its stone unit against a user-chosen ceiling instead of the hard-coded `MAX_PIECES - 10 = 70`.

## Changes to `src/components/CalculusAbacus.tsx`

1. **New state**
   - `const [maxStones, setMaxStones] = useState(50)` — clamped to 25–100.

2. **New control in the controls panel** (next to Midpoint / Δx)
   - Numeric input labeled **"Max stones / column"**, min 25, max 100, step 1, default 50.
   - Same styling as existing inputs.

3. **Use it in the unit calculation** (currently ~line 643)
   - Replace `const avail = MAX_PIECES - 10;` with `const avail = maxStones;`
   - Add `maxStones` to the `useMemo`/effect dependency array that recomputes columns.
   - Keep the clamp `Math.min(MAX_PIECES, …)` so a stray value never exceeds the physical rod cap (80).

4. **Header readout**
   - The existing "One orange stone = X" line stays; it will automatically reflect the new unit.

## Out of scope (not changing now)

- The min/max formulation (`unit = (max − min)/maxStones`, `stones = f(x) − min`) from the "How it works" rewrite — that's a separate behavioral change. This plan only swaps the headroom constant for a user input.
- `MAX_PIECES = 80` stays as the physical column cap.

## Verification

- Default (max = 50): with `y = x`, midpoint = 6, Δx = 1 → maxAbs = 11, rawUnit = 11/50 = 0.22 → niceUnit = 0.5 → 11th column = round(11/0.5) = 22 stones.
- Raise to 100 → rawUnit = 0.11 → niceUnit = 0.2 → 55 stones (the old behavior).
