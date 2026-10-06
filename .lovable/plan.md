## Add Exercise 3: "Correct the Guess"

Add the uploaded exercise as the third companion exercise to *Estimation Before Formalization*. It will look and read like "From Secant to Tangent". All the text, tables and the figure stay the same.

### What gets added
- A new library entry, **Correct the Guess**, listed after "From Secant to Tangent". It is labeled *Exercise 3 · Estimation Before Formalization Companion Exercises*. The credit line is the same as before: "Written for the Calculus Abacus Project by Hamza Amin, with AI assistance, 2026."
- The sections keep their original order: Learning Objective, Teacher Overview (with Setup and app sequence), Student Activity (Predict, Construct a Local Line, Check the Direction, Repeat, Compare Representations, Judge Stabilization), Reflection Questions, Teacher Discussion Extension, What Students Often Notice, Expected Student Discoveries, Common Misconceptions, Teacher Notes and Mathematical Check, Connection to the Historical Article, Classroom Timing and Adaptation, Quick Formative Assessment.
- **Two tables:**
  - The student table, with blank cells for steps 0–2 (starting values 1.0000, 1.4975 and 1.4168).
  - The completed check table in the teacher notes.
- **Figure 1** (the line that meets the axis at the next estimate), cut from page 2 of the PDF, with its original caption.
- **Formulas:** the slope quotient, the local-line equation, the recurrence \(x_{n+1} = x_n - f(x_n)/m_n\) and √2. These are written in the same plain bold-formula style the earlier exercises use.

### Technical details
- New file `src/content/library/correct-the-guess.md`, using the same metadata as the earlier exercises (slug `correct-the-guess`, section exercise, parent `estimation-before-formalization`, order 3).
- Render page 2 with pdftoppm, crop the figure with PIL, then store it with lovable-assets as `src/assets/library/correct-the-guess-figure-1.png.asset.json` and refer to it by its CDN URL.
- Mark the item done in roadmap.md. Check in the browser that the exercise appears in the right order, both tables and the figure show, and nothing overflows at 390px.
