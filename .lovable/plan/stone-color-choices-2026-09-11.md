# Stone color choices

Let the user pick the stone colors from three preset pairs. The first color of each pair is used for the size stones, the second for the change stones. Negative stones stay black and dark grey, and the tangent line, trace line, board, and wood stay as they are.

## The three pairs

1. Red / Orange (current look, the default)
2. Blue / Cyan
3. Forest / Mint

## How it works

- A small "Stone colors" picker appears in the right panel, below the checkboxes: three little two-tone swatches, the selected one outlined.
- Layout: a label "Stone colors" on the left, then three short rounded rectangles side by side. Each rectangle is split vertically into the two colors of the pair. The selected pair gets a white ring outline and a subtle background highlight.
- Choosing a pair recolors the board immediately. No need to press Fill Board.
- The matching panel text (the y / size-stone and change-stone column headers) and the two action buttons take the chosen colors too, so everything stays consistent.
- Help panel references: the sentence "The red stones (or size-stones) represent amounts..." recolors its highlighted words to the chosen pair. The color *names* in the prose ("red stones", "orange stones") stay as-is since they name the default palette — the names act as fixed vocabulary, and the color swatch picker makes the mapping visually obvious. (Flag: if you'd rather the words change to match the chosen colors, say so and the plan will swap the adjectives too.)
- The choice is saved in the browser and restored on the next visit.

## Technical notes

- Add a `PALETTES` table in `src/components/CalculusAbacus.tsx`: each entry has `size`, `change`, plus light/dark variants of the change color used by the gradient texture. `BLACK`, `DARK_GREY`, `LINE_COLOR`, `TANGENT_COLOR` remain shared.
- Replace the module constants `RED` / `ORANGE` at the stone-rendering sites (size stacks, change stacks, companion stacks) with values from the active palette, threaded as props through `Scene` → `Board` (React context does not cross the r3f Canvas boundary).
- `getOrangeGradTex()` becomes a per-palette cache keyed by palette id, and `Piece`'s `isOrange` check becomes a `useGradient` prop instead of a color-equality test.
- Panel headers and buttons currently hardcode `#e8352c` / `#ff932a`; switch those to inline `style={{ color }}` / `borderColor` + `backgroundColor` values from the active palette.
- Persist the selected palette id in `localStorage`, read inside an effect (not in `useState`) to avoid a hydration mismatch under SSR.
- No change to any math, counts, promotion, dual-increment, or Leibniz logic.

## Effort

Small-to-moderate: one file, mostly mechanical substitution plus the picker UI and persistence.
