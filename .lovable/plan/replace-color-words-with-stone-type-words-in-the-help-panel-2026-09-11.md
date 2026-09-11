# Replace color words with stone-type words in the Help panel

## Goal
Remove most references to "red" and "orange" from the Help panel, using "size" and "change-size" instead. Keep the first paragraph that identifies the default colors untouched.

## Current state
The Help panel in `src/components/CalculusAbacus.tsx` still uses "red" and "orange" throughout:
- Heading: "How the Red (Size) Stones Work"
- Heading: "How the Orange (Change-Size) Stones Work"
- Phrases like "red stones", "orange stones", "red curve", "orange curve", "red size stones", "orange change-size stones", "red stacks", "orange differentials", "red or orange portion"

The second paragraph is the first identification paragraph and contains:
> The size stones (red by default) ... The change-size stones (orange by default) ...
This paragraph must keep its "red" and "orange" default-color wording.

## Changes

In `src/components/CalculusAbacus.tsx`, edit only the Help panel JSX (lines ~2188–~2325):

1. Leave the first identification paragraph exactly as-is.
2. Replace all other occurrences of color words with stone-type words:
   - "How the Red (Size) Stones Work" → "How the Size Stones Work"
   - "How the Orange (Change-Size) Stones Work" → "How the Change-Size Stones Work"
   - "red stones" → "size stones"
   - "orange stones" → "change-size stones"
   - "red size stones" → "size stones"
   - "orange change-size stones" → "change-size stones"
   - "red curve" → "size curve"
   - "orange curve" → "change-size curve"
   - "red stacks" → "size stacks"
   - "orange differentials" → "change-size differentials"
   - "red or orange portion" → "size or change-size portion"
   - "one red stone" → "one size stone"
3. Preserve all markup, styling classes, and surrounding wording exactly; only swap the words noted above.

## Verification
- Open the app and click the "?" Help button.
- Confirm the first identification paragraph still reads "size stones (red by default)" and "change-size stones (orange by default)".
- Confirm the rest of the Help panel no longer uses "red" or "orange" except in that first identification paragraph.
- Run typecheck and production build to ensure no regressions.
