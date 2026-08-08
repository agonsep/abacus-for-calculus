# Accept equations that are not functions

## The idea

Today the formula box holds the right-hand side of `y = ...`, so every x gives exactly one y. Allow the user to type a full equation containing both `x` and `y`, such as `y^2 + x^2 = 25`, and let the abacus work with it.

Since one x can satisfy two y values, the abacus asks the user which branch to put on the board.

## What the user sees

**Formula box**
- Still accepts a plain expression like `x^3` (unchanged behaviour, treated as `y = x^3`).
- Also accepts an equation with an `=` sign and a `y` on either side: `y^2 + x^2 = 25`, `x^2/9 + y^2/4 = 1`, `y^2 = x`, `x^2 - y^2 = 1`.

**Branch prompt**
- When the typed equation yields two y values, a small prompt appears next to the formula: **Two branches: [Upper] [Lower]** with the upper branch selected by default.
- Switching branch re-fills the board immediately using the same midpoint, increment and max stones.
- If the equation yields a single y (linear in y, or the current `y = f(x)` form), no prompt appears.

**Board and left panel**
- Otherwise identical to today: red size stones, orange change-size stones, floor, slope estimate, Midpoint Tangent, Fractional stones, 10 decimals.
- Columns where the chosen branch has no real solution (outside the circle, for example) gray out exactly like the existing undefined columns, with the same grey note listing the offending x values.
- The infinitesimal increment `w` keeps working: the chosen branch is differentiated with dual arithmetic so the slope estimate stays exact.

## Scope

Support equations where y can be isolated algebraically — that covers the conic family the abacus is used for:
- linear in y: `y + x = 3`, `2y = x^2`
- quadratic in y: circles, ellipses, hyperbolas, `y^2 = x`, and anything else where y appears only as `y` and `y^2`

Anything more tangled (`y^3 + xy = 1`, `sin(y) = x`) reports a short, clear message that the abacus needs y to appear only as y or y squared.

## Technical notes

All work is in `src/components/CalculusAbacus.tsx` plus one new helper.

- New `src/lib/implicit.ts`: `parseEquation(input)` splits on `=`, moves everything to one side with mathjs `parse`/`simplify`, and reads the coefficients A, B, C of `A·y^2 + B·y + C = 0` by evaluating the residual at three sample y values per x (exact for quadratics, and cheap). Returns either `{ kind: "single", solve(x) }` or `{ kind: "two", solveUpper(x), solveLower(x) }`, or `null` when y appears non-quadratically (detected by residual mismatch at a fourth probe point).
- Branch state: `const [branch, setBranch] = useState<"upper" | "lower">("upper")`, threaded into `setup()` where it picks which root to use for `ys`. Changing branch re-runs `setup()`.
- Undefined columns: a negative discriminant returns `NaN`, which flows into the existing `undefinedColumns` path with no change to `Board`, `Stacks`, `ConnectingLine` or the left panel.
- Dual/`w` mode: apply the quadratic formula in `src/lib/dual.ts` arithmetic on duals built from the A, B, C coefficient expressions evaluated with `evalDual`, so the branch keeps an exact derivative.
- `TangentLine` and the central-difference slope call the same branch solver instead of `evaluate(cleaned, { x })`.
- Help panel: one new paragraph on equations that are not functions and the branch choice.
