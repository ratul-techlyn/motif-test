import Image from "next/image";
import type { TocItem } from "@/lib/strapi/blocks";
import { mediaAlt, mediaUrl } from "@/lib/strapi/media";
import type { Post, PostSummary } from "@/lib/strapi/types";
import { cn } from "@/lib/utils";

// Every template receives the same props, so switching a post's template never breaks it
export type TemplateProps = {
  post: Post;
  related: PostSummary[];
  toc: TocItem[];
  readMinutes: number;
  url: string;
};

export function TagList({ post, className }: { post: Post; className?: string }) {
  if (!post.tags?.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2 font-helvetica text-sm", className)}>
      {post.tags.map((t) => (
        <li key={t.documentId} className="rounded-full bg-white/10 px-3 py-1 text-white/70">
          #{t.name}
        </li>
      ))}
    </ul>
  );
}

export function AuthorBox({ post, className }: { post: Post; className?: string }) {
  const a = post.author;
  if (!a) return null;
  const avatar = mediaUrl(a.avatar);
  return (
    <div className={cn("flex items-start gap-4 rounded-lg border border-white/10 p-6", className)}>
      {avatar ? (
        <Image src={avatar} alt={mediaAlt(a.avatar, a.name)} width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F65516] font-clash text-xl font-semibold text-white">
          {a.name.charAt(0)}
        </div>
      )}
      <div>
        <p className="!text-xs uppercase tracking-widest !text-white/50">Written by</p>
        <p className="mt-1 font-clash !text-lg font-semibold !text-white">{a.name}</p>
        {a.bio && <p className="mt-2 !text-sm !text-white/60">{a.bio}</p>}
      </div>
    </div>
  );
}

export function CoverImage({ post, className, sizes, priority = true }: { post: Post; className?: string; sizes: string; priority?: boolean }) {
  const src = mediaUrl(post.cover);
  if (!src) return null;
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={src} alt={mediaAlt(post.cover, post.title)} fill priority={priority} sizes={sizes} className="object-cover" />
    </div>
  );
}
