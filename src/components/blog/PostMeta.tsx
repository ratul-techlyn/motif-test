import Link from "next/link";
import { formatDate } from "@/lib/strapi/blocks";
import type { Post } from "@/lib/strapi/types";
import { cn } from "@/lib/utils";

type Props = { post: Post; readMinutes: number; className?: string; showBlog?: boolean };

export default function PostMeta({ post, readMinutes, className, showBlog = true }: Props) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 font-helvetica text-sm text-white/60", className)}>
      {showBlog && post.blog && (
        <Link href={`/blogs/${post.blog.slug}`} className="uppercase tracking-widest text-[#F65516] hover:text-white">
          {post.blog.title}
        </Link>
      )}
      {post.author && <span>By {post.author.name}</span>}
      {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
      <span>{readMinutes} min read</span>
    </div>
  );
}
