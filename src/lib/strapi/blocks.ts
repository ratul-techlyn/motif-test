import type { Block, InlineNode, ListNode } from "./types";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function inlineText(nodes: InlineNode[] = []): string {
  return nodes.map((n) => (n.type === "link" ? inlineText(n.children) : n.text)).join("");
}

function listText(list: ListNode): string {
  return list.children
    .map((c) => (c.type === "list" ? listText(c) : inlineText(c.children)))
    .join(" ");
}

export function blocksToText(blocks: Block[] = []): string {
  return blocks
    .map((b) => (b.type === "list" ? listText(b) : b.type === "image" ? "" : inlineText(b.children)))
    .join(" ");
}

export function readingMinutes(blocks: Block[] = []): number {
  const words = blocksToText(blocks).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export type TocItem = { id: string; text: string; level: number };

// Unique ids for h2/h3 headings; BlocksRenderer uses the same function so anchors match
export function headingIds(blocks: Block[] = []): Map<number, string> {
  const ids = new Map<number, string>();
  const used = new Map<string, number>();
  blocks.forEach((b, i) => {
    if (b.type !== "heading") return;
    const base = slugify(inlineText(b.children)) || `section-${i}`;
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    ids.set(i, n ? `${base}-${n}` : base);
  });
  return ids;
}

export function tableOfContents(blocks: Block[] = []): TocItem[] {
  const ids = headingIds(blocks);
  return blocks.flatMap((b, i) =>
    b.type === "heading" && (b.level === 2 || b.level === 3)
      ? [{ id: ids.get(i)!, text: inlineText(b.children), level: b.level }]
      : []
  );
}

export function formatDate(iso?: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
