---
slug: from-secant-to-tangent
title: "From Secant to Tangent"
summary: "Students compare nearby values on both sides of x = 2, convert finite differences into slope estimates, and watch the estimates close around a stable value."
section: exercise
parent: estimation-before-formalization
order: 2
acknowledgement: "Written for the Calculus Abacus Project by Hamza Amin, with AI assistance, 2026."
---

*Exercise 2 · Estimation Before Formalization Companion Exercises*

## Learning Objective

Students will distinguish a finite difference from a difference quotient, compare right- and left-hand slope estimates for y = x² at x = 2, and explain how successively smaller increments support a derivative claim.

## Teacher Overview

The exercise draws on two different historical strands. Fermat’s work directs attention to comparing an expression with a modified version, while Leibniz places differences and tangent relations at the center. Students use modern function notation and finite quotients, so the procedure is a teaching analogy rather than a reconstruction of either mathematician’s method.

Students run four increments. The app’s displayed *change-size* is a neighboring finite change. Dividing it by the increment produces a slope estimate. A change-curve becomes a derivative claim only after that division and an account of what happens as the increment decreases.

### Setup and app sequence

For each run choose **Show panels** and set formula x^2, midpoint 2, max stones 80. Enable **Fractional stones** and **10 decimals** before selecting **Find Differences**, which generates the change-size stones. Select **Lefthand comparison** when reading the left neighbor. Use increments 0.5, 0.1, 0.01, 0.001, refilling the board and selecting **Find Differences** after every change. If fractional stones are enabled later, select **Find Differences** again.

**PREDICT.** At x = 2, will a right-neighbor estimate be larger or smaller than a left-neighbor estimate? Sketch two secant lines and explain your prediction from the curve’s shape.

**CALCULATE A FINITE DIFFERENCE.** Begin with h = 0.5. Record f(2) and f(2.5). Calculate the right finite difference

**Δyᴿ = f(2 + h) − f(2).**

State its units. Then divide by h to calculate the right difference quotient. Explain what changed mathematically when you divided.

![Left and right secants around the tangent, with points labeled 2 − h, 2, and 2 + h](/__l5e/assets-v1/4732285b-2755-4397-932b-96aadc772f45/from-secant-to-tangent-figure-1.png)

*Figure 1: Left and right secants close around the tangent line as h decreases.*

**COMPARE THE LEFT.** Record f(1.5). Calculate

**Δyᴸ = f(2) − f(2 − h), mᴸ = [f(2) − f(2 − h)]/h.**

The numerator is written so a rising function gives a positive left-hand slope estimate. Compare it with the app display and record any rounding.

**REFINE.** Repeat for h = 0.1, 0.01, 0.001. Use Figure 1 to interpret how the two secants change.

| h | right finite difference | right quotient | left quotient | gap |
|---|---|---|---|---|
| 0.5 |  |  |  |  |
| 0.1 |  |  |  |  |
| 0.01 |  |  |  |  |
| 0.001 |  |  |  |  |

**TEST A CONJECTURE.** Average the left and right quotient in each row. What do you notice? Use algebra to test the pattern:

**[(2 + h)² − 2²]/h and [2² − (2 − h)²]/h.**

**INTERPRET.** Write a two-sentence claim: first identify the stable slope estimate; then identify the evidence supporting it. Include why a finite difference such as 0.41 is not the same object as a slope estimate such as 4.1.

## Reflection Questions

1. What evidence is provided by approaching from both sides that a one-sided run alone does not provide?
2. Why does shrinking h improve the local reading even though h never becomes zero in the app?
3. Where does this classroom analogy to Fermat and Leibniz stop?

## Teacher Discussion Extension

Ask whether averaging is always exact. For this quadratic, the forward quotient is 4 + h and the backward quotient is 4 − h, so their average is exactly 4 for every positive h. That outcome does not hold for every function. Test y = x³ at x = 2: the average becomes 12 + h², still an estimate that improves as h shrinks.

## What Students Often Notice

- The right estimates descend while the left estimates rise toward the same number.
- Finite changes shrink with h, but the quotients remain near 4.
- The average is already 4 for the quadratic, which prompts a useful question about symmetry.
- More displayed decimals do not by themselves create better mathematics; the chosen increment drives refinement.

## Expected Student Discoveries

Students should distinguish three objects: the finite difference Δy, the difference quotient Δy/h, and the value toward which the two-sided estimates close. The right and left estimates move toward 4 as the interval narrows, while the app itself performs only finite comparisons.

## Common Misconceptions

- **Calling change-size the derivative.** The change-size is a finite neighboring difference; division and refinement have not yet been accounted for.
- **Dividing the left difference by −h after already reversing the numerator.** Choose one sign convention and apply it consistently.
- **Equating more decimals with more accuracy.** Formatting and mathematical refinement are different.
- **Claiming historical identity.** Modern f(x) algebra is a teaching analogy, not Fermat’s or Leibniz’s exact sequence of steps.

## Teacher Notes and Mathematical Check

For f(x) = x² at x = 2,

**mᴿ = 4 + h, mᴸ = 4 − h.**

Expected values are:

| h | right difference | right quotient | left quotient | right-left gap |
|---|---|---|---|---|
| 0.5 | 2.25 | 4.5 | 3.5 | 1.0 |
| 0.1 | 0.41 | 4.1 | 3.9 | 0.2 |
| 0.01 | 0.0401 | 4.01 | 3.99 | 0.02 |
| 0.001 | 0.004001 | 4.001 | 3.999 | 0.002 |

The common target is 4. The validated **Lefthand comparison** mode uses f(x) − f(x − h), so its positive slope convention matches the table. Students can also calculate the left quotient directly from the size values.

## Connection to the Historical Article

The article treats Fermat through nearby expressions and residual terms, and Leibniz through differences and tangent reasoning. This exercise makes those relationships teachable while preserving the historical limit: finite secants can approach a tangent slope, but they are neither adequality nor infinitesimals by themselves.

## Classroom Timing and Adaptation

Use five minutes for prediction, about twenty for the four app runs, ten for the algebraic conjecture, and five for reflection. Pairs should keep one shared table but alternate who controls the app. Requiring a verbal interpretation after each run prevents the activity from becoming a decimal-copying exercise.

For additional support, calculate the first right quotient as a class and provide a sign diagram for the left numerator. For additional challenge, have students test y = x³ at x = 2 and explain why the two-sided average is 12 + h², not exactly 12. If time is short, use h = 0.5, 0.1, 0.01; retain both sides because the closing bracket is the strongest evidence.

## Quick Formative Assessment

Display the pair “change-size = 0.0401, increment = 0.01.” Ask students to name the finite difference, calculate the quotient, and write one sentence explaining why neither number alone proves a derivative value. Look for the distinction among visible change, rate conversion, and refinement.