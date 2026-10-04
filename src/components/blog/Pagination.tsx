import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  pageCount: number;
  // Builds the href for a page number (keeps other query params like ?blog=)
  hrefFor: (page: number) => string;
};

export default function Pagination({ page, pageCount, hrefFor }: Props) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const linkClass = "flex h-10 min-w-10 items-center justify-center rounded-full border px-4 font-helvetica text-sm transition-colors";

  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={hrefFor(page - 1)} className={cn(linkClass, "border-white/20 text-white hover:border-[#F65516]")} rel="prev">
          &larr; Prev
        </Link>
      )}
      {pages.map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            linkClass,
            n === page ? "border-[#F65516] bg-[#F65516] text-white" : "border-white/20 text-white/70 hover:border-white hover:text-white"
          )}
        >
          {n}
        </Link>
      ))}
      {page < pageCount && (
        <Link href={hrefFor(page + 1)} className={cn(linkClass, "border-white/20 text-white hover:border-[#F65516]")} rel="next">
          Next &rarr;
        </Link>
      )}
    </nav>
  );
}
