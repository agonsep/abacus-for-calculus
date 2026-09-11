# Remove leftover color words from the Help panel

## What I found

Yes — the introductory paragraph itself contains three extra color references beyond the two intended ones:

- "Columns of red stones represent values of y..."
- "...the differences between neighboring columns of red stones."
- "Do the orange stones approach a limit as the increment approaches zero?"

Everywhere else in the Help panel is already clean. The other "red"/"orange" hits in the file are the palette option id and the "Red / Orange" picker label, which should stay.

## Change

In `src/components/CalculusAbacus.tsx`, in the Help panel intro paragraph (around line 2211):

- "Columns of red stones" becomes "Columns of size stones"
- "neighboring columns of red stones" becomes "neighboring columns of size stones"
- "Do the orange stones approach a limit" becomes "Do the change-size stones approach a limit"

Keep the two intended default-color mentions exactly as they are: "The size stones (red by default)" and "The change-size stones (orange by default)". No styling or markup changes.

## Verification

Open Help and confirm the paragraph reads with only the two parenthetical color mentions; run typecheck and build.
