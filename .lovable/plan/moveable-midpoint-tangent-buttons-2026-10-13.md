# Moveable Midpoint Tangent: − / + Buttons

## Goal
Let the user slide the midpoint tangent line one column left or right at a time, using − and + buttons placed to the right of the "Midpoint Tangent" checkbox label. Each click moves the tangent by one increment of x; the buttons stop working at the first and last column.

## Current state
- `TangentLine` (src/components/CalculusAbacus.tsx ~line 778) anchors the line at the middle column (`mid = Math.floor(COLUMNS / 2)`) using `tangentSlope`.
- `tangentSlope` (~line 1825) is computed from the applied formula at the applied midpoint (exact dual derivative, numeric fallback).
- The "Midpoint Tangent" checkbox (~line 2980) sits in the "More" section; it is disabled at level > 0, in w mode, or during animations.

## Changes (all in `src/components/CalculusAbacus.tsx`)

1. **New state**: `tangentOffset` (integer, default 0) — how many columns the tangent is shifted from the midpoint column. Reset to 0 whenever the board is rebuilt (Fill Board / apply inputs), since the midpoint and increment may change.

2. **Slope at the shifted column**: compute the slope at `midpoint + tangentOffset * increment` instead of always at the midpoint. Keep the existing exact-dual-then-numeric fallback logic, applied at the shifted x. If the function is undefined at the shifted column, draw no line (same rule the component already uses for an undefined midpoint).

3. **TangentLine**: accept a `columnOffset` prop and anchor the line at column `mid + columnOffset` (its height and per-column stepping shift accordingly). Guard: if the shifted column is out of range or undefined, render nothing.

4. **Buttons beside the label**: in the "Midpoint Tangent" label row, add a small `−` button and a `+` button immediately to the right of the label text.
   - `−` decrements `tangentOffset`, `+` increments it; clamp to `[-mid, COLUMNS - 1 - mid]` so the tangent never leaves the board.
   - Disabled when: the checkbox is unchecked, an animation is running, or the button would move past the first/last column. The checkbox's existing disables (level > 0, w mode) also disable the buttons.
   - Styling: small square buttons matching the panel's existing button look (muted background, foreground text), sized to sit inline with the label.
   - Tooltips: "Move the tangent one column to the left/right"; at the ends, "Already at the first/last column."

5. **Help panel**: add one sentence to the "Midpoint Tangent" paragraph noting the − and + buttons move the tangent one column at a time.

## Verification
- y = x^2, midpoint 5, increment 1, max stones 50: check Midpoint Tangent, click `+` twice — the line re-anchors two columns right with the steeper slope (f′(7) = 14); click `−` back to center.
- Click `−` repeatedly: the button disables at the leftmost column; same for `+` at the rightmost.
- With y = 1/x shifted onto an undefined column, the line disappears and returns when shifted back.
- Buttons disabled while the checkbox is unchecked and during animations; offset resets to center after Fill Board.
- Typecheck and build clean; Playwright screenshots of the shifted tangent.
