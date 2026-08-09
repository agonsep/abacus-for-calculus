# Animating the "Remove Stones" transition

Today the promotion is instantaneous: `promoteLevel()` computes the new values and every array (`size`, `change`, `shift`, `changeGap`, `unit`, `floorValue`, `defined`) flips in one render, with `runId` bumped so all stones replay the drop-from-sky animation. Turning that into a three-step, stone-by-stone sequence is possible, but it changes how the board gets its numbers, so the issues below are worth settling first.

## Issues

**1. Duration.** 11 columns with up to 80 stones each is up to 880 removals in step 1, plus up to 880 drops, plus the add/remove work in step 2. At a comfortable 60 ms per stone that is several minutes. The sequence needs an adaptive tick: a fixed total budget (about 6-9 seconds) divided by the number of stone events, with a floor of roughly 15 ms so a small board still reads as stone-by-stone. Even so, a **Skip** affordance (click anywhere, or press Esc) that jumps to the final state is needed.

**2. The board must be driven by animation state, not by the committed values.** `Stacks` reads `size`/`change` directly and each `Piece` animates in from the sky using `delay` derived from its index. During the sequence the board has to render from separate `animSize`/`animChange`/`animColorPhase` arrays, with the drop-in animation suppressed (otherwise every remaining stone re-flies in each tick). The committed state only updates at the end — which is also what makes step 3 (left panel last) natural, since the panel keeps reading the committed arrays.

**3. "Red to orange" is really "size palette to change palette", and signs can flip.** Negative size stones are black and negative change stones are dark grey. A column whose change value is positive (orange) can promote to a negative value (black), so step 2's recolor is not always orange-to-red. The stack may also have to flip from above-the-floor to below-the-floor when the sign changes, which is a bigger visual jump than "add or remove some stones".

**4. The step-2 target count is not related to the count you can see.** The new count is `Δy/Δx` re-scaled through a freshly derived unit and floor, not the displayed change count. With a small increment a column showing 3 orange stones can become 40 red stones; with a large increment the reverse. The add/remove animation is honest but can be long (see issue 1) and may look arbitrary unless the panel or a caption says the scale changed. Recommend showing the new `One size-stone = …` value the moment step 2 starts, or a short caption such as `dividing by Δx = 0.25`.

**5. Where the top of a negative stack is.** "Remove the top stone" is unambiguous for positive stacks. For a black or dark-grey stack hanging below the floor, removal should start from the far end (the lowest stone) and work back to the floor, so the stack visibly shrinks toward zero in both cases.

**6. User drags are in the way.** `shift` and `changeGap` hold per-column drag offsets. Orange stones cannot simply "drop to the bottom" while a nonzero gap or shift is in play. Cleanest: at the start of step 1, animate `shift`/`changeGap` back to zero (a quick settle, roughly 200 ms), then run the removals.

**7. Columns that die.** Promotion always loses one edge column, and any column adjacent to an undefined one also becomes undefined. Those columns should have their stones removed during step 1 like the others, and then grey out at the moment the promotion commits, rather than blinking out mid-sequence.

**8. Interruption and locking.** During the animation the user can uncheck the box, click Fill Board, or edit an input. The sequence needs a lock: disable Fill Board, Find Differences, the checkboxes and the drag handles while it runs; unchecking mid-run cancels and snaps back to level 0 immediately. Any input change cancels and commits the final state.

**9. Un-checking is not animated.** Demotion restores a snapshot instantly. Playing the sequence in reverse would double the work for little teaching value; recommend keeping demotion instant (with the usual drop-in replay) and saying so.

**10. Overlays.** The connecting line, midpoint tangent and drag handles read `size`/`shift` and would jitter against the animating board. Hide them for the duration and restore afterwards.

**11. Motion preferences.** Honour `prefers-reduced-motion`: if set, skip straight to the committed state as today.

## What the user sees

1. Gaps close, then column by column from the left, the red size stones vanish one at a time from the top of each stack. When the last column is clear, the orange stones fall to the board floor — again column by column, bottom stone first.
2. Column by column from the left, orange stones are added or removed one at a time until the column holds its new count, then that column's stones turn red (or black when the new value is negative). The scale readout for the new level appears as this step begins.
3. When the last column is done, the left panel updates to the new level: headings gain their order superscript, values, unit and floor all switch together, and lost columns read `undefined`.

Clicking or pressing Esc at any point finishes the transition immediately.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- New `anim` state: `{ phase: 'idle' | 'clear' | 'drop' | 'convert', size: number[], change: number[], asSize: boolean[] }` plus a `useRef` holding the pending promotion result (`newYRaw`, `newDefined`, `res.counts`, `res.u`, `res.floor`) computed up front by the existing `promoteLevel` logic.
- Drive the sequence from a single `setInterval`/`requestAnimationFrame` loop that pops one event off a precomputed event queue per tick; the queue is built once so the total duration can be normalised to the time budget.
- `Stacks` gains optional `anim` props and an `animating` flag that forces `delay = 0` and `fromY = targetY` so stones appear in place instead of dropping — except during the `drop` phase, where the orange stone animates from its old slot to its new floor slot.
- `promoteLevel` splits into `computePromotion()` (pure, returns the pending result or an error) and `commitPromotion()` (the current state writes, including `levelStack.push`, `setRunId`, `setLevel`). `commitPromotion` runs at the end of the sequence or immediately on skip/cancel-by-input.
- `wMode` and "no change stones" errors still short-circuit before any animation starts.
- Guard the loop with cleanup on unmount and on `level`/`runId` changes so a stale interval can never write into a newer board.
