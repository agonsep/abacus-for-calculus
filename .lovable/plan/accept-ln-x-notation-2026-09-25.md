# Accept `ln(x)` notation

## Problem
Typing `y = ln(x)` fails with the "check your formula" error. The exact dual-number
evaluator (`src/lib/dual.ts`) already treats `ln` as natural log, but the board columns
are also evaluated with mathjs's `evaluate(...)`, and mathjs has no function named `ln` —
it throws `Undefined function ln`. mathjs's `log(x)` *is* natural log, matching dual.ts.

## Fix
In `normalizeFormula` (src/components/CalculusAbacus.tsx, ~line 410), after stripping
`y =` and rewriting bars, rewrite the token `ln` to `log`:

- Replace with `/\bln\b/gi` (word boundary, case-insensitive) so `Ln(x)` and `LN(x)`
  also work, and words like `linear` are untouched.
- `log10` / `log2` are unaffected (they don't contain a standalone `ln`).

Both evaluation paths then agree: mathjs `log` and dual.ts `log`/`ln` are all natural log.

## Verification
- `bunx tsgo` and `bun run build` pass.
- Test `y = ln(x)` fills the board (midpoint 5, increment 1) and the slope shows 1/x:
  at x = 5 the derivative is 0.2.
- Test `y = log(x)` still works unchanged.
