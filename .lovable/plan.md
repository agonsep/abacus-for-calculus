# Add Article #3: "The Abacus Meets the Textbook"

## What was provided

`The_Abacus_Meets_the_Textbook.docx` — a four-page article by Shah Nawal (same author
as the other two articles). It applies the abacus to classic textbook problems: the
falling ball (y = 4.9x²), limits that approach without arriving (sin(x)/x and
(x−1)/(x²−1)), a falling curve (y = 1/x), and the hunt for a base whose slope is
exactly 1 (2^x vs 3^x). No embedded figures are needed; extracted images are only
page screenshots.

## What gets built

### New content file

`src/content/library/the-abacus-meets-the-textbook.md`

Front matter:
```yaml
---
title: "The Abacus Meets the Textbook"
slug: the-abacus-meets-the-textbook
summary: "Classic textbook problems—the falling ball, limits without arriving, a falling curve, and the hunt for a special base—worked on the board your students already know."
section: article
order: 3
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---
```

Body: the full article converted to Markdown, preserving:

- Italic pull-quote under the title
- Section headings (`You have already done the textbook's early example`,
  `The falling ball`, `Limits that approach without arriving`, `A curve that falls`,
  `Is there a base whose slope is exactly 1?`)
- Unicode math: `y = x²`, `y = 4.9x²`, `sin(x)/x`, `y = (x − 1)/(x² − 1)`,
  `y = 2^x`, `−1/4`, etc.
- Quoted UI labels ("Fill Board", "Find Differences")
- Italic emphasis on *Single Variable Calculus* and key phrases
- Standard Markdown punctuation

### Library table of contents

No code change needed. The library index globs `*.md` and sorts by `section` then
`order`, so the article appears automatically under **Articles** after
"How the Abacus Works".

### Article page

No code change needed. `/library/the-abacus-meets-the-textbook` renders through the
existing `library.$slug.tsx` template.

## Verification

- TypeScript: `bunx tsgo`
- Production build: `bun run build`
- Browser check: `/library` lists the new article; clicking it loads the full text.
