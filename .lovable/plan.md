# Default second increment matches primary increment

## Change

When the user checks **Dual increments**, the second increment input currently defaults to `0.5`. Change it so the default equals the current primary increment value.

## Why

Using the primary increment as the default makes the dual-increment feature symmetrical and easier to explore: the companion stack starts at the same spacing the user has already chosen.

## Scope

Only `src/components/CalculusAbacus.tsx`.

- Initialize `increment2` from the primary increment (`initialDefaults?.increment ?? "1"`) instead of the literal `"0.5"`.
- When the user toggles Dual increments on, set `increment2` to the current primary `increment` value if it has not been manually edited (or simply whenever the checkbox is turned on, matching the "default" behavior).
- Keep the existing validation, `w` support, and the fact that the second increment remains a draft until **Fill Board** is clicked.

## Verification

1. Load `/abacus` with the default primary increment `1`.
2. Check **Dual increments** — the second increment field should show `1`.
3. Change the primary increment to `0.25`, uncheck and re-check **Dual increments** — the second increment field should show `0.25`.
4. Click **Fill Board**; companion stacks should use the matched increment.