# Show the error message only in the panel

## Today

Errors render twice: once in the righthand panel under the Divide By Increment
button, and once centered under the board. The under-board line also shows
non-error notes that appear nowhere else:

- the w-mode note ("w is an infinitesimal step, so the slope estimate is the
  exact derivative.")
- the finite-increment note ("f(x) is undefined at x = … — including the
  midpoint, so no tangent line can be drawn")

## Change

In `src/components/CalculusAbacus.tsx`, the under-board block (~lines 2427–2435)
currently renders `error ?? note` with error/note styling. Change it to render
**only the note**: condition becomes `!uiHidden && note`, drop the
`error ? "text-destructive" : ...` ternary (always the muted note styling),
and render `{note}`.

Errors then appear only in the panel, where the user types the formula — no
information is lost, since every error already renders there. Notes keep their
current home under the board, since the panel has no note line.

## Files

- `src/components/CalculusAbacus.tsx` — one JSX block.

## Verification

- `y = x·sin(1/x)`, midpoint 0, increment `w` → error appears once, in the
  panel only; nothing under the board.
- Finite increment with an undefined column (e.g. `y = sqrt(100−x^2)`,
  midpoint 6, increment 0.9) → the "f(x) is undefined at x = …" note still
  shows under the board.
- `y = x^2`, midpoint 2, increment `w` → the w-mode note still shows under the
  board.
- Typecheck passes.
