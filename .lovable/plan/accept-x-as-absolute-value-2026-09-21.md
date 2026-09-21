# Accept |x| as absolute value

## Short answer
Small change. Typing `abs(x)` already works today; only the vertical-bar notation is unsupported. Adding it means translating `|…|` into `abs(…)` before the formula is read.

## What changes for the user
- `y = |x|`, `y = |x - 3|`, `y = |x^2 - 4|` all fill the board.
- Nested bars like `|x| + | |x| - 1 |` are not supported; the help text will say so, and a mistyped or unmatched bar shows the usual "check your formula" message.
- At a corner (for example `|x|` at midpoint 0) the slope reading at that exact point stays blank/undefined, since the curve has no single slope there. Every other column reads normally.

## Technical notes
All in `src/components/CalculusAbacus.tsx`:
- Add one helper, e.g. `normalizeFormula(raw)`, that strips the leading `y =` (the existing `replace(/^\s*y\s*=\s*/i, "")`) and then rewrites bar pairs into `abs(...)`: scan the string, treat bars as alternating open/close at the same nesting depth, and reject (return the original, letting the existing error path fire) when the bar count is odd.
- Replace the two inline `cleaned = ...replace(/^\s*y\s*=\s*/i, "")` sites (lines ~1467 and ~1554) with this helper, so both the evaluation path and the exact-derivative path see the same rewritten string. `derivAt` already receives `cleaned`, so it needs no change.
- No change needed in `src/lib/dual.ts`: `abs` is already in its UNARY table and correctly throws at 0, which the caller already handles by falling back to a numeric derivative and then to "no slope".
- Optionally mention `|x|` in the formula field placeholder/help panel alongside the existing function list.
