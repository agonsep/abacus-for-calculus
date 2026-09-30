# New first notice for Divide By Increment in Dual Increments mode

## What changes

In Dual Increments mode, when Divide By Increment runs and the displayed stone value changes, the first notice (the three-second pause before the count adjustment) becomes:

**"We divide by the second increment and rescale for a maximum of 50 stones."**

where 50 is the current Max Stones setting, shown as typed.

- The second notice stays exactly as it is: "The value of one change-size stone has changed to X.", appearing together with the left-panel update after the count and recolor passes, for 3 seconds.
- Outside Dual Increments mode, the first notice keeps its current wording: "The value of one stone will change to X."
- The existing rule is unchanged: both notices are skipped when the displayed value does not actually change, with no pause; Demote/restore never shows a notice; click/Esc skip and reduced motion behave as they do now.

## Technical notes

All in `src/components/CalculusAbacus.tsx`, inside `promotionNotices(p)`:

- It already returns `null` when old and new formatted values are equal, and builds both `will` and `done` strings sharing one comparison.
- Change the `will` builder only: when `dualActive`, use `` `We divide by the second increment and rescale for a maximum of ${appliedInputs.maxStones} stones.` ``; otherwise keep the current "will change to" text.
- `appliedInputs.maxStones` is already in scope in the component and holds the last committed Max Stones value.
- Timing, skip, reduced-motion, and commit logic are untouched.

Update the notice wording in `AGENTS.md` and `roadmap.md` to match.

## Verification

- `bunx tsgo` and `bun run build` pass.
- Playwright (1280×1800, WebGL flags): Dual Increments promotion with second increment 1 — after the falls, the notice reads "We divide by the second increment and rescale for a maximum of 50 stones." for 3 s with counts steady, then counts adjust, recolor, and the second "has changed to X." notice appears with the panel update.
- Non-dual changed-value promotion still shows "The value of one stone will change to X." first.
- Unchanged-value case shows neither notice and no pause.
