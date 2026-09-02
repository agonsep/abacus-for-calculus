---
slug: how-fast-right-here
title: "How Fast, Right Here?"
summary: "A visual, inquiry-based activity in which students narrow their attention to a single point on a curve and estimate how fast it is changing there."
section: exercise
parent: about-the-calculus-abacus
order: 2
---

*Exercise for About the Calculus Abacus*

A visual, inquiry-based activity in which students narrow their attention to a single point on a curve and estimate how fast it is changing there, discovering that a rate of change can be approached by looking at ever-closer neighbors. Written for teachers; no derivative rules or formal notation required.

## Short Introduction

The first exercise read the pattern of change across a whole stretch. This activity keeps the same idea but narrows attention to a single point and asks a tighter question: how fast is the curve changing right here? The move is a zooming in, not a fresh topic.

## Learning Objectives

Students will focus on a single point of a curve and use the values around it to estimate how fast the curve is changing there, then refine the estimate with smaller neighboring steps and watch it settle toward a value that describes the local behavior. The aim is an intuition reached by observation, that the rate of change at a point can be approached rather than handed over, and is not a mysterious quantity. This builds the mental image students will later attach to formal ideas, without any of the vocabulary yet.

## Teacher Overview

This is the second of the Calculus Abacus's two leading uses related to differentiation: estimating how fast a curve is changing at a specific location. It is meant to follow Exercise 1 closely; the two activities fit together in one class period. Where the activity in Exercise 1 took in the whole change-curve across an interval and asked what pattern it showed, this activity keeps the same idea but narrows attention to a single point. Students should feel this as a zooming in, not a fresh topic.

The distinction is worth making explicit for the class. Exercise 1 was about patterns across an interval; Exercise 2 is about local behavior at a point. Exercise 1 asked what the change-curve looks like; Exercise 2 asks how quickly the curve is changing in one place.

We use y = x³ for this investigation. Its values are easy to compute by hand, its steepness plainly differs from place to place, gentle near the middle and steeper as it climbs, and its estimates improve honestly as the step shrinks, which is the behavior this activity exists to show. A teacher who wants an even more dramatic contrast for a second pass might use y = sin(x), which races on its slopes and very nearly stops at its crest; the variation there is striking, and the same activity carries over without change.

Give students a starting point rather than a free choice of window: midpoint 3, increment 0.5, max stones 100 is a moderate opening with visible room to improve, and starting moderate matters, since a student who begins at a very small increment leaves the estimates almost no room to settle. After the first pass, the exploring is theirs. The activity deliberately avoids derivative and tangent language; the intention is for students to meet the idea before they meet its name.

## Student Activity

Set up the Calculus Abacus to show y = x³ with midpoint 3, increment 0.5, and max stones 100. Press Fill Board, then Find Differences. In Exercise 1 you built a change-curve across a whole stretch and read the pattern it made. This time, rather than taking in the whole stretch, you will narrow your attention to a single point on the curve and ask: how fast is the curve changing right there?

**PREDICT:** Look at the curve close to x = 3, the point you are about to study, and only there. From the picture alone, make a rough guess: when x increases by 1 near this point, about how much does y rise? Write your guess down before measuring anything; the steps that follow will test it.

**INVESTIGATE:** Choose one point to study; x = 3 is a good first choice. Look at the values close to it on either side, its nearby neighbors. Those nearby values carry information about what the curve is doing right around that spot.

**ESTIMATE:** Using the change between your point and a neighbor one step away, the same kind of neighboring difference that made up your change-curve in Exercise 1, form a first estimate of how fast the curve is changing there. This reading has a natural meaning: it is the average change across that step, the amount y changed divided by the width of the step. Is it changing a little across that step, or a lot? Treat this as a rough first reading of the local behavior, not a final answer, and set it beside your prediction.

**REFINE:** Now bring the neighbors in closer. Take a smaller step around the same point (using a smaller increment) and estimate again, then smaller still. Other intervals can be 0.25, 0.1, 0.05. Each time you are asking the same question over a narrower stretch around the point.

**COMPARE:** Line up your estimates from the widest step to the narrowest. Do they jump around, or do they seem to settle toward a particular value as the steps shrink? Which estimate feels most like a description of what is happening right at the point, rather than nearby?

