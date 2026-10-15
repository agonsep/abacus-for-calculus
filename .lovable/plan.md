# Correct white stones during Reverse

## Focused correction
- Correct the temporary white appearance reported during **Fill Board → Find Differences → Divide By Increment → Reverse**, starting with the Blue/Cyan palette.
- As each column is recolored during Reverse, positive stones must show the selected change-size color (cyan for Blue/Cyan). Columns awaiting recoloring retain their size-stone color. Negative stones retain the appropriate dark colors.
- Preserve the existing right-to-left stages, movement, timing, counts, and one-operation-per-click behavior. No article or exercise changes.

## Technical details
- The shared stone material currently switches from an untextured size color to a gradient texture with a white base color. Reverse changes that material mode on existing stones during its recoloring pass.
- Confirm whether the material’s texture/shader refresh is responsible for the white appearance; this is the leading diagnosis, not yet visually verified.
- Make the material transition reliable, using an explicit material refresh or a material identity keyed to its rendering mode. Apply the correction to the shared appearance so whole and fractional stones behave consistently without restarting their movement.

## Checks
- Visually reproduce the reported sequence with Blue/Cyan and inspect the recoloring pass and subsequent lifting stage, not only the final board.
- Repeat with Red/Orange and Forest/Mint, ordinary and Dual Increments modes, and signed/fractional stones.
- Confirm forward promotion still recolors correctly, Reverse restores the saved values, and a second Reverse removes the differences normally.
- Check preview errors and compilation results before reporting completion.