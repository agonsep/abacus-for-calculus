Add author acknowledgement to library articles and exercises

## Goal
Append the requested author/date acknowledgement to the end of every existing article and exercise Markdown file in the teacher library.

## Acknowledgement text
Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026.

## Files to update
- src/content/library/about-the-calculus-abacus.md (article)
- src/content/library/how-the-abacus-works.md (article)
- src/content/library/the-shape-of-change.md (exercise)
- src/content/library/be-the-abacus.md (exercise)
- src/content/library/how-fast-right-here.md (exercise)
- src/content/library/build-the-strip.md (exercise)
- src/content/library/how-small-is-small-enough.md (exercise)

## Implementation
1. Read each file to confirm its current ending.
2. Append the acknowledgement text as a final paragraph at the end of the Markdown body, separated by a blank line from the preceding content.
3. Keep front matter and all existing content unchanged.
4. Run typecheck and production build to verify nothing is broken.
5. Spot-check one article and one exercise in the browser to confirm the acknowledgement renders at the bottom.
