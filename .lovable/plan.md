# Remove repeated exercise line from "The Ball and the Tower"

## Change
- In `src/content/library/the-ball-and-the-tower.md`, delete the body line `*Exercise for "The Abacus Meets the Textbook"*` (line 11) and the blank line after it, so the text starts directly at "## Short Introduction".
- The title/parent relationship in the frontmatter (`section: exercise`, `parent: the-abacus-meets-the-textbook`) is unchanged, so the page header still identifies it as an exercise for "The Abacus Meets the Textbook".

## Verification
- Typecheck and build pass; confirm the exercise page renders without the repeated line while its header still shows the series title.
