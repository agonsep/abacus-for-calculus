# Difference Curve with the infinitesimal increment w

Today the Difference Curve checkbox is refused in `w` mode. It can be allowed, and your description of the board behaviour is right — but the *meaning* of the promoted level changes in one important way, described below.

## The conceptual point

With increment `w`, each column's y-value is `f(m) + k·h·f'(m)·w`, so the shared real part `f(m)` is the floor and the stones measure only the `w`-coefficient. A forward difference between neighbours is `h·f'(m)·w`, and dividing by the increment `h·w` gives `f'(m)` — a **plain real number**, with no `w` in it.

So: the stone counts do not change (each stone was worth `u·w`, and after dividing by `h·w` it is worth `u/h`, a real), and the board looks exactly as you describe. What changes is the left panel: the promoted level is no longer infinitesimal, so its values must print as ordinary reals (`4`, not `4w`), with no `w`-base term. Every column has the same value, `f'(m)` — the derivative, exact. That is the payoff of this feature, and it is worth a sentence in the Help panel.

Second consequence: because the promoted level is constant, its differences are all zero. **Find Differences** should be disabled at that point, as you say, and so should a further Difference Curve promotion.

## Behaviour

- **Difference Curve** becomes enabled in `w` mode once orange stones exist (Find Differences has been run). The existing preconditions still apply: no dragged stones, Midpoint Tangent off, not in Leibniz Mode.
- The animation runs exactly as it does for finite increments: red/black stones clear column by column, left to right; orange stones drop to the floor; then each column is recoloured to the size palette. Counts stay the same, so the "adjust count" pass is a no-op here.
- One edge column is lost (right, or left with Lefthand comparison), as always.
- Left panel at the promoted level: `x` still reads `5 - 3w` etc. (x is still infinitesimally spaced), while the value columns read plain reals. `One stone = u/h` and `Floor: 0` print without a `w` term.
- **Find Differences** and a further **Difference Curve** promotion are disabled while at the promoted level in `w` mode, with the tooltip "The difference curve of an infinitesimal step is constant."
- Unchecking Difference Curve restores the infinitesimal level exactly, `w`-formatting included.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- `computePromotion()`: drop the `if (wMode) return ...` refusal. Add a `w` branch that keeps `counts = change.slice()` (zeroing entries whose neighbour is undefined), sets `u = unit / incValue`, `floor = 0`, and `newYRaw[i] = counts[i] * u` — i.e. bypass `computeCounts`, since no rescale is needed and rescaling would destroy the "same stones" property.
- Value formatting currently keys off `wMode`, which also drives the x-axis labels. Split it: keep `wMode` for the x-axis/`xw` labels, add a derived `wValues = wMode && level === 0` used by the unit readout, floor readout, and the y/size/slope cells (lines ~1638-1760).
- `commitPromotion` snapshot gains `wMode`/`wValues` state so `demoteLevel()` restores infinitesimal formatting; `wBase` is already stored, and `setWBase(0)` on promote.
- Checkbox at line ~2020: remove the `wMode` early-return and the `!wMode` term in `disabled`; disable instead when `wMode && level > 0`. Update the label's muted-text condition to match.
- Disable the Find Differences button when `wMode && level > 0`, with the tooltip above.
- Help panel: replace the current note ("not available when the increment is w") with a short paragraph saying that promoting an infinitesimal difference divides `w` by `w`, leaving the exact derivative as a flat row of stones — and that there is nothing further to difference.
- Also fix the outstanding `ReferenceError: o is not defined` currently thrown in the preview while touching this file.
