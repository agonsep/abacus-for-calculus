# Update the Help panel for Dual Increments and Divide By Increment

## What changed in the app that the Help panel does not yet describe

- Checking **Dual increments** is a pending setting: a mid-board notice — "Input second increment, then click on Fill Board" — appears when the box is checked and clears on Fill Board or unchecking.
- The companion stacks appear only after Fill Board.
- Divide By Increment is animated column by column, left to right: in Dual Increments mode each column's two size stacks vanish, the change-size stones widen to fill the full column, then fall to the board floor.
- After the falls, a first notice holds for three seconds — in Dual Increments "We divide by the second increment and rescale for a maximum of N stones.", otherwise "The value of one stone will change to X." — then counts adjust and stones recolor, and a second three-second notice, "The value of one change-size stone has changed to X." (outside Dual Increments: "one stone has changed to X."), appears together with the left-panel update.
- Both notices are skipped when the displayed value does not change; click or Esc skips the animation.

## Changes

All in `src/components/CalculusAbacus.tsx`, in the Help panel JSX only — no behavior changes.

1. **Dual increments paragraph** (the one beginning "Checking "Dual increments" gives every column a narrower companion stack…"):
   - Reword the opening so the companion stacks appear after you click "Fill Board".
   - Add a sentence: checking the box shows the mid-board notice "Input second increment, then click on Fill Board", and the setting takes effect on the next Fill Board.
   - Keep the rest of the paragraph (pair differences, `w`, fractional stones auto-on) unchanged.

2. **New paragraph after the Dual increments paragraph** describing the promotion animation and notices, with wording along these lines:
   - Clicking "Divide By Increment" is animated one column at a time, left to right: in Dual Increments mode the two size stacks of each column disappear, the change-size stones widen to fill the full column, and then fall to the board floor.
   - Afterward, if the value of one stone changes, a first notice holds for three seconds before the counts are adjusted — in Dual Increments it reads "We divide by the second increment and rescale for a maximum of N stones.", otherwise "The value of one stone will change to X."
   - When the stones have been adjusted and recolored, a second notice — "The value of one change-size stone has changed to X." (or "one stone has changed to X.") — appears together with the updated left panel and lasts three seconds.
   - If the displayed value does not change, neither notice appears. Clicking or pressing Esc skips the animation.

Keep all existing markup and styling classes; only edit the two paragraphs and insert the new one.

## Verification

- Open the app, click "?", and read the updated paragraphs.
- `bunx tsgo` and `bun run build` pass.
