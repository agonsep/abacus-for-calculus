## Change Slope estimate expanded width to 5rem

When the "10 decimals" checkbox is checked, the Slope estimate column currently expands to `6rem`. Update it to `5rem` to reduce unused width.

### Change
In `src/components/CalculusAbacus.tsx`, replace the two conditional `6rem` values with `5rem`:
- Header grid row (line 880)
- Data grid rows (line 901)

Both currently read:
```
gridTemplateColumns: `2rem 5.5rem 5.5rem ${slopeHighPrecision ? "6rem" : "2rem"}`
```

Update to:
```
gridTemplateColumns: `2rem 5.5rem 5.5rem ${slopeHighPrecision ? "5rem" : "2rem"}`
```

### Verification
- Confirm no `6rem` values remain for the Slope estimate column.
- Confirm build passes.
- Confirm in the preview that checking "10 decimals" expands the Slope estimate column to 5rem (80px at default root font size) and the full value still fits without clipping.