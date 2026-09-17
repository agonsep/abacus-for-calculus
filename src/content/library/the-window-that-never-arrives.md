---
slug: the-window-that-never-arrives
title: "The Window That Never Arrives"
summary: "An investigation of limits in which the Abacus shows what happens near a point even when the curve is undefined there."
section: exercise
parent: the-abacus-meets-the-textbook
order: 2
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

## Learning Objective

Students will experience a limit as a controlled approach to a point the curve never reaches: first seeing an undefined point, then moving the window away from the point and approaching it from one side, and finally seeing why a two-sided limit requires the values on both sides to approach the same number.

## Teacher Overview

This activity turns an undefined point into the day's central insight. Students first place the point directly on the board and observe what the Abacus shows: the board fills, but the column at the undefined point is empty and the left panel identifies its value as "undefined." Students then move the window away from the point and reduce the increment, allowing them to investigate what happens nearby.

The first board is deliberately simple. With y = sin(x)/x, midpoint 0, and increment 0.5, the eleven columns include x = 0, making the undefined point visible. The second board moves the midpoint to 0.06 and reduces the increment to 0.01. The eleven columns now run from 0.01 to 0.11, allowing students to approach zero from the right without landing on it.

The second example, y = (x − 1)/(x² − 1), introduces the importance of approaching from both sides. With midpoint 1.005 and increment 0.01, the board straddles x = 1 without placing a column there. Students can compare the values on the two sides and see that both approach 1/2.

The values on these boards are extraordinarily close together, so high-precision display makes the small differences visible. Radians throughout. One class period.

## Student Activity

### SETUP

**Board 1:** y = sin(x)/x, midpoint 0, increment 0.5, 50 stones, no fractional stones.

**Board 2:** y = sin(x)/x, midpoint 0.06, increment 0.01, 50 stones, no fractional stones.

**Board 3:** y = (x − 1)/(x² − 1), midpoint 1.005, increment 0.01, 50 stones, no fractional stones.

### SEE THE UNDEFINED POINT

Build **Board 1**.

The eleven columns run from x = −2.5 to x = 2.5, including x = 0.

Look at the column for x = 0. What do you see? What does the left panel say about its value?

Why is the value of y = sin(x)/x undefined when x = 0?

### APPROACH FROM THE RIGHT

Build **Board 2** by changing the midpoint to **0.06** and the increment to **0.01**.

The eleven columns now run from x = 0.011 to x = 0.11.

Read the y values from right to left, toward zero.

Record the values at:

- x = 0.1: ____________
- x = 0.06: ____________
- x = 0.01: ____________

Where do the values appear to be heading?

Complete the sentence:

> As x approaches 0 from the right, the values of sin(x)/x approach ____________.

### STRADDLE THE HOLE

Now build **Board 3**. Read the column labels: 0.955, 0.965, and onward to 1.055. Which key value of x is missing?

Look at the values on the two sides of the missing point. The value just to the left is 0.50125; the value just to the right is 0.49875. What number are **both sides** approaching?

Unlike the curve y = sin(x)/x, this curve is not symmetric about the y axis, yet the values still approach the same number from both sides, one from above and the other from below.

## READ THE ANCHORS

On any of these boards, cover the top line of the left panel with your hand and try to say what a stone is worth. Uncover it.

Write one sentence about what the floor and the size-stone were doing on these otherwise nearly flat boards.

## NAME THE TARGET

For each curve, complete the sentence:

> As x approaches __________, the values approach __________, although the curve itself is __________ there.

That sentence expresses the idea of a limit. The notation can wait for the course.

## Reflection Questions

1. At x = 0, the value of sin(x)/x is undefined. How were you nevertheless able to determine what the nearby values were approaching?

2. Why was it useful to move the window away from x = 0 rather than trying to make the increment zero?

3. Board 3 has a missing value at x = 1, yet the values on both sides approach 1/2. What does this tell you about the relationship between a limit and the value of a curve at a point?

4. Why does the second example give you more information by looking at **both sides** of the missing point?

5. Suppose the values on the two sides of the hole approached different numbers. What would that tell you about the two-sided limit?

6. If the increment were made a thousand times smaller, would you learn something fundamentally new, or would you mainly see more digits of the same pattern?

## Expected Student Discoveries

- A limit describes what values approach near a point; the value at the point itself may be undefined.
- For y = sin(x)/x, students can see the values approaching 1 from the right without ever having a defined column at x = 0.
- Board 3 shows why approaching from both sides matters: the values on the two sides approach the same number, 1/2.
- Students may also notice that extremely small changes in height require the high-precision display to make the pattern visible.

## Common Misconceptions

**Believing that the limit must equal the value of the curve at the point.**

**Believing that an undefined value prevents us from determining what nearby values approach.**

**Believing that one-sided approach is always sufficient to establish a two-sided limit.**

**Assuming that a curve is defined at a point simply because the surrounding picture looks continuous.**

**Believing that the increment must actually become zero in order to determine a limit.**

## Teacher Notes

**The opening board is intentional.** Students first see the undefined point rather than being asked to avoid it.

**The key move for y = sin(x)/x** is changing the midpoint from **0** to **0.06** and the increment from **0.5** to **0.01**. This turns the question from "What happens at zero?" into "What happens as we get closer to zero?"

There is no need to have students construct a separate mirrored board for sin(x)/x. The right-hand approach establishes the central idea efficiently. The two-sided issue can then be introduced with Board 3, where students compare the values on the two sides of the hole.

The sentence frame in **NAME THE TARGET** gives students a way to express the concept before introducing formal limit notation.
