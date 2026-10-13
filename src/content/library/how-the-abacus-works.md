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

The right panel holds the settings and three buttons. "Fill Board" evaluates the equation across the eleven columns, sets a value for one stone, and stacks the columns with stones. Changes to the equation, midpoint, and increments take effect when Fill Board is pressed. "Find Differences" ordinarily computes the differences between neighboring columns and places the correct number of change-size stones. The change-size stones can then be dragged up into the empty space above the size curve to form a change-size curve. Alternatively, "Divide By Increment" removes the size stones and drops the change-size stones to the board floor. In ordinary, single-stack operation, their heights stay the same: it is the value of one stone, not the stone count, that is divided by the increment. Finally, the stones take on the size-stone color. They become a new size curve representing rates rather than differences. One curve is derived from another curve, carrying information from the original curve to the new curve.

Two checkboxes are visible first: "Fractional stones" and "Dual increments". "More" reveals the other refinements. "Tangent" traces a curve through the tops of the size stacks and adds a straight tangent line, initially at the midpoint. The − and + buttons move that line one column at a time, stopping at either edge; Fill Board returns it to the midpoint. "Lefthand comparison" changes which neighbor the differences are measured against in ordinary operation. "10 decimals" displays more digits in the left panel. Fractional stones, Dual Increments, and Leibniz Mode are explained below.

## Scaling and the floor

Here is the arithmetic at the heart of the machine, and it is short enough to do on paper.

Real y-values are sometimes far too large or too small to show as literal counts of stones, so the abacus scales. For a nonconstant curve, it finds the minimum and maximum of the defined y-values and assigns a value to one size-stone equal to their difference divided by the chosen maximum number of stones — often either 50 or 100. When all those values are strictly positive, the minimum becomes the board's baseline, the floor. Each column holds its value measured above that floor: the number of size stones is the y-value minus the floor, divided by the stone's value. The top line of the left panel reports the stone's worth and the floor whenever the floor is not zero; reading that line is the first act of reading any board.

If the window includes zero or negative values, the floor stays at zero instead. Positive and negative stones then represent values on opposite sides of zero; the range-based stone value is unchanged, so the chosen maximum is not a guarantee that each signed stack fits that count. A constant curve needs a different rule because its range is zero: it uses a zero floor and a stone value of 1 when the constant's magnitude fits the chosen maximum, or a larger stone value when it does not.

A worked example makes the rule concrete. Take y = (x² + x)/2 with midpoint 5, increment 1, and 55 stones. The window runs from x = 0 to x = 10, the y-values run from 0 to 55, and the value of one stone is (55 − 0) ÷ 55, which is exactly 1. The floor is 0, so it does not appear at the top of the left panel. The columns have the following number of stones: 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55. These are the triangular numbers. The change-size stones are the integers 1 through 10. A curve, its differences, and the scaling rule, all checkable with a pencil.

The floor exists for a couple of reasons. First, it spends the stones where the information is: the board commits its full height to the variation inside the window, so the picture stays sharp whether the increment is 2 or 0.01. Second, the floor keeps the counting manageable at any point along a curve using any increment: because the stone's value shrinks with the window, one increment's change is always worth a countable number of stones. Consider y = x² at midpoint 5 with increment 0.01. The eleven y-values span exactly 1.0, so one stone is worth 0.02, and the change from column to column is about five stones, easy to count. Measured from zero, the column at x = 5 alone would demand 1,250 stones, and the same change would be a fifth of one stone, invisible on any board. The floor is what lets a fifty-stone board do fine work.

Negative size values are represented by black stones, and negative change values by dark grey stones. Their signs matter when reading counts: the same rule, floor plus signed count times stone-value, still applies. One light teaching touch: before pressing Fill Board, ask students to predict the stone's value from the settings; it is a ten-second check that the scale has been understood.

## The estimate column

Each change-size stone count is the difference between a column and its neighbor, expressed in stones, and the abacus turns it into a number a student can weigh: the slope estimate ending each row of the left panel. The recipe can be done by hand: count the change-size stones, multiply by the stone's value, divide by the increment. The result estimates how fast the function is changing there, the slope of the tangent in the language students will meet later. It is the mechanical bridge between the change-curve of the first article and the rate of change the later exercises pursue.

