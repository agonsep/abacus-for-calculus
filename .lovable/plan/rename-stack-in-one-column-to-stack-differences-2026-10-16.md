# Rename "Stack in one column" to "Stack differences"

The checkbox in the **More** section becomes **Stack differences**. Nothing else moves: the From/To boxes, the demonstration itself, and every other control stay exactly as they are.

## What changes

- The box in the "More" section reads **Stack differences** instead of "Stack in one column".
- The Help panel paragraph that begins with the bold label uses the new name; the rest of the paragraph (selection, destination, comparison, after-division stages) stays as written.
- The hover tip on the label already describes behaviour without naming the checkbox, so it is unchanged.
- The internal state name and all animation logic stay as-is — this is a label and copy change only.

## What does not change

- Behaviour of the demonstration: inclusive From/To selection, gathering beneath the highest selected stack, outside size stacks kept visible for comparison, the numeric endpoint readout, unchecking to restore the board, and Reverse.
- Articles and exercises: none of them mention the checkbox by name, so they need no edit.
- Historical roadmap entries that name the old label stay as written; a new completed entry records the rename.

## Technical details

- `src/components/CalculusAbacus.tsx`
  - Line 3522: label text `Stack in one column` → `Stack differences`.
  - Line 3209: the panel guard `target.closest("label")?.textContent?.includes("Stack in one column")` → `includes("Stack differences")`. This string match is what stops changing From/To from cancelling the demonstration, so it must be renamed in the same edit or that behaviour breaks silently.
  - Line 3156: Help panel `<strong>"Stack in one column"</strong>` → `<strong>"Stack differences"</strong>`.
  - Line 1355: code comment `// Stack in one column (display-only overlay).` → `// Stack differences (display-only overlay).`
  - State (`stackOne`), aria-labels on the From/To boxes, and the tooltip text stay unchanged.
- `AGENTS.md` line 4: the rule begins with `"Stack in one column" uses a display-only journey ...` → renamed to `"Stack differences"`, wording otherwise identical.
- `mem://features/stacking.md`: front-matter description and the body's opening sentence name the old label → updated to "Stack differences"; the motion, destination, selection, comparison, and no-guide-line rules are otherwise byte-identical.
- `mem://index.md`: the "Stacking demonstration" line describes behaviour, not the label, so it needs no change.
- `roadmap.md`: add a completed entry for the rename.

## Verification

- Build log shows no new errors.
- Live check in the preview: the "More" section shows **Stack differences**; checking it runs the normal align-then-gather demonstration and the readout still reports the endpoint comparison.
- Changing From or To while checked keeps the demonstration running (confirms the renamed guard).
- Unchecking restores the board and hands the board back to Reverse; the Help panel paragraph names the new label.
- Confirm no user-facing string still says "Stack in one column".
