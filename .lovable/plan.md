## Problem

With y=sin(x), clicking **Add Red Stones** produces all-red stones even where differences are negative. The negative-→-dark-grey rendering already works for the initial fill, but the "Add Red Stones" button (`calcDiff`, lines 770–778 in `src/components/CalculusAbacus.tsx`) wraps each difference in `Math.abs`, discarding the sign before it ever reaches the `Pieces` component.

## Change

In `src/components/CalculusAbacus.tsx`, `calcDiff`: drop `Math.abs` so negative differences flow through.

```ts
const calcDiff = () => {
  const r = orange.map((v, i) => {
    if (leftCompare) {
      return i === 0 ? 0 : v - orange[i - 1];
    }
    return i === orange.length - 1 ? 0 : orange[i + 1] - v;
  });
  setRed(r);
};
```

No other changes — `Pieces` already maps `rVal < 0` to `DARK_GREY`, and the red ± buttons already accept `-MAX_PIECES` as the min.

## Verify

With y=sin(x), midpoint 0, increment 1, click **Add Red Stones**: columns where sin decreases should now render dark-grey red stones.
