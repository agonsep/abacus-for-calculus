# Animating the "Remove Stones" transition

Today the promotion is instantaneous: `promoteLevel()` computes the new values and every array (`size`, `change`, `shift`, `changeGap`, `unit`, `floorValue`, `defined`) flips in one render, with `runId` bumped so all stones replay the drop-from-sky animation. The new behaviour is a three-step sequence that moves **column by column, left to right**, with each column's change happening in one event rather than stone by stone.

## Preconditions (checked before anything animates)

- **Stones have been dragged.** If any `shift` or `changeGap` entry is nonzero, do not start. Show a message: "Restore the stones to their original positions before removing stones." The checkbox stays unchecked.
- **Midpoint Tangent is on.** If `showLine` is true, do not start. Show a message: "Uncheck Midpoint Tangent before removing stones." The checkbox stays unchecked.
- The existing guards still apply first: increment `w` is refused, and so is a board with no change-size stones.

## What the user sees

**Step 1 — clear and drop.** Column by column from the left, all the red size stones in that column disappear at once. When the last column is clear, the pass repeats from the left: the orange stones of each column drop as a block to the board floor. One event per column per pass, roughly 120-180 ms apart, so the whole step lands in about 3-4 seconds.

**Step 2 — convert.** Column by column from the left, each column's stack jumps to its new count in one event (stones added or removed as a block), then turns red — or black when the new value is negative. The new `One size-stone = …` scale appears as this step begins.

**Step 3 — panel.** When the last column is done, the left panel updates to the new level: headings gain their order superscript, values, unit and floor all switch together, and lost columns read `undefined`.

Clicking anywhere or pressing Esc finishes the transition immediately.

## Remaining issues

**1. The board must be driven by animation state, not by the committed values.** `Stacks` reads `size`/`change` directly and each `Piece` animates in from the sky using `delay` derived from its index. During the sequence the board renders from separate `animSize`/`animChange`/`animAsSize` arrays with the drop-in animation suppressed, otherwise every remaining stone re-flies in on each tick. The committed state updates only at the end — which is what makes step 3 (panel last) natural, since the panel keeps reading the committed arrays.

**2. "Red to orange" is really "size palette to change palette", and signs can flip.** Negative size stones are black and negative change stones are dark grey. A column whose change value is positive (orange) can promote to a negative value (black), so the recolor is not always orange-to-red, and the stack may flip from above the floor to below it. Per-column block updates make this a single readable jump instead of a confusing stone-by-stone crossing of zero.

**3. The step-2 target count is unrelated to the count you can see.** The new count is `Δy/Δx` re-scaled through a freshly derived unit and floor, not the displayed change count. With a small increment a column showing 3 orange stones becomes 40 red stones. Showing the new scale readout at the start of step 2 keeps that from looking arbitrary.

**4. Columns that die.** Promotion always loses one edge column, and any column next to an undefined one also becomes undefined. Those columns clear during step 1 like the rest, and grey out at the moment the promotion commits — not mid-sequence.

**5. Interruption and locking.** While the sequence runs, disable Fill Board, Find Differences, the checkboxes and the drag handles. Unchecking mid-run cancels and snaps back to level 0; any input edit cancels and commits the final state.

**6. Un-checking is not animated.** Demotion restores a snapshot instantly, with the usual drop-in replay. Reversing the sequence would double the work for little teaching value.

**7. Overlays.** The connecting line and drag handles read `size`/`shift` and would jitter against the animating board; hide them for the duration. Midpoint Tangent is already off by precondition.

**8. Motion preferences.** With `prefers-reduced-motion` set, skip straight to the committed state as today.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- New `anim` state: `{ phase: 'idle' | 'clear' | 'drop' | 'convert', size: number[], change: number[], asSize: boolean[] }`, plus a `useRef` holding the pending promotion result (`newYRaw`, `newDefined`, `res.counts`, `res.u`, `res.floor`) computed up front.
- One timer stepping a precomputed queue of **column events** (11 clear + 11 drop + 11 convert, at most 33 events) at a fixed interval, so total duration is predictable and independent of stone counts.
- `Stacks` gains optional `anim` props and an `animating` flag that forces `delay = 0` and `fromY = targetY` so stones appear in place — except during the `drop` phase, where a column's change stones animate from their old slots to the floor.
- `promoteLevel` splits into `computePromotion()` (pure: returns the pending result or an error) and `commitPromotion()` (the current state writes, including `levelStack.push`, `setRunId`, `setLevel`). `commitPromotion` runs at the end of the sequence, or immediately on skip/cancel.
- Precondition failures reuse the existing `error` display path, so they look like the `w`-increment refusal already does.
- Clean up the timer on unmount and on `level`/`runId` change so a stale run can never write into a newer board.
