---
title: "The Abacus Meets the Textbook"
slug: the-abacus-meets-the-textbook
summary: "From physical experience to the language of calculus: velocity at an instant, limits near a missing point, and the hunt for the base whose slope is exactly 1."
section: article
order: 3
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

*From physical experience to the language of calculus*

The first articles in this series introduced a way of working with differences by hand and explained how the machine makes it possible. Students have learned to read a window of a curve, assign values to stones, form a curve of differences, and use those differences to estimate how a curve is changing.

Now the Abacus meets the textbook.

The purpose is not to replace a standard calculus course. It is to prepare students for one. The Calculus Abacus gives students a physical way to experience ideas that a calculus textbook will soon express with equations, symbols, definitions, and mathematical arguments.

The three exercises accompanying this article take the Abacus into familiar territory: instantaneous velocity, limits, and the number *e*. These are ordinary early-calculus questions. What is different is that students encounter the underlying ideas in a hands-on way before encountering them formally.

## How fast at an instant?

### How fast is something moving at a particular instant?

Average speed is easy to calculate. Divide the distance traveled by the time taken. But an instant has no duration. How can we determine a rate of change at an instant?

Calculus begins with something we can measure: the average rate over an interval. We then make the interval smaller. That is the essential move.

Suppose we want to estimate the speed of a falling ball at a particular moment. We can calculate its average speed during a half-second interval. We can then use a tenth of a second, a hundredth, or a thousandth. As the interval becomes smaller, the average rate can provide a more accurate estimate of the rate at the instant.

The Calculus Abacus makes this process visible. Its change-stones record how much a curve changes over an interval. By changing the value assigned to those stones, they can represent the rate of change rather than simply the amount of change.

One can use a difference on the left, a difference on the right, or both. Averaging the two readings can sometimes improve an estimate, but the underlying idea remains the same. The fundamental idea is:

### Start with a rate over an interval, then make the interval smaller and observe how the estimate changes.

The falling-ball problem makes this idea especially vivid. A ball falling from a tower follows the curve:

*y = 4.9x²*

The question is its speed at the moment it reaches the ground. The Abacus does not measure speed at an instant directly. Instead, it calculates average rates over intervals. The student then reduces the increment and calculates again.

With a relatively large increment, the estimate is crude. As the increment becomes smaller, the estimate can become more precise.

The first exercise, “The Ball and the Tower,” puts students in the role of investigators. They discover the problem that motivates differential calculus: we cannot measure a rate over zero time in the ordinary way, so we use rates over small intervals to learn about the rate at an instant.

Whether a course later develops this idea using limits or infinitesimals, the students' initial experience is the same: **the size of the increment matters.**

## What happens near a point?

The same experience with smaller increments leads naturally to another fundamental question of calculus: what happens to a curve as we examine values closer and closer to a particular point?

Consider:

*y = (sin x)/x*

At *x = 0*, the expression has no value. Yet values of the expression get very close to 1 near zero. The Abacus can make this distinction concrete. It cannot build a column at an undefined point, but it can build columns increasingly close to that point.

The student can therefore observe two different facts:

- the value at the point may not exist;
- values near the point may nevertheless be very close to a particular number.

The second exercise, “The Window That Never Arrives,” develops this idea with *y = (sin x)/x* and with another curve that has a hole at *x = 1*. The essential activity is to move closer to the point and observe what happens.

In a limits-based course, this experience provides an intuitive starting point for the idea of a limit. In an infinitesimal approach, the same experience can be connected to what happens when the increment in *x* is infinitesimally small.

The physical investigation does not require students to settle that theoretical question in advance. It gives them a more basic question to investigate:

### What happens to the values of a curve when the distance from a point becomes smaller and smaller?

That question belongs to calculus regardless of which formal framework is subsequently used.

## Hunting for a famous number

The third exercise takes the same approach in a different direction.

Consider the family of curves:

*y = bˣ*

At *x = 0*, every curve passes through (0,1), but different bases produce different rates of change there. For *b = 2*, the rate is less than 1. For *b = 3*, it is greater than 1. This suggests that there is a base between 2 and 3 for which the rate of change at *x = 0* is exactly 1.

The student is not told the answer. Instead, the Abacus becomes a measuring instrument. Students test different bases, examine the resulting rates, and narrow the search. They eventually narrow the search to about 2.72.

Only then do they learn that the number they have found is

*e ≈ 2.71828*

This is the purpose of “**The Hunt for the Magic Base.**” It lets students encounter *e* as the solution to a mathematical problem rather than simply as a constant that appears in a formula.

The exercise may also lead to a deeper observation. The curve with this special base has a remarkable relationship between its height and its rate of change. Students can glimpse that relationship before they encounter the formal definition of the natural exponential function.

## From the Abacus to calculus

These three investigations concern different topics, but they share a common method: start with a difference that can be measured, turn the difference into a rate, make the increment smaller, and observe how the estimate changes. These ideas form an important part of the conceptual foundation of calculus.

A conventional textbook then supplies the mathematical language needed to develop these ideas systematically. It gives students definitions, symbolic methods, general rules, algebraic techniques, and proofs. A limits-based course may formalize the process through limits. An infinitesimal approach may instead introduce infinitesimal increments and develop derivatives from them. The Abacus does not require the teacher to choose between these approaches. Its physical model comes before either formal development.

For example, a student who has repeatedly reduced an increment and watched an estimate become more precise can encounter the difference quotient *Δy/Δx* with a concrete understanding of what the quotient represents.

A student who has experimented with values increasingly close to a point can later encounter the formal treatment of limits—or an infinitesimal treatment of what happens when the increment becomes infinitesimally small.

A student who has hunted for the base whose rate of change is exactly 1 can encounter *e* as the answer to a question rather than simply as a constant to memorize.

This is the bridge between the Abacus and the textbook.

## The Abacus and formal calculus

There is a temptation, when introducing a new mathematical device, to ask whether it can replace the traditional method. That is not the claim here. The Calculus Abacus is a physical model for exploring ideas that calculus eventually expresses with greater generality and precision. It gives students experience before formalism, not experience instead of formalism.

The physical model has limitations. It has a finite number of stones and finite precision. It is excellent for helping students see patterns, make conjectures, and investigate the effect of changing an increment. It cannot replace the symbolic mathematics that gives calculus its generality, precision, and rigor.

A student who has seen a rate estimate change as the increment becomes smaller has experienced something that can later be expressed in several mathematically rigorous ways. A student who has seen values near a missing point cluster around a particular number has something concrete to which a formal treatment of limits—or an infinitesimal approach—can be connected. A student who has found *e* by measurement has encountered a mathematical object before encountering all of the theory surrounding it.

Eventually, the stones can be put away. But when the symbols appear on the page, they are no longer describing an entirely unfamiliar world. The student has already seen the mathematics taking shape.

**The physical experience comes first. The formal mathematics comes next.**
