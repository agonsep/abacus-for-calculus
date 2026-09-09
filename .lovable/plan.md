# Update Exercise 3: "From Differences to Rates" to Use "Reprice" Language

## What changed in the source document

`From_Differences_to_Rates-2.docx` revises the existing exercise to match the count-preserving “Divide By Increment” behavior now in the app. The main terminology shift is from **rebuild/rebuilt** to **reprice/repriced**: the stones keep the same counts and visual height; only the value assigned to each stone changes.

## What gets updated

### `src/content/library/from-differences-to-rates.md`

Front matter stays the same (slug, title, section, parent, order, acknowledgement). The body is updated throughout:

- **Summary:** Change “rebuild a change-curve so that it represents the rate” to language about modifying the value of the change-stones so they represent the rate.
- **Learning Objective:** Replace “rebuilding a change-curve so that its stones represent rate” with “changing the value assigned to the change-stones so that they represent rate.”
- **Student Activity:**
  - `**REBUILD:**` → `**REPRICE:**`
  - `**READ THE NEW CURVE:**` → `**READ THE NEW RATES:**`
  - Update the surrounding prose to use “repriced” instead of “rebuilt.”
  - In `**COMPARE:**`, replace “manual rebuild” with “repricing them.”
- **Reflection Questions:**
  - Q1: “nobody needed to rebuild anything” → “nobody needed to reprice the stones”
  - Q3: “The rebuilt readings at x=2.5” → “The rate readings at x=2.5”
- **Expected Student Discoveries:**
  - “The stones in the rebuilt curve” → “The repriced stones”
  - “during the rebuild” → “during the repricing”
  - “The rebuilt curve therefore gives a direct visual representation...” → “The repriced stones prepare students...”
- **Common Misconceptions:**
  - “The rebuilt curve has more change than the original curve.” → “Repricing the stones creates more change.”
  - Update the explanation to say the amount of change has not changed, only the quantity represented by each stone.
- **Teacher Notes:**
  - Add “with the same stones” where the document now has it.
  - “during the rebuild” → “when they are repriced”
  - Final paragraph: replace the old closing sentence with the document’s new wording: the transition from Δy to Δy/Δx does not require rebuilding the curve; it is a change in the quantity represented by the same stones.
- **Notation cleanup:** Convert any stray LaTeX (`$\Delta y$`, `$\Delta y/\Delta x$`) in the parsed source to Unicode Δy and Δy/Δx, consistent with the rest of the file and the library.

## No code changes

The library manifest discovers the file by slug, so updating the Markdown content is sufficient. The exercise will continue to appear under “How the Abacus Works” in order 3 and at `/library/from-differences-to-rates`.

## Verification

- `bunx tsgo` and production build pass.
- `/library` lists the exercise under “How the Abacus Works.”
- `/library/from-differences-to-rates` renders the updated wording, especially the `REPRICE` and `READ THE NEW RATES` step labels and the “repriced” terminology.
