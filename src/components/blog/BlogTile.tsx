import Image from "next/image";
import Link from "next/link";
import { mediaAlt, mediaUrl } from "@/lib/strapi/media";
import type { BlogSummary } from "@/lib/strapi/types";

export default function BlogTile({ blog }: { blog: BlogSummary }) {
  const src = mediaUrl(blog.cover);
  const count = blog.posts?.length ?? 0;

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-card_secondary transition-colors hover:border-[#F65516]"
    >
      {src && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={src}
            alt={mediaAlt(blog.cover, blog.title)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <span className="font-helvetica text-xs uppercase tracking-widest text-white/50">
          {count} {count === 1 ? "post" : "posts"}
        </span>
        <h3 className="mt-3 font-clash text-2xl font-semibold leading-tight text-white md:text-3xl">{blog.title}</h3>
        {blog.description && <p className="mt-3 font-helvetica !text-white/60">{blog.description}</p>}
        <span className="mt-auto pt-6 font-helvetica text-sm text-white transition-colors group-hover:text-[#F65516]">
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}
