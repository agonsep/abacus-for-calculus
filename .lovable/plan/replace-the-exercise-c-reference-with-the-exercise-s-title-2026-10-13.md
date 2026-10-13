# Replace the "Exercise C" reference with the exercise's title

## Confirming the reference first

The only lettered label left in the project is the last sentence of the
trade-offs section of "How the Abacus Works" (line 111):

> ... the gap between a difference and a rate of change is worth teaching.
> Exercise C turns the remedy into the lesson.

That paragraph is about change-size stones showing a difference rather than a
rate, and about Divide By Increment closing that gap. The exercise whose whole
investigation is exactly that — students change the value assigned to the
change-stones so a stack reads as the rate Δy/Δx instead of the difference Δy —
is "From Differences to Rates", Exercise 3 under "How the Abacus Works". So
yes, "From Differences to Rates" is the correct article to reference.

## The change

One sentence, one file: `src/content/library/how-the-abacus-works.md`.

- Before: `Exercise C turns the remedy into the lesson.`
- After: `"From Differences to Rates" turns the remedy into the lesson.`

The title is quoted rather than linked, matching how the rest of the library
names things — no article currently links to an exercise page. Nothing else in
the paragraph changes.

A search of the source for "Exercise A", "Exercise B", "Exercise C" and
similar lettered labels found this one occurrence, so no other article or
exercise carries a stale label.

## Verification

- Typecheck and production build.
- Open the displayed article and read the closing paragraph of the trade-offs
  section: it names "From Differences to Rates" and no lettered label remains.
- Confirm the library index still lists that exercise under the article.
- Add a one-line entry to the Completed list in `roadmap.md`.
