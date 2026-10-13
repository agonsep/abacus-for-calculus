# Essential updates to “How the Abacus Works”

## Scope

Propose a focused revision, not a comprehensive reference manual. Preserve the hands-on teaching approach, triangular-number example, and existing structure wherever possible. The article has not been edited; these changes remain proposals until approved.

## Essential additions

1. **Dual Increments:** Add a short section distinguishing the viewing increment from the measuring increment. Explain the companion at \(x-h_2\), main-minus-companion differences, division by the second increment, and automatically enabled fractional stones.
2. **Infinitesimal `w`:** Explain symbolic values and distinguish an infinitesimal viewing window from a real viewing window with `w` as the second increment. Describe derivative values for supported differentiable formulas without claiming unrestricted hyperreal arithmetic or exactness for numerical fallbacks. Note the current two-round infinitesimal limit and the option to use a numeric second increment afterward.
3. **Repeated derivatives:** Give a compact worked sequence using \(y=x^2\), midpoint 5, first increment 1, maximum 50 stones, and second increment 0.1. After the first promotion, recheck Dual Increments, then Find Differences and Divide By Increment again. Explain that the equation box retains the original formula and that Fill Board starts over. Distinguish finite-difference approximations from derivative values obtained with `w`.

## Essential corrections

- **Division:** Replace the claim that stone counts are always divided by the increment. Ordinary promotion preserves change-stack heights and changes the stone value; Dual Increments rescales the derived curve and may adjust counts. Briefly explain why the stone-value notices matter.
- **Scaling and floor:** Qualify the minimum-as-floor rule for nonconstant, entirely positive windows. Explain the zero floor for windows containing zero or negative values and briefly mention constant curves’ separate rule.
- **Tangent:** Correct the trace to run through size-stack tops, not orange change-stack tops. Retain the explanation of the movable tangent and add the edge limits and reset on Fill Board.
- **Controls and precision:** Replace “the four checkboxes” with the current arrangement: Fractional stones and Dual increments first, the remaining refinements under More. Clarify that displayed fractional counts are rounded and that 10 decimals changes display precision, not mathematical accuracy.
- **Leibniz Mode:** Correct the existing brief description to explain the shelf and \(dy=f'(x)\,dx\), rather than treating it simply as an undivided derived curve. Briefly distinguish \(dy\) from \(\Delta y\).
- **Colors and limits:** Use stone-role names, with red/orange identified as defaults; correct the negative-change color wording. Qualify 0.001 as the numeric minimum and rewrite the one-increment limitation to account for Dual Increments.

## What stays out

No exhaustive formula catalogue, detailed interaction guide, full animation walkthrough, or reference section for every disabled control. No changes to app behavior, other articles, or exercises.

## Technical details and checks

- Revise only the article body in `src/content/library/how-the-abacus-works.md`; retain its title, metadata, and attribution.
- Check worked arithmetic and descriptions against the current abacus, including the distinction between ordinary and Dual promotion.
- Review the finished article for consistency of size, change-size, finite difference, differential, and derivative terminology.
- Check the displayed article for heading flow and mathematical formatting before reporting completion.