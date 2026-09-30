# Simplify the Divide By Increment Help paragraph

## What changes

In `src/components/CalculusAbacus.tsx`, replace the Help panel paragraph at line 2528 (the one beginning `Clicking "Divide By Increment" is animated one column at a time...`) with a shorter version that keeps the stages but drops the detailed notice wording, timings, and the Dual/non-Dual wording variants:

> Clicking "Divide By Increment" is animated one column at a time, from left to right. In Dual Increments mode each column's two size stacks disappear, the change-size stones widen to fill the full column, and then fall to the board floor. Afterward, if the value of one stone changes, notices explain the change before and after the stones are adjusted and recolored. The left panel updates last, and clicking or pressing Esc skips the animation.

This keeps the sequence of stages (per-column clear/widen/fall, adjust and recolor, panel last) and the skip behaviour, while removing the exact notice texts, the three-second durations, and the Dual Increments vs. non-Dual wording differences.

No markup or styling changes; only the paragraph text is edited.

## Verification

- `bunx tsgo` and `bun run build` pass.
- Open Help in the browser and confirm the paragraph reads as the simplified text above.
