import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/strapi/blocks";
import { mediaAlt, mediaUrl } from "@/lib/strapi/media";
import type { PostSummary } from "@/lib/strapi/types";
import { cn } from "@/lib/utils";

export function postHref(post: Pick<PostSummary, "slug" | "blog">): string {
  return `/blogs/${post.blog?.slug ?? "_"}/${post.slug}`;
}

interface BlogCardProps {
  post: PostSummary;
  // "overlay": text over the image (default); "stacked": image above text
  variant?: "overlay" | "stacked";
  className?: string;
  priority?: boolean;
}

export default function BlogCard({ post, variant = "overlay", className, priority }: BlogCardProps) {
  const src = mediaUrl(post.cover);

  if (variant === "stacked") {
    return (
      <Link href={postHref(post)} className={cn("group block", className)}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-card_secondary">
          {src && (
            <Image
              src={src}
              alt={mediaAlt(post.cover, post.title)}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="pt-5">
          <div className="mb-2 flex items-center gap-3 font-helvetica text-xs uppercase tracking-widest text-white/50">
            {post.blog && <span className="text-[#F65516]">{post.blog.title}</span>}
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <h3 className="font-clash text-xl font-semibold leading-tight text-white transition-colors group-hover:text-[#F65516] md:text-2xl">
            {post.title}
          </h3>
          {post.excerpt && <p className="mt-3 line-clamp-2 font-helvetica !text-sm !text-white/60">{post.excerpt}</p>}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={postHref(post)}
      className={cn("group relative block aspect-[5/4] w-full overflow-hidden rounded-lg bg-card_secondary", className)}
    >
      {src && (
        <Image
          src={src}
          alt={mediaAlt(post.cover, post.title)}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {post.blog && (
          <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 font-helvetica text-xs font-medium backdrop-blur-sm">
            {post.blog.title}
          </span>
        )}
        <h3 className="line-clamp-2 font-clash text-xl font-semibold leading-tight">{post.title}</h3>
        <div className="mt-3 font-helvetica text-sm text-white/70">{formatDate(post.publishedAt)}</div>
      </div>
    </Link>
  );
}
