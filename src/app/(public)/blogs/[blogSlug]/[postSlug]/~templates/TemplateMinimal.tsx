import Link from "next/link";
import BlocksRenderer from "@/components/blog/BlocksRenderer";
import ShareLinks from "@/components/blog/ShareLinks";
import { formatDate } from "@/lib/strapi/blocks";
import { postHref } from "@/components/blog-card";
import { TagList, type TemplateProps } from "./shared";

// 5 · Minimal / editorial: typography only, huge headline, narrow column
export default function TemplateMinimal({ post, related, readMinutes, url }: TemplateProps) {
  return (
    <article>
      <header className="px-[5vw] pb-16 pt-32 md:pb-24 md:pt-48">
        <div className="flex flex-wrap items-center gap-3 font-helvetica text-sm uppercase tracking-[0.3em] text-white/50">
          {post.blog && (
            <Link href={`/blogs/${post.blog.slug}`} className="text-[#F65516] hover:text-white">
              {post.blog.title}
            </Link>
          )}
          <span>—</span>
          <span>{readMinutes} min read</span>
        </div>
        <h1 className="mt-8 max-w-[18ch] font-clash text-6xl font-semibold leading-[0.95] text-white md:text-8xl lg:text-9xl">{post.title}</h1>
      </header>

      <div className="layout_normal w-[90%] max-w-2xl border-t border-white/10 pb-20 pt-12">
        {post.excerpt && <p className="mb-10 font-clash !text-2xl leading-snug !text-white md:!text-3xl">{post.excerpt}</p>}
        <BlocksRenderer blocks={post.content} size="lg" />

        <footer className="mt-16 border-t border-white/10 pt-8 font-helvetica text-sm text-white/50">
          {post.author && <span>{post.author.name}</span>}
          {post.publishedAt && <span className="ml-3">· {formatDate(post.publishedAt)}</span>}
          <TagList post={post} className="mt-6" />
          <ShareLinks url={url} title={post.title} className="mt-6" />
        </footer>
      </div>

      {related.length > 0 && (
        <nav aria-label="More posts" className="layout_normal w-[90%] max-w-2xl pb-24">
          <p className="mb-6 !text-xs uppercase tracking-widest !text-white/50">Keep reading</p>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {related.map((r) => (
              <li key={r.documentId}>
                <Link href={postHref(r)} className="group flex items-baseline justify-between gap-6 py-5">
                  <span className="font-clash text-xl font-medium text-white transition-colors group-hover:text-[#F65516] md:text-2xl">{r.title}</span>
                  <span className="shrink-0 font-helvetica text-sm text-white/40">{formatDate(r.publishedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}
