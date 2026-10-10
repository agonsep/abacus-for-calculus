## Move "Student Activity" above "Setup and app sequence"

In the exercise *Correct the Guess*, the **Student Activity** heading will be moved so it sits directly above **Setup and app sequence**. The setup steps then read as the first part of Student Activity, and everything else stays exactly as it is.

### What changes
- The heading line "Student Activity" moves up from its current spot (just before the PREDICT paragraph) to immediately before the "Setup and app sequence" heading.
- "Setup and app sequence" keeps its smaller heading style, so it now reads as a subsection of Student Activity.
- No text is rewritten, added, or removed. The two paragraphs under Teacher Overview, the setup instructions, the PREDICT paragraph, the table, the figure, and every later section keep their current wording and order.

### Resulting order
```text
Learning Objective
Teacher Overview
  (two overview paragraphs)
Student Activity
  Setup and app sequence
  PREDICT, CONSTRUCT A LOCAL LINE, ...
```

### Technical details
- Single edit in `src/content/library/correct-the-guess.md`: delete the `## Student Activity` line (and its blank line) from its current position and insert it before `### Setup and app sequence`, keeping blank-line spacing so the Markdown still renders correctly.
- No other file is touched: the library listing, navigation, and page renderer read the entry as a whole and do not depend on heading order.
- Check in the browser that the page shows Student Activity followed by Setup and app sequence, with the overview paragraphs still under Teacher Overview, and that both tables and the figure still render.
