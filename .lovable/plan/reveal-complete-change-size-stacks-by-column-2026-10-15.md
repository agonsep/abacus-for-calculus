# Reveal complete change-size stacks by column

## Change
- On Find Differences, show each complete change-size stack at its final position, one column at a time from left to right, rather than dropping individual stones from above.
- Reveal all stones in a column together, including any fractional stone. Apply the same initial-appearance behavior in Dual Increments and Leibniz Mode.
- Keep size-stack reveals unchanged.

## Preserve
- Keep the separate Divide By Increment demonstration, including widening, falling, count adjustment, recoloring, and notices.
- Keep Stack in one column’s vertical alignment and individual horizontal slides.
- Preserve counts, signed stones, palettes, mathematical results, and Reverse behavior.
- With reduced motion, show all initial change stacks immediately.

## Expected benefit
Initial change-stack appearance will use a timed visibility update per column rather than motion calculations for every stone on every frame. This should reduce animation work, particularly on stone-heavy boards, but stone rendering costs remain. Overall code simplification is modest because promotion still needs the animated-stone path. No measured performance improvement is promised.

## Technical details
- Reuse the existing whole-column reveal mechanism for ordinary change-stack appearance, with static stone placement outside promotion.
- Keep promotion on its existing animated path and leave the stacking journey separate.
- Ensure reveal timing restarts for newly created differences without replaying on unrelated display changes.
- Update any directly affected Help wording and the saved appearance preference to reflect the approved change.

## Checks
- Verify left-to-right whole-stack appearance for ordinary, Dual Increments, fractional, negative, and Leibniz cases.
- Verify Find Differences → Divide By Increment → Reverse, and Stack in one column, retain their existing behavior.
- Check reduced-motion appearance and confirm no new compilation or page errors.