**INTERPRET:** In ordinary language, describe how fast the curve is changing at your chosen point and how sure you are. Then say what happened to your estimates as the steps grew smaller, and why a narrower step might give a truer picture of a single location. Hold on to the picture this builds: a single point, the neighboring values gathered close around it, and an estimate that grows more informative as those neighbors move nearer.

## Reflection Questions

1. You estimated at the same point several times with smaller and smaller steps. Why might a smaller step give a better picture of what is happening right at the point, rather than nearby?

2. At midpoint 0 on this curve, the estimates quickly settle toward 0. Does a rate of zero mean nothing is happening there? What is the curve doing at that point?

3. A wide step blends together what the curve does over a whole stretch, while a narrow step focuses on one spot. In your own words, what is the difference between the average change across a stretch and the change right at a point?

4. Did your estimates seem to be heading somewhere as the steps got smaller? Describe that sense of closing in on a value without ever actually landing on it.

5. A single point on its own shows no change at all, since change needs at least two values to compare. So why do the values right next to a point tell us so much about what is happening there?

## Expected Student Discoveries

* A curve can change at different speeds in different places, so "how fast" is a local question, not a single fact about the whole curve.

* The values immediately around a point carry the information about what is happening there.

* A rate of change at a point can be estimated and then improved.

* Smaller neighboring steps produce estimates that better represent a single location; a wide step blends in behavior from farther along the curve, so its reading is less accurate for the point, and students begin to describe the narrow step as the truer one for that spot.

* The estimates appear to approach a stable value as the steps shrink, even though no step lands exactly on the point. Some notice they can never use a step of nothing, because a single point shows no change, and yet the estimates still seem to approach something. That tension is productive; bring it into the open and let the class sit with it rather than smoothing it over.

* Students reach for everyday comparisons, some in motion words, faster here and slower there, and some in steepness words, steeper here and flatter there; both languages carry the same intuition, and both will later attach to the same formal idea.

## Common Misconceptions

* **Believing one estimate is exact.** A single estimate can feel like the answer. Each one is an approximation, and the purpose of refining is to watch the estimates improve, not to arrive at a final figure.

* **Confusing average change with local change.** An estimate taken over a wide step is the average change across that whole stretch, not what is happening right at the point. The two only come together as the step shrinks.

## Teacher Notes

**Educational purpose.** This is the students' first felt encounter with the rate of change at a single point, reached by narrowing their attention and estimating, well before any formal definition. It is designed to follow Exercise 1 so the move from an interval to a point feels like a natural tightening of focus.

**Conceptual significance.** The central realization is that the rate of change at a point is not hidden or simply given; it emerges from looking at nearby values and watching the estimates improve. Because students uncover it themselves, it carries a conviction that a stated rule does not.

**Why y = x³ and not y = x².** The parabola remains the right curve for Exercise 1, but it has a pesky property here: at certain settings its whole-stone estimates land exactly on the true value at once (midpoint 2 with increment 0.1 reads 4, midpoint 3 reads 6), which teaches settling poorly. The cubic improves honestly; at midpoint 3 the estimates run approximately 33.25, 28.56, 27.25, 27.06 as the increment falls from 0.5 to 0.05, settling toward 27 (estimated with increment 0.01), a ladder worth keeping in your pocket for spotting a mistyped setting at a glance.

**Why estimation matters.** By estimating and refining rather than applying a formula, students experience the idea of something approached. That sense of approaching a value, of getting closer without quite arriving, is the intuition underneath everything that comes later, and it is far easier to build now than to install afterward.

**Why smaller steps improve local estimates.** A wide neighborhood folds in behavior from farther along the curve. On y = x³ near x = 3 the curve keeps steepening, so a wide step takes in that steeper territory and reads high, and the estimates settle downward toward the point's value as the step narrows; students can watch this in their own ladder. Curves that change character more dramatically, such as y = sin(x), sharpen the same lesson on a second pass. Students should feel this through the activity rather than be told it as a rule.

**How it prepares students for later work.** The settling of the estimates as the steps shrink is the intuition the derivative will later make exact. The shrinking neighborhood is the seed of the limit. The wish to shrink the step all the way to nothing is the reach toward an infinitely small step. None of these needs to be taught here. The activity simply builds the picture, so that when the formal ideas arrive they have something concrete and already understood to name.
