# Improve the "undefined f(x)" error message

## Goal
Replace the generic error message `"Check your formula, midpoint, and increment."` with a specific, actionable message that names the offending x value and suggests a remedy.

## Change
In `src/components/CalculusAbacus.tsx`, in `setup()` (lines ~745–805):

1. **Throw a descriptive error** at line 748. Instead of `throw new Error("not numeric")`, throw with the offending x value, e.g.:
   ```ts
   throw new Error(`undefined@${xv}`);
   ```
   Use a sentinel-prefixed string so the catch block can distinguish "f(x) undefined at an x" from other failures (bad midpoint/increment, parse errors, etc.).

2. **Update the catch block** (line 803–804) to inspect the error:
   - If the message starts with the sentinel, show:
     `f(x) is undefined at x = 10.5 — try a smaller increment or a different midpoint`
     (formatting `xv` with the existing `formatNum` helper so small/large x values render cleanly).
   - Otherwise, fall back to the current generic message for other failure types (non-numeric midpoint/increment, formula parse errors, etc.).

## Files
- `src/components/CalculusAbacus.tsx` — only the `setup()` function's throw + catch.

## Verification
- y=√(100−x²), midpoint 6, increment 0.9 → expect message naming x = 10.5.
- y=√(100−x²), midpoint 6, increment 0.8 → no error (x stays ≤ 10).
- A malformed formula (e.g. `y=foo(`) → still shows the generic fallback message.
