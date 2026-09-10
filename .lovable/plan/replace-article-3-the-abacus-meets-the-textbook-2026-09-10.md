# Replace Article #3: "The Abacus Meets the Textbook"

## What was provided

`The_Abacus_Meets_the_Textbook_v2.docx` — a complete rewrite of the third article by Shah Nawal. The new version reframes the article around three textbook ideas: instantaneous velocity, limits near a missing point, and hunting for the base whose rate of change at 0 is 1 (the number e). It references three new exercises by name but does not include their content.

## What gets built

### Article replacement

Replace the entire contents of `src/content/library/the-abacus-meets-the-textbook.md` with the rewritten article.

Keep the existing front matter fields unchanged:
- `title: "The Abacus Meets the Textbook"`
- `slug: the-abacus-meets-the-textbook`
- `section: article`
- `order: 3`
- `acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."`

Update the summary to match the new framing:
```yaml
summary: "From physical experience to the language of calculus: velocity at an instant, limits near a missing point, and the hunt for the base whose slope is exactly 1."
```

Body: the full rewritten article converted to Markdown, preserving:
- Subtitle as an italic lead-in
- Section headings (`From physical experience to the language of calculus`, `How fast at an instant?`, `How fast is something moving at a particular instant?`, `Start with a rate over an interval, then make the interval smaller and observe how the estimate changes.`, `What happens near a point?`, `What happens to the values of a curve when the distance from a point becomes smaller and smaller?`, `Hunting for a famous number`, `From the Abacus to calculus`, `The Abacus and formal calculus`)
- Unicode math: `y=4.9x²`, `y = (sin x)/x`, `y=b^x`, `e ≈ 2.71828`, `Δy/Δx`
- Quoted exercise titles: “The Ball and the Tower”, “The Window That Never Arrives”, “The Hunt for the Magic Base”
- Bold emphasis on key pedagogical claims
- Italic emphasis on the bridge between physical experience and formal mathematics
- The bullet pair under the `sin(x)/x` discussion

### Library table of contents and article page

No code changes needed. The library index and `/library/the-abacus-meets-the-textbook` route will pick up the replaced file automatically.

### Referenced exercises

The rewritten article names three exercises that do not yet exist:
- The Ball and the Tower
- The Window That Never Arrives
- The Hunt for the Magic Base

This plan covers only the article replacement. Creating those exercises is a separate task and is not included here.

## Verification

- TypeScript: `bunx tsgo`
- Production build: `bun run build`
- Browser check: `/library` lists the article with the updated summary; clicking it loads the full rewritten text.
