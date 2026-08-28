# Publishing Your Articles and Exercises

## How to send content

Upload `.docx` files here, one document per article or exercise. I convert each
one into a page in the site.

Writing rules that keep the conversion accurate:

- Put the article title on the first line as a Heading 1.
- Write exponents as `x^2`, `f''(x)`, or with Unicode characters (`x²`, `Δ²y/Δx²`).
- Do **not** use Word's superscript button or Insert > Equation — those get
  flattened or lost, so `x²` can silently arrive as `x2`.
- Regular Word headings, bold, italics, bullet lists, numbered lists, and simple
  tables all survive fine.
- Send figures as separate `.png`/`.jpg` uploads, with a line in the document
  saying where each goes (e.g. `[FIGURE: parabola-stones.png]`).

Up to 10 files per message, 20MB each.

## What gets built

Content is stored as static files in the project — no database, no login, and
pages load instantly.

### The About page (`/library`)

Replaces the current "Coming Soon" placeholder with a table of contents for the
four articles and three exercises:

- Two sections: **Articles** and **Exercises**.
- Each entry is a link showing the title and a one-line summary.
- Only documents you have sent appear; the list grows as you upload the rest.
- Same navy/cream/red styling as the home page.
- `← Home` link at the top and an `Open Calculus Abacus` button at the bottom.


### Article pages (`/library/<slug>`)

Each document becomes its own page at a readable URL, for example
`/library/dividing-by-the-increment`:

- Article title, then the body in a comfortable reading column.
- Serif headings and cream text on the navy background, matching the site.
- Inline math symbols (`Δ²y/Δx²`, `x²`) rendered as plain text — no LaTeX engine.
- `← About the Calculus Abacus` back link at the top, and previous/next links at
  the bottom so readers can move through in order.
- Its own page title and description for search and link sharing.

## Adding and updating later

Send a new `.docx` and I add a page plus its table-of-contents entry. Send a
revised version of an existing one and I replace that page's content. Say the
word and I reorder the list or move an item between Articles and Exercises.

## Technical details

- Each document is converted to a Markdown file under `src/content/library/`,
  with front matter for `title`, `slug`, `summary`, `section` (article or
  exercise), and `order`.
- A `src/content/library/index.ts` module imports the Markdown eagerly with
  Vite's `import.meta.glob`, parses front matter, and exports a sorted manifest.
  No runtime fetch, so pages prerender.
- `src/routes/library.tsx` becomes the table of contents driven by that manifest.
- New route `src/routes/library.$slug.tsx` (`createFileRoute("/library/$slug")`)
  looks up the entry by slug, throws `notFound()` on a miss, and renders the
  Markdown.
- Rendering uses `react-markdown` with `remark-gfm` (tables, strikethrough),
  styled with `@tailwindcss/typography`-style utility classes matching the
  existing palette. No KaTeX.
- Figures are placed in `src/assets/library/` and referenced from the Markdown.
- `head()` on the slug route sets a per-article title, description, `og:title`,
  and `og:description`; the not-found case returns a generic title plus
  `robots: noindex`.

## First step

Upload the first article. I build the full pipeline around it — the table of
contents, the article page template, and the styling — so you can review the
result before sending the remaining three articles and three exercises.

