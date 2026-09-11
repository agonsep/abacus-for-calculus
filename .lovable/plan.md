# Dual x-axis labels under each pair

## What to build

When **Dual increments** is active, show two x-axis labels beneath each pair of stacks on the board: one under the main (left) stack and one under the companion (right) stack. The non-dual board keeps its single centered label per column.

## Behavior

- Main label: the column's primary x value, placed under the left half of the pair.
- Companion label: the x value used for the companion stack, i.e. `x + second increment`, placed under the right half of the pair.
- If the second increment is real, the companion label shows `x + h₂`.
- If the second increment is `w` (or a multiple), the companion label shows `x + h₂·w` using the existing dual formatter.
- Undefined columns keep the same gray/dim treatment as today. If only the companion value is undefined, the main label stays normal and the companion label is grayed.
- Labels should fit inside the narrower pair width; reduce font size or tighten spacing as needed without hurting readability.
- The left panel and help text are unchanged unless a short note about the dual labels is helpful.

## Technical notes

- Work in `src/components/CalculusAbacus.tsx`.
- Add props to the `Board` component so it knows whether dual mode is active and what the second increment is (e.g. `dual?: boolean` and `h2?: { value: number; infinitesimal: boolean } | null`).
- In the existing label-rendering loop, when `dual` is true render two `<Text>` labels per column:
  - Main label at `cx - COL_SPACING / 4`.
  - Companion label at `cx + COL_SPACING / 4`.
- Use `formatDual` for both labels:
  - Main: `formatDual(xValues[i], 0)`.
  - Companion: `formatDual(xValues[i] + (h2.infinitesimal ? 0 : h2.value), h2.infinitesimal ? h2.value : 0)`.
- Keep the non-dual path exactly as it is now (one centered label per column).
- Pass the new props from the parent component where `Board` is rendered.

## Verification

- `bunx tsgo` typecheck and `bun run build`.
- Manual browser check: enable Dual increments with a real second increment and confirm each pair shows two x labels.
- Repeat with second increment `w` and confirm the companion label displays the infinitesimal form correctly.
- Verify non-dual mode still shows one label per column.
