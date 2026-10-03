# Dual Increments at every level: repeatable Find Differences → Divide By Increment

## The idea

After Divide By Increment promotes the change-size stones, the board shows the slope curve — but Dual Increments is locked out, so a second round must divide by the coarse first increment (1), which is useless next to a 0.1 second increment. Instead, Dual Increments stays available at every difference level: re-checking it (or editing the second increment) immediately builds a companion stack beside every column of the *current* curve, measured with the second increment, so Find Differences → Divide By Increment repeats and yields the second derivative — with the same fine 0.1 step.

The companions are always computed from the original equation. For the promoted curve this is exact: the slope curve value at x is (f(x) − f(x−h₂))/h₂, so its companion at x − h₂ is (f(x−h₂) − f(x−2h₂))/h₂. The board never needs an equation for the derived curve — but the equation box still shows y = x², so a persistent mid-board notice says so.

Example to verify: x², midpoint 5, increment 1, second increment 0.1, max stones 50. Round 1 promotes to the slope curve 2x − 0.1. Round 2: companion at x − 0.1 is 2x − 0.3, pair difference 0.2, divided by 0.1 → the second-derivative curve 2 — eleven equal stacks.

## What the user sees

**Right panel**
- The Dual Increments checkbox is no longer disabled after promotion. At level 0 the existing pending behavior is unchanged (check → hint → Fill Board). At level 1 or higher, checking it builds the companion stacks immediately; unchecking hides them and leaves the promoted stacks in place.
- Editing the second increment while dual is on at level ≥ 1 rebuilds the companions immediately (main stacks untouched). At level 0 nothing happens until Fill Board, as today.
- The mid-board hint text adapts: at level ≥ 1 it must not tell the user to click Fill Board.

**Board**
- At level ≥ 1 with dual on: two stacks per column as at level 0 (narrow pairs, x-label under the pair), using the board's current scale. A companion whose value is undefined grays out.
- The promotion animation (clear → widen → fall, per column) and both stone-value notices work at every level.
- Persistent mid-board notice whenever companions are built at level ≥ 1: the equation box still shows the original equation — the stacks show the derived curve, and the companions/differences are computed from the original equation. Cleared by Fill Board, unchecking dual, or stepping back a level.

**Left panel**
- The dual layout (main + companion columns) applies at every level; companion column headed with the current curve's label plus (x − h₂). Values print in a + b·w form where relevant. Headers keep the existing Δ notation per level.

**Help panel**
- Replace the planned second-derivative paragraph with the new recipe: after Divide By Increment, re-check Dual Increments (second increment stays, e.g. 0.1), then Find Differences and Divide By Increment again; Fill Board would instead rebuild the original curve; the equation box always shows the original equation; w is exact through the second derivative (see below).

## Limits worth stating

- w as the second increment is exact through the second derivative — the limit the user set. A third round with w cannot be exact with second-order arithmetic, so it shows the friendly notice (w gives exact first and second derivatives; use a numeric second increment beyond that) instead of silently producing zeros.
- Mixed histories are allowed: a promotion done without dual (dividing by the first increment) followed by a dual round uses the recorded divisors, so the companion always matches how the current curve was actually built.

## Technical approach

**`src/lib/dual.ts` — second-order jets.** Widen `Dual` to `{ a, b, c }` (value a + b·w + c·w², w³ negligible): add/sub, mul `(a₁a₂, a₁b₂+b₁a₂, a₁c₂+b₁b₂+c₁a₂)`, div, pow, and each supported function via g(a) + g′(a)·(bw+cw²) + ½g″(a)·b²w² (needs g″ for sin, cos, tan, exp, log, sqrt, abs, pow; unsupported nodes still throw for fallback). `formatDual` keeps today's display and never prints the w² term — the board's standing rule is that w·w is negligible, so the extra precision stays internal.

**Curve recursion.** New helper (in the component or `src/lib/dual.ts`): `curveAt(k, x)` returns the level-k curve at x as a dual, built only from the original equation and a recorded divisor history `divisors: { value, infinitesimal }[]` (one entry per promotion; dual promotions record the second increment, non-dual ones the first, plus the comparison direction). k = 0 evaluates f at the jet argument (x real, or x = m + s·w when the first increment is w); k > 0 is (curveAt(k−1, x) − curveAt(k−1, x − dₖ))/dₖ. Because divisors may be w, companions are always recomputed from f through this recursion, never by shifting stored columns.

**State.** Add `yRawW` (b-coefficients of the main stacks; zeros unless a w divisor is in the history) alongside `yRaw`; widen `companionW` usage as today. Add `divisors` state, stored in `levelStack` snapshots so demote restores the full dual state (companion, yRawCompanion, companionW, h2, appliedDual, divisors). Relax `dualActive` from `level === 0` to any level; update the `Scene` companion gate (`appliedDual ? companion : null`) and every `level === 0` dual condition (Board labels, left-panel columns, calcDiff, computePromotion, promotionNotices, startPromotionAnimation) to follow.

**Companion build at level ≥ 1.** On check / second-increment edit: force fractional stones on (restore on uncheck, as today); compute companion jets via `curveAt(level, x_i − h₂)`; scale stack counts by the current unit/floor on the a-parts (with the existing shared-real-part fallback scaling on b-parts when all real parts agree, as on w-boards); clamp to ±MAX_PIECES; mark undefined columns.

**Diff and promotion.** calcDiff dual branch: pair difference main − companion as today (b-difference when h₂ is w), now over jets. computePromotion dual branch divides the pair difference by h₂ in jet arithmetic — dividing by w moves b→a and c→b — then rescales as today (computeCounts generalized to jets: scale on a-parts, or b-parts when real parts are shared). Non-dual promotion keeps dividing neighbor differences by the first increment, recording that divisor. A third dual round with w hits the limit notice above.

**Verification.** `bunx tsgo` and `bun run build`; Playwright checks: the 0.1 example above (round 1 and round 2 boards, left-panel values, notices, demote/restore through a dual level), a non-dual promotion followed by a dual round, unchecking/re-checking, second-increment edit at level 1, w at level ≥ 1 showing the notice, and level-0 behavior unchanged.
