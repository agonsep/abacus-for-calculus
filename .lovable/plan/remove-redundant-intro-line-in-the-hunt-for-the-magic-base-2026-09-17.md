# Remove redundant intro line in "The Hunt for the Magic Base"

## Background

The exercise page shows the same sentence twice: the `summary` frontmatter value (line 4, rendered in the page header, the library TOC card, and the page's search/preview description) and an italic body line (line 11). The user chose to delete the body line and keep the summary.

## Changes

File: `src/content/library/the-hunt-for-the-magic-base.md`

- Delete line 11, the italic body line:
  `*A discovery hunt in which the class corners a famous number without being told it exists.*`
  (and the blank line that follows it, so the body starts cleanly at `## Learning Objective`)

No other files change. The frontmatter summary, TOC card, and meta description are untouched.

## Verification

- `bunx tsgo` and `bun run build` pass.
- The page header shows the summary once; the TOC card keeps its description.
