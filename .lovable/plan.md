# Right panel: two checkboxes by default, "More" reveals the rest

## Goal

The right panel becomes friendlier by default: only two checkboxes are visible — **Fractional stones** and **Dual increments**, in that order — drawn larger than today. A **"More"** button below them reveals the remaining options. Clicking it again (label becomes **"Less"**) hides them.

## Current state

The right panel shows, top to bottom: formula / midpoint / increment / max-stones inputs, the three action buttons (Fill Board, Find Differences, Divide By Increment), the error line, then a block with six checkboxes — Fractional stones, Midpoint Tangent, Dual increments, Leibniz Mode, Lefthand comparison, 10 decimals — followed by the Stone colors picker and the Hide panels button.

## Changes

In `src/components/CalculusAbacus.tsx` (right panel checkbox block, ~lines 2575–2694):

1. Reorder the visible pair to the top: **Fractional stones** first, **Dual increments** second. All existing logic is untouched — disabled conditions, tooltips, the "(needed for dual increments)" note, and the automatic fractional-on-when-dual behavior.
2. Make checkboxes larger: bump the block's text from `text-xs` to `text-base` and enlarge the checkbox inputs (about `h-4 w-4` / `h-5 w-5` sizing) so both states read comfortably. The same larger styling applies to all checkboxes, shown or hidden.
3. Add a **"More"** button directly below the two visible checkboxes, styled like the existing "Hide panels" button (muted, full-width, small). It toggles a `showMore` state.
   - Hidden by default: Midpoint Tangent, Leibniz Mode, Lefthand comparison, 10 decimals, and the Stone colors picker.
   - When expanded, the button label changes to **"Less"**; clicking it collapses the extra options again.
   - The collapsed/expanded choice is not saved — each visit starts collapsed.
4. Everything else stays as is: the inputs, the three action buttons, the error line, and "Hide panels".

No math, state, animation, or persistence changes.

## Verification

- `bunx tsgo` typecheck and `bun run build`.
- In the preview: open the right panel, confirm only Fractional stones and Dual increments show (larger), with the "More" button below.
- Click "More" → the other four checkboxes and Stone colors appear, button reads "Less"; click "Less" → they hide again.
- Confirm Dual increments still forces Fractional stones on with the greyed-out note, and the hidden checkboxes keep their disabled behavior.
