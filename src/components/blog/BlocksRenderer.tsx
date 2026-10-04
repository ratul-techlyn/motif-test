import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { headingIds } from "@/lib/strapi/blocks";
import { mediaAlt, mediaUrl } from "@/lib/strapi/media";
import type { Block, InlineNode, ListNode } from "@/lib/strapi/types";
import { cn } from "@/lib/utils";

function renderInline(nodes: InlineNode[] = []): ReactNode {
  return nodes.map((node, i) => {
    if (node.type === "link") {
      const internal = node.url.startsWith("/");
      return internal ? (
        <Link key={i} href={node.url} className="text-white underline decoration-[#F65516] underline-offset-4 hover:text-[#F65516]">
          {renderInline(node.children)}
        </Link>
      ) : (
        <a key={i} href={node.url} target="_blank" rel="noopener noreferrer" className="text-white underline decoration-[#F65516] underline-offset-4 hover:text-[#F65516]">
          {renderInline(node.children)}
        </a>
      );
    }
    let el: ReactNode = node.text;
    if (node.code) el = <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white">{el}</code>;
    if (node.bold) el = <strong className="font-semibold text-white">{el}</strong>;
    if (node.italic) el = <em>{el}</em>;
    if (node.underline) el = <u>{el}</u>;
    if (node.strikethrough) el = <s>{el}</s>;
    return <Fragment key={i}>{el}</Fragment>;
  });
}

function renderList(list: ListNode, key: number | string, textClass: string): ReactNode {
  const Tag = list.format === "ordered" ? "ol" : "ul";
  return (
    <Tag key={key} className={cn("my-6 space-y-2 pl-6 text-white/80", textClass, list.format === "ordered" ? "list-decimal" : "list-disc", "marker:text-[#F65516]")}>
      {list.children.map((item, i) =>
        item.type === "list" ? renderList(item, i, textClass) : <li key={i} className="pl-1 leading-relaxed">{renderInline(item.children)}</li>
      )}
    </Tag>
  );
}

const HEADING_CLASS: Record<number, string> = {
  1: "text-4xl md:text-5xl",
  2: "text-3xl md:text-4xl",
  3: "text-2xl md:text-3xl",
  4: "text-xl md:text-2xl",
  5: "text-lg md:text-xl",
  6: "text-base md:text-lg",
};

type Props = {
  blocks?: Block[] | null;
  className?: string;
  // Larger body copy for editorial templates
  size?: "base" | "lg";
};

export default function BlocksRenderer({ blocks, className, size = "base" }: Props) {
  if (!blocks?.length) return null;
  const ids = headingIds(blocks);
  const para = size === "lg" ? "text-lg md:text-xl" : "text-base md:text-lg";

  return (
    <div className={cn("font-helvetica", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className={cn("my-5 leading-relaxed !text-white/80", para)}>
                {renderInline(block.children)}
              </p>
            );
          case "heading": {
            const H = `h${block.level}` as "h2";
            return (
              <H key={i} id={ids.get(i)} className={cn("mb-4 mt-12 scroll-mt-32 font-clash font-semibold leading-tight text-white", HEADING_CLASS[block.level])}>
                {renderInline(block.children)}
              </H>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="my-10 border-l-2 border-[#F65516] pl-6 font-clash text-2xl font-medium leading-snug text-white md:text-3xl">
                {renderInline(block.children)}
              </blockquote>
            );
          case "code":
            return (
              <pre key={i} className="my-6 overflow-x-auto rounded-lg bg-white/5 p-4 font-mono text-sm text-white/90">
                <code>{block.children.map((c) => c.text).join("")}</code>
              </pre>
            );
          case "image": {
            const src = mediaUrl(block.image);
            if (!src) return null;
            return (
              <figure key={i} className="my-10">
                <Image
                  src={src}
                  alt={mediaAlt(block.image, "")}
                  width={block.image.width ?? 1600}
                  height={block.image.height ?? 900}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="h-auto w-full rounded-lg"
                />
                {block.image.caption && (
                  <figcaption className="mt-3 text-sm text-white/50">{block.image.caption}</figcaption>
                )}
              </figure>
            );
          }
          case "list":
            return renderList(block, i, para);
          default:
            return null;
        }
      })}
    </div>
  );
}
