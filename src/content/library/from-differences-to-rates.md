---
slug: from-differences-to-rates
title: "From Differences to Rates"
summary: "An investigation in which students rebuild a change-curve so that it represents the rate Δy/Δx instead of the difference Δy, and discover how the two differ."
section: exercise
parent: how-the-abacus-works
order: 3
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

## Learning Objective

Students will separate two ideas that beginners habitually merge—how much a curve changed and how fast it changed—by rebuilding a change-curve so that its stones represent rate rather than difference. The activity also demystifies the estimate column: students perform its division with their own hands.

## Teacher Overview

This activity completes the article's arc. The first two exercises built a board and read its differences; this one asks what the differences mean when the increment is not a whole unit of x. It follows naturally from the first two exercises of the series as well: The first exercise read the change-curve's shape; the second exercise refined a rate at a point, and this activity supplies the missing conversion between the two, the division by the increment. Run it in either medium or both; the steps are identical.

## Student Activity

**SETUP:**

y = 2x² + x, midpoint 2.5, increment 0.5, max stones 55, whole stones. Fill the board and add the change-size stones. Something curious happens: this board is identical to the one in the first two exercises, the same triangular columns, the same change-size counts of 1 through 10, yet the columns now stand only half a unit of x apart.

**NOTICE:** Each stack of change-size stones records how much y changed across half a unit of x. Ask the question the board quietly raises: if y changed by this much in half a step, how fast was it changing per unit of x? The average rate is the change divided by the increment, and with an increment of one half, the average rate is double the difference. The slope-estimate column in the left panel has been performing exactly this division all along. Read a few of its rows now, before changing anything, and confirm the doubling against your own arithmetic.

**REBUILD:** Now perform that division with your hands. Remove the size stones and drop the change-size stones to the bottom of the board. On the slip of paper, alter the value of one stone from 1 to 2. On the virtual abacus, use the "Divide By Increment" button. An animation will run. Column by column, the size stones are removed, the change-size stones drop to the bottom of the board and are recolored as size stones. The change-size stones do not change in number. Instead, the value of one stone is adjusted in the left panel by dividing by the increment.

**READ THE NEW CURVE:** The new curve has stacks containing 1, 2, 3, and onward to 10 stones. Because each stone is now worth 2, those stacks represent rates of 2, 4, 6, and onward to 20. Each stack of stones now reads directly as a rate, using the new value of one stone: the number of stones times the new value of each stone gives Δy/Δx. From here on, one can read rates from the stones themselves. Check the middle of the board: at x = 2.5 the rebuilt readings give 6 from the right and 5 from the left, and their average is 5.5. For this particular curve, multiplying the average by the value of one stone (2) gives the exact slope there, 11.

**COMPARE:** Consider the change-size stones before and after the manual rebuild or clicking on the "Divide By Increment" button. Only the value of a stone has changed. Which value shows how much the curve changed? Which one shows how fast? Write one sentence saying how they are related.

## Reflection Questions

1. In the first two exercises the increment was 1 and nobody needed to rebuild anything. Why does an increment of 1 make the difference and the rate coincide?

2. Suppose the increment were 0.25 instead. By what factor would you adjust the value of a stone, and what does that suggest about very small increments?

3. The rebuilt readings at x=2.5 differ from the right and from the left, 12 against 10. What does averaging the two accomplish? Why might the average be a better estimate of the slope at x=2.5 than either one alone?

## Expected Student Discoveries

The stones in the rebuilt curve have the same visual height, but their numerical meaning has changed. The same stack of stones can represent either a difference or a rate, depending on the value assigned to each stone.

A difference and a rate are different quantities that happen to have the same numerical value when the increment is 1. A difference tells how much y changes over a particular interval of x; a rate tells how much y changes per unit of x.

The quantity represented by a stack is determined by two things: the number of stones and the value of one stone. The number of stones stays the same during the rebuild; changing the value of one stone changes the quantity represented by the stack. When the increment is 0.5, changing the value of one stone from 1 to 2 converts the difference into a rate.

Students may also notice why the original change-curve can look flatter than the size curve seems to warrant. Each change stack records what happened over only half a unit of x. The smaller the increment, the smaller the amount of change recorded in each individual step, even when the rate of change is substantial.

The estimate column becomes less mysterious: its division by the increment is exactly the conversion the students have just performed themselves. The rebuilt curve therefore gives a direct visual representation of the rate (Δy/Δx), preparing students for the idea of the derivative as an exact rate of change.

## Common Misconceptions

**A taller stack always means a faster rate.**
Not by itself. The number of stones tells how much change is being represented, but the value of each stone also matters. A stack must be interpreted together with its stone-value.

**The rebuilt curve has more change than the original curve.**
No. The rebuilding does not create additional change. It divides the change by the increment so that the stones represent change per unit of x.

**The factor of 2 is a special rule for an increment of 0.5.**
It is not. The factor is always 1/Δx. An increment of 0.5 gives a factor of 2; an increment of 0.25 gives a factor of 4.

**A difference and a rate are the same thing because they sometimes have the same number.**
They coincide numerically when the increment is 1, but they answer different questions. A difference asks, "How much did y change over this interval?" A rate asks, "How much would y change per unit of x?"

**A small difference means the rate is small.**
Not necessarily. A difference can be small because the interval in x is small. Dividing by that small increment can reveal a much larger rate.

**A flat-looking change-curve means that the original curve is changing slowly.**
Not necessarily. A small increment can make the differences look small even when the rate is large. The change-curve must be interpreted in light of the horizontal increment.

## Teacher Notes

The reuse of the board of triangular numbers is deliberate and worth naming aloud: the same picture, at half the increment, means something different, and only the strip or the top line of the left panel reveals which board you are looking at. That observation ties this activity back to the reading habit which pays attention to the top line of the left panel.

The key observation to draw out is that the number of change-size stones does not change during the rebuild. What changes is the value represented by each stone. This helps students see that the transition from Δy to Δy/Δx is a change in the quantity represented by the stones.
