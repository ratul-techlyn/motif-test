import BlocksRenderer from "@/components/blog/BlocksRenderer";
import PostMeta from "@/components/blog/PostMeta";
import { RelatedPosts } from "@/components/blog/RelatedSections";
import ShareLinks from "@/components/blog/ShareLinks";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogCard from "@/components/blog-card";
import { AuthorBox, CoverImage, TagList, type TemplateProps } from "./shared";

// 2 · Magazine: large hero with the title over the image, body + sidebar (TOC, share, more reading)
export default function TemplateMagazine({ post, related, toc, readMinutes, url }: TemplateProps) {
  return (
    <article>
      <header className="relative flex min-h-[75vh] items-end">
        <CoverImage post={post} className="absolute inset-0" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
        <div className="layout_normal relative w-[90%] pb-14 pt-32 md:pb-20">
          <PostMeta post={post} readMinutes={readMinutes} />
          <h1 className="mt-6 max-w-5xl font-clash text-4xl font-semibold leading-[1.05] text-white md:text-7xl">{post.title}</h1>
          {post.excerpt && <p className="mt-6 max-w-3xl !text-lg !text-white/70 md:!text-xl">{post.excerpt}</p>}
        </div>
      </header>

      <div className="layout_normal grid w-[90%] gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20 md:py-20">
        <div className="min-w-0">
          <BlocksRenderer blocks={post.content} />
          <TagList post={post} className="mt-12" />
          <AuthorBox post={post} className="mt-10" />
        </div>

        <aside className="space-y-12 lg:border-l lg:border-white/10 lg:pl-10">
          <TableOfContents items={toc} />
          <ShareLinks url={url} title={post.title} />
          {related[0] && (
            <div>
              <p className="mb-4 !text-xs uppercase tracking-widest !text-white/50">Read next</p>
              <BlogCard post={related[0]} />
            </div>
          )}
        </aside>
      </div>

      <RelatedPosts posts={related.slice(1)} title="More from the journal" />
    </article>
  );
}
