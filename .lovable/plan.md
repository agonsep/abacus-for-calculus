Single "Exercises" header per article on the library index

## Goal
Change the library table of contents so each article has at most one "Exercises" heading, with all exercises for that article listed beneath it, instead of repeating the word "Exercises" on every individual exercise card.

## Current state
- `src/routes/library.tsx` renders `articleGroups` as an article card followed by a nested `<ul>` of exercises.
- Each exercise is rendered by `ExerciseLink`, which currently includes its own `<span className="... uppercase tracking-[0.2em]">Exercises</span>` label above the exercise title.
- Standalone exercises already render under a single "Exercises" `<h2>`.

## Plan
1. Edit `src/routes/library.tsx`:
   - Remove the per-card "Exercises" label from `ExerciseLink` so the component shows only the exercise title and summary.
   - Inside the article group rendering, when `exercises.length > 0`, render a single "Exercises" heading above the nested `<ul>` and list the exercises below it.
   - Keep the existing left-border indentation and card styling for the nested list.
   - Leave the standalone exercises section unchanged.
2. Verify the change visually in the preview and confirm typecheck/build pass.

## Files to edit
- `src/routes/library.tsx`
