# Gather beneath the highest selected stack

## Intended result
- Choose the destination from the selected change-size stacks **before vertical alignment**, using the highest visible top. Do not send the stones automatically to the board’s last column.
- Keep the existing vertical bottom-to-top alignment stage. During horizontal gathering, the chosen stack stays in its column while the other stacks slide there individually, retaining their aligned heights. For the increasing curve in your example, they gather underneath it.
- Apply this destination rule to every From/To selection, including stacking after Divide By Increment. Preserve the separate recoloring and conditional count-restoration stages.

## Your example
For **y = x², midpoint 5, increment 1, maximum 50**, run Fill Board → Find Differences and select **From 3 to 9**. With the default comparison direction, the included change stacks occupy columns 3–8; column 9 is the interval endpoint. The highest included stack is in **column 8**, so the other selected stacks gather beneath it there.

## Preserve
- Keep the selected interval, sum, stone values, palettes, and mathematical board state unchanged.
- Preserve negative and fractional changes and opposite-sign cancellation; downward steps remain downward rather than becoming positive heights.
- Unchecking restores the board; changing From/To restarts the demonstration. Reverse, animation locks, and reduced motion keep their existing behavior.
- Update only the stacking Help paragraph and tooltip, not library articles or exercises.

## Technical details
- Store the chosen destination column and horizontal coordinate in the display-only journey, selecting by the original visible stack top before alignment. For promoted stones, use their visible pre-preparation geometry. Break equal-height ties by choosing the rightmost selected stack.
- Exclude the destination stack from the horizontal movement queue and its timing. Keep source identities and the existing vertical targets stable.
- Replace the fixed last-column coordinate throughout moving-stack rendering, the completed signed net pile, the endpoint marker, and destination reporting.
- Update the stacking requirement, architecture rule, and roadmap during implementation.

## Checks
- Visually verify the exact From 3 to 9 example: vertical alignment finishes first, the column-8 stack does not move horizontally, and the others gather beneath it.
- Check full and partial selections, equal-height ties, the opposite comparison direction, decreasing and mixed-sign curves, fractional stones, and stacking after ordinary and Dual Increments promotion.
- Confirm restored board state after unchecking, Reverse availability, reduced motion, and no rendering or compilation errors.