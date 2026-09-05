---
title: "How the Abacus Works: Setup and Mechanics"
tocTitle: "How the Abacus Works"
slug: how-the-abacus-works
summary: What every object and number on the board means, and why the machine was built this way.
section: article
order: 2
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

The first article argued that students understand change better when they build it by hand before they meet it as a formula. This article is about the building itself: how to set up the Calculus Abacus, physical or virtual, and what is happening underneath, so that a teacher can read every stone and number on a completed board with confidence. A student who has reproduced the board's arithmetic herself is reading mathematics; a student who has not is reading the output of a black box.

## A window onto the curve

Three settings frame every board: an equation, a midpoint, and an increment. Together they open a window onto the curve. The midpoint says where you are looking. The increment says how wide the window is: a large increment takes in a broad sweep of the function, while a small one closes in tightly around the midpoint. The abacus then shows eleven columns, centered on the midpoint and spaced one increment apart.

Why eleven columns rather than two or three? Because the point of the tool is not just a single value but the shape of things: the size-curve across a stretch, and above it the change-curve built from its differences. Two columns give one difference but no shape; eleven give a picture.

## Building a board by hand

Hands-on construction comes first when feasible.

Where a physical board and stones are available, the student builds the board directly and prepares a paper strip for its base. The strip carries labels for the eleven columns, plus the equation, the value of one size-stone, the midpoint, and the increment. Working out those numbers and placing the stones is a whole lesson in itself.

Many classrooms will not have physical boards, and nothing is lost. The virtual abacus simulates the same construction in a different medium. Clicking on "Show panels" opens two panels. The left panel shows a table with five columns of numbers: the x value, the number of size stones, the y value, the number of change-size stones, and a slope estimate. A student can create her own table — using pen and paper perhaps — writing numbers for each row and column by hand before opening the left panel. After performing her own calculations, she can check her numbers against the numbers in the left panel. Once a table has been created, the student can draw her own image of an abacus with the appropriate number of stones in each column. It is recommended one use a manageable maximum number of stones in each column. A maximum of 30 to 55 stones for a physical abacus is manageable. In either medium, working out the scaling and determining the number of stones yourself helps form understanding: Hands-On Construction Before Formulas in practice.

## Letting the software do it

Once one board has been built by hand, the software's job is clear: the same work, faster, so many curves can be explored in the time it took to construct one curve.

The right panel holds the settings and three buttons. "Fill Board" evaluates the equation across the eleven columns, sets a value for one stone, and stacks the columns with stones. "Find Differences" computes the differences between neighboring columns and places the correct number of change-size stones. The change-size stones can then be dragged up into the empty space above the size curve to form a change-size curve. Alternatively, one can click on "Divide By Increment" to see an animation. In the animation, the size stones disappear; the change-size stones drop to the bottom of the board, then the number of change-size stones is adjusted. The number of change-size stones in each column is divided by the increment. Finally, the stones are recolored. They become a new sequence of size stones. One curve is derived from another curve, carrying information from the original curve to the new curve.

The four checkboxes feature refinements. "Leibniz Mode" allows one to see the derived curve without division by the increment. "Fractional stones" trades whole, countable stones for exact scaled values; "Midpoint Tangent" traces a line through the orange column tops, making the size-curve's shape easier to see, and adds a tangent line to the midpoint. "Lefthand comparison" changes which neighbor the differences are measured against. "10 decimals" expands the left panel to show values to 10 decimal places.

## Scaling and the floor

Here is the arithmetic at the heart of the machine, and it is short enough to do on paper.

Real y-values are sometimes far too large or too small to show as literal counts of stones, so the abacus scales. It finds the minimum and maximum of the eleven y-values and assigns a value to one size-stone equal to the difference divided by the maximum number of stones — often either 50 or 100. The minimum becomes the board's baseline, the floor, and each column holds its value measured above it: the number of size stones in each column is the y-value minus the floor, divided by the stone's value. The top line of the left panel reports both numbers, the stone's worth and the floor whenever the floor is not zero; reading that line is the first act of reading any board.

A worked example makes the rule concrete. Take y = (x² + x)/2 with midpoint 5, increment 1, and 55 stones. The window runs from x = 0 to x = 10, the y-values run from 0 to 55, and the value of one stone is (55 − 0) ÷ 55, which is exactly 1. The floor is 0, so it does not appear at the top of the left panel. The columns have the following number of stones: 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55. These are the triangular numbers. The change-size stones are the integers 1 through 10. A curve, its differences, and the scaling rule, all checkable with a pencil.

