# Shorten the "w midpoint undefined" error message

## Today

With `y = x·sin(1/x)`, midpoint 0, increment `w`, the error reads:

> f(x) has no value at the midpoint x = 0, and the increment w needs one: with an infinitesimal step every column shares the value f(0). Try a small numeric increment instead, or a different midpoint.

## Change

In `src/components/CalculusAbacus.tsx` (catch block, `w-mid:` branch, ~line 1798), replace the message with:

> f(x) is not defined at the midpoint x = ${mm}. The Calculus Abacus needs a defined midpoint when the increment is w. Try a small numeric increment instead, or a different midpoint.

`mm` is still formatted with `formatNum` from the sentinel value, exactly as now.

No other message changes: the `w-slope:` message, the finite-increment messages, and the generic fallback stay as they are. The message stays a blocking error in the panel (and its board overlay), as now.

## Files

- `src/components/CalculusAbacus.tsx` — one string.

## Verification

- `y = x·sin(1/x)`, midpoint 0, increment `w` → new message naming x = 0.
- `y = sqrt(x)`, midpoint 0, increment `w` → unchanged slope message.
- `y = x^2`, midpoint 2, increment `w` → still fills, no error.
- Typecheck passes.
