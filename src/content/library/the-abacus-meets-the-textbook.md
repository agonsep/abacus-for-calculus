---
title: "The Abacus Meets the Textbook"
slug: the-abacus-meets-the-textbook
summary: "Classic textbook problems—the falling ball, limits without arriving, a falling curve, and the hunt for a special base—worked on the board your students already know."
section: article
order: 3
acknowledgement: "Written for the Calculus Abacus Project by Shah Nawal, with AI assistance, 2026."
---

*An opening calculus problem, worked on the board your students already know.*

The first two articles in this series introduced a way of building a calculus of differences by hand and explained the machine that makes the building possible. This one changes direction. It introduces no new mathematics at all. Instead it takes the skills those articles established, reading a window, assigning a value to (pricing) a stone, forming a change-curve, weighing an estimate, and points them at problems a standard first course in calculus actually considers. The examples that follow are mostly drawn from the opening chapters of James Stewart's widely used *Single Variable Calculus*. They were chosen for a reason a teacher will recognize immediately: they are the problems your students will meet in the first two weeks of a course, whatever textbook they use. The claim of this article is modest and specific. The Calculus Abacus is not an alternative to a standard course. It prepares the student for a standard course, using a physical model. The point is not that the abacus solves textbook problems more efficiently. It gives students a physical way to experience the ideas those problems are about before they encounter them in symbolic form.

## You have already done the textbook's early example

A typical calculus text opens with the tangent problem: take a parabola, fix a point on it, and compute the slopes of secant lines through that point and a neighbor, bringing the neighbor closer and closer. If you have run the first two exercises of this series with your class, your students are already familiar with the shape of the curve y = x². They are also familiar with narrowing an increment while estimating the slope of a tangent, having done this for the curve y = x³. Students chose a point on y = x³, estimated how fast the curve was changing there from a neighboring value, then narrowed the step and watched the estimates settle. The Stewart textbook presents it as a table of secant slopes; the abacus presents it as stacks of stones; the underlying mathematics is the same. Which means your class does not start this article at the beginning. They start it already fluent in the textbook's first move. The textbook presents a velocity problem immediately after the tangent problem. The second example drops a ball.

## The falling ball

A ball is dropped from a tower 450 meters tall. Galileo's law says the distance fallen after x seconds is y = 4.9x² meters, so the ball reaches the ground at about x = 9.58 seconds. (One can assign this as a further exercise.) The textbook's question is the one that summons calculus into existence: how fast is the ball moving at the instant it lands?

Average speed over an interval is easy, distance traveled divided by time. Speed at an instant is the puzzle, because an instant has no duration by which to divide. The textbook's alternative approach is to sneak up on it with average speeds over shrinking intervals, and the abacus makes that hunt physical. Set y = 4.9*x^2, midpoint 9.58, increment 0.5, 50 stones, and press "Fill Board", then click on "Find Differences". One size-stone prices at about 9.39 meters, and the floor reads about 245.62: not zero, and rightly so, because 245.62 meters is about the distance already fallen when the window opens at x = 7.08. Give the class a moment with that number; a floor with physical meaning is worth ten definitions. The board shows the final seconds of the modeled fall, size stone columns climbing to full height, change-size stones recording how far the ball dropped in each half second.

Now read the Slope estimate column with fractional stones on. The row beside x = 9.58 reads 96.33: the average speed over the next half second. The row one step to the left, x = 9.08, reads 91.43: the average speed over the half second before landing. Neither is the answer; the truth is trapped between them. Averages are easy and instants are hard, and the opening chapter of calculus is the art of getting the second from the first. Refill the board at increments 0.1, 0.01, and 0.001, and watch the trap tighten.

With an increment of 0.001, the estimated speed at landing is 93.88 meters per second, and the units are doing real work here: this is not an abstract slope but a speed a student can feel, about 338 kilometers per hour.

The textbook asks the same question at x = 5 seconds; the same board, refilled at midpoint 5, hands back 49 meters per second the same way. Finding the velocity requires shrinking intervals around a point the ball actually passes through. A textbook might also ask about a point the ball never reaches at all (unless there is a hole in the ground).

## Limits that approach without arriving

Every early calculus course meets the curve y = sin(x)/x and the claim that it approaches 1 as x approaches 0. The delicate part is the word approaches: at x = 0 the value of y does not exist, since nothing may be divided by zero. Input the curve with the midpoint = 0, the increment = 0.5, and a 50 stone maximum. Here the abacus does something quietly significant. It marks the column for x = 0 as undefined. A limit is about the neighborhood, not the point.

So the window must stop short. Reset the midpoint to 0.06 with the increment to 0.01. Keep the maximum number of stones at 50. Check the box for fractional stones. The eleven columns run from x = 0.01 to x = 0.11, marching toward zero and halting one step before it. The values are extraordinarily close together, climbing from just below 0.998 almost to 1, and this is where the reading habits of the second article earn their keep: the whole drama lives in the third and fourth decimals, the floor and the size-stone carry everything, and the abacus's high-precision display will show a class every digit of the climb. Read from right to left, toward zero, the values rise steadily toward 1 and never touch it. A mirrored window on the negative side (midpoint = −0.06) tells the same story from the left flank.

A second classic makes the point structurally. The curve y = (x − 1)/(x² − 1) has a hole at x = 1: top and bottom both vanish there. The abacus indicates this when one inputs the curve with a midpoint of 1 and an increment of 0.25 (and a maximum of 50 stones).

Set midpoint 1.005 with increment 0.01 and something elegant happens: the eleven columns fall at increments of 0.01 around the midpoint, from 0.955 to 1.055, straddling x = 1 without any column landing on it. The board looks perfectly continuous. The y value on the left flank reads 0.50125, the y value on the right flank 0.49875, and both sides are closing on one half, the limit, at a point for which there is no y value. A student who asks why no column sits at x = 1 has asked exactly the right question, and the honest answer, that the board would crash there, is the definition of a limit wearing work clothes. The point is missing; the destination is not.

Every curve examined closely so far has climbed. The textbook's next problems do not.

## A curve that falls

Set y = 1/x with midpoint 2, increment 0.25, 50 maximum stones, and fractional stones turned off. Find the differences. The change stones come out dark grey, because every difference is negative: this curve loses height at every step. The estimate beside x = 2 reads −0.25, and the sign is the lesson. A rate of change has a direction, and the board wears it as a color. Students who built a color glossary in the second article now see it doing arithmetic in a real problem, and the true slope of this curve at x = 2 happens to be exactly −1/4, so the whole-stone board has landed on the textbook's answer to the digit.

These curves all came from the course's early chapters. One more question from those chapters deserves a hunt of its own.

## Is there a base whose slope is exactly 1?

Here is a measurement your class can make in two minutes. Set y = 2^x, midpoint 0, increment 0.1, 50 stone maximum, and fractional stones turned on. Read the rate of change at x = 0 from both flanks: the estimates are 0.67 and 0.72; their average is 0.695. Refill with y = 3^x and the same reading gives 1.1. Sit with that for a moment. The slope of 2^x at zero is less than 1; the slope of 3^x at zero is more than 1. So somewhere between 2 and 3 there must be a base whose curve has a slope of exactly 1 at x = 0, a curve that begins by growing at precisely its own height. Which base? This article will not say. Some numbers are announced; this one deserves to be cornered. The third exercise for this article turns the question into the hunt, and the answer is worth arriving at rather than being told.
