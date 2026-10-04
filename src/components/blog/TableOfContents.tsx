"use client";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { MouseEvent } from "react";
import type { TocItem } from "@/lib/strapi/blocks";
import { cn } from "@/lib/utils";

// Native #hash jumps don't work inside ScrollSmoother, so scroll through it when it's active
function scrollToHeading(e: MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(el, true, "top 120px");
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export default function TableOfContents({ items, className }: { items: TocItem[]; className?: string }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className={cn("font-helvetica", className)}>
      <p className="mb-4 !text-xs uppercase tracking-widest !text-white/50">On this page</p>
      <ul className="space-y-3 border-l border-white/10">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-8" : "pl-4"}>
            <a
              href={`#${item.id}`}
              onClick={(e) => scrollToHeading(e, item.id)}
              className="block text-sm leading-snug text-white/60 transition-colors hover:text-[#F65516]"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
