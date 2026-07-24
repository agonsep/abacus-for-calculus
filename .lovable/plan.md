## Problem

The re-round effect at lines 840–865 in `src/components/CalculusAbacus.tsx` unconditionally rebuilds the `change` array from `yRaw` whenever **Fractional stones** is toggled. So if the board has red size-stones but no orange change-size stones yet, checking the box populates `change` and orange stones appear — which shouldn't happen until the user clicks **Find Differences**.

## Fix

Gate the `change` rebuild on whether any orange stones already exist. Only re-round `change` if `change.some(v => v !== 0)`; otherwise leave it alone. `size` continues to re-round unconditionally (red stones are always on the board once filled).

### Change in `src/components/CalculusAbacus.tsx` (fractional effect, ~lines 840–865)

- Compute `newSize` as today and always `setSize(newSize)`.
- Compute `newChange` only when `change.some(v => v !== 0)`; then `setChange(newChange)`. Skip otherwise.
- Add `change` to the effect's closure (still suppress the exhaustive-deps lint as today; the effect key stays `[fractional]` so toggling is what triggers it).

## Result

Toggling **Fractional stones** re-rounds the size column and the slope estimates for existing orange stones, but never spawns orange stones on a board that has none.
