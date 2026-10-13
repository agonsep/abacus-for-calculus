# Rename the "Midpoint Tangent" checkbox to "Tangent"

The line can now be shifted off the midpoint with the − and + buttons, so the old name no longer describes what the box does. It becomes **Tangent**, and the checkbox keeps drawing both things it draws today: the curve through the tops of the size stacks and the straight tangent line.

## What changes

- The box in the "More" section reads **Tangent** instead of "Midpoint Tangent". The − and + buttons stay exactly where they are and behave as before.
- The two blocking messages that tell you to uncheck it ("... before enabling dual increments", "... before removing stones") name the new label.
- The Help panel sentence keeps the current structure, with the name changed and the starting position worded as "starting at the midpoint column" so it is clear the line can move.
- A short hover tip is added to the label so students can discover that the same box also traces the curve over the column tops.
- The article *How the Abacus Works* mentions the checkbox by name; its sentence is updated to the new name and to say the tangent line starts at the midpoint and can be moved a column at a time. No other article wording is touched.

## What does not change

- Behavior of the tangent, the curve, the slope calculation, the − and + clamping, and the reset on Fill Board.
- The "10 decimals" recommendations and all other exercise and article content.

## Technical details

- `src/components/CalculusAbacus.tsx`
  - Line 3001: label span text `Midpoint Tangent` → `Tangent`; add a `title` to the wrapping `<label>` describing both effects.
  - Lines 1388 and 1442: the two `Uncheck Midpoint Tangent before ...` messages → `Uncheck Tangent before ...`.
  - Line 2771 (Help panel): `<strong>"Midpoint Tangent"</strong>` → `<strong>"Tangent"</strong>`; "at the midpoint column" → "starting at the midpoint column".
- `src/content/library/how-the-abacus-works.md` line 33: `"Midpoint Tangent"` → `"Tangent"`, with the clause reworded so the tangent line is described as starting at the midpoint and movable one column at a time.
- `roadmap.md`: add a completed item for the rename once verified; the earlier historical entry naming the old label is left as written.
- State name `showLine` and all logic stay as-is — this is label and copy only.

## Verification

- Typecheck and build clean; `build-errors.log` shows no new errors.
- Live check in the preview: the "More" section shows **Tangent**, the box still draws the curve and the tangent line, − and + still move it one column and disable at the board edges, and the Help panel sentence reads correctly.
- Confirm no user-facing string still says "Midpoint Tangent".