Two facts help in reading the columns. The last column of the board has no right neighbor, so its difference is defined as zero; with "Lefthand comparison" checked, the first column takes that role instead. The two directions can also be combined: in the triangular numbers example, the reading at x = 5 is 6 from the right and 5 from the left, and their average, 5.5, is the exact slope there. Reading a point from both sides and averaging has advantages.

## Whole stones and fractional stones

Whole stones are the default because they are countable, and counting is the point. Rounding a count costs at most half a stone, apart from any display limit on very tall stacks. Find Differences in whole-stone mode compares the displayed, rounded counts, so rounding can also affect the slope estimate. "Fractional stones" avoids whole-stone rounding and draws partial stones, but the usual two-decimal count display is itself rounded. On the board where y = x³ at midpoint 5 with increment 0.5, and max stones of 50, one stone is worth 8.125, the floor is 15.625, and the column at x = 5 holds about 13.46 stones; whole mode shows 13. For most classroom work the whole stone is the better teacher; fractional stones are there when the last half stone matters. "10 decimals" reveals more digits without making a finite-difference estimate mathematically more accurate.

## Two increments: a wide view and a fine measurement

A small increment makes an ordinary board look closely at one point, but it also narrows the window. "Dual increments" separates these two jobs. The first increment still spaces the eleven columns around the midpoint. The second chooses the measuring step inside each column's pair of stacks.

Check Dual increments, enter the second increment, and press Fill Board. Each column now has a main stack at x and a narrower companion immediately to its left at x − h₂, where h₂ is the second increment. Find Differences measures main minus companion, f(x) − f(x − h₂), rather than differences between neighboring columns. Divide By Increment divides by h₂. Every pair supplies its own measurement, including the last column, and Lefthand comparison is unavailable because the pair already fixes the comparison. Fractional stones turns on automatically to keep small pair differences visible.

In this mode, the initial stone value and floor cover both members of all eleven pairs. During division, the two size stacks disappear, the change-size stones widen to fill the column, and then fall, one column at a time. The resulting slope curve is rescaled using the same scaling rules described above. Unlike ordinary promotion, this can change both the value of one stone and the stone counts. The notices before and after that adjustment are a reminder to read the new stone value before interpreting the new heights.

## An infinitesimal increment: w

The increment boxes also accept `w`, an infinitesimal step: positive and smaller than every positive real number, but not zero. Multiples such as `2w` are accepted too. The left panel can then show symbolic quantities such as `5 + 2w` rather than replacing every infinitesimal with a small decimal.

There are two useful ways to use it. With w as the first increment, the eleven columns lie infinitesimally close to the midpoint. Their common real value becomes the baseline, and the stones show the infinitesimal variation about it. Promoting those differences gives a flat row representing the derivative at that midpoint; it is not a view of the derivative across a real interval.

With a real first increment and w as the second increment in Dual Increments, the board keeps its wide window. The pair difference at each column supplies the derivative there without the ordinary finite-step error. For supported differentiable formulas, these derivative values are computed from the formula rather than estimated using a small decimal. Numerical calculation and displayed digits still have their own precision limits.

This is a limited infinitesimal calculation, not unrestricted arithmetic with every possible infinitely small or infinitely large quantity. Some formulas require a numerical fallback when w is the first increment; unsupported formulas in paired w mode can leave columns undefined. A function undefined at the midpoint, or a point without a usable derivative, cannot supply the promised infinitesimal reading. Repeated paired w calculations are supported through the second derivative; for a third round, use a numeric second increment such as 0.1.

## Taking differences again

Fill Board is a fresh start from the equation in the right panel. To investigate a derived curve, do not press it again: work with the stones already on the board.

For example, enter y = x², midpoint 5, first increment 1, and maximum 50 stones. Check Dual increments and enter 0.1 as the second increment.

1. Press Fill Board, then Find Differences, then Divide By Increment. The new curve represents [x² − (x − 0.1)²] ÷ 0.1 = 2x − 0.1. It approximates the derivative 2x over the original wide window.
2. Check Dual increments again. Companion stacks appear immediately for this derived curve; another Fill Board is not needed.
3. Press Find Differences, then Divide By Increment again. The new values are all 2, since [(2x − 0.1) − (2(x − 0.1) − 0.1)] ÷ 0.1 = 2. In this example, the second finite difference agrees exactly with the second derivative.

