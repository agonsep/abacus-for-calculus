export type LibrarySection = "article" | "exercise";

export interface LibraryEntry {
  slug: string;
  title: string;
  summary: string;
  section: LibrarySection;
  order: number;
  /** For exercises: slug of the article these exercises belong to. */
  parent?: string;
  body: string;
}

export interface ArticleGroup {
  article: LibraryEntry;
  exercises: LibraryEntry[];
}

/** Minimal YAML-ish front matter parser: `key: value` pairs between `---` fences. */
function parseFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const normalized = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalized);
  if (!match) return { data: {}, body: normalized.trim() };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) data[key] = value;
  }

  return { data, body: normalized.slice(match[0].length).trim() };
}

const modules = import.meta.glob("./*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function byOrderThenTitle(a: LibraryEntry, b: LibraryEntry): number {
  if (a.order !== b.order) return a.order - b.order;
  return a.title.localeCompare(b.title);
}

const allEntries: LibraryEntry[] = Object.entries(modules).map(([path, raw]) => {
  const { data, body } = parseFrontMatter(raw);
  const fileSlug = path.replace(/^\.\//, "").replace(/\.md$/, "");
  return {
    slug: data.slug || fileSlug,
    title: data.title || fileSlug,
    summary: data.summary || "",
    section: (data.section === "exercise" ? "exercise" : "article") as LibrarySection,
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : 999,
    parent: data.parent || undefined,
    body,
  };
});

export const articles = allEntries
  .filter((e) => e.section === "article")
  .sort(byOrderThenTitle);
export const exercises = allEntries
  .filter((e) => e.section === "exercise")
  .sort(byOrderThenTitle);

/** Exercises grouped under their parent article, in article order. */
export const articleGroups: ArticleGroup[] = articles.map((article) => ({
  article,
  exercises: exercises.filter((e) => e.parent === article.slug),
}));

/** Exercises whose parent slug matches no article (kept visible, not dropped). */
export const standaloneExercises = exercises.filter(
  (e) => !e.parent || !articles.some((a) => a.slug === e.parent),
);

/** Reading sequence: each article followed by its exercises, then standalone exercises. */
export const libraryEntries: LibraryEntry[] = [
  ...articleGroups.flatMap((g) => [g.article, ...g.exercises]),
  ...standaloneExercises,
];

export function getLibraryEntry(slug: string): LibraryEntry | undefined {
  return libraryEntries.find((e) => e.slug === slug);
}

export function getAdjacentEntries(slug: string): {
  previous?: LibraryEntry;
  next?: LibraryEntry;
} {
  const index = libraryEntries.findIndex((e) => e.slug === slug);
  if (index === -1) return {};
  return {
    previous: libraryEntries[index - 1],
    next: libraryEntries[index + 1],
  };
}
