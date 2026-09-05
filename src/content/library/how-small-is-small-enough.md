---
slug: how-small-is-small-enough
title: "How Small Is Small Enough?"
summary: "A visual, inquiry-based activity in which students meet a smooth curve that impersonates a straight line at every ordinary scale, and discover that agreement among many readings is not the same as truth."
section: exercise
parent: about-the-calculus-abacus
order: 3
---

*A visual, inquiry-based activity in which students meet a smooth curve that impersonates a straight line at every ordinary scale, and discover that agreement among many readings is not the same as truth. Written for teachers; no limit or derivative notation required.*

## Short Introduction

In the previous exercise, smaller increments sharpened an estimate, and it worked well. It is natural to conclude that smaller is always better and that agreeing readings settle a question. This activity puts both conclusions to the test with a curve that hides a surprise: at one of its points, five increments in a row give the same tidy answer, and every one of them is wrong.

## Learning Objectives

Students will estimate the steepness of a curve at a point where readings across a wide range of increments agree on one value, discover by pressing smaller that the agreed value was false, and press on until the truth appears. The aim is not to unsettle the sound habit built in the previous exercise, but to complete it: smaller genuinely is better, provided one goes small enough, and the honest question, the one this activity is named for, is: How small is small enough? That realization is an honest first hint of why calculus eventually needs a more careful account of local behavior.

## Teacher Overview

Until now the series has leaned on a reasonable belief. The first exercise read the patterns a change-curve reveals, the next exercise estimated local behavior, and along the way smaller intervals gave better information. This activity examines that belief and finds it incomplete in a precise way. The focus moves from estimation itself to a deeper question: how do we know that the evidence we have gathered is fine enough to reflect what is happening at a point?

The curve is `y = x + 2^(-10000*(x+0.01)^2)/34`, a single smooth curve with no breaks, no corners, and no misbehaving point anywhere. Away from the middle, that is, away from x = 0, it is indistinguishable from the line y = x. Near x = 0 it carries a narrow bump, and on the bump's shoulder the curve falls steeply even though every coarse sampling of the curve reads like the straight line with an opposite slope. The contrast between what coarse readings report and what the curve is actually doing there is the heart of the lesson, and the activity is arranged so the surprise emerges from the readings students take, not from this overview. The full account, for your own reference, is set out in the Teacher Notes; you may prefer to read it after working through the activity as your students will.

The investigation runs with fractional stones off; the disguise and the plunge both show plainly in whole stones. Left-hand and right-hand readings from the two flanking rows provide an early-warning: at the moment the increment reading first crosses into honest territory, the two flanks disagree before they agree, and that disagreement alerts the students to inquire further. The students discover a smaller increment which can be trusted.

### Student Activity

Set the Calculus Abacus to show `y = x + 2^(-10000*(x+0.01)^2)/34`, with max stones equal to 50 and fractional stones turned off. The strange-looking formula is the point: this curve wears a disguise, and your job is to take it off.

**SURVEY:** Start far from the middle: midpoint 3, increment 0.5. Fill the board, press Find Differences, and read the estimate for x = 3. Try 0.25 and 0.1 as well. The readings agree, and here they are also right: away from the middle this curve genuinely climbs like the line y = x.

**MOVE IN:** Now set the midpoint to 0 and repeat with increments 500, 50, 5, 1, and 0.5, refilling and pressing Find Differences each time. Note each reading for each increment. You will find the same answer every time, five readings in perfect agreement across more than three orders of magnitude, and nothing on the board suggesting anything is wrong.

**PRESS SMALLER:** Continue the same ladder downward, refilling and pressing Find Differences each time: increment 0.1, then 0.01, then 0.001. At 0.1 the two flanking rows begin to split apart, with one estimating a value greater than 1 and another estimating a value less than 1. At 0.01 the shape of the curve looks very different. Read the estimates in the vicinity of the midpoint and record them. At 0.001 the curve looks different again. The estimates for both flanks are strongly negative. Somewhere in this descent, the disguise came off.