The equation box still shows x² throughout. A notice reminds you that the board now carries a derived curve, whose values and companions are computed from that original formula. For other functions, numeric increments generally give approximations, not exact derivatives. Using w as the second increment removes finite-step error in the supported first and second derivative rounds. In ordinary single-stack operation, repeating Find Differences and Divide By Increment uses the first increment and loses an endpoint at each promotion, because a neighbor is needed. Rechecking Dual increments instead retains the second increment and evaluates companions for the current derived curve.

## Leibniz Mode: differentials beside the curve

"Leibniz Mode" keeps the original size curve and adds a wooden shelf across the middle of the board. Change-size stones rest on that shelf, with every stack starting at the same height. The size stacks are limited to a maximum setting of 50 stones to leave room below the shelf.

In ordinary Leibniz Mode, the shelf stones represent the differential dy = f′(x)·dx, using the same stone value as the size stones. The table also shows the finite change Δy = f(x + dx) − f(x). These are not generally equal: dy uses the tangent's rate at x, while Δy measures the actual change across the interval. Their comparison makes the distinction visible without replacing the original curve. When Leibniz Mode is combined with Dual Increments, the shelf stones instead represent the main-minus-companion pair difference. Find Differences and Divide By Increment are unavailable while Leibniz Mode is on.

## Reading a completed board

Everything above condenses into a ten-second habit that prevents most misreadings: read the top line of the left panel first, then the columns.

The top line gives the two anchors, a stone's value and the floor. With them, every signed count becomes a value: floor plus count times stone-value. Without them, heights are ambiguous; two boards can look identical and describe very different quantities. Then the stone roles: size stones represent the current curve, and change-size stones represent its change. Red/orange is the default palette; Blue/Cyan and Forest/Mint are also available under More. Dark grey still marks negative change, and black marks negative size. Read the table headings as well: pairing adds companion readings, promotion changes the derivative order, and Leibniz Mode distinguishes dy from Δy.

## What the abacus does well, and the trade-offs behind its limits

The strengths have run through everything above: construction made visible, both curves in view across a whole stretch, and qualitative judgment invited before any formula. The limits are real too, and each is the price of a deliberate choice.

In ordinary operation, one increment both frames the window and measures the differences. This keeps the machine simple, but a larger increment models the true rate less faithfully where the curve bends quickly. Dual Increments separates the viewing and measuring steps; a smaller second increment improves the measurement without narrowing the window.

The smallest numeric increment is 0.001. The infinitesimal w offers a different kind of investigation beyond that numeric limit, within the supported formulas and derivative orders described above.

Whole stones round. The approximations are small, and fractional stones recover them when precision matters, at the cost of some countability.

Before division, the change-size stones show a difference, not a rate of change. With a positive measuring increment smaller than 1, that difference is smaller in magnitude than its corresponding difference quotient. Its stone count also depends on the current stone value, so height alone is not a measure of steepness. This is fidelity, not error: the abacus begins with differences. Divide By Increment turns those differences into a rate curve, and the gap between a difference and a rate of change is worth teaching. "From Differences to Rates" turns the remedy into the lesson.

The abacus shows a change-curve, never an equation for the derivative. It offers behavior a student can see and judge, and leaves the symbols for later; that is why it pairs with symbolic work rather than replacing it.

Finally, Fill Board scales the curve to its window, and Dual Increments promotion rescales the derived curve. Ordinary promotion instead keeps the change-stack heights and changes their stone value. In every case, height alone never conveys absolute size. The reading habit above is the corrective.

## What the mechanics prepare

A teacher who has walked this far can read any board the abacus produces: the window, the scale, the floor, the stones, the estimates. That literacy lets the rest of the curriculum stay conceptual: when students read patterns of change, estimate a rate at a point, or ask when an estimate deserves their trust, they will be handling numbers they understand. The same board will later carry the historical material on estimation and, further on, an article on integration and the Fundamental Theorem of Calculus, where the columns accumulate instead of differ.

Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026.
