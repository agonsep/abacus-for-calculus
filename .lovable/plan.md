# Add Exercise 1: From Columns to Area

## Result
Add the uploaded four-page exercise as the first exercise under **Estimation Before Formalization**, with Hamza Amin credited. Its teaching content, numerical values, questions, worked checks, and distinction from Wallis's method stay the same. Only the presentation changes to fit the existing library pages.

## Content and presentation
- Create `src/content/library/from-columns-to-area.md` with title **From Columns to Area**, `section: exercise`, `parent: estimation-before-formalization`, `order: 1`, a one-line summary from the PDF's introductory sentence, and the same author acknowledgement format as the companion article, naming Hamza Amin.
- Preserve the PDF's Learning Objective, Teacher Overview, Student Activity, Reflection Questions, Teacher Discussion Extension, What Students Often Notice, Expected Student Discoveries, Common Misconceptions, Teacher Notes and Mathematical Check, Connection to the Historical Article, Classroom Timing and Adaptation, and Quick Formative Assessment. Keep its Exercise 1/companion-series identification without repeating the page title unnecessarily.
- Convert the setup and calculation worksheets into readable Markdown tables, retaining blank cells for students. Convert mathematical notation to the site's plain-text Unicode style (for example, x², R₁₀, Δx, and 1/3) rather than displaying raw LaTeX.
- Preserve Figure 1's two left/right endpoint diagrams and caption by extracting that figure from the PDF as a web image; do not use the PDF's entire page as the figure. Serve it through the project's asset flow and place it where the exercise refers to Figure 1.

## Technical details
The library already discovers Markdown entries automatically, groups exercises by their `parent`, and supplies article links and previous/next navigation. No route or abacus-behavior changes are needed. If the six-column worksheets need it, make only a focused presentation adjustment so they remain legible on narrow screens without changing their content.

## Verification
Check that the exercise appears below its parent article and opens at `/library/from-columns-to-area`; compare headings, tables, equations, diagram, and attribution against the PDF; inspect desktop and mobile rendering and confirm the preview has no build errors.
