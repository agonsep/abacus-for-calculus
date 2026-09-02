# Add Article #2: "How the Abacus Works"

## What was provided

`How_the_Abacus_Works.docx` — a six-page teacher article with the subtitle
“Setup and Mechanics.” It explains the equation/midpoint/increment window,
building a board by hand, the three buttons and four checkboxes, scaling and
the floor, the slope-estimate column, whole vs. fractional stones, and how to
read a completed board.

No embedded figures are needed; the extracted page images are only screenshots
of the document pages themselves.

## What gets built

### New content file

`src/content/library/how-the-abacus-works.md`

Front matter:
```yaml
---
title: "How the Abacus Works: Setup and Mechanics"
slug: how-the-abacus-works
summary: "What every object and number on the board means, and why the machine was built this way."
section: article
order: 2
---
```

Body: the full article converted to Markdown, preserving:

- Section headings (`A window onto the curve`, `Building a board by hand`,
  `Letting the software do it`, `Scaling and the floor`, `The estimate column`,
  `Whole stones and fractional stones`, `Reading a completed board`,
  `What the abacus does well, and the trade-offs behind its limits`,
  `What the mechanics prepare`)
- Italic pull-quote under the title
- Unicode math: `y = (x² + x)/2`, `y = x²`, `y = x³`, `Δy/Δx` style differences
- Quoted UI labels (“Fill Board”, “Find Differences”, “Divide By Increment”, etc.)
- Em dashes and typographic quotes normalized to standard Markdown punctuation

### Library table of contents

No code change needed. `src/content/library/index.ts` already globs `*.md`
files and sorts by `section` then `order`, so the new article appears
automatically under **Articles** after “About the Calculus Abacus” and before
any exercise entries.

### Article page

No code change needed. `/library/how-the-abacus-works` renders through the
existing `src/routes/library.$slug.tsx` template with the white reading
background, serif headings, and previous/next navigation.

## Verification

- TypeScript: `bunx tsgo`
- Production build: `bun run build`
- Browser check: `/library` lists the new article; clicking it loads
  `/library/how-the-abacus-works` with the full text.
