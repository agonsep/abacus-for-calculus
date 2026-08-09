# Change Default Abacus Settings

## Goal
Update the initial values shown on first load so the abacus opens with a clean, well-fitting demonstration: `y = x^2`, midpoint `5`, increment `1`, and max stones `100`.

## Why this works
With these defaults the 11 columns span `x = 0` to `x = 10`, giving `y` values `0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100`. Because the function is all positive, the floor stays at `0` and the unit is `1` per stone. The rightmost size stack is exactly 100 stones, and the tallest combined stack (size + change-size) is 100 stones at `x = 9`, so nothing overflows the 100-stone separator.

## Technical details
- File: `src/components/CalculusAbacus.tsx`
- Change the `useState` initial strings near the top of the component:
  - `formula`: `"x^3"` → `"x^2"`
  - `midpoint`: `"2"` → `"5"`
  - `increment`: `"0.25"` → `"1"`
  - `maxStones`: `"50"` → `"100"`
- No other changes are needed. The max-stones input already clamps to `100`, and the Help panel already describes the 100-stone capacity.
- After the change, verify with a typecheck and a quick visual check that the initial board renders correctly without overflow or error messages.
