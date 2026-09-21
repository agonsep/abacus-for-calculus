---
slug: the-window-that-never-arrives
title: "The Window That Never Arrives"
summary: "An investigation of limits in which the Abacus shows what happens near a point even when the curve is undefined there."
section: exercise
parent: the-abacus-meets-the-textbook
order: 2
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

An investigation of limits in which the Abacus shows what happens near a point even when the curve is undefined there.

## Learning Objective

Students will experience a limit as a controlled approach to a point the curve never reaches: first seeing an undefined point, then moving the window away from the point and approaching it from one side, and finally seeing why a two-sided limit requires the values on both sides to approach the same number.

## Teacher Overview

This activity turns an undefined point into the day's central insight. Students first place the point directly on the board and observe what the Abacus shows: the board fills, but the column at the undefined point is empty and the left panel identifies its value as "undefined." Students then move the window away from the point and reduce the increment, allowing them to investigate what happens nearby.

The first board is deliberately simple. With y = sin(x)/x, midpoint 0, and increment 0.5, the eleven columns include x = 0, making the undefined point visible. The second board moves the midpoint to 0.06 and reduces the increment to 0.01. The eleven columns now run from 0.01 to 0.11, allowing students to approach zero from the right without landing on it.

The third board provides a contrast. With y = |x|/x, midpoint 0.05, and increment 0.10, the eleven columns straddle x = 0 without placing a column there. On the left side, the values are −1; on the right side, they are 1. Students see that approaching from the two sides does not always lead to the same destination. This gives them a concrete reason why a two-sided limit requires agreement between the two one-sided approaches.

The values on the first two boards are extraordinarily close together, so high-precision display makes the small differences visible. Board 3 is deliberately different: its two sides have dramatically different values. Radians throughout. One class period.

## Student Activity

### SETUP

**Board 1:** y = sin(x)/x, midpoint 0, increment 0.5, 50 stones, no fractional stones.

**Board 2:** y = sin(x)/x, midpoint 0.06, increment 0.01, 50 stones, no fractional stones.

**Board 3:** y = |x|/x, midpoint 0.05, increment 0.10, 50 stones, no fractional stones.

### SEE THE UNDEFINED POINT

Build **Board 1**.

The eleven columns run from x = −2.5 to x = 2.5, including x = 0.

Look at the column for x = 0. What do you see? What does the left panel say about its value?

Why is the value of y = sin(x)/x undefined when x = 0?

### APPROACH FROM THE RIGHT

Build **Board 2** by changing the midpoint to **0.06** and the increment to **0.01**.

The eleven columns now run from x = 0.01 to x = 0.11.

Read the y values from right to left, toward zero.

Record the values at:

- x = 0.10: ____________
- x = 0.06: ____________
- x = 0.01: ____________

Where do the values appear to be heading?

Complete the sentence:

> As x approaches 0 from the right, the values of sin(x)/x approach ____________.

## APPROACH FROM BOTH SIDES

Now build **Board 3**.

The eleven columns run from x = −0.45 to x = 0.55, but there is no column at x = 0.

Look at the columns immediately to the left and right of the missing point.

What values do you see?

On the left side, the values (represented by black stones) are:

−1, −1, −1, ...

On the right side, the values are:

1, 1, 1, ...

What happens as x approaches 0 from the left?

What happens as x approaches 0 from the right?

Do the two sides approach the same number?

What does this tell you about the two-sided limit?

## READ THE ANCHORS

On any of these boards, cover the top line of the left panel with your hand and try to say what a stone is worth. Uncover it.

Write one sentence about what the floor and the size-stone were doing on these otherwise nearly flat boards.

## NAME THE TARGET

For each curve, complete the sentence:

> As x approaches ____________, the values approach ____________, although the curve itself is ____________ there.

For **Board 3**, complete the sentence again, but this time separately for the left and right sides.

> As x approaches 0 from the left, the values approach ____________.

> As x approaches 0 from the right, the values approach ____________.

That sentence expresses the idea of a limit. The notation can wait for the course.

## Reflection Questions

1. At x = 0, the value of sin(x)/x is undefined. How were you nevertheless able to determine what the nearby values were approaching?

2. Why was it useful to move the window away from x = 0 rather than trying to make the increment zero?

3. For y = sin(x)/x, what happens when you approach x = 0 from the right? What would you expect if you approached from the left?

4. On Board 3, what happens when you approach x = 0 from the left? What happens when you approach from the right?

5. Why does Board 3 show that looking at only one side is not enough to establish a two-sided limit?

6. Suppose the values on the two sides of a point approached different numbers. What would that tell you about the two-sided limit?

7. If the increment were made a thousand times smaller, would you learn something fundamentally new, or would you mainly see more digits of the same pattern?

## Expected Student Discoveries

- A limit describes what values approach near a point; the value at the point itself may be undefined.
- For y = sin(x)/x, students can see the values approaching 1 from the right without ever having a defined column at x = 0.
- Board 3 shows why approaching from both sides matters. The values approach −1 from the left and 1 from the right. Because the two sides do not approach the same number, there is no single two-sided limit at x = 0.
- Students may also notice that extremely small changes in height require the high-precision display to make the pattern visible on the first two boards.

## Common Misconceptions

**Believing that the limit must equal the value of the curve at the point.**

**Believing that an undefined value prevents us from determining what nearby values approach.**

**Believing that one-sided approach is always sufficient to establish a two-sided limit.**

**Assuming that a curve is defined at a point simply because the surrounding picture looks continuous.**

**Believing that if the left-hand and right-hand approaches produce different numbers, one of those numbers must be the limit.**

**Believing that the increment must actually become zero in order to determine a limit.**

## Teacher Notes

**The opening board is intentional:** students first see the undefined point rather than being asked to avoid it.

**The key move for y = sin(x)/x** is changing the midpoint from **0** to **0.06** and the increment from **0.5** to **0.01**. This turns the question from "What happens at zero?" into "What happens as we get closer to zero?"

There is no need to have students construct a separate mirrored board for sin(x)/x. The right-hand approach establishes the central idea efficiently.

**Board 3 then introduces an important contrast.** With y = |x|/x, the board can straddle x = 0 without placing a column there. Students can immediately see that the values on the two sides are different: −1 on the left and 1 on the right. This gives a concrete reason for requiring agreement from both sides when determining a two-sided limit.

The sentence frame in **NAME THE TARGET** gives students a way to express the concept before introducing formal limit notation.