**INTERPRET:** In ordinary language, say what the five agreeing readings at the start actually proved, and what they did not. Then answer the question in this activity's title, for this curve at this point: how small was small enough, and how did you know when you had arrived?

## Reflection Questions

1. At x = 0 you collected five readings across a huge range of increments, all in perfect agreement, and all wrong. What does agreement among readings actually establish, and what does it fail to establish?
2. The first sign of trouble was not a new value but a disagreement: the two flanking readings split apart before either was believable. Why is a sudden disagreement between the two sides a more useful warning than any single reading could be?
3. In the previous exercise, every smaller increment improved the estimate from the very start. Here, the first several shrinks changed nothing at all, and then everything changed at once. What was different about this curve, in ordinary language?
4. This curve is perfectly smooth everywhere; nothing is broken at x = 0. So where, exactly, was the error living: in the curve, in the abacus, or in the sampling? Defend your answer.
5. Suppose a classmate insists the curve has steepness 1 at x = 0 and shows you a tidy run of readings at increments 500, 50, 5, 1, and 0.5 that seem to prove it. How would you respond, and what evidence would you ask for? Mathematicians eventually felt the same discomfort; from what you saw here, why might they have decided that shrink-and-look reasoning needed to be made more precise?

## Expected Student Discoveries

- Readings can agree with one another across many increments while disagreeing with the truth: consistency is a property of the sampling, not a certificate of correctness.
- At any granularity of about a half or coarser, this curve is indistinguishable from the straight line y = x; the disguise is complete, not approximate.
- The first crack in the disguise is the two flanking readings splitting apart; students begin to treat flank disagreement as an instrument rather than a nuisance.
- Pressed far enough, the familiar behavior from the previous exercise returns: at the finest increment the two flanks agree on a value near -1.03, so shrinking does work here, once it is fine enough.
- The most unsettling discovery, and the one worth naming aloud: had students stopped at increment 0.5, nothing in their evidence would have told them to keep going.

## Common Misconceptions

- **Believing that agreeing readings must be correct readings.** This is the central misconception the activity exists to break. Agreement among readings that are all too coarse to see the feature is agreement among the equally blind.
- **Concluding that the curve is broken or spiky at the deceptive point.** It is smooth everywhere, with no corner and no misbehaving point; the failure lives entirely in sampling that is too coarse for the feature it is trying to see.
- **Expecting each smaller increment to improve the reading immediately.** The descent passes through a turbulent zone first, where the flanks disagree before they agree; the path from deception to truth is not monotone, and students should appreciate the storm before the calm.
- **Taking the lesson to be that shrinking cannot be trusted.** The opposite is true: shrinking works, pressed far enough. The lesson is that coarse agreement can impersonate truth, and that the readings that earn trust are the ones that hold steady under further shrinking and agree from both sides.

## Teacher Notes

The full account. The formula adds a narrow bump to the line y = x. The departure from y = x begins near x = -0.04 and runs to around x = 0.02; there is no exact centering, and the curve's peak sits near x = -0.015. On the right-hand side of that peak the curve plunges. At x = 0, the true steepness is about -1.0387, while every increment from 500 down to 0.5 reads exactly 1, because coarse windows scale the bump out of visibility entirely. The sequence of estimates at midpoint 0, with whole stones, is worth keeping in your pocket: increments 5, 1, and 0.5 all read 1.00; at increment 0.1 the flanks read 1.15 and 0.85; at 0.01 they read -0.47 and -0.29; at 0.001 they read -1.03 and -1.03. For your own checking at any midpoint, entering the infinitesimal increment `w` reads the exact slope directly.

**Why this curve.** Students who have learned to ask for agreement across readings, which is the right instinct, meet a case where agreement is exactly what fools them, and the repair is not more agreement but finer resolution. That is the honest groundwork for the question calculus eventually answers with care: what it should mean, precisely, for estimates to settle, and how close is close enough. When students later meet the formal account of limits, the experience of pressing past a false consensus to a settled, two-sided answer is the picture that account will make exact.

**Classroom logistics.** One class period. Whole stones keep the readings friendly.
