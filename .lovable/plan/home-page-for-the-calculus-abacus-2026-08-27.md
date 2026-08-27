# Home Page for the Calculus Abacus

A fast-loading landing page that shows a single image of the abacus and two large buttons.

## Routing

- `/` becomes the new home page (lightweight: image + two buttons, no 3D scene loaded).
- `/abacus` becomes the interactive app (the current `CalculusAbacus` component, unchanged).
- `/library` becomes the table of contents for the teacher documents (articles and exercises).

The current app keeps working exactly as it does now; it just lives at `/abacus`. The published root URL stays the entry point, so existing links still land somewhere sensible.

## Home page layout

```text
        The Calculus Abacus
   a hands-on tool for teaching calculus

        [ image of the abacus ]

   [  The Calculus Abacus  ]   <- launches app (/abacus)
   [ About the Calculus Abacus ] <- opens library (/library)
```

- Dark wood-and-warm palette matching the app (deep background, orange/red stone accents).
- Headline, one-line subtitle, one image, two big primary buttons stacked on mobile and side by side on desktop.
- Button 1 "The Calculus Abacus" — solid red (size-stone color), links to `/abacus`.
- Button 2 "About the Calculus Abacus" — solid orange (change-size-stone color), links to `/library`.

## Image

Generate one still image of the abacus (wooden board, red and orange stones) sized for fast loading, stored in `src/assets` and imported directly. No 3D canvas on the home page, so first paint is immediate.

## Library page (initial version)

A simple table of contents scaffold with two groups — Articles and Exercises — listing placeholder entries with titles and one-line descriptions. Individual documents are not written in this step; you supply the content later and we add routes per document.

## Technical notes

- New files: `src/routes/abacus.tsx` (moves current index content), `src/routes/library.tsx`, plus a rewritten `src/routes/index.tsx`.
- Each route gets its own `head()` metadata (title, description, og tags); the home page carries the og:image.
- Navigation uses TanStack `<Link>`; a small back link on `/abacus` and `/library` returns to home.

## Next step after review

Once you approve, I build the mockup and you can iterate on wording, image, and the document list.
