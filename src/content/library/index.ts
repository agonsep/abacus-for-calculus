export type LibrarySection = "article" | "exercise";

export interface LibraryEntry {
  slug: string;
  title: string;
  summary: string;
  section: LibrarySection;
  order: number;
  body: string;
}

/** Minimal YAML-ish front matter parser: `key: value` pairs between `---` fences. */
function parseFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
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

export const libraryEntries: LibraryEntry[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontMatter(raw);
    const fileSlug = path.replace(/^\.\//, "").replace(/\.md$/, "");
    return {
      slug: data.slug || fileSlug,
      title: data.title || fileSlug,
      summary: data.summary || "",
      section: (data.section === "exercise" ? "exercise" : "article") as LibrarySection,
      order: Number.isFinite(Number(data.order)) ? Number(data.order) : 999,
      body,
    };
  })
  .sort((a, b) => {
    if (a.section !== b.section) return a.section === "article" ? -1 : 1;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

export const articles = libraryEntries.filter((e) => e.section === "article");
export const exercises = libraryEntries.filter((e) => e.section === "exercise");

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
