---
slug: the-ball-and-the-tower
title: "The Ball and the Tower"
summary: "Students estimate how fast a falling ball is moving at a particular moment by using average speeds over progressively shorter intervals, and discover that the estimates settle toward a value without ever using an interval of zero."
section: exercise
parent: the-abacus-meets-the-textbook
order: 1
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

## Short Introduction

This activity asks students to investigate a familiar question in a way that makes the central idea of calculus visible. A ball is falling from a tower that is about 450 meters tall. A ball falls about 4.9 meters per second squared. It will reach the ground after 9.6 seconds. How fast is the ball moving when it hits the ground? (This problem is from James Stewart's Single Variable Calculus, Chapter 2.) Students cannot measure the distance traveled during an instant, because an instant has no duration. Instead, they begin with average speed over a measurable interval and then make the interval smaller and smaller.

The important question is not which calculation produces the answer immediately. It is what happens to the estimates as the increment becomes smaller.

## Learning Objectives

Students will use the Calculus Abacus to estimate how fast a falling ball is moving at a particular moment. They will create a sequence of estimates using progressively smaller increments and observe what happens to those estimates.

The aim is for students to discover through observation that smaller intervals can give a better estimate of what is happening at a particular moment, and that the estimates can settle toward a particular value.

Students will also have an opportunity to think about why the increment cannot simply be set equal to zero, and what it might mean to imagine an increment smaller than any positive finite amount.

## Teacher Overview

This activity gives students a concrete way to encounter one of the central ideas underlying calculus: using average rates over shorter and shorter intervals to estimate what is happening at a particular instant.

The activity begins with average speed, something students can understand and calculate over an ordinary interval of time. Students then repeatedly reduce the increment and observe the resulting estimates. The central discovery is the behavior of the sequence of estimates as the increment becomes smaller.

Students may use a left-hand, right-hand, or central difference. The choice of difference method is secondary. The main purpose is not to determine which method is best, but to investigate what happens when the increment is reduced.

The activity deliberately postpones formal calculus terminology. Students first encounter the idea experimentally and visually. The formal language of limits and instantaneous velocity can come later, when there is already a concrete experience for those ideas to name.

The problem uses the equation y = 4.9x². The ball falls for 9.6 seconds before reaching the ground. The particular equation is simple enough for students to understand while producing estimates that change noticeably as the increment becomes smaller.

## Student Activity

**SETUP:**

Set up the Calculus Abacus with the following settings:

- **Equation:** y = 4.9x²
- **Midpoint:** 9.6
- **Increment:** 1
- **Maximum stones:** 50

Turn on fractional stones.

Press **Fill Board**, then **Add Change-Size Stones**.

The ball falls from a tower that is about 450 meters tall. The distance the ball falls is governed by an equation: y = 4.9x², where y is the distance traveled in meters and x is the time elapsed in seconds. After 9.6 seconds the ball reaches the ground. You are going to investigate how fast the ball is moving when it hits the ground, that is, after 9.6 seconds.

Record the following from the Abacus:

- The value of one size stone in meters: __________
- The floor value: __________
- The distance the ball has already traveled when the window begins: __________

Why is the floor value not zero?

**PREDICT:**

You cannot measure how far the ball travels during an instant, because an instant has no duration. But you can measure how far it travels during a short interval of time.

Suppose you measure the ball's average speed during an interval near 9.6 seconds. What do you think will happen to this average speed as the interval becomes shorter and shorter?

Write down your prediction.

**DISCOVER:**

Use the Abacus to make an estimate of the rate of change at x = 9.6. You may use a right-hand, left-hand, or central difference. Choose whichever you prefer.

With an increment of 1.0, record your estimate. Now keep the midpoint at 9.6 and keep fractional stones turned on. Repeat the estimate with smaller and smaller increments.

- **Increment 1.0:** Estimate __________
- **Increment 0.1:** Estimate __________
- **Increment 0.01:** Estimate __________
- **Increment 0.001:** Estimate __________

If you are interested, try the other difference methods and compare their estimates. Do the different methods give different results? Which method settles first? As the increment becomes smaller, do the differences between the methods become larger, smaller, or stay about the same?

Consider the estimates when the increment is 0.001. Do all three difference methods agree? Does this give you more confidence in the estimate at this interval? Why?

**INTERPRET:**

Look back at your sequence of estimates. Describe the pattern you see as the increment becomes smaller.

Complete this sentence:

"As the increment gets smaller, the estimates __________________________."

Based on your sequence, give your best estimate of the ball's speed when it reaches the ground. Record your answer in meters per second and convert it to kilometers per hour. Would you want to be standing under the ball as it falls to the ground?

What evidence from your estimates gives you confidence in your answer?

## Reflection Questions

1. Why can we not simply use an increment of zero?

2. What would you expect if the increment were made still smaller?

3. Did the estimates eventually appear to settle toward a particular value?

4. How did your choice of left-hand, right-hand, or central difference affect the estimates?

5. In calculus, the value that the estimates approach is called a **limit**. How does that word help describe what you observed?

6. The Abacus allows you to enter **w**, an increment smaller than every positive finite amount but not zero. What does this add to your way of thinking about the sequence of estimates?

7. What is the difference between an average speed measured over an interval and the speed of the ball at a particular instant?

## Expected Student Discoveries

- Average speed depends on the size of the interval.
- As the increment becomes smaller, the estimates settle toward a particular value.
- A smaller increment can give a better picture of what is happening at a particular moment.
- The important phenomenon is the approach toward a stable value, rather than the particular difference method used.
- Different methods can give somewhat different estimates, especially with larger increments, but their estimates tend to become closer as the increment shrinks.
- A desired value can be inferred from the sequence of estimates without being calculated directly from a formula.

## Common Misconceptions

**Believing the first estimate is the answer.**
A single estimate is an approximation. The purpose of refining the estimate is to watch the estimates improve.

**Confusing average speed with speed at an instant.**
An estimate taken over an interval describes average speed over that interval. The investigation asks what happens as the interval becomes smaller.

**Thinking the increment must eventually become zero.**
The estimates can approach a value without requiring an increment of zero.

**Believing one difference method must be the correct method.**
The three methods can produce different estimates, particularly with larger increments. The central investigation concerns what happens as the increment shrinks.

**Believing a smaller increment automatically produces an exact answer.**
A smaller increment generally gives a more local estimate, but an estimate remains an estimate.

**Thinking that w is another name for zero.**
The fictional increment w is intended to be smaller than every positive finite increment while remaining nonzero.

## Teacher Notes

**Educational purpose.** This activity gives students a concrete experience of estimating a quantity at a particular instant. It begins with something measurable, average speed, and then asks students to make the measuring interval progressively smaller.

**Conceptual significance.** The central realization is that a value associated with an instant can be approached by measurements made over intervals. Students do not receive the desired value at the beginning. They discover a pattern in a sequence of estimates.

**Why shrinking the increment is the main idea.** The central experimental variable is the increment. Students should notice that the estimates change as the increment becomes smaller and that they appear to settle toward a value. The comparison of left-hand, right-hand, and central differences is useful, but it should remain secondary.

**The sequence to emphasize.** 1.0 → 0.1 → 0.01 → 0.001 → smaller increments.

The point is not simply to obtain a good final number. Students should look at the entire sequence and ask what it seems to be approaching.

**Why this problem works.** A falling ball provides an intuitive physical situation. Students already understand the idea of average speed over a period of time, so they can investigate what happens when that period becomes shorter. The question of how fast the ball is moving at the instant it reaches the ground then emerges naturally from the investigation.

**Why estimation matters.** By estimating and refining rather than applying a formula, students experience the idea of something being approached. That experience provides a concrete foundation for the later formal idea of a limit.

**The role of the three difference methods.** Right-hand, left-hand, and central differences give students different ways to use nearby values to form an estimate. They provide a useful secondary investigation: students can see how the estimates differ and whether those differences become less important as the increment shrinks.

**How it prepares students for later work.** The settling of the estimates as the increment shrinks is the intuition underlying the formal definition of instantaneous velocity. The shrinking increment is the beginning of the idea of a limit. The question of what would happen with an increment smaller than any positive finite amount opens the door to an infinitesimal interpretation. None of these ideas needs to be formalized here. The activity simply gives students a concrete picture that later mathematical language can name.