The floor exists for a couple of reasons. First, it spends the stones where the information is: the board commits its full height to the variation inside the window, so the picture stays sharp whether the increment is 2 or 0.01. Second, the floor keeps the counting manageable at any point along a curve using any increment: because the stone's value shrinks with the window, one increment's change is always worth a countable number of stones. Consider y = x² at midpoint 5 with increment 0.01. The eleven y-values span exactly 1.0, so one stone is worth 0.02, and the change from column to column is about five stones, easy to count. Measured from zero, the column at x = 5 alone would demand 1,250 stones, and the same change would be a fifth of one stone, invisible on any board. The floor is what lets a fifty-stone board do fine work.

When a curve dips below zero, nothing special happens: the floor is simply negative, and the same reading rule applies. Negative change values appear as dark grey stones in place of red; black stones mark negative size values where they occur, as when stones are placed below zero by hand. One light teaching touch: before pressing Fill Board, ask students to predict the stone's value from the settings; it is a ten-second check that the scale has been understood.

## The estimate column

Each change-size stone count is the difference between a column and its neighbor, expressed in stones, and the abacus turns it into a number a student can weigh: the slope estimate ending each row of the left panel. The recipe can be done by hand: count the change-size stones, multiply by the stone's value, divide by the increment. The result estimates how fast the function is changing there, the slope of the tangent in the language students will meet later. It is the mechanical bridge between the change-curve of the first article and the rate of change the later exercises pursue.

Two facts help in reading the columns. The last column of the board has no right neighbor, so its difference is defined as zero; with "Lefthand comparison" checked, the first column takes that role instead. The two directions can also be combined: in the triangular numbers example, the reading at x = 5 is 6 from the right and 5 from the left, and their average, 5.5, is the exact slope there. Reading a point from both sides and averaging has advantages.

## Whole stones and fractional stones

Whole stones are the default because they are countable, and counting is the point. The cost of rounding is at most half a stone in any column. The Fractional stones checkbox recovers what rounding hides, showing exact values to two decimals. On the board where y = x³ at midpoint 5 with increment 0.5, and max stones of 50, one stone is worth 8.125, the floor is 15.625, and the column at x = 5 holds 13.46 stones; whole mode shows 13. For most classroom work the whole stone is the better teacher; fractional stones are there when the last half stone matters.

## Reading a completed board

Everything above condenses into a ten-second habit that prevents most misreadings: read the top line of the left panel first, then the columns.

The top line gives the two anchors, a stone's value and the floor. With them, every height becomes a value: floor plus number of stones times stone-value. Without them, heights are ambiguous, because the board rescales to every window; two boards can look identical and describe very different quantities. Then the colors: red stones are the size-curve, orange stones are its change, dark grey marks negative change, black marks negative size where it occurs. The left panel's final column is the local slope estimate.

## What the abacus does well, and the trade-offs behind its limits

The strengths have run through everything above: construction made visible, both curves in view across a whole stretch, and qualitative judgment invited before any formula. The limits are real too, and each is the price of a deliberate choice.

One increment serves all eleven columns. This keeps the machine simple and gives students one consistent lens on the window, but no single increment suits every point equally, so at larger increments the change-curve models the true rate less faithfully where the curve bends quickly.

The smallest increment is 0.001, fine enough for every investigation in this curriculum, though a curious student will eventually ask what lies beyond it.

Whole stones round. The approximations are small, and fractional stones recover them when precision matters, at the cost of some countability.

The change-curve reads low. Red stones show how much y changed from one column to the next, the difference, not the rate of change. Whenever the increment is smaller than 1, the difference is smaller than the rate of change, so the red curve sits lower than the steepness it describes and can look too flat. This is fidelity, not error: the abacus is an abacus for differences. But the gap between a difference and a rate of change is worth teaching, and Exercise C turns the remedy into the lesson.

The abacus shows a change-curve, never an equation for the derivative. It offers behavior a student can see and judge, and leaves the symbols for later; that is why it pairs with symbolic work rather than replacing it.

Finally, the board always rescales to its window: a sharp picture at any zoom, at the cost that height alone never conveys absolute size. The reading habit above is the corrective.

## What the mechanics prepare

A teacher who has walked this far can read any board the abacus produces: the window, the scale, the floor, the stones, the estimates. That literacy lets the rest of the curriculum stay conceptual: when students read patterns of change, estimate a rate at a point, or ask when an estimate deserves their trust, they will be handling numbers they understand. The same board will later carry the historical material on estimation and, further on, an article on integration and the Fundamental Theorem of Calculus, where the columns accumulate instead of differ.

Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026.
