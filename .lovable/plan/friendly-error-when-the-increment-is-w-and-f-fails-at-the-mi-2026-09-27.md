# Friendly error when the increment is w and f fails at the midpoint

## Today

With `y = x·sin(1/x)`, midpoint 0, increment `w`, the Abacus shows
"f(x) is undefined at every x in this range — try a different midpoint or increment."
That wording is wrong here: the columns near 0 are fine; the midpoint itself has no
value (and no settled slope), which is exactly what the infinitesimal arithmetic needs.

## Change (w mode only; finite-increment messages stay as they are)

In `src/components/CalculusAbacus.tsx`, inside the infinitesimal branch of `setup()`
(lines ~1610–1640), the numeric fallback already computes `y0`, `yp`, `ym` after
`evalDual` fails. Split the failure into two named errors:

1. **Value undefined at the midpoint** — `y0` is not a finite number (this example).
   Throw a sentinel error carrying the midpoint, e.g. `w-mid:${m}`.

2. **Value defined, slope doesn't settle** — `y0` is finite but `deriv` is not
   (e.g. `y = sqrt(x)` at midpoint 0, where only a one-sided derivative exists).
   Throw a second sentinel, e.g. `w-slope:${m}`.

In the `catch` block (lines ~1793–1801):

- `w-mid` → error box text:
  `f(x) has no value at the midpoint x = ${m}, and the increment w needs one: with an infinitesimal step every column shares the value f(0). Try a small numeric increment instead, or a different midpoint.`
  (Midpoint formatted with `formatNum`; "f(0)" uses the formatted value too.)
- `w-slope` → error box text:
  `f(x) is defined at the midpoint x = ${m}, but its slope does not settle to a single value there — and the increment w needs an exact slope. Try a small numeric increment instead.`
- Anything else keeps the existing messages ("all undefined" / generic).

The message stays a blocking error in the panel, as now — no board is drawn.

## Files

- `src/components/CalculusAbacus.tsx` only — the w branch of `setup()` and its catch.

## Verification

- `y = x·sin(1/x)`, midpoint 0, increment `w` → friendly midpoint message naming x = 0.
- `y = sqrt(x)`, midpoint 0, increment `w` → friendly slope message.
- `y = x^2`, midpoint 2, increment `w` → still fills, exact slope 4, no error.
- Finite increments unchanged: `y = sqrt(100−x^2)`, midpoint 6, increment 0.9 →
  same note as today naming x = 10.5; increment 0.8 → fills.
- Typecheck and production build pass.
