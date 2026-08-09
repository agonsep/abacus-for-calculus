# Lock the comparison direction once stones have been removed

Today, unchecking or checking **Lefthand comparison** after a promotion changes nothing on the board — the promoted stones keep the direction they were built with — but the left panel's **Slope estimate** column reads the checkbox live, so the panel starts disagreeing with the board. A later **Find Differences** would also mix backward differences into a forward-built level.

## What changes

- **Lefthand comparison** is disabled whenever the current level is above 0 (i.e. after "Remove Stones" has been used), and while a promotion animation is running.
- The label greys out, matching how **Midpoint Tangent** already greys out above level 0.
- Hovering it shows: "The comparison direction is fixed once stones have been removed."
- Unchecking **Remove Stones** back down to level 0 re-enables it, with its previous value intact.
- **Fill Board** resets to level 0, so the checkbox becomes available again there too.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- Add `disabled={level > 0 || !!anim}` to the `leftCompare` input, and a `title` attribute with the tooltip text.
- Apply the muted text class to the span when disabled, mirroring the existing `wMode ? "text-muted-foreground" : "text-foreground"` pattern used by the Remove Stones label.
- No change to `leftCompare` state itself: it is never forced off, so demoting restores the same direction the user had.
- No recomputation is needed anywhere, since the disabled control can no longer desync the panel from the board.
