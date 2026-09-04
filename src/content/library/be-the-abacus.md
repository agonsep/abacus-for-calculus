---
slug: be-the-abacus
title: "Be the Abacus"
summary: "A hands-on activity in which students reproduce the abacus's own arithmetic, pricing a size-stone, deriving every number in the left panel, and placing the stones themselves before letting the software check their work."
section: exercise
parent: how-the-abacus-works
order: 1
---


A hands-on activity in which students reproduce the abacus's own arithmetic, pricing a size-stone, deriving every number in the left panel, and placing the stones themselves before letting the software check their work.

## Learning Objective

Students will price (assign a value to) a size-stone from the settings, derive all five columns of the left panel by hand, and build a complete board so that the display becomes something they trust because they have reproduced it. The aim is scaling literacy: after this activity, no number on the board is mysterious.

## Teacher Overview

This is the natural first activity after reading the article. It uses a configuration chosen so that every value lands on a whole stone and the arithmetic stays friendly: the stone prices at exactly 1, the floor is 0, and the columns turn out to be the triangular numbers, a pattern students may recognize with delight. The activity runs comfortably in a single period. Students need the virtual abacus, paper, and nothing else. Resist the urge to let students press Fill Board early; the discovery depends on the hand-built board coming first.

## Setup

`y = (x² + x)/2`, midpoint `5`, increment `1`, max stones `55`, whole stones. Do not press Fill Board yet.

## Student Activity

**CALCULATE:** Write down the eleven x-values of the window and compute the eleven y-values. Find the smallest and the largest. Price one size-stone: the largest minus the smallest, divided by 55. Note the floor. (Here the numbers are kind: the stone is worth exactly 1, and the floor is 0.)

**DERIVE:** Work out the five numbers of each row of the left panel: the x value, the Size count, the y value, the Change-Size count between neighbors, and the slope estimate, which is the change count times the stone's value divided by the increment. Use pen and paper. Watch for the pattern in the Size column as it emerges.

**CHECK:** Now press Fill Board, then Find Differences, and compare the abacus's board with yours, row by row. Where a row disagrees, find out why before moving on.

## Reflection Questions

1. Why does the abacus divide by 55 when pricing the stone? What would one stone be worth if you set max stones to 50 instead, and would the columns still come out as whole numbers? Predict first, then test. Predict the result of checking the box for fractional stones, then check that box and compare the results.

2. The Size counts came out equal to the y-values themselves. What special fact about this board made that happen, and why would it not happen for most curves?

3. The change-size stones count 1, 2, 3, up to 10. What does that steady climb say about how this curve grows?

4. Which number on the board would change if the midpoint moved to 6, and which would stay the same? Reason it out before checking.

## Expected Student Discoveries

The columns hold the triangular numbers, 0, 1, 3, 6, 10, and onward to 55, and the change-size stones simply count 1 through 10. The stone's value is not decoration but the key that turns counts into quantities. The slope estimates equal the change-size counts here only because the stone is worth 1 and the increment is 1. Most durably: every number on the board comes from arithmetic the student has now done personally.

## Common Misconceptions

Believing the Size counts are always the y-values. They are here only because the stone happens to be worth exactly 1; the count is always (y minus floor) divided by the stone's value. Believing the floor is always 0. It is 0 here because the smallest y-value in the window is 0; a different window puts a different number on the baseline. Treating the check step as the activity. The learning is in the derivation; the software's role is confirmation.

## Teacher Notes

This configuration was chosen deliberately. With the stone worth exactly 1, the scaling rule can be verified mentally, and the triangular number pattern rewards the effort with something memorable. If time allows, the first reflection question makes a strong live demonstration: refilling with max stones 50 reprices the stone at 1.1 and the tidy whole numbers disappear, which shows vividly that the counts depend on the scale, not just the curve.
