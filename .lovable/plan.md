# Disable Reverse after Dual Increments promotion

## Goal
Remove the Reverse option once the board has been promoted via Dual Increments (or the infinitesimal w), because the omitted in-between x values make the accumulation story misleading.

## Changes

1. **Disable Reverse when a dual/w promotion is active**
   - In `src/components/CalculusAbacus.tsx`, the Reverse button (and its enabling logic) checks whether the current board state came from a Dual Increments or w promotion (the existing `rateSnap`/`dualSnap` state).
   - When promoted via Dual Increments or w: the Reverse button is disabled with a tooltip explaining why, e.g. "Reverse is unavailable after Dual Increments — in-between columns are omitted."
   - Ordinary (single-increment) promotion keeps Reverse fully working as today.

2. **Help panel**
   - Update the Reverse Button description to note it is unavailable after Dual Increments, with the one-line reason.

3. **Docs**
   - Update `AGENTS.md` and `mem://features/reverse.md` with the rule; add a roadmap entry.

## Verification
- Playwright: ordinary flow (Fill Board → Find Differences → Divide By Increment) still allows Reverse and restores exactly.
- Dual Increments flow (second increment 0.1): Reverse button is disabled after Divide By Increment, with the explanatory tooltip; Stacking still works.
- w (infinitesimal) flow: same disabled behavior.
- Build OK.
