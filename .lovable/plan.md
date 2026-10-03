# Document the second-derivative recipe in the Help panel

## What changes

Add one short paragraph to the Help panel explaining how to obtain the second derivative of the original curve after a Divide By Increment promotion:

- After Divide By Increment, the new size-stone stacks are the slope curve of the original equation.
- To go one level further, do **not** click Fill Board (that rebuilds the board from the original equation and discards the slope curve).
- Instead, click **Find Differences** and then **Divide By Increment** again: the differences of the slope curve are promoted to a new set of size stones — the second-derivative curve.
- Note that this second round uses ordinary neighbour differencing, since the promoted board is a single curve again (Dual Increments no longer applies).

## Technical notes

- Edit only the Help panel JSX in `src/components/CalculusAbacus.tsx` (the same panel updated in the previous task); insert the paragraph after the existing Divide By Increment paragraph.
- No behavior changes; no new state.
- Verify with `bunx tsgo` and `bun run build`, then open the Help panel in the preview to confirm the paragraph renders.
