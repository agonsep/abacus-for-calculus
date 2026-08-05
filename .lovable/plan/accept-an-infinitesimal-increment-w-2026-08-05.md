# Accept an infinitesimal increment, w

## The idea

Let `w` be a positive quantity smaller than every positive real number. Type `w` into the **Increment** box and the abacus works with genuine infinitesimals instead of small decimals: the eleven columns sit at

```text
x = m - 5w, m - 4w, ... , m, ... , m + 5w
```

Every quantity on the board becomes a pair `a + b·w` (a real part and an infinitesimal part). Arithmetic follows the standard rule that `w·w` is negligible, which makes the change-size stones and the slope estimate **exact** rather than approximate: for `y = x^2` at midpoint 2 the slope reads exactly `4`, not `4.0001`.

## What the user sees

**Increment box**
- Accepts `w` (and `2w`, `0.5w` if they want a different infinitesimal step) in addition to the current numbers. Anything else still validates as it does today.

**Board**
- With increment `w`, every column has the same real part `f(m)`, so that shared part becomes the **floor** and the stones measure the infinitesimal part. Concretely, the board looks exactly like a normal run with a very small increment: red size stones rise or fall across the columns, orange change-size stones all have the same height, and that height is the derivative.
- x-axis labels read `2 - 3w`, `2 - 2w`, ..., `2 + 5w`.
- Undefined columns still gray out as they do now.

**Left panel**
- Values print symbolically and exactly: `x` as `2 + 3w`, `Size` as `4 + 6w`, `Change-Size` as `4w`, `Slope estimate` as `4`.
- `One size-stone = ...` and `Floor: ...` also print in `a + b·w` form.
- Purely real values print as they do now, with no `w` term.

**Everything else**
- Fractional stones, 10 decimals, Midpoint Tangent, dragging, Find Differences all keep working. With increment `w` the tangent line and the connecting trace coincide, which is the point.

**Help panel**
- A short new paragraph: `w` is an infinitesimal step, smaller than any positive real number but not zero; with increment `w` the slope estimate stops being an estimate and becomes the exact derivative.

## Limits worth stating

- `w` is allowed only in **Increment**, not in the midpoint or the formula.
- The infinitesimal evaluator supports the usual repertoire: `+ - * / ^`, roots, `sin cos tan`, `exp`, `log`/`ln`, `abs`, and the constants `pi` and `e`. An exotic function outside that list falls back to today's numeric behaviour with a small note.
- Non-differentiable points behave sensibly: `abs(x)` at midpoint 0 grays out or reports no single slope rather than inventing one.

## Technical notes

All work stays in `src/components/CalculusAbacus.tsx` plus one new helper module.

- New `src/lib/dual.ts`: a `Dual = { a: number; b: number }` type with add/sub/mul/div/pow and the elementary functions, plus `formatDual()` for the `a + b·w` strings.
- New `evalDual(expr, xDual)`: parse the cleaned formula once with `mathjs`'s `parse()` and walk the resulting AST, dispatching each `OperatorNode`/`FunctionNode` to the dual ops. Unsupported node types throw so the caller can fall back.
- `setup()` gains an infinitesimal branch: when the increment parses as `k·w`, build `xs` as duals, evaluate `ys` as duals, then detect that all real parts agree and scale from the `b` coefficients — reusing the existing min/max/unit/floor logic on those coefficients instead of on plain numbers. `floorValue` and `unit` become duals.
- `tangentSlope` uses `evalDual(expr, { a: m, b: 1 })` and reads `.b` directly, replacing the central-difference approximation whenever the dual path is available.
- `xValues`, `yRaw`, `unit`, `floorValue` widen to dual-valued state; `formatNum`/`fmtCount` route through `formatDual`. Stone counts, `size`, `change`, drag state and all 3D components stay plain numbers, so `Board`, `Stacks`, `DragHandles`, `ConnectingLine` and `TangentLine` need no changes.
- Increment validation and the `Number(increment)` call sites switch to a small `parseIncrement()` returning either a real or an infinitesimal step.
