# Add Exercise 3 for "How the Abacus Works": From Differences to Rates

## What was provided

`From_Differences_to_Rates.docx` — a four-page exercise in which students rebuild a
change-curve so its stones represent the rate Δy/Δx instead of the difference Δy,
using y = 2x² + x, midpoint 2.5, increment 0.5, max stones 55.

No figures needed; the extracted images are only page screenshots.

## What gets built

### New content file

`src/content/library/from-differences-to-rates.md`

Front matter:
```yaml
---
slug: from-differences-to-rates
title: "From Differences to Rates"
summary: "An investigation in which students rebuild a change-curve so that it represents the rate Δy/Δx instead of the difference Δy, and discover how the two differ."
section: exercise
parent: how-the-abacus-works
order: 3
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---
```

Body: the full exercise in Markdown, preserving the section headings (Learning
Objective, Teacher Overview, Student Activity with its SETUP / NOTICE / REBUILD /
READ THE NEW CURVE / COMPARE steps, Reflection Questions, Expected Student
Discoveries, Common Misconceptions, Teacher Notes), the bolded step labels,
numbered reflection questions, and quoted button names ("Divide By Increment").

Conversions applied:
- The stray LaTeX in the source (`$\Delta y/\Delta x$`, `$1/\Delta x$`) becomes
  plain Unicode: Δy/Δx and 1/Δx, matching the other entries.
- The duplicated one-line summary at the top of the body is dropped, since the
  page already renders the summary under the title.

### No code changes

The library manifest globs `*.md` and groups exercises under their parent, so the
new exercise appears automatically under "How the Abacus Works" after
"Be the Abacus" and "Build the Strip", and gets its own page at
`/library/from-differences-to-rates` with previous/next navigation.

## One thing to confirm

Reflection question 3 says the rebuilt readings at x = 2.5 "differ from the right
and from the left, 12 against 10", while the READ THE NEW CURVE paragraph gives
6 from the right and 5 from the left (stone counts), whose stone-values are 12
and 10. I will keep both as written unless you want them worded consistently.

## Verification

- Typecheck and production build
- `/library` lists the new exercise under the article; the page renders in full
