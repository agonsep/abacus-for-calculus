---
slug: the-hunt-for-the-magic-base
title: "The Hunt for the Magic Base"
summary: "A discovery hunt in which the class corners a famous number by measurement and bisection, without being told it exists."
section: exercise
parent: the-abacus-meets-the-textbook
order: 3
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

*A discovery hunt in which the class corners a famous number without being told it exists.*

## Learning Objective

Students will discover, by measurement and bisection, that there is a base between 2 and 3 whose curve has a slope at x = 0 that can be made arbitrarily close to 1. They will meet that number as something they found rather than something they were told.

## Teacher Overview

This is the purest discovery activity in the series, and its whole force depends on one act of discipline: do not say the letter e until the final step. The hunt itself is short, a reading at base 2, a reading at base 3, a conjecture, and then a class-driven bisection that corners the answer near 2.72. Two flanking rows give the two-sided reading, no Lefthand comparison required. One period, with the reveal near the end.

## Student Activity

### SETUP

y = 2^x, midpoint 0, increment 0.1, max stones 50, fractional stones turned on. Fill Board, Find Differences. Refill with new bases as the hunt proceeds.

### MEASURE, BASE 2

Read the estimate beside x = 0 and the estimate one row to its left, and average them: 0.72 and 0.67 give about 0.69. That estimates how fast 2^x is growing at the moment it crosses height 1.

### MEASURE, BASE 3

Refill with y = 3^x and repeat: average 1.16 and 1.04 to obtain 1.10.

### CONJECTURE

The first slope is below 1; the second is above it. Say precisely what must therefore exist in between, and why you believe it.

### HUNT

Now search for the base whose slope is exactly 1. Begin with the interval from 2 to 3. Try the midpoint of the interval (2.5). Based on the reading, decide which half contains the special base. Then bisect that half again (either 2.75 or 2.25). Continue, recording each midpoint and its reading. Keep bisecting until you are confident of the first two decimal places of the base, recording each base and its reading.

### CHECK YOUR TRUST

Take your best base and read it again at increment 0.01. If the reading holds, say why that agreement matters.

### NAME IT LAST

Only now will your teacher tell you that mathematicians cornered this same number long ago, that it is not a round number and never will be, and that they call it e. You did not learn e today. You found it.

## Reflection Questions

1. Why was it fair to conclude, before any hunting, that a base with slope exactly 1 had to exist between 2 and 3?

2. Some students might guess the answer will be 2.5. What assumption is hiding in that guess, and what did the measurements say about it?

3. What would it mean about the curve b^x if its slope at zero were exactly 1? Describe it in words, not symbols; there is a famous idea sleeping here.

## Expected Student Discoveries

- The slope at x = 0 grows steadily with the base, so a crossing through 1 is guaranteed.
- The special base is not round, roughly 2.72, and honest measurement can corner an irrational number.
- A constant every mathematics student eventually memorizes turns out to be findable by hand in forty minutes.

## Common Misconceptions

**Expecting 2.5 by symmetry.** The slope does not grow linearly with the base, and the readings prove it.

**Trusting a single reading at a single increment.** The CHECK step exists to make agreement, not confidence, the standard.

**Believing the hunt could finish, with any instrument.** The target has no final decimal, which is a feature of the number and a good conversation.

## Teacher Notes

**The bisection is the students' to steer;** your only job is board operator and secret keeper.

**If a student notices** that the winning curve seems to grow at a rate equal to its own height, do not confirm or deny; write the observation on the board. They have glimpsed the defining property of the exponential curve a chapter early.

**If the period runs short,** the hunt can stop at "somewhere between 2.75 and 2.625" with no loss; the discovery is the existence, not the digits.
