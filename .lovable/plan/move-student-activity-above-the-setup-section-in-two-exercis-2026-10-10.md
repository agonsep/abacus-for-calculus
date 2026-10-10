# Move "Student Activity" above the setup section in two exercises

## Goal

Apply the same heading change already made in *Correct the Guess* to the other two companion exercises: the **Student Activity** heading moves above the setup heading, so the setup steps read as the first part of the student activity.

## Changes

### From Columns to Area (`src/content/library/from-columns-to-area.md`)

- Delete the `## Student Activity` line that currently sits just before the **PREDICT.** paragraph.
- Insert `## Student Activity` immediately above `### Setup: validate before class`.

```text
Before                          After
## Teacher Overview             ## Teacher Overview
  overview paragraphs             overview paragraphs
  Figure 1 + caption              Figure 1 + caption
  ### Setup: validate ...       ## Student Activity
  settings table                  ### Setup: validate ...
  expected-columns note           settings table
## Student Activity               expected-columns note
  PREDICT ...                     PREDICT ...
```

### From Secant to Tangent (`src/content/library/from-secant-to-tangent.md`)

- Delete the `## Student Activity` line that currently sits just before the **PREDICT.** paragraph.
- Insert `## Student Activity` immediately above `### Setup and app sequence`, matching the structure of *Correct the Guess*.

```text
Before                          After
## Teacher Overview             ## Teacher Overview
  overview paragraphs             overview paragraphs
  ### Setup and app sequence    ## Student Activity
  run instructions                ### Setup and app sequence
## Student Activity               run instructions
  PREDICT ...                     PREDICT ...
```

## What stays the same

- All body text, tables, figures, captions, and the "10 decimals" recommendations are untouched — only the heading line moves.
- Frontmatter (title, summary, order, acknowledgement) and the credit line are unchanged.
- No renderer work needed: `LibraryProse.tsx` renders Markdown directly with no table of contents or heading navigation that would need reordering.

## Verification

- Load both exercise pages and confirm heading order: **Student Activity** appears before the setup heading, and the setup heading renders as a subsection (smaller than the section heading).
- Confirm the settings/run-instruction tables, Figure 1 images, and both blank and completed tables still render, and nothing shifted in the article listings.
- Check the pages at phone width for horizontal overflow, plus typecheck and build.
