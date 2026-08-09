# Rename "Remove Stones" to "Difference Curve"

Yes, "Difference Curve" is an appropriate label. It describes the result of the operation rather than the physical gesture, which fits the current educational framing: the button converts the change-size stones into a new curve representing the difference quotient (Δy/Δx). The phrase is also shorter and clearer alongside the existing "Find Differences" button, because it distinguishes the *new size curve* from the *change-size stones* that "Find Differences" produces.

## Changes

Update the UI strings in `src/components/CalculusAbacus.tsx`:

- Checkbox label at line 1802: change `"Remove Stones"` to `"Difference Curve"`.
- Error message at line 842: change `"Remove Stones cannot be used..."` to `"Difference Curve cannot be used..."`.
- Error message at line 1785: change `"Remove Stones cannot be used..."` to `"Difference Curve cannot be used..."`.
- Help panel at line 1640: replace `"Remove Stones"` with `"Difference Curve"` in both the bold label and the surrounding explanation, keeping the existing math description intact.

No functional changes are needed; the underlying state (`level`, `levelStack`, `promoting`) and the animation logic remain unchanged.

## Verification

After editing, confirm the preview shows the new checkbox label and the Help panel no longer contains "Remove Stones".
