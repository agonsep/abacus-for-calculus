# Reveal size stacks one column at a time

## Proposed change
- On Fill Board, show each complete size-stone stack in its final position, one column at a time from left to right. All stones in a column appear together, including any fractional stone; no falling or bouncing.
- In Dual Increments, reveal both size stacks in each column together.
- Keep change-size stones falling into place as they do now. Preserve the separate Divide By Increment and Stack in one column demonstrations, including their movement and recoloring stages.
- With reduced motion enabled, show all size stacks immediately.
- Do not change counts, colors, mathematical results, or Reverse behavior.

## Computing benefit
This removes size-stone motion calculations and makes the filling sequence shorter and easier to follow. The same stones still need to be drawn, so expect a modest saving rather than a large performance improvement.

## Technical approach
- Give normal size stacks a column-level reveal timing instead of individual stone fall delays, including companion stacks.
- Position static size stones directly at their final height and scale, without a per-stone animation-frame callback. Retain the animated rendering path for change stones and promotion stages that require movement.
- Use a short fixed interval between column reveals, independent of the number of stones in a stack.

## Checks
- Verify left-to-right whole-stack appearance on Fill Board, including fractional and negative stones and Dual Increments pairs.
- Verify Find Differences still drops change stones, and promotion and gathering animations remain unchanged.
- Check repeated Fill Board, Reverse, and reduced motion for hidden or stale stacks; visually inspect the completed board and check for errors.