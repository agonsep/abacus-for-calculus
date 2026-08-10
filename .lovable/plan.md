# Leibniz Mode: orange stones on a mid-board shelf

Instead of resting directly on top of each red stack, the orange `dy` stones sit on a second narrow strip of wood that runs across the whole board at a fixed height. Every orange stack therefore starts at the same level, with a visible gap between it and the red stack below.

## What the user sees

- When Leibniz Mode is checked, a narrow wooden shelf appears across the board at the 50-stone line (the Max Stones cap for this mode), sitting between the vertical separators like a second floor.
- All orange `dy` stacks rest on that shelf, bottoms aligned horizontally, so the shape of `f'(x)` reads as its own curve.
- Red `f(x)` stacks stay on the main floor below and can be shorter than the shelf; the empty space between a red stack and the shelf is intentional.
- Unchecking Leibniz Mode removes the shelf and restores the ordinary board.

## Rules that follow from the shelf

- **Shelf height**: fixed at 50 stone slots (`LEIBNIZ_SHELF_SLOT = 50`), matching the Max Stones cap already applied in this mode. Red stacks can never reach it.
- **Space above**: the orange layer gets the remaining ~48 slots. Scaling now fits `max|dy|` into that space on its own, rather than fitting `size + dy`. The unit stays shared between red and orange, so if `dy` is too tall the unit shrinks for both layers together (red stacks get shorter as a result, which is fine).
- **Negative `dy`**: dark-grey stones, stacked upward from the shelf, following the existing colour-not-direction sign convention.
- **Undefined columns**: stay grey; no orange stones on the shelf there.
- **Dragging**: in Leibniz Mode the orange layer is anchored to the shelf and is not vertically draggable; red stacks remain draggable. The change-stone drag handles are simply not rendered while the mode is on.
- **Midpoint Tangent** continues to follow the red stacks only.

## Technical notes

All in `src/components/CalculusAbacus.tsx`.

- New constants `LEIBNIZ_SHELF_SLOT = 50` and a small `SHELF_THICKNESS`; the orange base slot becomes `LEIBNIZ_SHELF_SLOT + 1` when `leibniz` is true.
- `Board` takes a `leibniz` prop and renders a horizontal `RoundedBox` plank (board width, thin height, shelf depth) at `slotY(LEIBNIZ_SHELF_SLOT)`, in the same wood tone as the separators.
- `Stacks`: when `leibniz`, `changeBase` is the fixed shelf slot instead of `yFull + gap`, and `changeGap`/`shift` do not apply to the orange stones.
- `DragHandles`: skip the change handle when `leibniz` is true.
- Leibniz scaling in `setup()` fits `max|dy|` into `MAX_PIECES - LEIBNIZ_SHELF_SLOT - 1` slots and `max|f(x)|` into `LEIBNIZ_SHELF_SLOT`, reducing the shared unit until both fit.
- Fix the current `ReferenceError: o is not defined` surfacing in the preview while making these edits (stale identifier left from the Leibniz stack work).
