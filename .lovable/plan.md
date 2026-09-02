# Launch Abacus with Triangular-Number Defaults

## Goal
When a user clicks "Open Calculus Abacus" from the home page, the interactive board opens with these defaults:
- Formula: `y = (x^2 + x)/2`
- Midpoint: `5`
- Increment: `1`
- Max stones: `55`

These settings produce the triangular numbers `0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55` across the 11 columns, with the rightmost stack exactly matching the 55-stone budget.

## Why this approach
Pass the defaults through TanStack Router search params (`/abacus?formula=...&midpoint=...&increment=...&maxStones=...`). This keeps the home-page image unchanged, lets the component keep its own hardcoded fallback defaults for direct `/abacus` visits, and makes specific board configurations shareable via URL.

## Technical details
1. Update `src/routes/index.tsx`:
   - Change the `/abacus` `Link` to include search params for the four defaults.
   - Keep the button text, styling, and home-page image exactly as they are.

2. Update `src/routes/abacus.tsx`:
   - Define a search-parameter schema (Zod) for `formula`, `midpoint`, `increment`, and `maxStones`.
   - Read the validated search params in the route.
   - Pass them as props to `<CalculusAbacus />`.

3. Update `src/components/CalculusAbacus.tsx`:
   - Add an optional `initialDefaults` prop with the four string fields.
   - Use the prop values when present; otherwise fall back to the existing defaults (`x^2`, `5`, `1`, `100`).
   - Ensure the prop only affects initial state, not subsequent edits by the user.

4. Verification:
   - Run `bunx tsgo` to confirm no type errors.
   - Open the preview, click "Open Calculus Abacus", and confirm the right panel shows the new defaults and the board renders 11 triangular-number stacks without overflow or error messages.
