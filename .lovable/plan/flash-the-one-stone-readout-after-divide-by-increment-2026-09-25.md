# Flash the "One stone" readout after Divide By Increment

## Goal
When the user clicks **Fill Board**, **Find Differences**, then **Divide By Increment**, the stones keep their stack heights and only the value of one stone changes — but nothing on screen draws attention to that change. After the promotion animation finishes, briefly flash the stone-value readout so the user notices the new value.

## Behavior
- The flash fires when a **Divide By Increment** promotion commits (that is, when the animation completes, or immediately when reduced motion is on).
- It highlights only the value itself: the `One stone =` number in normal mode, and the `One size stone` / `One change-size stone` values in dual-increments mode (both change when the unit is divided).
- The message shows only the new value — no before/after.
- The flash lasts about 2 seconds and then fades back to normal.
- No other behavior changes: Find Differences, dual rescaling, undo/restore, Leibniz Mode, and the help panel stay as they are.

## Technical notes

In `src/components/CalculusAbacus.tsx`:

- Add a `unitFlash` state plus a timeout ref, following the existing `instant` pattern (lines ~1440–1445): a `useEffect` clears the flag after 2 s, and cleanup clears the timer.
- Set the flag at the end of `commitPromotion` (~line 1339), so both the animated path and the reduced-motion path trigger it.
- Wrap the readout value spans (lines ~2066–2098) with a conditional class when `unitFlash` is on — the mono value spans only, not the whole sentence.
- Define the flash in `src/styles.css`: a keyframe that pulses the text color to the warm amber accent and adds a brief background glow, 2 s total, ending at the normal color so it fades out cleanly. No hard-coded colors — use the existing design tokens.
- The flag resets naturally through the timeout; any subsequent Fill Board or promotion re-triggers it from its own commit.

## Verification
- `bunx tsgo` and `bun run build` pass.
- Browser check: `y = x^2`, midpoint 5, increment 1 → Fill Board, Find Differences, Divide By Increment; right after the animation the "One stone" value shows the flash styling, and it returns to normal within ~2 s. Repeat with Dual increments to confirm both readout lines flash.
