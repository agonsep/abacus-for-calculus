# Update Help Panel Stone Terminology

## Goal
Update the opening paragraph of the Help panel's "Interacting with the Abacus" section so the stone names lead and the default color is parenthetical, with no special font coloring for those two phrases.

## Changes

In `src/components/CalculusAbacus.tsx`, line 2211:

1. Replace:
   ```jsx
   The <span style={{ color: palette.size }}>red stones</span> (or size-stones)
   ```
   with:
   ```jsx
   The size stones (red by default)
   ```

2. Replace:
   ```jsx
   The <span style={{ color: palette.change }}>orange stones</span> (or change-size-stones)
   ```
   with:
   ```jsx
   The change-size stones (orange by default)
   ```

3. Remove the surrounding `<span style={{ color: ... }}>` wrappers so the new text uses the default surrounding text color (`text-foreground/90`).

4. Preserve the rest of the sentence and all other Help panel content exactly as-is.

## Verification
- Open the app and click the "?" Help button.
- Confirm the first paragraph reads: "The size stones (red by default) represent amounts. Columns of red stones represent values of y along a given curve. The change-size stones (orange by default) represent the differences between neighboring columns of red stones."
- Confirm the words "size stones (red by default)" and "change-size stones (orange by default)" are not colored differently from the rest of the paragraph.
- Run typecheck and production build to ensure no regressions.
