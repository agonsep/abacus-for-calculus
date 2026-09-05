# Plan: Author-aware acknowledgements for library articles and exercises

## Goal
Add a per-entry acknowledgement field so future articles by different authors can carry their own attribution, while keeping every existing Shah Nawal article/exercise unchanged in rendered output.

## Changes

### 1. Front-matter support (`src/content/library/index.ts`)
- Add `acknowledgement?: string` to `LibraryEntry`.
- In `parseFrontMatter`/mapper, read `data.acknowledgement`.
- If an entry does not specify one, default to:
  `Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026.`

### 2. Render acknowledgement on every entry page (`src/routes/library.$slug.tsx`)
- After `<LibraryProse>{entry.body}</LibraryProse>`, render a final paragraph with the entry's `acknowledgement`.
- Style it consistently with the existing article prose (e.g. small, muted text or regular body text).
- Keep it above the "Exercises for this article" section and above the previous/next navigation.

### 3. (Optional) Make existing entries explicit
- Add `acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."` to the front matter of all seven existing `.md` files.
- This makes the pattern visible and lets the fourth article simply use its own `acknowledgement` line without any special-case code.

## Verification
- Run `bunx tsgo` for typecheck.
- Run `bun run build` for production build.
- Use Playwright to visit `/library/about-the-calculus-abacus` and `/library/be-the-abacus` and confirm the acknowledgement renders at the bottom of both an article and an exercise.

## Future workflow
When the Hamza Amin article arrives, add:
```yaml
acknowledgement: "Written for the Calculus Abacus Project by Hamza Amin, with AI assistance, 2026."
```
to its front matter. No code changes will be needed.
