import BlocksRenderer from "@/components/blog/BlocksRenderer";
import PostMeta from "@/components/blog/PostMeta";
import { RelatedPosts } from "@/components/blog/RelatedSections";
import ShareLinks from "@/components/blog/ShareLinks";
import TableOfContents from "@/components/blog/TableOfContents";
import { cn } from "@/lib/utils";
import { AuthorBox, CoverImage, TagList, type TemplateProps } from "./shared";
import styles from "./templates.module.css";

// 4 · Split hero: image left, title + excerpt right, numbered sections below
export default function TemplateSplit({ post, related, toc, readMinutes, url }: TemplateProps) {
  return (
    <article>
      <header className="grid md:min-h-[85vh] md:grid-cols-2">
        <CoverImage post={post} className="min-h-[50vh] bg-card_secondary md:min-h-full" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="flex flex-col justify-center px-[5vw] py-16 md:pt-32">
          <PostMeta post={post} readMinutes={readMinutes} />
          <h1 className="mt-6 font-clash text-4xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-6xl">{post.title}</h1>
          {post.excerpt && <p className="mt-6 !text-lg !text-white/60">{post.excerpt}</p>}
          <TableOfContents items={toc.filter((t) => t.level === 2)} className="mt-10 hidden md:block" />
        </div>
      </header>

      <div className="layout_normal w-[90%] max-w-3xl py-16 md:py-24">
        <BlocksRenderer blocks={post.content} className={cn(styles.numbered)} />
        <TagList post={post} className="mt-12" />
        <ShareLinks url={url} title={post.title} className="mt-8 border-t border-white/10 pt-8" />
        <AuthorBox post={post} className="mt-10" />
      </div>

      <RelatedPosts posts={related} />
    </article>
  );
}
